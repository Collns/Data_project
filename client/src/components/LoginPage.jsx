import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Validate inputs
        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3002/auth/login', {
                email,
                password,
            });
            
            // Save token to state and localStorage
            const token = response.data.token;
            setToken(token);
            localStorage.setItem('token', token);

            alert('Login successful');
            navigate('/book'); // Redirect to Book page after login
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
