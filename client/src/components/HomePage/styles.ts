import styled from 'styled-components';
import tw from 'twin.macro';

export const HomePageWrapper = styled.div`
  ${tw`flex flex-col items-center w-full mt-4 mb-4`};
  min-height: 90vh;
`;

export const HomePageHeroWrapper = styled.div`
  ${tw`flex items-center justify-center w-full p-3 mb-4 text-xl text-center text-white rounded-2xl bg-gradient-to-r from-gray-700 via-gray-900 to-black`};
  min-height: 300px;
`;

export const HomePageTextWrapper = styled.div`
  ${tw`flex flex-col items-center justify-between pt-14 pb-14`}
  min-height: 50vh;
`;

export const HomePageText = styled.div`
  ${tw`flex mt-4 mb-4 text-lg font-bold md:text-4xl`}
  background: linear-gradient(120deg, #e1ea88 0%, #e1ea88 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 80%;
`;
