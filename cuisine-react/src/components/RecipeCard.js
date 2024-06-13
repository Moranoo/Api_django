import React from "react";

export default function RecipeCard({ recipe }) {

    const getCategoryEmoji = (category) => {
    const categoryEmojiMap = {
        'plat': '🫕',   // Pot of food
        'base': '🥘',  // Paella (commonly used to represent a base dish)
        'dessert': '🍰' // Cake
    };
    return categoryEmojiMap[category.toLowerCase()] || '🍽'; // Default plate with fork and knife
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <div className="relative">
                <img src={recipe.image_url} alt={recipe.title} className="w-full h-auto object-cover rounded-lg"/>
                <span
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg text-2xl flex items-center justify-center"
                    style={{width: '36px', height: '36px'}}>
                                {getCategoryEmoji(recipe.category)}
                            </span>
            </div>
            <h2 className="text-3xl font-semibold text-center mt-4">{recipe.title}</h2>
            <div className="flex justify-center mt-4">
                <a href={recipe.recipe_url} className="text-blue-500 hover:text-blue-700">Liens vers la recette</a>
            </div>
            <h3 className="font-bold mt-4">Ingrédients:</h3>
            <ul>
                {recipe.ingredients.map(ingredient => (
                    <li key={ingredient.name} className="text-sm list-none">{ingredient.quantity} {ingredient.name}</li>
                ))}
            </ul>
        </div>
    );
}