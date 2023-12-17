import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { removeToken } from '../../utils/auth';

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
        <div className="position-fixed top-50 end-0 px-0 py-2" style={{ zIndex: 1050 }}>
            <div className="d-flex flex-column bg-primary bg-opacity-50 text-white rounded-start-4 py-4 ">
                {loggedIn ? (
                    <>
                        <button className="btn btn-light rounded-0 rounded-start-4 mt-2 ms-3" onClick={logOut}>Logout</button>
                        <Link to="/questions" className="btn btn-light rounded-0 rounded-start-4 mt-3 ms-3">Questions</Link>
                        <Link to="/" className="btn btn-light rounded-0 rounded-start-4 mt-3 mb-2 ms-3">Home</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-light rounded-0 rounded-start-4 ms-3 mt-3 ">Login</Link>
                        <Link to="/signup" className="btn btn-light rounded-0 rounded-start-4 ms-3 mt-3 ">Signup</Link>
                        <Link to="/" className="btn btn-light rounded-0 rounded-start-4 ms-3 mt-3 mb-2">Home</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
