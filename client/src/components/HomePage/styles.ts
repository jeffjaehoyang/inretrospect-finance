import styled from 'styled-components';
import tw from 'twin.macro';

export const HomePageWrapper = styled.div`
  ${tw`flex flex-col items-center w-full mt-4 mb-4`};
`;

export const HomePageHeroWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full p-3 mb-4 text-center text-white sm:text-xl rounded-2xl bg-gradient-to-r from-indigo-900 to-gray-900`};
  min-height: 25vh;
`;

export const HomePageTextWrapper = styled.div`
  ${tw`flex flex-col items-center justify-between pt-20 pb-20`}
  @media (min-width: 768px) {
    height: 48vh;
  }
`;

export const HomePageText = styled.div`
  ${tw`flex mt-4 mb-4 text-lg font-bold md:text-4xl`}
  background: linear-gradient(120deg, #e1ea88 0%, #e1ea88 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 80%;
`;
