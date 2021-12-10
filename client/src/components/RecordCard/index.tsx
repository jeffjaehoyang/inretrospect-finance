import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import Loader from 'react-loader-spinner';

import { db } from '../../auth/FirebaseAuthContext';
import { getWeeksDifference } from '../../dataProcessing';
import StockModal from '../StockModal';
import * as Styled from './styles';

interface Props {
  startDate: string;
  symbol: string;
  amount: number;
  multiplier: number;
  currentAmount: number | undefined;
  companyDomain: string | undefined;
  fetchData: () => Promise<void>;
  data: Array<number> | null | undefined;
  dates: Array<string> | undefined;
  id: string;
}

const RecordCard = ({
  startDate,
  companyDomain,
  multiplier,
  symbol,
  amount,
  currentAmount,
  fetchData,
  id,
  data,
  dates,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldShowData: boolean =
    getWeeksDifference(new Date(startDate), new Date()) >= 1;

  const handleDelete = async () => {
    if (id == null) return; // id needs to be there to delete
    setIsDeleting(true);
    await deleteDoc(doc(db, "records", id));
    await fetchData();
    setIsDeleting(false);
  };

  return (
    <>
      <StockModal
        startDate={startDate}
        symbol={symbol}
        data={data}
        dates={dates}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Styled.CardWrapper
        onClick={(event: any) => {
          if (
            ["svg", "path"].includes(event.target.localName) ||
            !shouldShowData
          )
            return;
          setShowModal(true);
        }}
        className="group"
        shouldShowData={shouldShowData}
      >
        {shouldShowData ? null : (
          <MdLock style={{ position: "absolute", top: -2, right: 0 }} />
        )}
        <Styled.HeaderWrapper>
          <div className="flex flex-row items-center">
            <img
              alt="logo"
              src={`https://logo.clearbit.com/${companyDomain}`}
              style={{
                maxHeight: 40,
                maxWidth: 40,
                marginRight: 10,
                borderRadius: "10px",
              }}
            />
            <Styled.TickerWrapper>{symbol}</Styled.TickerWrapper>
          </div>
          {shouldShowData ? (
            <div
              className={`rounded-full font-bold text-sm bg-${
                multiplier < 1 ? "red" : "green"
              }-200 pl-2 pr-2 pt-1 pb-1 float-right`}
            >
              <span
                className={`font-bold text-${
                  multiplier < 1 ? "red" : "green"
                }-800`}
              >
                {multiplier < 1 ? "⇣" : "⇡"}
              </span>{" "}
              {multiplier >= 1
                ? Math.round((multiplier - 1) * 100).toLocaleString("en-US")
                : Math.round((1 - multiplier) * 100).toLocaleString("en-US")}
              &nbsp;%
            </div>
          ) : (
            <FaQuestion />
          )}
        </Styled.HeaderWrapper>
        <Styled.ResultsWrapper>
          <div className="text-sm font-bold rounded-full">
            ${amount?.toLocaleString("en-US")}
          </div>
          <div className="ml-1 mr-1">→</div>
          <div className="text-sm font-bold rounded-full">
            {shouldShowData ? (
              `$${currentAmount?.toLocaleString("en-US")}`
            ) : (
              <FaQuestion />
            )}
          </div>
        </Styled.ResultsWrapper>
        <div className="flex flex-row items-center justify-between mt-2 text-sm font-semibold">
          <div>
            Tracking since
            <span className="p-1 ml-1 font-bold bg-indigo-100 rounded-lg">
              {startDate}
            </span>
          </div>
          {isDeleting ? (
            <Loader type="TailSpin" color="red" height={15} width={15} />
          ) : (
            <Styled.DeleteButton onClick={handleDelete}>
              <TiDelete />
            </Styled.DeleteButton>
          )}
        </div>
      </Styled.CardWrapper>
    </>
  );
};

export default RecordCard;
