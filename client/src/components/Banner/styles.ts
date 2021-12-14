import styled from 'styled-components';
import tw from 'twin.macro';

export const BannerWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full p-3 mt-4 mb-2 text-3xl text-center rounded-2xl bg-gradient-to-r`};
  ${tw`from-pink-50 to-green-100`}
  min-height: 200px;
`;

export const BalanceWrapper = styled.div`
  ${tw`flex items-center mt-2 text-sm sm:text-lg`}
`;
