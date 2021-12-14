import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { FcCalendar } from 'react-icons/fc';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { db } from '../../auth/FirebaseAuthContext';
import { api, getDateString, getMultiplier, getStartDateMatchingData } from '../../dataProcessing';
import { APIResponseFormat, Record, User } from '../../interfaces';
import StockCard from '../StockCard';
import * as Styled from './styles';

const ShareRecord: React.FC = () => {
  const { recordId } = useParams();
  const [record, setRecord] = useState<Record | null | undefined>(null);
  const [recordUser, setRecordUser] = useState<User | null | undefined>(null);
  const [marketData, setMarketData] = useState<{
    dates: Array<string>;
    data: Array<number>;
  } | null>(null);
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [gains, setGains] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (record == null && recordId) {
      setIsLoading(true);
      const docRef = doc(db, "records", recordId);
      getDoc(docRef).then(async (ref) => {
        const data = ref.data();
        if (data) {
          data.startDate = data.startDate.toDate();
        }
        setRecord(data as Record);
        const q = query(collection(db, "users"), where("uid", "==", data?.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setRecordUser(doc.data() as User);
        });
      });
    }
    fetchData();
  }, [record]);

  const fetchData = async () => {
    setIsLoading(true);
    if (record == null) return;
    const response = await api<APIResponseFormat>(
      `/stockData?symbol=${record.symbol}`
    );
    let stockDataMatchingDates: {
      dates: Array<string>;
      data: Array<number>;
    } = getStartDateMatchingData(record, response["Time Series (Daily)"]);
    setMarketData(stockDataMatchingDates);
    const multiplier = getMultiplier(stockDataMatchingDates.data);
    setMultiplier(multiplier);
    setGains(
      multiplier >= 1
        ? Math.round((multiplier - 1) * 100)
        : Math.round((1 - multiplier) * 100)
    );
    setIsLoading(false);
  };

  return (
    <Styled.ShareRecordWrapper>
      <Styled.HeaderText>
        {!isLoading &&
          record &&
          recordUser &&
          `Check out ${recordUser.displayName.split(" ")[0]}'s investment on ${
            record?.symbol
          }`}
      </Styled.HeaderText>

      {!isLoading && record && marketData && (
        <StockCard
          startDate={getDateString(record.startDate)}
          symbol={record.symbol}
          data={marketData.data}
          dates={marketData.dates}
        />
      )}
      {!isLoading && record && multiplier && marketData && gains && (
        <Styled.InvestmentRecord>
          <img
            alt="logo"
            src={`https://logo.clearbit.com/${record.companyDomain}`}
            style={{
              maxHeight: 50,
              maxWidth: 50,
              marginRight: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <div className="flex flex-row items-center text-sm font-bold sm:text-base">
            <span className="mr-1">Tracking since</span>
            <FcCalendar className="mr-1 text-lg" />
            {record.startDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
          <div className="flex flex-row font-bold">
            <Styled.ResultsWrapper multiplier={multiplier}>
              <Styled.ResultsPill>
                ${marketData.data[0].toLocaleString("en-us")}
              </Styled.ResultsPill>
              <div className="ml-1 mr-1">→</div>
              <Styled.ResultsPill>
                $
                {marketData.data[marketData.data.length - 1].toLocaleString(
                  "en-us"
                )}
              </Styled.ResultsPill>
            </Styled.ResultsWrapper>
            <Styled.PercentageGain multiplier={multiplier}>
              <Styled.MultiplierText multiplier={multiplier}>
                {multiplier < 1 ? "⇣" : "⇡"}
              </Styled.MultiplierText>
              <span className="mr-1 sm:text-xl">
                {gains.toLocaleString("en-us")}
              </span>
              %
            </Styled.PercentageGain>
          </div>
          <Styled.NotesWrapper>
            <>
              <span className="flex flex-row items-center font-bold">
                <BsFillChatQuoteFill className="mr-2" />
                note
              </span>
              {record.notes.length
                ? record.notes
                : "No notes to display for this record"}
            </>
          </Styled.NotesWrapper>
        </Styled.InvestmentRecord>
      )}

      {isLoading && (
        <Styled.EmptyWrapper>
          <Loader
            type="ThreeDots"
            color="#767676"
            height={50}
            width={50}
            timeout={3000}
          />
        </Styled.EmptyWrapper>
      )}
    </Styled.ShareRecordWrapper>
  );
};

export default ShareRecord;
