import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Styling
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import DashboardProfile from './pages/DashboardProfile';
import DashboardSettings from './pages/DashboardSettings';

/**
 * App Component
 * 
 * Configures the primary routing system for the training application.
 * 
 * Key Routing Concepts Configured Below:
 * 1. BrowserRouter: The routing context provider that syncs the UI with the URL using the browser history.
 * 2. Routes: Wrapper that looks through all child Route elements to find the best match for the current URL path.
 * 3. Route: Mapping from a URL path to a React component.
 * 4. Dynamic Parameter Route (path="/products/:productId"): Matches dynamic paths like /products/101.
 * 5. Nested Layout Route (path="/dashboard"): Parent Route hosting dashboard sidebar shell.
 * 6. Index Subroute (index element={<Navigate to="profile" replace />}):
 *    Handles default fallback rendering when the parent path (/dashboard) is matched exactly.
 * 7. Protected Route Guard (element={<ProtectedRoute><Dashboard /></ProtectedRoute>}):
 *    Wrapper pattern that intercepts navigation based on authentication contexts.
 * 8. Wildcard Route (path="*"): Catches all unresolved paths to display custom 404 pages.
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Navbar visible on all pages */}
          <Navbar />
          
          {/* Dynamic page content container */}
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Collection & Param Routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              
              {/* Auth Route */}
              <Route path="/login" element={<Login />} />
              
              {/* Nested Dashboard Workspace (Protected) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                {/* Redirect from /dashboard to /dashboard/profile by default */}
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<DashboardProfile />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>
              
              {/* Wildcard 404 Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
