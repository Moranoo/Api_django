import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const fetchRecipes = (url) => {
        axios.get(url)
            .then(response => {
                setRecipes(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
            })
            .catch(error => {
                console.error('There was an error fetching the recipes!', error);
            });
    };

    useEffect(() => {
        fetchRecipes('http://127.0.0.1:8000/api/recipes/');
    }, []);

    const getCategoryEmoji = (category) => {
        const categoryEmojiMap = {
            'plat': '🫕',
            'base': '🥘',
            'dessert': '🍰'
        };
        return categoryEmojiMap[category.toLowerCase()] || '🍽';
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-center text-6xl mt-14 mb-12">Liste des Recettes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                    <div className="bg-white rounded-lg shadow-lg p-6 relative" key={recipe.id}>
                        <div className="relative">
                            <p className="text-sm mb-2">{getCategoryEmoji(recipe.category)}</p>
                            <img src={recipe.image_url} alt={recipe.title} className="w-full h-auto object-cover rounded-lg" />  
                        </div>
                        <h2 className="text-3xl font-semibold text-center mb-4">{recipe.title}</h2>
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
                ))}
            </div>
            <div className="flex justify-between w-full px-6 my-4">
                {prevPage && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fetchRecipes(prevPage)}>Précédente</button>}
                {nextPage && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fetchRecipes(nextPage)}>Suivante</button>}
            </div>
        </div>
    );
}

export default RecipeList;
