import styled from 'styled-components';
import tw from 'twin.macro';

export const DashboardWrapper = styled.div`
  ${tw`flex flex-col items-center w-full pb-5`};
  min-height: 90vh;
`;

export const ContentWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full mt-2 sm:flex-row sm:flex-wrap sm:justify-between sm:items-stretch`};
  gap: 15px 30px;
`;

export const EmptyWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-full mt-2`}
  min-height: 40vh;
`;

export const EmptyContent = styled.div`
  ${tw`flex flex-col items-center justify-center`}
`;

export const AddRecordBtn = styled.button`
  ${tw`text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700`}
`;
