import styled from 'styled-components';
import tw from 'twin.macro';

interface StyledProps {
  balance: number;
}

export const BannerWrapper = styled.div<StyledProps>`
  ${tw`flex flex-col items-center justify-center w-full p-3 mt-4 mb-2 text-3xl text-center rounded-2xl bg-gradient-to-r`};
  ${({ balance }) =>
    balance >= 0
      ? tw`from-green-100 to-green-200`
      : tw`from-red-100 to-red-200`}
  min-height: 200px;
`;

export const BalanceWrapper = styled.div`
  ${tw`flex items-center mt-2 text-sm sm:text-lg`}
`;
