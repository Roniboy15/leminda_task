import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { removeToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const logOut = () => {
        removeToken();
        setLoggedIn(false);
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="position-fixed top-50 end-0  px-0 py-2" style={{ zIndex: 1050 }}>
            <div className="d-flex flex-column  bg-primary bg-opacity-50 text-white rounded-start py-4 p-2">
                {loggedIn ? (
                    <>
                        <a href="/logout" className="btn btn-light mt-2" onClick={() => logOut()}>Logout</a>
                        <a href="/questions" className="btn btn-light mt-3">Questions</a>
                        <a href="/home" className="btn btn-light mt-3 mb-2">Home</a>
                    </>
                ) : (
                    <>
                        <a href="/login" className="btn btn-light mt-2 ">Login</a>
                        <a href="/signup" className="btn btn-light mt-3 ">Signup</a>
                        <a href="/home" className="btn btn-light mt-3 mb-2">Home</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;

