import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  ${tw`flex flex-wrap w-full p-5 mx-auto`};
`;

export const Footer = styled.footer`
  ${tw`py-4 bg-transparent`};
`;

export const Links = styled.div`
  ${tw`flex items-center justify-center w-full`};

  a {
    ${tw`mx-2 text-white hover:text-indigo-600`};
  }
`;

export const Link = styled.a`
  ${tw`mx-2 text-white hover:text-indigo-600`};
`;

export const Logo = styled.div`
  ${tw`flex justify-center w-full text-sm font-bold`}
`;

export const Copyright = styled.div`
  ${tw`flex justify-center w-full py-1 text-sm`}
`;
