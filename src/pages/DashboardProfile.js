import React from 'react';
import { useAuth } from '../context/AuthContext';

export function DashboardProfile() {
  const { user } = useAuth();

  return (
    <div className="dashboard-subpage animate-fade-in">
      <div className="subpage-header">
        <h3>👤 User Profile</h3>
        <p>Manage your account credentials and personal preferences.</p>
      </div>

      <div className="profile-details-grid">
        <div className="detail-item">
          <span className="detail-label">Username</span>
          <span className="detail-value">{user?.username}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Email Address</span>
          <span className="detail-value">{user?.email}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Security Role</span>
          <span className="detail-value role-highlight">{user?.role}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Account Created</span>
          <span className="detail-value">{user?.joinedDate}</span>
        </div>
      </div>

      <div className="subpage-note">
        <h4>🔍 Educational Checkpoint: Index/Nested Paths</h4>
        <p>
          This content is loaded dynamically inside the Dashboard layout when the URL path matches 
          <code>/dashboard/profile</code>. If we wanted this profile to load by default when visiting 
          <code>/dashboard</code>, we would configure it with an <code>index</code> attribute in the Route configuration.
        </p>
      </div>
    </div>
  );
}

export default DashboardProfile;
