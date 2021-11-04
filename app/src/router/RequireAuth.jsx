import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

/**
 * @function RequireAuth
 * @description wrapper for authenticated routes
 * @param {React.JSX} children
 * @returns 
 */
export const RequireAuth = ({children}) => {
  const auth = useAuth();
  const location = useLocation();

  // If isn't logged in, redirect to '/' and save location on
  // navigation state
  if (!auth.authContext?.isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} />
  }

  return children;
}
