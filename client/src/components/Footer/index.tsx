import React from 'react';

import * as Styled from './styles';

const Footer: React.FC = () => (
  <Styled.Footer>
    <Styled.Container>
      <Styled.Logo>inretrospect.finance</Styled.Logo>
      <Styled.Copyright>
        © {new Date().getFullYear()} by Jeff Yang
      </Styled.Copyright>
    </Styled.Container>
  </Styled.Footer>
)

export default Footer
