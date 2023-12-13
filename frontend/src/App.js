import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/protectedRoutes';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import { isAuthenticated } from './utils/auth';
import Signup from './components/signup/signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';



function App() {
  const userLoggedIn = isAuthenticated();

  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Footer />
            </ProtectedRoute>}
          />
          <Route path="/questions" element={
            <ProtectedRoute>
              <Footer />
            </ProtectedRoute>}
          />
          <Route path="/feedback" element={
            <ProtectedRoute>
              <Footer />
            </ProtectedRoute>}
          />
          <Route path="*"
            element={<Navigate to={userLoggedIn ? "/" : "/login"} replace />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
