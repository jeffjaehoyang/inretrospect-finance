import React from 'react';

import * as Styled from './styles';

interface Props {
  children: JSX.Element;
}

const Container: React.FC<Props> = ({ children }: Props) => (
  <Styled.FullHeightContainer>{children}</Styled.FullHeightContainer>
);

export default Container;
