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

export const AddRecordButtonWrapper = styled.button`
  ${tw`text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700`}
`;

export const ModalWrapper = styled.main`
  ${tw`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`};
`;

export const WidthLimiter = styled.div`
  ${tw`relative w-auto my-6 mx-auto max-w-sm`}
`;

export const ContentWrapper = styled.div`
  ${tw`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
`;

export const HeaderWrapper = styled.div`
  ${tw`flex flex-row justify-center p-5 border-b border-solid rounded-t`}
`;

export const XButtonWrapper = styled.button`
  ${tw`p-1 ml-auto bg-transparent border-0 text-2xl text-gray-700 float-right leading-none font-semibold outline-none focus:outline-none`}
`;

export const XButton = styled.span`
  ${tw`text-gray-700 h-6 w-6 block outline-none focus:outline-none`}
`;

export const FormWrapper = styled.div`
  ${tw`relative p-6 max-w-xs`}
  min-width: 20rem;
`;

export const FooterWrapper = styled.div`
  ${tw`flex items-center justify-end pl-6 pr-6 pt-3 pb-3 border-t border-solid rounded-b`}
`;

export const CloseButtonWrapper = styled.button`
  ${tw`text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
`;

export const SaveButtonWrapper = styled.button`
  ${tw`bg-gray-700 text-white active:bg-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
`;
