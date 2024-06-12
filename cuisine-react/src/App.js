import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import IngredientSelector from './components/IngredientSelector';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';  // Importer le formulaire d'inscription
import LoginForm from './components/LoginForm';        // Importer le formulaire de connexion

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/select-ingredients" element={<IngredientSelector />} />
                    <Route path="/register" element={<RegisterForm />} />  {/* Route pour l'inscription */}
                    <Route path="/login" element={<LoginForm />} />        {/* Route pour la connexion */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
