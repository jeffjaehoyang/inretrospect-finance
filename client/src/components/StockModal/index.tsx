import React, { Dispatch, SetStateAction } from 'react';

import StockCard from '../StockCard';
import * as Styled from './styles';

interface Props {
  startDate: string | undefined;
  symbol: string | undefined;
  data: Array<number> | null | undefined;
  dates: Array<string> | null | undefined;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

// template credit: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/small
const StockModal = ({
  startDate,
  symbol,
  data,
  dates,
  showModal,
  setShowModal,
}: Props) => {
  return (
    <>
      {showModal ? (
        <Styled.Backdrop
          onClick={(e: any) => {
            if (e.target["localName"] === "svg") return;
            setShowModal(false);
          }}
        >
          <Styled.ModalWrapper>
            <Styled.WidthLimiter>
              <Styled.StockCardWrapper>
                <StockCard
                  startDate={startDate}
                  symbol={symbol}
                  data={data}
                  dates={dates}
                />
              </Styled.StockCardWrapper>
            </Styled.WidthLimiter>
          </Styled.ModalWrapper>
        </Styled.Backdrop>
      ) : null}
    </>
  );
};

export default StockModal;
