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

    useEffect(() => {
        let timer;
        if (loggedIn) {
            // Set a timeout for 1 hour
            timer = setTimeout(() => {
                // Remove 'user' from localStorage after 1 hour
                localStorage.removeItem('user');
                setLoggedIn(false); // Update loggedIn state
            }, 3600000); // 3600000 milliseconds = 1 hour
        }

        return () => {
            // Clear the timeout if the component unmounts or the user logs out
            if (timer) clearTimeout(timer);
        };
    }, [loggedIn]);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
