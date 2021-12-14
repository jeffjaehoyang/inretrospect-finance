import styled from 'styled-components';
import tw from 'twin.macro';

interface StyledProps {
  multiplier?: number;
}

export const ShareRecordWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full max-w-screen-md pt-5 mx-auto text-gray-700`};
  min-height: calc(100vh - 200px);
`;

export const HeaderText = styled.div`
  ${tw`font-bold sm:text-2xl`}
  width: max-content;
  background: linear-gradient(120deg, #fff9c4 0%, #fff9c4 100%);
  background-repeat: no-repeat;
  background-size: 100% 30%;
  background-position: 0 80%;
`;

export const InvestmentRecord = styled.div`
  ${tw`flex flex-col items-center justify-center w-full p-3 mt-4 rounded-md bg-gray-50`}
  max-height: 30vh;
`;

export const ResultsWrapper = styled.div<StyledProps>`
  ${tw`flex flex-row items-center justify-between text-xl`}
  width: max-content;
  background: linear-gradient(
    120deg,
    ${(props) =>
        props.multiplier && props.multiplier < 1 ? "#ffcac9" : "#cbf9ce"}
      0%,
    ${(props) =>
        props.multiplier && props.multiplier < 1 ? "#ffcac9" : "#cbf9ce"}
      100%
  );
  background-repeat: no-repeat;
  background-size: 100% 30%;
  background-position: 0 80%;
`;

export const ResultsPill = styled.div`
  ${tw`text-2xl font-bold sm:text-3xl`}
`;

export const PercentageGain = styled.div<StyledProps>`
  ${tw`flex flex-row items-center float-right p-1 ml-3 text-sm font-bold rounded-md`}
  ${({ multiplier }) =>
    multiplier && multiplier < 1 ? tw`bg-red-200` : tw`bg-green-200`}
`;

export const MultiplierText = styled.span<StyledProps>`
  ${tw`mr-1 font-bold sm:text-xl`}
  ${({ multiplier }) =>
    multiplier && multiplier < 1 ? tw`text-red-800` : tw`text-green-800`};
`;

export const NotesWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center p-1 pl-2 pr-2 mt-3 text-sm text-center rounded-md bg-yellow-50 sm:text-base`}
`;

export const EmptyWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full mt-2`}
  min-height: 50vh;
`;

export const EmptyContent = styled.div`
  ${tw`flex flex-col items-center justify-center`}
`;
