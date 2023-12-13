import React, { createContext, useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
// import { API_URL, doApiGet } from '../services/apiServices';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    // const [user, setUser] = useState();
    

    // const retrieveUser = async () => {
    //     try {
    //         const id = localStorage.getItem('userId')
    //         const user = await doApiGet(API_URL + `/users/${id}`);
    //         setUser(user);
    //     } catch (err) {
    //         console.error('Error fetching user information:', err);
    //     }
    // }

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
