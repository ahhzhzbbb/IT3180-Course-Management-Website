import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // You can replace this with a Spinner component later
  return user ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  const isAdmin = user?.roles?.some(role => role === 'ROLE_ADMIN');
  return user && isAdmin ? children : <Navigate to="/dashboard" />;
};