import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

function IngredientSelector() {
    const [categories, setCategories] = useState(['base', 'dessert', 'plat']);
    const [selectedCategory, setSelectedCategory] = useState('plat');
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ingredients/')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ingredients!', error);
            });
        console.log('Selected Ingredients:', selectedIngredients);
    }, [selectedIngredients]);

    const fetchRecipes = (url) => {
        axios.get(url, {
            params: {
                category: selectedCategory,
                ingredients: selectedIngredients
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" })
            }
        })
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
        if (selectedIngredients.length > 0) {
            fetchRecipes('http://127.0.0.1:8000/api/recipes/');
        }
    }, [selectedIngredients, selectedCategory]);

    const handleIngredientChange = (e) => {
        if (e.target.checked) {
            setSelectedIngredients([...selectedIngredients, e.target.value]);
        } else {
            setSelectedIngredients(selectedIngredients.filter(item => item !== e.target.value));
        }
    };

    return (
        <div>
            <h1>Sélectionnez vos Ingrédients</h1>
            <form>
                <label>
                    Catégorie:
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
                {ingredients.map(ingredient => (
                    <label key={ingredient.id}>
                        <input 
                            type="checkbox" 
                            value={ingredient.name}
                            onChange={handleIngredientChange}
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
                <div className="pagination">
                    {prevPage && <button onClick={() => fetchRecipes(prevPage)}>Précédente</button>}
                    {nextPage && <button onClick={() => fetchRecipes(nextPage)}>Suivante</button>}
                </div>
            </div>
        </div>
    );
}

export default IngredientSelector;
