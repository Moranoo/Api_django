import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import useravatar from "../image/avataruser.jpg";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const userIsAuthenticated = isAuthenticated();

    // Cacher la barre de navigation sur les pages de connexion et d'inscription
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 px-3 py-1">
            <ul className="flex gap-6 items-center justify-center content-center">
                <li>
                    <Link to="/recipes" className="text-white">Recettes</Link>
                </li>
                {userIsAuthenticated && (
                    <li>
                        <Link to="/select-ingredients" className="text-white">Sélection d'ingrédients</Link>
                    </li>
                )}
                <li>
                    <Link to="/favorites" className="text-white">Favoris</Link>
                </li>
                <div className="ml-auto flex gap-6 justify-center items-center content-center">
                                    {userIsAuthenticated && (
                    <li>
                        <Link to="/dashboard" className="text-white flex flex-col justify-center items-center content-center"><img
                            src={useravatar}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                            {localStorage.getItem('username')}
                        </Link>
                    </li>
                                    )}
                    {userIsAuthenticated ? (
                        <li>
                            <button onClick={handleLogout} className="text-white">Déconnexion</button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/register" className="text-white">S'inscrire</Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-white">Se connecter</Link>
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
}
