import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', {
            username,
            password
        })
        .then(response => {
            setMessage('Login successful!');
            const { access, refresh } = response.data;
            // Stocker les tokens pour une utilisation future
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
        })
        .catch(error => {
            setMessage('Login failed. Please try again.');
            console.error(error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default LoginForm;
