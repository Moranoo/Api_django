import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useravatar from "./../image/avataruser.jpg";

const API_BASE_URL = 'http://localhost:8000';



export default function Dashboard() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
    });
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/user/profile/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setUserData({
                username: response.data.username,
                email: response.data.email,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUpdateUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_BASE_URL}/api/update-profile/`, { username: newUsername }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            alert('Nom d\'utilisateur mis à jour avec succès !');
            setUserData({ ...userData, username: newUsername });
            setNewUsername('');
        } catch (error) {
            setError('Erreur lors de la mise à jour du nom d\'utilisateur.');
            console.error('Error updating username:', error);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_BASE_URL}/api/update-profile/`, { password: newPassword }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            alert('Mot de passe mis à jour avec succès !');
            setNewPassword('');
        } catch (error) {
            setError('Erreur lors de la mise à jour du mot de passe.');
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-center text-4xl font-bold mt-14 mb-8">Dashboard</h1>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Détails de l'utilisateur</h2>
                <div className="flex items-center justify-center mb-6">
                    <img
                        src={useravatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mr-6"
                    />
                    <div>
                        <p className="text-lg"><strong>Nom d'utilisateur:</strong> {userData.username}</p>
                        <p className="text-lg"><strong>Email:</strong> {userData.email}</p>
                    </div>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Changer le nom d'utilisateur</h3>
                    <form onSubmit={handleUpdateUsername} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                id="newUsername"
                                name="newUsername"
                                placeholder="Entrez votre nouveau nom d'utilisateur"

                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Sauvegarder</button>
                    </form>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Changer le mot de passe</h3>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="Entrez votre Nouveau mot de passe"

                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Sauvegarder</button>
                    </form>
                </div>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}


