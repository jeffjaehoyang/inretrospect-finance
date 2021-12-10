import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import AsyncSearchBar from '../AsyncSearchBar';

interface Props {
  setCompany: Dispatch<SetStateAction<{ label: string; value: string } | null>>;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setAmount: Dispatch<SetStateAction<number | null>>;
  setNotes: Dispatch<SetStateAction<string>>;
}

const CreateRecordForm = ({
  setCompany,
  setStartDate,
  setAmount,
  setNotes,
}: Props) => {
  const today = new Date();
  const todayISOString = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  // event handlers

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.valueAsDate);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  return (
    <div className="w-full">
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company
          </label>
          <AsyncSearchBar setCompany={setCompany} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Track Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Start Date"
            max={todayISOString}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Investment Amount in USD
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="number"
            placeholder="$"
            onChange={handleAmountChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Notes
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notes"
            placeholder="Notes"
            maxLength={100}
            onChange={handleNotesChange}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateRecordForm;
