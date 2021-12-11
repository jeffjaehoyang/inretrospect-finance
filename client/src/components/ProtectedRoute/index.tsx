import React from 'react';
import { Navigate, useLocation } from 'react-router';

import { useFirebaseAuth } from '../../auth/FirebaseAuthContext';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {
  const user = useFirebaseAuth();
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
