import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { FaCheckCircle, FaQuestion, FaShareSquare } from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';
import { MdCheckCircleOutline, MdDoNotDisturbAlt, MdLock } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import Loader from 'react-loader-spinner';

import { db } from '../../auth/FirebaseAuthContext';
import { getDateString, getDaysDifference, getMultiplier } from '../../dataProcessing';
import { Record } from '../../interfaces';
import { notifyCopyLink, notifyDelete } from '../../toasts';
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
    // delete email tasks for the record being deleted
    const tasksCollectionRef = collection(db, "emailTasks");
    const tasksQuery = query(
      tasksCollectionRef,
      where("options.recordId", "==", record.id)
    );
    const tasksToDelete = await getDocs(tasksQuery);
    tasksToDelete.docs.map((task) => deleteDoc(doc(db, "emailTasks", task.id)));
    // delete record
    await deleteDoc(doc(db, "records", record.id));
    // update recordsList for re-render
    const newRecordsList = recordsList.filter((doc) => doc.id !== record.id);
    setRecordsList(newRecordsList);
    setIsDeleting(false);
    notifyDelete(<FaCheckCircle className="text-green-300" />);
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
              <Styled.MultiplierText multiplier={multiplier}>
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
        <Styled.SecondRow>
          <Styled.ResultsWrapper multiplier={multiplier}>
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
          {!record.isRecordLocked && (
            <Styled.ShareButton
              to={`/share-record/${record.id}`}
              onClick={() =>
                notifyCopyLink(
                  `https://inretrospect.finance/share-record/${record.id}`,
                  <FaCheckCircle className="text-green-300" />
                )
              }
            >
              <FaShareSquare className="mr-1" />
              Share
            </Styled.ShareButton>
          )}
          {record.isInvestmentMade ? (
            <MdCheckCircleOutline
              className="absolute text-lg text-green-700"
              style={{ top: -4, left: -2 }}
            />
          ) : (
            <MdDoNotDisturbAlt
              className="absolute text-lg text-red-700"
              style={{ top: -4, left: 0 }}
            />
          )}
        </Styled.SecondRow>

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
              {7 - getDaysDifference(new Date(), record.startDate)} day(s) to
              unlock
            </Styled.TimeToUnlock>
          )}
        </Styled.TimeWrapper>
        <Styled.LastRow>
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
