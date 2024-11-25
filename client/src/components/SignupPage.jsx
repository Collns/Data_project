import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const navigate = useNavigate(); // Hook for navigation

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:3002/auth/signup', {
                name,
                age: age ? parseInt(age) : null, // Convert to integer or set to null if empty
                email,
                phoneNo,
                password,
                role,
            });
            alert('Signup successful! Redirecting to Book page...');
            navigate('/book'); // Redirect to Book page after successful signup
        } catch (error) {
            alert('Signup failed: ' + (error.response?.data?.error || 'Unknown error'));
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignup();
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
