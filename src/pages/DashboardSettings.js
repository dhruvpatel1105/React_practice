import React, { useState } from 'react';

export function DashboardSettings() {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="dashboard-subpage animate-fade-in">
      <div className="subpage-header">
        <h3>⚙️ System Preferences</h3>
        <p>Configure interface styling, alert routing, and dashboard modes.</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="settings-form">
        <div className="settings-group">
          <label>Theme Environment</label>
          <div className="theme-toggle-options">
            <button
              type="button"
              className={`theme-option-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              🌌 Deep Dark Space (Active)
            </button>
            <button
              type="button"
              className={`theme-option-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              ☀️ Solarized Light
            </button>
          </div>
        </div>

        <div className="settings-group toggle-group">
          <div className="toggle-info">
            <label>Enable Dynamic Push Alerts</label>
            <p>Receive notifications when parameters or layouts change state.</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="toggle-switch"
          />
        </div>
      </form>

      <div className="subpage-note">
        <h4>🔍 Educational Checkpoint: Layout Re-usability</h4>
        <p>
          Notice how switching between <strong>Profile</strong> and <strong>Settings</strong> tabs is extremely fast. 
          This is because the parent layout component (<code>Dashboard.js</code>) is not unmounted and remounted; 
          only the child element within the <code>&lt;Outlet /&gt;</code> is swapped.
        </p>
      </div>
    </div>
  );
}

export default DashboardSettings;
