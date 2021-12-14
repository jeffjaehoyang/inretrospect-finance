import React from 'react';
import { GrMoney } from 'react-icons/gr';
import { MdCheckCircleOutline, MdDoNotDisturbAlt } from 'react-icons/md';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

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
    <Styled.BannerWrapper>
      <span className="text-lg">
        {user ? `Hi, ${user.displayName?.split(" ")[0]} 👋` : null}
      </span>
      <Styled.BalanceWrapper>
        <span className="flex items-center font-bold">
          <GrMoney className="mr-2" /> Invested?
        </span>
        <div className="flex flex-col ml-4">
          <div className="flex items-center font-bold">
            <MdCheckCircleOutline className="mr-2 text-lg" />
            Yes → &nbsp;
            {investedBalance >= 0 ? (
              <VscTriangleUp className="text-green-800" />
            ) : (
              <VscTriangleDown className="text-red-800" />
            )}
            $
            {Math.abs(investedBalance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="flex items-center font-bold">
            <MdDoNotDisturbAlt className="mr-2 text-lg" />
            No → &nbsp;
            {notInvestedBalance >= 0 ? (
              <VscTriangleUp className="text-green-800" />
            ) : (
              <VscTriangleDown className="text-red-800" />
            )}
            $
            {Math.abs(notInvestedBalance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </Styled.BalanceWrapper>
    </Styled.BannerWrapper>
  );
};

export default Banner;
