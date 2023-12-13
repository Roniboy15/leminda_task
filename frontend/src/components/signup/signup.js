import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL, doApiPost } from '../../services/apiServices';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await doApiPost(API_URL + '/users/signup', { username, email, password });
            navigate("/login");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error creating user');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className='row justify-content-center'>
                <div className='col-11 col-md-6 '>
                    <form onSubmit={handleSignup}>
                        <h2>Signup</h2>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
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
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
