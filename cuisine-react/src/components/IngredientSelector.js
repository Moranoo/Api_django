import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IngredientSelector() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ingredients/')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ingredients!', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/recipes/', {
            ingredients: selectedIngredients
        })
        .then(response => {
            setRecipes(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the recipes!', error);
        });
    };

    return (
        <div>
            <h1>Sélectionnez vos Ingrédients</h1>
            <form onSubmit={handleSubmit}>
                {ingredients.map(ingredient => (
                    <label key={ingredient.id}>
                        <input 
                            type="checkbox" 
                            value={ingredient.name}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedIngredients([...selectedIngredients, e.target.value]);
                                } else {
                                    setSelectedIngredients(selectedIngredients.filter(item => item !== e.target.value));
                                }
                            }}
                        />
                        {ingredient.name}
                    </label>
                ))}
                <button type="submit">Rechercher des Recettes</button>
            </form>
            <div>
                <h2>Résultats de Recherche</h2>
                {recipes.length > 0 ? (
                    <ul>
                        {recipes.map(recipe => (
                            <li key={recipe.id}>
                                <h3>{recipe.title}</h3>
                                <p>Catégorie: {recipe.category}</p>
                                <p>URL: <a href={recipe.recipe_url}>{recipe.recipe_url}</a></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune recette trouvée pour les ingrédients sélectionnés.</p>
                )}
            </div>
        </div>
    );
}

export default IngredientSelector;
