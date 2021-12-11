import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import { db, useFirebaseAuth } from '../../auth/FirebaseAuthContext';
import { getStartDateMatchingData, getWeeksDifference } from '../../dataProcessing';
import { ReactComponent as NoData } from '../../images/no_data.svg';
import { APIResponseFormat } from '../../interfaces';
import Banner from '../Banner';
import Modal from '../Modal';
import RecordCard from '../RecordCard';
import * as Styled from './styles';

const Dashboard: React.FC = () => {
  const [recordMatchingData, setRecordMatchingData] = useState<{
    [key: string]: {
      symbol: string;
      companyDomain: string;
      amount: number;
      id: string;
      notes: string;
      dates: Array<string>;
      data: Array<number> | null;
    };
  }>({});
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = useFirebaseAuth();
  const updatedData: {
    [key: string]: {
      symbol: string;
      companyDomain: string;
      amount: number;
      id: string;
      notes: string;
      dates: Array<string>;
      data: Array<number> | null;
    };
  } = {};
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
      async (recordForUser) => {
        const record = recordForUser.data();
        const startDateTimeStamp = record.startDate.toDate();
        const startDate = new Date(
          startDateTimeStamp.getTime() -
            startDateTimeStamp.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];
        const isRecordLocked: boolean =
          getWeeksDifference(new Date(startDate), new Date()) < 1;

        const hashKey = `${record.symbol}-${startDate}`;
        if (!isRecordLocked) {
          try {
            const response = await api<APIResponseFormat>(
              `/stockData?symbol=${record.symbol}`
            );
            let stockDataMatchingDates = getStartDateMatchingData(
              record.symbol,
              record.companyDomain,
              record.amount,
              record.id,
              record.notes,
              response["Time Series (Daily)"],
              startDate
            );
            updatedData[hashKey] = stockDataMatchingDates;
            const amount = updatedData[hashKey].amount;
            const data = updatedData[hashKey].data;
            const multiplier = data ? data[data.length - 1] / data[0] : 0;
            const realMultiplier = Number(multiplier.toFixed(2));
            const currentAmount = amount * realMultiplier;
            const difference = currentAmount - amount;
            tempBalance += difference;
          } catch (e) {
            console.log(e);
          }
        } else {
          let stockDataMatchingDates = getStartDateMatchingData(
            record.symbol,
            record.companyDomain,
            record.amount,
            record.id,
            record.notes,
            null,
            startDate
          );
          updatedData[hashKey] = stockDataMatchingDates;
        }
      }
    );
    await Promise.all(recordsPromises);
    const updatedRecordMatchingData = { ...updatedData };
    setRecordMatchingData(updatedRecordMatchingData);
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
        {user && !isLoading && Object.keys(recordMatchingData).length > 0 ? (
          Object.keys(recordMatchingData)
            .sort(
              (a, b) =>
                +new Date(a.split("-").slice(1).join("-")) -
                +new Date(b.split("-").slice(1).join("-"))
            )
            .map((hashKey: string, index: number) => {
              const startDate = hashKey.split("-").slice(1).join("-");
              const amount = recordMatchingData[hashKey].amount;
              const data = recordMatchingData[hashKey].data;
              const multiplier = data ? data[data.length - 1] / data[0] : 0;
              const realMultiplier = Number(multiplier.toFixed(2));
              const currentAmount = amount * realMultiplier;
              return (
                <RecordCard
                  key={index}
                  startDate={startDate}
                  companyDomain={recordMatchingData[hashKey].companyDomain}
                  amount={amount}
                  multiplier={realMultiplier}
                  symbol={recordMatchingData[hashKey].symbol}
                  data={data}
                  id={recordMatchingData[hashKey].id}
                  notes={recordMatchingData[hashKey].notes}
                  dates={recordMatchingData[hashKey].dates}
                  currentAmount={currentAmount}
                  fetchData={fetchData}
                />
              );
            })
        ) : (
          <Styled.EmptyWrapper>
            {user &&
            Object.keys(recordMatchingData).length === 0 &&
            !isLoading ? (
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
