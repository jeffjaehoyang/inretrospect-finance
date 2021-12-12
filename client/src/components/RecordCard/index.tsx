import { deleteDoc, doc } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react';
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
  recordsList: Record[];
  setRecordsList: Dispatch<SetStateAction<Record[]>>;
}

const RecordCard: React.FC<Props> = ({
  record,
  recordsList,
  setRecordsList,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const multiplier = getMultiplier(record.marketData?.data || []);
  const currentAmount = record.amount * multiplier;

  const handleDelete = async () => {
    if (record.id == null) return; // id needs to be there to delete
    setIsDeleting(true);
    await deleteDoc(doc(db, "records", record.id));
    const newRecordsList = recordsList.filter((doc) => doc.id !== record.id);
    setRecordsList(newRecordsList);
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
          <Styled.CompanyInfo>
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
          </Styled.CompanyInfo>
          <Styled.PercentageGain
            isRecordLocked={record.isRecordLocked}
            multiplier={multiplier}
          >
            {!record.isRecordLocked && (
              <Styled.MultiplierText>
                {multiplier < 1 ? "⇣" : "⇡"}
              </Styled.MultiplierText>
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
          </Styled.PercentageGain>
        </Styled.HeaderWrapper>
        <Styled.ResultsWrapper>
          <Styled.ResultsPill>
            ${record.amount?.toLocaleString("en-US")}
          </Styled.ResultsPill>
          <div className="ml-1 mr-1">→</div>
          <Styled.ResultsPill>
            {!record.isRecordLocked ? (
              `$${currentAmount.toLocaleString("en-US")}`
            ) : (
              <FaQuestion />
            )}
          </Styled.ResultsPill>
        </Styled.ResultsWrapper>
        <Styled.TimeWrapper>
          {!record.isRecordLocked ? (
            <Styled.StartDate>
              <FcCalendar className="mr-1 text-lg" />
              {record.startDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </Styled.StartDate>
          ) : (
            <Styled.TimeToUnlock>
              <RiTimerLine className="mr-1" />
              {7 - getDaysDifference(new Date(), record.startDate)} days to
              unlock
            </Styled.TimeToUnlock>
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
