import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const InspectorGuard = ({ element }) => {
  const { user } = useAuth();

  // Check if user is authenticated
  const isInspector = user.role !== "inspector";

  return isInspector ? (
    
    <Navigate to="/" replace />
  ) : (
    
    element
  );
};

export default InspectorGuard;