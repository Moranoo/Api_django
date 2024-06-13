import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', {
            username,
            password
        })
        .then(response => {
            setMessage('Login successful!');
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            navigate('/recipes');
        })
        .catch(error => {
            setMessage('Login failed. Please try again.');
            console.error(error);
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Se connecter</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">Nom d'utilisateur :</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Se connecter
                </button>
                {message && <p className="mt-4 text-red-500">{message}</p>}
                <p className="mt-4 text-center">
                    Pas encore de compte ? <Link to="/register" className="text-blue-500">S'inscrire</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
