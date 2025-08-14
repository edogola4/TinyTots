import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loading spinner or skeleton while checking auth
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin()) {
    // Redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
