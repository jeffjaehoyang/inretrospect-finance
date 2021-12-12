import React from 'react';

import { ReactComponent as PageNotFoundImage } from '../../images/page_not_found.svg';
import * as Styled from './styles';

const NotFoundPage: React.FC = () => {
  return (
    <Styled.NotFoundWrapper>
      <PageNotFoundImage width={250} height={250} />
      <div className="mt-6 text-2xl font-bold">404 Page Not Found</div>
    </Styled.NotFoundWrapper>
  );
};

export default NotFoundPage;
