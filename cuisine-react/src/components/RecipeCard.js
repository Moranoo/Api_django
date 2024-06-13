import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faHeartCrack} from "@fortawesome/free-solid-svg-icons";
import QRCode from 'qrcode.react';

export default function RecipeCard({ recipe, favorite, deleteFavorite, addFavorite }) {

    const getCategoryEmoji = (category) => {
        const categoryEmojiMap = {
            'plat': '🫕',
            'base': '🥘',
            'dessert': '🍰'
        };
        return categoryEmojiMap[category.toLowerCase()] || '🍽';
    };

    const qrSize = 100; // Taille uniforme pour tous les QR codes

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <div className="relative">
                <img src={recipe.image_url} alt={recipe.title} className="w-full h-auto object-cover rounded-lg"/>
                <span
                    className="animate-spin categoryEmoji absolute top-2 right-12 bg-white rounded-full p-2 shadow-lg text-2xl flex items-center justify-center"
                    style={{width: '36px', height: '36px'}}> {getCategoryEmoji(recipe.category)}
                </span>
                <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg text-2xl flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-transform duration-300 ease-in-out"
                    onClick={!favorite ? deleteFavorite : addFavorite}
                    style={{width: '36px', height: '36px'}}> <FontAwesomeIcon icon={favorite ? faHeart : faHeartCrack} className="text-red-500"/>
                </button>
            </div>
            <h2 className="text-3xl font-semibold text-center mt-4">{recipe.title}</h2>
            {/* Envelopper le QR Code dans un lien */}
            <div className="flex justify-center mt-4">
                <a href={recipe.recipe_url} target="_blank" rel="noopener noreferrer">
                    <QRCode value={recipe.recipe_url} size={qrSize} level="H" />
                </a>
            </div>
            <h3 className="font-bold mt-4">Ingrédients:</h3>
            <ul>
                {recipe.ingredients.map(ingredient => (
                    <li key={ingredient.id} className="text-sm list-none">{ingredient.quantity} {ingredient.name}</li>
                ))}
            </ul>
        </div>
    );
}
