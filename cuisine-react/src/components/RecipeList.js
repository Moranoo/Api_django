import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import qs from 'qs';
import Select from 'react-select';
import RecipeCard from "./RecipeCard";
import PageIndicator from "./PageIndicator";

function RecipeList() {
    const [categories] = useState(['base', 'dessert', 'plat']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [recipeTitle, setRecipeTitle] = useState('');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRecipes = useCallback((url) => {
        setLoading(true);
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            params: {
                title: recipeTitle,
                category: selectedCategory,
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        })
        .then(response => {
            setRecipes(response.data.results);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an error fetching the recipes!', error);
        });
    }, [selectedCategory, recipeTitle]);

    useEffect(() => {
        fetchRecipes('http://127.0.0.1:8000/api/recipes/');
    }, [fetchRecipes]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e ? e.value : '');
    };

    const handleRecipeTitle = (e) => {
        setRecipeTitle(e.target.value);
    };

    function getPageNumber(url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return parseInt(urlParams.get('page'));
    }

    const loadingRecipes = () => {
        if (loading) {
            return (
                <div
                    className="mx-auto justify-center content-center flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >
                        Loading...
                    </span>
                </div>
            );
        } else {
            return <p className={'text-center'}>Aucune recette trouvée pour les critères sélectionnés.</p>;
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 px-4 md:px-8"> {/* Ajout de padding pour les écrans moyens et grands */}
            <h1 className="text-center text-6xl mt-14 mb-12">Liste des Recettes</h1>
            <div className="flex flex-row justify-center content-center items-center gap-8">
                <div className="flex flex-col w-80 justify-center content-center items-center gap-2">
                    Catégories
                    <Select
                        className="w-full"
                        options={categories.map(category => ({value: category, label: category}))}
                        onChange={handleCategoryChange}
                        placeholder={'Sélectionnez une catégorie...'}
                        isClearable
                    />
                </div>
                <div className="flex flex-col justify-center content-center items-center gap-2 w-96">
                    <p className="self-start">Rechercher une recette par titre</p>
                    <input onChange={handleRecipeTitle} type="text" placeholder="Rechercher une recette..."
                           className="border rounded border-gray-300 p-1 w-full"/>
                </div>
            </div>
            <h2 className="text-center text-3xl my-14">Résultats de Recherche</h2>
            <PageIndicator prevPage={prevPage} nextPage={nextPage} fetchPage={fetchRecipes}
                           getPageNumber={getPageNumber}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                ))}
            </div>
            {loading && loadingRecipes()}
            <PageIndicator prevPage={prevPage} nextPage={nextPage} fetchPage={fetchRecipes}
                           getPageNumber={getPageNumber}/>
            <p className="text-sm text-gray-600 mt-6 mb-4">
                Légende des catégories: 🫕 Plat | 🥘 Base | 🍰 Dessert
            </p>
        </div>
    );
}

export default RecipeList;
