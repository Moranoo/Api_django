import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import qs from 'qs';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PageIndicator from "./PageIndicator";
import {toast, ToastContainer} from "react-toastify";

const animatedComponents = makeAnimated();

function IngredientSelector() {
    const [categories] = useState(['base', 'dessert', 'plat']);
    const [selectedCategory, setSelectedCategory] = useState('plat');
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [recipeTitle, setRecipeTitle] = useState('');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Charger les ingrédients
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ingredients/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => {
            setIngredients(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Échec de la récupération des ingrédients. Veuillez réessayer.');
            toast.error(`Erreur lors de la récupération des ingrédients! Veuillez réessayer.${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        });
    }, []);

    // Charger les recettes
    const fetchRecipes = useCallback((url) => {
        setLoading(true);
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            params: {
                title: recipeTitle,
                category: selectedCategory,
                ingredients: selectedIngredients
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
            setError('Échec de la récupération des recettes. Veuillez réessayer.');
            toast.error(`Erreur lors de la récupération des recettes! Veuillez réessayer.${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        });
    }, [selectedIngredients, selectedCategory, recipeTitle]);

    // Déclenche la recherche de recettes après chaque changement de paramètres
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchRecipes('http://127.0.0.1:8000/api/recipes/');
        }, 500);
        return () => clearTimeout(timeout);
    }, [fetchRecipes]);

    // Gérer les changements de sélection d'ingrédients
    const handleIngredientChange = (e) => {
        setSelectedIngredients(e.map(ingredient => ingredient.value));
    };

    // Gérer les changements de catégorie
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.value);
    };

    // Gérer les changements de titre de recette
    const handleRecipeTitle = (e) => {
        setRecipeTitle(e.target.value);
    };

    // Affichage du chargement
    const loadingRecipes = () => {
        if (loading) {
            return (
                <div className="mx-auto flex justify-center items-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-primary" role="status">
                    <span className="sr-only">Chargement...</span>
                </div>
            );
        } else {
            return <p className={'text-center'}>Aucune recette trouvée pour les ingrédients sélectionnés.</p>;
        }
    };

    // Récupération du numéro de page
    function getPageNumber(url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return parseInt(urlParams.get('page'));
    }

    return (
        <div>
            <ToastContainer />
            <h1 className={'text-center text-6xl mt-14 mb-12'}>Sélectionnez vos Ingrédients</h1>
            <h2 className={'text-black/40 text-center mb-14'}>Choisissez une catégorie et des ingrédients pour trouver des recettes qui vous conviennent.</h2>
            <div className="flex flex-col items-center gap-4">
                <div className={'flex justify-center gap-8'}>
                    <div className="flex flex-col w-80 items-center gap-2">
                        Catégories
                        <Select
                            className={'w-full'}
                            options={categories.map(category => ({ value: category, label: category }))}
                            onChange={handleCategoryChange}
                            defaultValue={{ value: 'plat', label: 'plat' }}
                            placeholder={'Sélectionnez une catégorie...'}
                        />
                    </div>
                    <div className="flex flex-col w-80 items-center gap-2">
                        Ingrédients
                        <Select
                            className={'w-full'}
                            components={animatedComponents}
                            options={ingredients.map(ingredient => ({ value: ingredient.name, label: ingredient.name }))}
                            onChange={handleIngredientChange}
                            isMulti
                            noOptionsMessage={() => 'Aucun ingrédient trouvé.'}
                            placeholder={'Sélectionnez des ingrédients...'}
                            isLoading={loading}
                        />
                    </div>
                </div>
                <p className={"text-5xl"}>Ou</p>
                <div className="flex flex-col items-center gap-2 w-96">
                    <p className={"self-start"}>Rechercher une recette par titre</p>
                    <input onChange={handleRecipeTitle} type="text" placeholder="Rechercher une recette..." className="border rounded border-gray-300 p-1 w-full" />
                </div>
            </div>
            <h2 className={"text-center text-3xl my-14"}>Résultats de Recherche</h2>
            {recipes.length !== 0 && <PageIndicator prevPage={prevPage} nextPage={nextPage} fetchPage={fetchRecipes} getPageNumber={getPageNumber} />}
            {recipes.length > 0 ? (
                <div className="flex flex-col gap-4 items-center">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="flex flex-col gap-4 rounded-lg border p-4 w-[50%]">
                            <div className="flex gap-4">
                                <div>
                                    <img className="rounded-lg w-48 min-w-48 object-cover" src={recipe.image_url} alt={recipe.title} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{recipe.title}</h3>
                                    <p>{recipe.description}</p>
                                    <p className={"mt-2"}> Recette: <a href={recipe.recipe_url} target="_blank" rel="noreferrer">{recipe.recipe_url}</a></p>
                                    <p className={"mt-2"}>{recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</p>
                                    <p className={"mt-2"}> Ingrédients nécessaires:</p>
                                    <div className={"flex flex-col gap-2"}>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <span className={"whitespace-nowrap"} key={index}>{ingredient.quantity} {ingredient.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                loadingRecipes()
            )}
            {recipes.length !== 0 && <PageIndicator prevPage={prevPage} nextPage={nextPage} fetchPage={fetchRecipes} getPageNumber={getPageNumber} />}
        </div>
    );
}

export default IngredientSelector;
