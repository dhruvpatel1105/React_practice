import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * This component wraps pages that require authentication (e.g., Dashboard).
 * 
 * Key Routing Concepts:
 * 1. useLocation: Hook to access the current URL location object.
 * 2. Navigate: Component that performs declarative navigation redirection.
 * 3. location.state: Pass state metadata (specifically the current page 'from') 
 *    to the target route (/login) so the login page can redirect the user back 
 *    to where they initially wanted to go after successful login.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, but store the current location they tried to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
