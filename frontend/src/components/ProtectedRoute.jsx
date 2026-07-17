import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 * - If not logged in -> redirects to /login
 * - If role required and user role doesn't match -> redirects appropriately
 * - Renders <Outlet /> for nested routes, or children if provided directly
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Admin trying to access customer route -> admin dashboard
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // Customer trying to access admin route -> books
    return <Navigate to="/books" replace />;
  }

  // Render children if passed directly, otherwise render <Outlet /> for nested routes
  return children ?? <Outlet />;
};

export default ProtectedRoute;
