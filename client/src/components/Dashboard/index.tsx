import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import { db, useFirebaseAuth } from '../../auth/FirebaseAuthContext';
import {
    getDateString, getMultiplier, getStartDateMatchingData, getWeeksDifference
} from '../../dataProcessing';
import { ReactComponent as NoData } from '../../images/no_data.svg';
import { APIResponseFormat, Record } from '../../interfaces';
import Banner from '../Banner';
import Modal from '../Modal';
import RecordCard from '../RecordCard';
import * as Styled from './styles';

const Dashboard: React.FC = () => {
  const [recordsList, setRecordsList] = useState<Record[]>([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = useFirebaseAuth();

  function api<APIResponseFormat>(url: string): Promise<APIResponseFormat> {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        return data.data;
      });
  }
  let tempBalance = 0;
  let tempRecords: Record[] = [];

  const fetchData = async () => {
    if (user == null) return;
    setIsLoading(true);
    const recordsCollectionRef = collection(db, "records");
    const recordsQuery = query(
      recordsCollectionRef,
      where("uid", "==", user.uid)
    );
    const recordsForUser = await getDocs(recordsQuery);
    const recordsPromises = await recordsForUser.docs.map(
      async (recordForUser: any) => {
        let record: any = recordForUser.data();
        record.startDate = record.startDate.toDate();
        const startDateString = getDateString(record.startDate);
        const isRecordLocked: boolean =
          getWeeksDifference(new Date(startDateString), new Date()) < 1;
        record = { ...record, isRecordLocked: isRecordLocked };
        if (!isRecordLocked) {
          try {
            const response = await api<APIResponseFormat>(
              `/stockData?symbol=${record.symbol}`
            );
            let stockDataMatchingDates = getStartDateMatchingData(
              record,
              response["Time Series (Daily)"]
            );
            record = { ...record, marketData: stockDataMatchingDates };
            const multiplier = getMultiplier(stockDataMatchingDates.data);
            const difference = record.amount * multiplier - record.amount;
            tempBalance += difference;
          } catch (e) {
            console.log(e);
          }
        }
        tempRecords.push(record);
      }
    );
    await Promise.all(recordsPromises);
    setRecordsList(tempRecords);
    setBalance(tempBalance);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Styled.DashboardWrapper>
      <Banner balance={balance} />
      <Modal fetchData={fetchData} />
      <Styled.ContentWrapper>
        {user && !isLoading && recordsList.length > 0 ? (
          recordsList
            .sort((a: Record, b: Record) => +a.startDate - +b.startDate)
            .map((record: Record, index: number) => {
              return (
                <RecordCard key={index} record={record} fetchData={fetchData} />
              );
            })
        ) : (
          <Styled.EmptyWrapper>
            {user && recordsList.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center">
                <span className="mb-5">No records to show</span>
                <NoData height={100} width={100} />
              </div>
            ) : (
              <Loader
                type="TailSpin"
                color="#767676"
                height={50}
                width={50}
                timeout={3000}
              />
            )}
          </Styled.EmptyWrapper>
        )}
      </Styled.ContentWrapper>
    </Styled.DashboardWrapper>
  );
};

export default Dashboard;
