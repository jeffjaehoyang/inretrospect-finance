import styled from 'styled-components';
import tw from 'twin.macro';

interface StyledProps {
  shouldShowData: boolean;
}

export const CardWrapper = styled.div<StyledProps>`
  ${tw`relative flex flex-col max-w-xs p-3 transition duration-300 ease-in-out bg-white border-2 border-gray-100 shadow-sm rounded-3xl hover:shadow-lg`};
  ${({ shouldShowData }) =>
    shouldShowData ? tw`cursor-pointer` : tw`cursor-not-allowed`};
  width: 100%;
  min-height: 130px;
`;

export const HeaderWrapper = styled.div`
  ${tw`flex flex-row items-center justify-between mb-2`}
  height: 40%;
`;

export const TickerWrapper = styled.div`
  ${tw`p-1 font-bold bg-green-100 rounded-lg`}
  background: linear-gradient(120deg, #fff9c4 0%, #fff9c4 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 80%;
`;

export const ResultsWrapper = styled.div`
  ${tw`flex flex-row items-center`}
  width: max-content;
  background: linear-gradient(120deg, #cbf9ce 0%, #cbf9ce 100%);
  background-repeat: no-repeat;
  background-size: 100% 30%;
  background-position: 0 80%;
`;

export const DeleteButton = styled.button`
  ${tw`text-2xl text-white transition duration-300 ease-in-out bg-red-600 rounded-full sm:opacity-0 sm:group-hover:opacity-100`}
`;
