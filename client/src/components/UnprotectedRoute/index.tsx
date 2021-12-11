import React from 'react';
import { Navigate, useLocation } from 'react-router';

import { useFirebaseAuth } from '../../auth/FirebaseAuthContext';

interface Props {
  children: JSX.Element;
}

const UnprotectedRoute: React.FC<Props> = ({ children }: Props) => {
  const user = useFirebaseAuth();
  const location = useLocation();

  return user == null ? (
    children
  ) : (
    <Navigate to="/dashboard" replace state={{ path: location.pathname }} />
  );
};

export default UnprotectedRoute;
