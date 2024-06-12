import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function ProtectedRoute({ element: Component, ...rest }) {
    return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
}
