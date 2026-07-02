import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar Component
 * 
 * Shows navigation across the application.
 * 
 * Key Routing Concepts:
 * 1. NavLink: Special version of Link that automatically adds active class/styles 
 *    when the link URL matches the browser's current location.
 * 2. Link: Standard client-side routing element (prevents full-page refresh).
 * 3. useNavigate: Hook that returns a function to trigger navigation programmatically.
 */
export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect user to Home page programmatically after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          React<span>Router</span>.dev
        </Link>
        
        <div className="nav-menu">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            end // 'end' ensures the home link only highlights when path is exactly '/' and not just starts with it
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            About
          </NavLink>
          
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            Products
          </NavLink>
          
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            Dashboard
          </NavLink>
        </div>

        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="auth-profile">
              <span className="user-badge">{user?.username}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
