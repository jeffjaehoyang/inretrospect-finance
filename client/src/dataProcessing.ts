import { StockData } from './interfaces';

interface TimeSeriesData {
  [key: string]: StockData;
}

export const getStartDateMatchingData = (
  symbol: string,
  companyDomain: string,
  amount: number,
  id: string,
  rawData: TimeSeriesData,
  recordStartDate: string
): {
  symbol: string;
  companyDomain: string;
  amount: number;
  id: string;
  dates: Array<string>;
  data: Array<number>;
} => {
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

const findNextAvailableDate = (
  originalDate: string,
  dates: Array<string>
): number => {
  let index = -1;
  let date = originalDate;
  while (index === -1) {
    index = dates.indexOf(date);
    let startDate = new Date(date);
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
