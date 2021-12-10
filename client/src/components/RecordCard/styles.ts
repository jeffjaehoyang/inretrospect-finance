import styled from 'styled-components';
import tw from 'twin.macro';

export const CardWrapper = styled.div`
  ${tw`transition duration-300 ease-in-out flex flex-col max-w-xs bg-white border-2 border-gray-100 p-3 rounded-3xl shadow-sm hover:shadow-lg cursor-pointer`};
  width: 100%;
  min-height: 130px;
`;

export const HeaderWrapper = styled.div`
  ${tw`flex flex-row justify-between items-center mb-2`}
  height: 40%;
`;

export const TickerWrapper = styled.div`
  ${tw`rounded-lg p-1 bg-green-100 font-bold`}
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
  ${tw`bg-red-600 text-2xl text-white rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 ease-in-out`}
`;
