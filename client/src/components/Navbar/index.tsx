import React from 'react';

import { ReactComponent as LogoImg } from '../../images/logo.svg';
import { AuthBtn } from '../AuthBtn';
import * as Styled from './styles';

const Navbar: React.FC = () => {
  return (
    <Styled.NavbarWrapper>
      <Styled.Logo to="/dashboard">
        <LogoImg className="mr-2" height={30} width={30} /> inretrospect.finance
      </Styled.Logo>
      <AuthBtn />
    </Styled.NavbarWrapper>
  );
};

export default Navbar;
