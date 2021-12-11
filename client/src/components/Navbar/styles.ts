import styled from 'styled-components';
import tw from 'twin.macro';

export const NavbarWrapper = styled.div`
  ${tw`flex flex-row items-center justify-between w-full pt-8 pb-3`};
`;

export const Logo = styled.div`
  ${tw`text-base font-bold text-gray-700 uppercase cursor-default`};
`;

export const AuthBtn = styled.button`
  ${tw`pt-1 pb-1 pl-3 pr-3 border border-gray-700 rounded-2xl`}
`;
