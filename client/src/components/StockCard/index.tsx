import React from 'react';
import Chart from 'react-apexcharts';

import { getChartOptionsConfig } from '../../dataProcessing';
import * as Styled from './styles';

interface Props {
  startDate: string | undefined;
  symbol: string | undefined;
  data: Array<number> | null | undefined;
  dates: Array<string> | null | undefined;
}

const StockCard: React.FC<Props> = ({
  startDate,
  symbol,
  data,
  dates,
}: Props) => {
  const options = getChartOptionsConfig(startDate, symbol, data, dates);
  const series = [
    {
      name: "Price per share",
      data: data,
    },
  ];
  return (
    <Styled.StockCardWrapper>
      {startDate && symbol && data && dates ? (
        <Chart
          type={"area"}
          options={options}
          series={series}
          width="100%"
          height="250"
        />
      ) : null}
    </Styled.StockCardWrapper>
  );
};

export default StockCard;
