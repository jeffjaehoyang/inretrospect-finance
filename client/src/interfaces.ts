export interface Record {
  timestamp: string;
  id: string;
  uid: string;
  startDate: Date;
  symbol: string;
  companyName: string;
  companyDomain: string;
  amount: number;
  notes: string;
  isInvestmentMade: boolean;
  isRecordLocked?: boolean;
  marketData?: {
    dates: Array<string>;
    data: Array<number>;
  };
}

export interface TimeSeriesData {
  [key: string]: StockData;
}

export interface User {
  displayName: string;
  email: string;
  uid: string;
}

export interface StockData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. adjusted close": string;
  "6. volume": string;
  "7. dividend amount": string;
  "8. split coefficient": string;
}

export interface APIResponseFormat {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": {
    [key: string]: StockData;
  };
}
