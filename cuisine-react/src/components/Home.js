import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-container">
            <h2>Bienvenue !</h2>
            <p>Veuillez vous connecter ou vous inscrire pour accéder aux recettes et aux ingrédients.</p>
            <div className="links">
                <Link to="/login" className="text-blue-500">Se connecter</Link>
                <span> ou </span>
                <Link to="/register" className="text-blue-500">S'inscrire</Link>
            </div>
        </div>
    );
}
