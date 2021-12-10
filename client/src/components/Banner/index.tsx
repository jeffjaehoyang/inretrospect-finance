import React from 'react';

import { useFirebaseAuth } from '../../auth/FirebaseAuthContext';
import * as Styled from './styles';

interface Props {
  balance: number;
}

const Banner = ({ balance }: Props) => {
  const user = useFirebaseAuth();
  return (
    <Styled.BannerWrapper>
      <span className="text-lg">
        {user ? `Hi, ${user.displayName} 👋` : null}
      </span>{" "}
      You missed out on $
      {balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </Styled.BannerWrapper>
  );
};

export default Banner;
