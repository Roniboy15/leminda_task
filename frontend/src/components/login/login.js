import React, { useContext, useState } from 'react';
import { API_URL, doApiGet, doApiPost } from '../../services/apiServices';
import { saveToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { setLoggedIn } = useContext(AuthContext);

    const retrieveUser = async (_id) => {
        try {
            const user = await doApiGet(API_URL + `/users/${_id}`);
            localStorage.setItem('user', JSON.stringify(user))
        } catch (err) {
            console.error('Error fetching user information:', err);
        }
    }

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await doApiPost(API_URL + '/users/login', { email, password });
            setLoggedIn(true)
            saveToken(response.data.token)
            retrieveUser(response.data.id)
            setTimeout(() => {
                navigate('/home')

            }, 300)
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error logging in');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className='row justify-content-center'>
                <div className='col-11 col-md-6'>
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
