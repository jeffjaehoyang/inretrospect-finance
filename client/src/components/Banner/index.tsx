import React from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

import { useFirebaseAuth } from '../../auth/FirebaseAuthContext';
import * as Styled from './styles';

interface Props {
  balance: number;
}

const Banner: React.FC<Props> = ({ balance }: Props) => {
  const user = useFirebaseAuth();
  return (
    <Styled.BannerWrapper balance={balance}>
      <span className="text-lg">
        {user ? `Hi, ${user.displayName} 👋` : null}
      </span>
      <Styled.BalanceWrapper>
        {balance >= 0 ? (
          <GiReceiveMoney className="mr-2" />
        ) : (
          <GiPayMoney className="mr-2" />
        )}
        {balance >= 0
          ? `$${balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : `-$${Math.abs(balance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
      </Styled.BalanceWrapper>
    </Styled.BannerWrapper>
  );
};

export default Banner;
