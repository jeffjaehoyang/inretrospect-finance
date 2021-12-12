import React from 'react';

import { AuthBtn } from '../AuthBtn';
import * as Styled from './styles';

const Navbar: React.FC = () => {
  return (
    <Styled.NavbarWrapper>
      <Styled.Logo to="/dashboard">inretrospect.finance</Styled.Logo>
      <AuthBtn />
    </Styled.NavbarWrapper>
  );
};

export default Navbar;
