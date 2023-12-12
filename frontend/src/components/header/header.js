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
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="position-fixed top-50 end-0 translate-middle-y px-0 py-2" style={{ zIndex: 1050 }}>
            <div className="d-flex flex-column  bg-primary text-white rounded-start py-4 p-2">
                {loggedIn ? (
                    <>
                        <a href="/logout" className="btn btn-light mb-2" onClick={() => logOut()}>Logout</a>
                        <a href="/questions" className="btn btn-light mb-2">Questions</a>
                        <a href="/feedback" className="btn btn-light">Feedback</a>
                    </>
                ) : (
                    <>
                        <a href="/login" className="btn btn-light mb-2">Login</a>
                        <a href="/signup" className="btn btn-light">Signup</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;

