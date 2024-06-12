import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import IngredientSelector from './components/IngredientSelector';
import Navbar from "./components/navbar";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/select-ingredients" element={<IngredientSelector />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;