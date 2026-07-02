import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract where the user came from before being redirected to Login page.
  // Defaults to '/dashboard' if they directly visited the login page.
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      // Navigate to the original route they wanted to access.
      // Use { replace: true } so the '/login' route is replaced in the history stack,
      // preventing the user from hitting 'Back' and returning to the login form.
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password. (Hint: admin / password)');
    }
  };

  return (
    <div className="page-container page-login animate-fade-in">
      <div className="login-wrapper">
        <section className="login-card">
          <header className="login-header">
            <h2>🔑 System Authentication</h2>
            <p>Access the protected admin workspace area.</p>
          </header>

          {error && (
            <div className="alert-box error-alert animate-shake">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter 'admin'"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter 'password'"
                required
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Authenticate
            </button>
          </form>

          <div className="mock-credentials-hint">
            <strong>Mock Credentials:</strong>
            <ul>
              <li>Username: <code>admin</code></li>
              <li>Password: <code>password</code></li>
            </ul>
          </div>
        </section>

        {/* Informative Side Panel */}
        <aside className="login-explanation-card">
          <h3>🔒 Protected Redirection Flow</h3>
          <p>
            This login page demonstrates how authentication guards coordinate with the history navigation stack:
          </p>

          <ol className="flow-steps-list">
            <li>
              User requests protected path: <code>{from}</code>
            </li>
            <li>
              <code>ProtectedRoute</code> blocks request and captures the pathname in <code>location.state.from</code>
            </li>
            <li>
              User is redirected to <code>/login</code> with the captured state.
            </li>
            <li>
              After verification, the app calls:
              <pre className="code-inline">
{`navigate(from, { replace: true })`}
              </pre>
              returning the user to their target path seamlessly.
            </li>
          </ol>

          <div className="state-inspector">
            <h4>Location State Inspector</h4>
            <div className="inspector-box">
              <span className="label">Redirected From:</span>
              <code className="value">
                {location.state?.from?.pathname ? `"${location.state.from.pathname}"` : 'null (direct hit)'}
              </code>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Login;
