import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const AuthGuard = ({ element }) => {
  const { user } = useAuth();

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  return isAuthenticated ? (
    
    <Navigate to="/" replace />
  ) : (
    
    element
  );
};

export default AuthGuard;

