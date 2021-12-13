import React from 'react';
import { GiMoneyStack } from 'react-icons/gi';
import { MdOutlineCheckBox } from 'react-icons/md';

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
        {user ? `Hi, ${user.displayName} 👋` : null}
      </span>
      <Styled.BalanceWrapper>
        <div className="flex items-center font-bold">
          <MdOutlineCheckBox className="mr-2 text-lg" />
          Real Balance: &nbsp;
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
          <MdOutlineCheckBox className="mr-2 text-lg" />
          What-If Balance: &nbsp;
          {notInvestedBalance + investedBalance >= 0
            ? `$${(notInvestedBalance + investedBalance).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`
            : `-$${Math.abs(
                investedBalance + notInvestedBalance
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
        </div>
      </Styled.BalanceWrapper>
    </Styled.BannerWrapper>
  );
};

export default Banner;
