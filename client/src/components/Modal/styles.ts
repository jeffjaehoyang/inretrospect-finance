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
  ${tw`flex flex-row items-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700`}
`;

export const ModalWrapper = styled.main`
  ${tw`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none`};
`;

export const WidthLimiter = styled.div`
  ${tw`relative w-auto max-w-sm mx-auto my-6`}
`;

export const ContentWrapper = styled.div`
  ${tw`relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none`}
`;

export const HeaderWrapper = styled.div`
  ${tw`flex flex-row justify-center p-5 border-b border-solid rounded-t`}
`;

export const XButtonWrapper = styled.button`
  ${tw`float-right p-1 ml-auto text-2xl font-semibold leading-none text-gray-700 bg-transparent border-0 outline-none focus:outline-none`}
`;

export const XButton = styled.span`
  ${tw`block w-6 h-6 text-gray-700 outline-none focus:outline-none`}
`;

export const FormWrapper = styled.div`
  ${tw`relative max-w-xs p-6`}
  min-width: 20rem;
`;

export const FooterWrapper = styled.div`
  ${tw`flex items-center justify-end pt-3 pb-3 pl-6 pr-6 border-t border-solid rounded-b`}
`;

export const CloseButtonWrapper = styled.button`
  ${tw`px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none focus:outline-none`}
`;

export const SaveButtonWrapper = styled.button`
  ${tw`px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-gray-700 rounded shadow outline-none active:bg-gray-800 hover:shadow-lg focus:outline-none`}
`;
