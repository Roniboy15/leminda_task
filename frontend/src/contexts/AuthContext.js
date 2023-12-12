import React, { createContext, useState, useEffect } from 'react';
import { isAuthenticated, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(isAuthenticated());

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
