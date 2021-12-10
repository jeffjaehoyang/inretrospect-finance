import styled from 'styled-components';
import tw from 'twin.macro';

export const HomePageWrapper = styled.div`
  ${tw`flex flex-col w-full mt-4 mb-4 justify-center items-center`}
`;

export const HomePageHeroWrapper = styled.div`
  ${tw`flex justify-center items-center w-full mb-4 rounded-2xl bg-gradient-to-r from-gray-700 via-gray-900 to-black text-xl p-3 text-center text-white`};
  min-height: 300px;
`;

export const HomePageTextWrapper = styled.div`
  ${tw`flex flex-col justify-between items-center pt-14 pb-14`}
  min-height: 50vh;
`;

export const HomePageText = styled.div`
  ${tw`flex mt-4 mb-4 text-lg md:text-4xl font-bold`}
  background: linear-gradient(120deg, #e1ea88 0%, #e1ea88 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 80%;
`;
