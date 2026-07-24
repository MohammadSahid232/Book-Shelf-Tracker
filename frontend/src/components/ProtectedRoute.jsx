import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useAuth();

  const activeToken = token || localStorage.getItem('token');
  const activeUserStr = localStorage.getItem('user');
  let activeUser = user;

  if (!activeUser && activeUserStr) {
    try {
      activeUser = JSON.parse(activeUserStr);
    } catch (_) {}
  }

  if (!activeToken && !activeUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && activeUser && activeUser.role !== requiredRole) {
    if (activeUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/books" replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
