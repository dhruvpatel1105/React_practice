import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Dashboard Component (Parent Layout Route)
 * 
 * Key Routing Concepts:
 * 1. Nested Routes: Re-usable templates (layouts) that frame sub-components.
 * 2. Outlet: The placeholder component provided by react-router-dom where 
 *    the active nested child route (like Profile or Settings) is rendered.
 * 3. Relative Navigation: Link `to="profile"` automatically resolves relative to 
 *    the parent `/dashboard` route, reducing hardcoded parent paths.
 */
export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page-container page-dashboard animate-fade-in">
      <header className="page-header">
        <span className="section-label">Nested Layouts</span>
        <h2>User Dashboard Workspace</h2>
        <p className="section-desc">
          Protected layout demonstrating nested route rendering using the <code>&lt;Outlet /&gt;</code> element.
        </p>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar Navigation */}
        <aside className="dashboard-sidebar">
          <div className="user-profile-summary">
            <div className="profile-avatar">
              {user?.username?.charAt(0) || 'A'}
            </div>
            <h4>{user?.username || 'Admin User'}</h4>
            <span className="user-role-tag">{user?.role}</span>
          </div>

          <nav className="sidebar-menu">
            {/* Note: We use relative paths in NavLink. 
                'profile' matches '/dashboard/profile'
                'settings' matches '/dashboard/settings' */}
            <NavLink 
              to="profile" 
              className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}
            >
              👤 Profile Settings
            </NavLink>
            
            <NavLink 
              to="settings" 
              className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}
            >
              ⚙️ System Preferences
            </NavLink>
          </nav>

          <div className="sidebar-explain-box">
            <h4>💡 Nested Outlet</h4>
            <p>
              The area on the right contains the <code>&lt;Outlet /&gt;</code> component. Clicking sidebar links mounts different pages inside it without reloading the dashboard layout.
            </p>
          </div>
        </aside>

        {/* Content Outlet Panel */}
        <main className="dashboard-content-outlet">
          {/* Outlet is where child routes are rendered */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
