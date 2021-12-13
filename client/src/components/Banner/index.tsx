import React from 'react';
import { GrMoney } from 'react-icons/gr';
import { MdCheckCircleOutline, MdDoNotDisturbAlt } from 'react-icons/md';

import { useFirebaseAuth } from '../../auth/FirebaseAuthContext';
import * as Styled from './styles';

interface Props {
  investedBalance: number;
  notInvestedBalance: number;
}

const Banner: React.FC<Props> = ({
  investedBalance,
  notInvestedBalance,
}: Props) => {
  const user = useFirebaseAuth();
  return (
    <Styled.BannerWrapper balance={investedBalance + notInvestedBalance}>
      <span className="text-lg">
        {user ? `Hi, ${user.displayName?.split(" ")[0]} 👋` : null}
      </span>
      <Styled.BalanceWrapper>
        <span className="flex items-center font-bold">
          <GrMoney className="mr-2" /> Invested?
        </span>
        <div className="flex flex-col ml-4">
          <div className="flex items-center font-bold">
            <MdCheckCircleOutline className="mr-2 text-lg text-green-800" />
            Yes: &nbsp;
            {investedBalance >= 0
              ? `$${investedBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : `-$${Math.abs(investedBalance).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </div>
          <div className="flex items-center font-bold">
            <MdDoNotDisturbAlt className="mr-2 text-lg text-red-800" />
            No: &nbsp;
            {notInvestedBalance >= 0
              ? `$${notInvestedBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : `-$${Math.abs(investedBalance).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </div>
        </div>
      </Styled.BalanceWrapper>
    </Styled.BannerWrapper>
  );
};

export default Banner;
