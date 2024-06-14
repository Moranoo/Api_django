import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import IngredientSelector from './components/IngredientSelector';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import Favorites from "./components/Favorites";
import ErrorPage from "./components/ErrorPage";
import Dashboard from './components/Dashboard';
function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/recipes" element={<ProtectedRoute element={<RecipeList />} />} />
                    <Route path="/select-ingredients" element={<ProtectedRoute element={<IngredientSelector />} />} />
                    <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
