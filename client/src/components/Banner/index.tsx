import React from 'react';
import { GrMoney } from 'react-icons/gr';
import { MdCheckCircleOutline, MdDoNotDisturbAlt } from 'react-icons/md';
import { RiHandCoinLine } from 'react-icons/ri';
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
  const greenTriangleStyle = "mr-1 text-green-700";
  const redTriangleStyle = "mr-1 text-red-700";
  return (
    <Styled.BannerWrapper>
      <Styled.UserName>
        {user ? `Hi, ${user.displayName?.split(" ")[0]} 👋` : "User"}
      </Styled.UserName>
      <Styled.BalanceWrapper>
        <span className="flex items-center">
          <RiHandCoinLine className="mr-2" /> Invested?
        </span>
        <Styled.FlexCol>
          <Styled.FlexRow>
            <MdCheckCircleOutline className="mr-2 text-lg" />
            Yes → &nbsp;
            {investedBalance >= 0 ? (
              <VscTriangleUp className={greenTriangleStyle} />
            ) : (
              <VscTriangleDown className={redTriangleStyle} />
            )}
            $
            {Math.abs(investedBalance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Styled.FlexRow>
          <Styled.FlexRow>
            <MdDoNotDisturbAlt className="mr-2 text-lg" />
            No → &nbsp;
            {notInvestedBalance >= 0 ? (
              <VscTriangleUp className={greenTriangleStyle} />
            ) : (
              <VscTriangleDown className={redTriangleStyle} />
            )}
            $
            {Math.abs(notInvestedBalance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Styled.FlexRow>
        </Styled.FlexCol>
      </Styled.BalanceWrapper>
    </Styled.BannerWrapper>
  );
};

export default Banner;
