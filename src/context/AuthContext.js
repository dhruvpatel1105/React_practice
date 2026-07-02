import React, { createContext, useState, useContext } from 'react';

// Create the Authentication Context
const AuthContext = createContext(null);

// Custom Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check if user session exists in localStorage
    const savedUser = localStorage.getItem('demo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    // Simple mock authentication check
    // In a real app, this would be an API request
    if (username.trim().toLowerCase() === 'admin' && password === 'password') {
      const mockUser = {
        username: 'AdminUser',
        email: 'admin@reactrouter.dev',
        role: 'Administrator',
        joinedDate: '2026-07-02'
      };
      setUser(mockUser);
      localStorage.setItem('demo_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to easily consume the AuthContext in functional components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
