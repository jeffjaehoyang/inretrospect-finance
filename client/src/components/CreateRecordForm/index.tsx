import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';

import AsyncSearchBar from '../AsyncSearchBar';

interface Props {
  startDate: Date | null;
  setCompany: Dispatch<SetStateAction<{ label: string; value: string } | null>>;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setAmount: Dispatch<SetStateAction<number | null>>;
  setIsInvestmentMade: Dispatch<SetStateAction<boolean | null>>;
  setNotes: Dispatch<SetStateAction<string>>;
  errors: {
    company: boolean;
    startDate: boolean;
    amount: boolean;
    isInvestmentMade: boolean;
  };
}

const CreateRecordForm: React.FC<Props> = ({
  startDate,
  setCompany,
  setStartDate,
  setAmount,
  setIsInvestmentMade,
  setNotes,
  errors,
}: Props) => {
  // event handlers
  const handleStartDateChange = (newDate: Date) => {
    setStartDate(newDate);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleInvestmentMadeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInvestmentMade(e.target.value === "Yes" ? true : false);
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div className="w-full">
      <form>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Company
            <span className="ml-2 text-xs font-normal text-red-700">
              {errors.company && "*required"}
            </span>
          </label>
          <AsyncSearchBar setCompany={setCompany} />
          <span className="text-xs font-bold text-blue-800">
            Search by company ticker symbol
          </span>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Track Start Date
            <span className="ml-2 text-xs font-normal text-red-700">
              {errors.startDate && "*required"}
            </span>
          </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            filterDate={isWeekday}
            maxDate={new Date()}
            placeholderText="Select date"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            fixedHeight
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Did you invest?
            <span className="ml-2 text-xs font-normal text-red-700">
              {errors.isInvestmentMade && "*required"}
            </span>
          </label>
          <input
            type="radio"
            value="Yes"
            name="investment_made"
            onChange={handleInvestmentMadeChange}
          />{" "}
          Yes
          <input
            className="ml-4"
            type="radio"
            value="No"
            name="investment_made"
            onChange={handleInvestmentMadeChange}
          />{" "}
          No
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Investment Amount (USD)
            <span className="ml-2 text-xs font-normal text-red-700">
              {errors.amount && "*required"}
            </span>
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
