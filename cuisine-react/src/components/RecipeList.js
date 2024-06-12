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

    return (
        <div>
            <h1>Liste des Recettes</h1>
            <ul className={'flex justify-center flex-col gap-4'}>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>Catégorie: {recipe.category}</p>
                        <p>URL: <a href={recipe.recipe_url}>{recipe.recipe_url}</a></p>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {prevPage && <button onClick={() => fetchRecipes(prevPage)}>Précédente</button>}
                {nextPage && <button onClick={() => fetchRecipes(nextPage)}>Suivante</button>}
            </div>
        </div>
    );
}

export default RecipeList;
