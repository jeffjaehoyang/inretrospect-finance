export interface Record {
  timestamp: string
  id: string
  uid: string
  startDate: Date
  symbol: string
  companyName: string
  companyDomain: string
  amount: number
  notes: string
  isInvestmentMade: boolean
  isRecordLocked?: boolean
  marketData?: {
    dates: Array<string>
    data: Array<number>
  }
  gains?: number
}

// export interface TimeSeriesData {
//   [key: string]: StockData
// }

export interface User {
  displayName: string
  email: string
  uid: string
}

export interface StockData {
  date: string
  open: string
  high: string
  low: string
  close: string
  adjClose: string
  volume: string
}

// export interface APIResponseFormat {
//   'Meta Data': {
//     '1. Information': string
//     '2. Symbol': string
//     '3. Last Refreshed': string
//     '4. Output Size': string
//     '5. Time Zone': string
//   }
//   'Time Series (Daily)': {
//     [key: string]: StockData
//   }
// }
