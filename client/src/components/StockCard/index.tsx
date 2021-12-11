import React from 'react';
import Chart from 'react-apexcharts';

import * as Styled from './styles';

interface Props {
  startDate: string | undefined;
  symbol: string | undefined;
  data: Array<number> | null | undefined;
  dates: Array<string> | null | undefined;
}

const StockCard = ({ startDate, symbol, data, dates }: Props) => {
  const options = {
    xaxis: {
      categories: dates,
      labels: {
        show: false,
      },
      minHeight: 0,
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: true,
      showAlways: true,
      labels: {
        show: true,
        style: {
          colors: ["white"],
        },
        formatter: (value: number) => {
          return `$${value.toFixed(2)}`;
        },
      },
    },
    stroke: {
      curve: "smooth" as "smooth",
      width: 3,
    },
    colors: ["#7daf42"],
    grid: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 0,
    },
    title: {
      text: `${symbol} stocks bought on ${startDate}`,
      align: "center" as "center",
      style: {
        color: "white",
      },
    },
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  const series = [
    {
      name: "Stock Price",
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
