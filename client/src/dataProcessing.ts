import { StockData } from './interfaces';

interface TimeSeriesData {
  [key: string]: StockData;
}

export const getStartDateMatchingData = (
  symbol: string,
  companyDomain: string,
  amount: number,
  id: string,
  rawData: TimeSeriesData | null,
  recordStartDate: string
): {
  symbol: string;
  companyDomain: string;
  amount: number;
  id: string;
  dates: Array<string>;
  data: Array<number>;
} => {
  if (rawData == null)
    return {
      symbol: symbol,
      companyDomain: companyDomain,
      amount: amount,
      id: id,
      dates: [],
      data: [],
    };
  const datesArray = Object.keys(rawData).reverse();
  const dataArray = Object.values(rawData)
    .reverse()
    .map((d) => Number(d["5. adjusted close"]));
  let index = datesArray.indexOf(recordStartDate);
  // if there is no stock data for start date that user entered, get the nearest one after it
  if (index === -1) index = findNextAvailableDate(recordStartDate, datesArray);
  return {
    symbol: symbol,
    companyDomain: companyDomain,
    amount: amount,
    id: id,
    dates: datesArray.slice(index),
    data: dataArray.slice(index),
  };
};

export const getWeeksDifference = (dt1: Date, dt2: Date) => {
  const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
  // Convert both dates to milliseconds
  const date1_ms = dt1.getTime();
  const date2_ms = dt2.getTime();
  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to weeks and return hole weeks
  return Math.floor(difference_ms / ONE_WEEK);
};

export const getDaysDifference = (dt1: Date, dt2: Date) => {
  // Convert both dates to milliseconds
  const date1_ms = dt1.getTime();
  const date2_ms = dt2.getTime();
  // To calculate the no. of days between two dates
  const diff_ms = Math.abs(date1_ms - date2_ms);
  const diffDays = diff_ms / (1000 * 3600 * 24);
  return Math.round(diffDays);
};

const findNextAvailableDate = (
  originalDate: string,
  dates: Array<string>
): number => {
  let index = -1;
  let date = originalDate;
  const todayDateString = new Date().toISOString().split("T")[0];
  while (index === -1) {
    if (todayDateString === originalDate || originalDate > todayDateString) {
      return dates.length - 1;
    }
    let startDate = new Date(date);
    index = dates.indexOf(date);
    startDate.setDate(startDate.getDate() + 1);
    const newStartDateString = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    date = newStartDateString;
  }
  return index;
};
