import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { FirebaseAuthProvider } from '../../auth/FirebaseAuthContext';
import Container from '../Container';
import Dashboard from '../Dashboard';
import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import ProtectedRoute from '../ProtectedRoute';
import ShareRecord from '../ShareRecord';
import UnprotectedRoute from '../UnprotectedRoute';
import Wrapper from '../Wrapper';

const App: React.FC = () => {
  return (
    <Router>
      <FirebaseAuthProvider>
        <Container>
          <>
            <Toaster />
            <Wrapper>
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route
                  path="/"
                  element={
                    <UnprotectedRoute>
                      <HomePage />
                    </UnprotectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/share-record/:recordId"
                  element={<ShareRecord />}
                />
              </Routes>
            </Wrapper>
          </>
        </Container>
      </FirebaseAuthProvider>
    </Router>
  );
};

export default App;
