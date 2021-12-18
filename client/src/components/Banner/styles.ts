import styled from 'styled-components';
import tw from 'twin.macro';

export const BannerWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full p-3 mt-4 mb-2 text-3xl text-center rounded-2xl bg-gradient-to-r`};
  ${tw`from-indigo-50 to-green-50`}
  min-height: 20vh;
`;

export const UserName = styled.span`
  ${tw`text-lg`}
`;

export const FlexCol = styled.div`
  ${tw`flex flex-col ml-4`}
`;

export const FlexRow = styled.div`
  ${tw`flex items-center font-bold`}
`;

export const BalanceWrapper = styled.div`
  ${tw`flex items-center mt-2 text-sm sm:text-lg`}
`;
