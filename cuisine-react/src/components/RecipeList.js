import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [searchTitle, setSearchTitle] = useState('');

    const fetchRecipes = (url, params = {}) => {
        axios.get(url, { headers: getAuthHeader(), params })
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

    const handleSearch = () => {
        fetchRecipes('http://127.0.0.1:8000/api/recipes/', { title: searchTitle });
    };

    function getPageNumber(url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return parseInt(urlParams.get('page'));
    }

    const getCategoryEmoji = (category) => {
        const categoryEmojiMap = {
            'plat': '🫕',   // Pot of food
            'base': '🥘',  // Paella (commonly used to represent a base dish)
            'dessert': '🍰' // Cake
        };
        return categoryEmojiMap[category.toLowerCase()] || '🍽'; // Default plate with fork and knife
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-center text-6xl mt-14 mb-12">Liste des Recettes</h1>
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    placeholder="Rechercher une recette"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Rechercher
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                    <div className="bg-white rounded-lg shadow-lg p-6 relative" key={recipe.id}>
                        <div className="relative">
                            <img src={recipe.image_url} alt={recipe.title} className="w-full h-auto object-cover rounded-lg" />
                            <span className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg text-2xl flex items-center justify-center" style={{ width: '36px', height: '36px' }}>
                                {getCategoryEmoji(recipe.category)}
                            </span>
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
            <p className="text-sm text-gray-600 mt-6 mb-4">
                Légende des catégories: 🫕 Plat | 🥘 Base | 🍰 Dessert
            </p>
            <div className="pagination flex flex-col items-center gap-4 my-7">
                <div className="flex justify-center gap-4">
                    {prevPage &&
                        <button onClick={() => fetchRecipes(prevPage)}><FontAwesomeIcon icon={faCircleArrowLeft}
                                                                                        size={"3x"}/></button>}
                    {nextPage &&
                        <button onClick={() => fetchRecipes(nextPage)}><FontAwesomeIcon icon={faCircleArrowRight}
                                                                                        size={"3x"}/></button>}
                </div>
                {nextPage ? <p className={"text-center"}>Vous êtes sur la page {getPageNumber(nextPage) - 1}</p> :
                    <p className={"text-center"}>Vous êtes sur la dernière page</p>}
            </div>
        </div>
    );
}

export default RecipeList;
