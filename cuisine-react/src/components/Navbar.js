import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';

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
        <nav className="bg-gray-800 p-4">
            <ul className="flex gap-6 items-center">
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
                <div className="ml-auto flex gap-6">
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
