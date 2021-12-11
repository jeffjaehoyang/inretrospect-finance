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
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Company
          </label>
          <AsyncSearchBar setCompany={setCompany} />
          <span className="text-xs font-bold text-blue-800">
            Search by company ticker symbol
          </span>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Track Start Date
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Start Date"
            max={todayISOString}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Investment Amount (USD)
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            type="number"
            placeholder="$"
            onChange={handleAmountChange}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Notes
          </label>
          <textarea
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="notes"
            placeholder="Notes"
            maxLength={50}
            onChange={handleNotesChange}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateRecordForm;
