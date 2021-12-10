import styled from 'styled-components';
import tw from 'twin.macro';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const ModalWrapper = styled.div`
  ${tw`flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`};
`;

export const WidthLimiter = styled.div`
  ${tw`max-w-screen-md w-full my-6 p-8 mx-auto`}
`;

export const StockCardWrapper = styled.button`
  ${tw`border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none`}
`;
