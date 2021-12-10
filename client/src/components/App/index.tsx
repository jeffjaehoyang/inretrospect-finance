import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { FirebaseAuthProvider } from '../../auth/FirebaseAuthContext';
import Container from '../Container';
import Dashboard from '../Dashboard';
import HomePage from '../HomePage';
import ProtectedRoute from '../ProtectedRoute';
import UnprotectedRoute from '../UnprotectedRoute';
import Wrapper from '../Wrapper';

const App: React.FC = () => {
  return (
    <Router>
      <FirebaseAuthProvider>
        <Container>
          <Wrapper>
            <Routes>
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
            </Routes>
          </Wrapper>
        </Container>
      </FirebaseAuthProvider>
    </Router>
  );
};

export default App;
