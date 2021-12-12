import styled from 'styled-components';
import tw from 'twin.macro';

interface StyledProps {
  isRecordLocked?: boolean;
  multiplier?: number;
}

export const CardWrapper = styled.div<StyledProps>`
  ${tw`relative flex flex-col p-3 transition duration-300 ease-in-out bg-white border-2 border-gray-100 shadow-sm sm:max-w-xs rounded-3xl hover:shadow-lg`};
  ${({ isRecordLocked }) =>
    !isRecordLocked ? tw`cursor-pointer` : tw`cursor-not-allowed`};
  width: 100%;
  min-height: 130px;
`;

export const HeaderWrapper = styled.div`
  ${tw`flex flex-row items-center justify-between mb-2`}
  height: 40%;
`;

export const CompanyInfo = styled.div`
  ${tw`flex flex-row items-center`}
`;

export const PercentageGain = styled.div<StyledProps>`
  ${tw`flex flex-row items-center float-right pt-1 pb-1 pl-2 pr-2 text-sm font-bold rounded-full`}
  ${({ isRecordLocked, multiplier }) =>
    !isRecordLocked
      ? multiplier && multiplier < 1
        ? tw`bg-red-200`
        : tw`bg-green-200`
      : tw`bg-gray-200`}
`;

export const MultiplierText = styled.span<StyledProps>`
  ${tw`mr-1 font-bold`}
  ${({ multiplier }) =>
    multiplier && multiplier < 1 ? tw`text-red-800` : tw`text-green-800`};
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

export const ResultsPill = styled.div`
  ${tw`text-sm font-bold rounded-full`}
`;

export const TimeWrapper = styled.div`
  ${tw`flex flex-row items-center justify-between mt-2 mb-2 text-sm font-semibold`}
`;

export const StartDate = styled.div`
  ${tw`flex flex-row items-center pl-1 pr-1 bg-blue-100 bg-opacity-50 rounded-full`}
`;

export const TimeToUnlock = styled.div`
  ${tw`flex flex-row items-center pl-1 pr-1 bg-gray-100 rounded-full`}
`;

export const NotesWrapper = styled.div`
  ${tw`flex flex-row items-center p-1 text-sm rounded-full bg-yellow-50`}
`;

export const DeleteButton = styled.button`
  ${tw`text-2xl text-white transition duration-300 ease-in-out bg-red-600 rounded-full sm:opacity-0 sm:group-hover:opacity-100`}
`;

export const LastRow = styled.div`
  ${tw`flex flex-row items-center justify-between`}
`;
