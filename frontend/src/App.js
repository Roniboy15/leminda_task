import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/protectedRoutes';
import Header from './components/header/header';
import Login from './components/login/login';
// import { isAuthenticated } from './utils/auth';
import Signup from './components/signup/signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Questions from './components/questions/questions';
import Home from './components/home/Home';



function App() {
  
  // const userLoggedIn = isAuthenticated();

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <Home />}
          />
          <Route path="/questions" element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>}
          />
         
          {/* <Route path="*" element={<Navigate to={userLoggedIn ? "/home" : "/login"} replace />} /> */}

        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
