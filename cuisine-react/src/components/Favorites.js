import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const fetchFavorites = (url) => {
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(response => {
                setFavorites(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
            })
    }

    useEffect(() => {
        fetchFavorites('http://localhost:8000/api/favorites/');
    }, []);

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
            <h1 className="text-center text-6xl mt-14 mb-12">Page des favoris</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.map(favorite => (
                    <div className="bg-white rounded-lg shadow-lg p-6 relative" key={favorite.id}>
                        <div className="relative">
                            <img src={favorite.image_url} alt={favorite.title}
                                 className="w-full h-auto object-cover rounded-lg"/>
                            <span
                                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg text-2xl flex items-center justify-center"
                                style={{width: '36px', height: '36px'}}>
                                {getCategoryEmoji(favorite.category)}
                            </span>
                        </div>
                        <h2 className="text-3xl font-semibold text-center mb-4">{favorite.title}</h2>
                        <div className="flex justify-center mt-4">
                            <a href={favorite.recipe_url} className="text-blue-500 hover:text-blue-700">Liens vers la
                                recette</a>
                        </div>
                        <h3 className="font-bold mt-4">Ingrédients:</h3>
                        <ul>
                            {favorite.ingredients.map(ingredient => (
                                <li key={ingredient.name}
                                    className="text-sm list-none">{ingredient.quantity} {ingredient.name}</li>
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
                        <button onClick={() => fetchFavorites(prevPage)}><FontAwesomeIcon icon={faCircleArrowLeft}
                                                                                        size={"3x"}/></button>}
                    {nextPage &&
                        <button onClick={() => fetchFavorites(nextPage)}><FontAwesomeIcon icon={faCircleArrowRight}
                                                                                        size={"3x"}/></button>}
                </div>
                {nextPage ? <p className={"text-center"}>Vous êtes sur la page {getPageNumber(nextPage) - 1}</p> :
                    <p className={"text-center"}>Vous êtes sur la dernière page</p>}
            </div>
        </div>
    );
}