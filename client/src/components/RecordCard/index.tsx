import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';
import { MdLock } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import Loader from 'react-loader-spinner';

import { db } from '../../auth/FirebaseAuthContext';
import { getDateString, getDaysDifference, getMultiplier } from '../../dataProcessing';
import { Record } from '../../interfaces';
import StockModal from '../StockModal';
import * as Styled from './styles';

interface Props {
  record: Record;
  fetchData: () => Promise<void>;
}

const RecordCard = ({ record, fetchData }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const multiplier = getMultiplier(record.marketData?.data || []);
  const currentAmount = record.amount * multiplier;

  const handleDelete = async () => {
    if (record.id == null) return; // id needs to be there to delete
    setIsDeleting(true);
    await deleteDoc(doc(db, "records", record.id));
    await fetchData();
    setIsDeleting(false);
  };

  return (
    <>
      <StockModal
        startDate={getDateString(record.startDate)}
        symbol={record.symbol}
        data={record.marketData?.data}
        dates={record.marketData?.dates}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Styled.CardWrapper
        onClick={(event: any) => {
          if (
            ["svg", "path"].includes(event.target.localName) ||
            record.isRecordLocked
          )
            return;
          setShowModal(true);
        }}
        className="group"
        isRecordLocked={record.isRecordLocked}
      >
        {!record.isRecordLocked ? null : (
          <MdLock style={{ position: "absolute", top: -2, right: 0 }} />
        )}
        <Styled.HeaderWrapper>
          <div className="flex flex-row items-center">
            <img
              alt="logo"
              src={`https://logo.clearbit.com/${record.companyDomain}`}
              style={{
                maxHeight: 40,
                maxWidth: 40,
                marginRight: 10,
                borderRadius: "10px",
              }}
            />
            <Styled.TickerWrapper>{record.symbol}</Styled.TickerWrapper>
          </div>
          <div
            className={`flex flex-row items-center rounded-full font-bold text-sm bg-${
              !record.isRecordLocked
                ? multiplier < 1
                  ? "red"
                  : "green"
                : "warmGray"
            }-200 pl-2 pr-2 pt-1 pb-1 float-right`}
          >
            {!record.isRecordLocked && (
              <span
                className={`font-bold text-${
                  multiplier < 1 ? "red" : "green"
                }-800 mr-1`}
              >
                {multiplier < 1 ? "⇣" : "⇡"}
              </span>
            )}
            <span className="mr-1">
              {!record.isRecordLocked ? (
                multiplier >= 1 ? (
                  Math.round((multiplier - 1) * 100).toLocaleString("en-US")
                ) : (
                  Math.round((1 - multiplier) * 100).toLocaleString("en-US")
                )
              ) : (
                <FaQuestion />
              )}
            </span>
            %
          </div>
        </Styled.HeaderWrapper>
        <Styled.ResultsWrapper>
          <div className="text-sm font-bold rounded-full">
            ${record.amount?.toLocaleString("en-US")}
          </div>
          <div className="ml-1 mr-1">→</div>
          <div className="text-sm font-bold rounded-full">
            {!record.isRecordLocked ? (
              `$${currentAmount.toLocaleString("en-US")}`
            ) : (
              <FaQuestion />
            )}
          </div>
        </Styled.ResultsWrapper>
        <Styled.TimeWrapper>
          {!record.isRecordLocked ? (
            <div className="flex flex-row items-center pl-1 pr-1 bg-blue-100 bg-opacity-50 rounded-full">
              <FcCalendar className="mr-1 text-lg" />
              {record.startDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          ) : (
            <div className="flex flex-row items-center pl-1 pr-1 rounded-full bg-warmGray-200">
              <RiTimerLine className="mr-1" />
              {7 - getDaysDifference(new Date(), record.startDate)} days to
              unlock
            </div>
          )}
        </Styled.TimeWrapper>
        <Styled.LastRow>
          <Styled.NotesWrapper>
            <>
              <BsFillChatQuoteFill className="mr-2" />
              {record.notes.length
                ? record.notes
                : "No notes to display for this record"}
            </>
          </Styled.NotesWrapper>
          {isDeleting ? (
            <Loader type="TailSpin" color="red" height={15} width={15} />
          ) : (
            <Styled.DeleteButton onClick={handleDelete}>
              <TiDelete />
            </Styled.DeleteButton>
          )}
        </Styled.LastRow>
      </Styled.CardWrapper>
    </>
  );
};

export default RecordCard;
