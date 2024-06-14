import React, {useEffect, useState} from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import PageIndicator from "./PageIndicator";
import {Bounce, toast, ToastContainer} from "react-toastify";

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
    const removeFavorite = (recipeId) => {
        axios.delete(`http://localhost:8000/api/favorites/${recipeId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(() => {
                fetchFavorites('http://localhost:8000/api/favorites/');
                toast.success('Recette retirée des favoris! 👎', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
            })
        })
    }

    useEffect(() => {
        fetchFavorites('http://localhost:8000/api/favorites/');
    }, []);

    function getPageNumber(url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return parseInt(urlParams.get('page'));
    }

    return (
        <div className="flex flex-col items-center gap-4 px-4 md:px-8">
            <ToastContainer />
            <h1 className="text-center text-6xl mt-14 mb-12">Page des favoris</h1>
            {favorites.length === 0 ? <p className="text-center text-xl">Vous n'avez pas encore de recettes en favoris.</p>
                :
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {favorites.map(favorite => (
                            <RecipeCard key={favorite.id} recipe={favorite} favorite={false}
                                        deleteFavorite={() => removeFavorite(favorite.id)}/>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-6 mb-4">
                        Légende des catégories: 🫕 Plat | 🥘 Base | 🍰 Dessert
                    </p>
                    <PageIndicator prevPage={prevPage} nextPage={nextPage} fetchPage={fetchFavorites}
                                   getPageNumber={getPageNumber}/>
                </>
            }
        </div>
    );
}