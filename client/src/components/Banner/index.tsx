import React from 'react';
import { GiMoneyStack } from 'react-icons/gi';

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
        <GiMoneyStack className="mr-3 text-4xl" />
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
