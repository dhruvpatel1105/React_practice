import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NotFound() {
  const location = useLocation();

  return (
    <div className="page-container page-not-found animate-fade-in">
      <div className="not-found-card">
        <h1 className="error-code">404</h1>
        <h2>Route Not Found</h2>
        <p>
          We searched all endpoints but couldn't resolve the path: <code>"{location.pathname}"</code>
        </p>

        <div className="educational-note-mini">
          <h4>💡 Catch-All Routing</h4>
          <p>
            This fallback page is matched because we declared a route at the very end of our route tree with 
            <code> path="*"</code>. The asterisk acts as a wildcard, catching any URLs that didn't match previous definitions.
          </p>
        </div>

        <div className="card-actions">
          <Link to="/" className="btn btn-primary">
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
