import styled from "styled-components";
import tw from "twin.macro";

export const NavbarWrapper = styled.div`
  ${tw`flex flex-row w-full items-center justify-between pt-8 pb-3`};
`;

export const Logo = styled.div`
  ${tw`text-base font-bold uppercase text-gray-700`};
`;

export const AuthBtn = styled.button`
  ${tw`rounded-2xl border border-gray-700 pl-3 pr-3 pb-1 pt-1`}
`;
