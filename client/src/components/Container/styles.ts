import styled from 'styled-components';
import tw from 'twin.macro';

export const FullHeightContainer = styled.div`
  ${tw`flex flex-col justify-center items-center mx-auto max-w-screen-md w-full text-gray-700 pl-5 pr-5`};
  min-height: 100vh;
`;
