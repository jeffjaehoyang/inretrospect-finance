import { addDoc, collection, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { MdAddTask } from 'react-icons/md';
import Loader from 'react-loader-spinner';

import { db, useFirebaseAuth } from '../../auth/FirebaseAuthContext';
import { getWeeksDifference } from '../../dataProcessing';
import CreateRecordForm from '../CreateRecordForm';
import * as Styled from './styles';

interface Props {
  fetchData: () => Promise<void>;
}

// template credit: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/small
const Modal: React.FC<Props> = ({ fetchData }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [isInvestmentMade, setIsInvestmentMade] = useState<boolean | null>(
    null
  );
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState({
    company: false,
    startDate: false,
    amount: false,
    isInvestmentMade: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const user = useFirebaseAuth();

  const getCompanyDomain = async (symbol: string) => {
    if (symbol === "FB") return "facebook.com";
    const companyDomainPromise = await fetch(`/companyDomain?symbol=${symbol}`);
    const companyDomain = await companyDomainPromise.text();
    return companyDomain;
  };

  const checkFormErrors = () => {
    setErrors({
      company: company == null,
      startDate: startDate == null,
      amount: amount == null,
      isInvestmentMade: isInvestmentMade == null,
    });
  };

  const handleSave = async () => {
    checkFormErrors();
    if (
      company == null ||
      startDate == null ||
      amount == null ||
      isInvestmentMade == null
    )
      return;
    setIsSaving(true);
    const companyDomain = await getCompanyDomain(company?.value as string);
    const newRecordRef = await addDoc(collection(db, "records"), {
      symbol: company?.value,
      companyName: company?.label,
      companyDomain: companyDomain,
      timestamp: new Date(),
      startDate: startDate,
      amount: amount,
      notes: notes,
      isInvestmentMade: isInvestmentMade,
      uid: user?.uid,
    });
    await updateDoc(newRecordRef, {
      id: newRecordRef.id,
    });
    if (getWeeksDifference(startDate as Date, new Date()) < 1) {
      // create an EmailTask scheduled to run after a week
      let weekFromToday = startDate;
      weekFromToday.setDate(startDate.getDate() + 7);
      addDoc(collection(db, "emailTasks"), {
        isExecuted: false,
        options: {
          emailTo: user?.email,
          uid: user?.uid,
          recordId: newRecordRef.id,
          symbol: company?.value,
          dispayName: user?.displayName,
          companyName: company?.label,
          companyDomain: companyDomain,
          notes: notes,
          amount: amount,
          isInvestmentMade: isInvestmentMade,
        },
        performAt: weekFromToday,
        worker: "sendEmail",
      });
    }
    await fetchData();
    setShowModal(false);
    resetFields();
    setIsSaving(false);
  };

  const resetFields = () => {
    setCompany(null);
    setStartDate(null);
    setAmount(null);
    setIsInvestmentMade(null);
    setNotes("");
    setErrors({
      company: false,
      startDate: false,
      amount: false,
      isInvestmentMade: false,
    });
  };

  return (
    <>
      <Styled.AddRecordButtonWrapper
        onClick={() => {
          setShowModal(true);
        }}
      >
        <MdAddTask className="mr-1" />
        Add Record
      </Styled.AddRecordButtonWrapper>
      {showModal ? (
        <Styled.Backdrop
          onClick={(e: any) => {
            if (e.target.localName === "main") {
              setShowModal(false);
              resetFields();
            }
          }}
        >
          <Styled.ModalWrapper>
            <Styled.WidthLimiter>
              <Styled.ContentWrapper>
                <Styled.HeaderWrapper>
                  <div className="text-2xl font-semibold">Add a Record</div>
                  <Styled.XButtonWrapper
                    onClick={() => {
                      setShowModal(false);
                      resetFields();
                    }}
                  >
                    <Styled.XButton>×</Styled.XButton>
                  </Styled.XButtonWrapper>
                </Styled.HeaderWrapper>
                <Styled.FormWrapper>
                  <CreateRecordForm
                    startDate={startDate}
                    setCompany={setCompany}
                    setStartDate={setStartDate}
                    setAmount={setAmount}
                    setIsInvestmentMade={setIsInvestmentMade}
                    setNotes={setNotes}
                    errors={errors}
                  />
                </Styled.FormWrapper>
                <Styled.FooterWrapper>
                  <Styled.CloseButtonWrapper
                    onClick={() => {
                      setShowModal(false);
                      resetFields();
                    }}
                  >
                    Close
                  </Styled.CloseButtonWrapper>
                  <Styled.SaveButtonWrapper type="button" onClick={handleSave}>
                    {isSaving ? (
                      <Loader
                        type="ThreeDots"
                        color="#767676"
                        height={15}
                        width={15}
                      />
                    ) : (
                      "Save"
                    )}
                  </Styled.SaveButtonWrapper>
                </Styled.FooterWrapper>
              </Styled.ContentWrapper>
            </Styled.WidthLimiter>
          </Styled.ModalWrapper>
        </Styled.Backdrop>
      ) : null}
    </>
  );
};

export default Modal;
