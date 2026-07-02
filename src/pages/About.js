import React from 'react';
import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="page-container page-about animate-fade-in">
      <header className="page-header">
        <span className="section-label">Core Mechanics</span>
        <h2>About Routing Navigation</h2>
        <p className="section-desc">
          Learn how to drive the router programmatically using React Hooks rather than standard markup links.
        </p>
      </header>

      <div className="about-layout">
        <section className="about-content-card">
          <h3>The <code>useNavigate</code> Hook</h3>
          <p>
            While standard navigation uses the HTML-like <code>&lt;Link&gt;</code> element, there are many times you want to navigate 
            as a side-effect of an action, such as logging in, completing a checkout, or clicking a custom utility button.
          </p>
          <p>
            React Router provides the <strong>useNavigate</strong> hook, which gives you programmatic access to the browser session history.
          </p>

          <div className="code-example">
            <pre>
{`import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleAction = () => {
    // Perform operations...
    navigate('/success', { 
      state: { transactionId: 102 } 
    });
  };
}`}
            </pre>
          </div>
        </section>

        <section className="interactive-navigation-panel">
          <h3>🎮 Navigation Playground</h3>
          <p className="playground-subtitle">
            Click the buttons below to trigger programmatic navigation events. Notice how you can traverse history or send custom state.
          </p>
          
          <div className="nav-buttons-container">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Go to Home Page
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/products', { state: { searchTip: 'Try looking for electronics!' } })}
            >
              Go to Products with State
            </button>

            <div className="history-controls">
              <button 
                className="btn btn-outline"
                onClick={() => navigate(-1)}
              >
                ← Go Back (History -1)
              </button>
              
              <button 
                className="btn btn-outline"
                onClick={() => navigate(1)}
              >
                Go Forward (History +1) →
              </button>
            </div>
          </div>

          <div className="educational-note-mini">
            <h4>💡 History Navigation</h4>
            <p>
              Passing negative numbers like <code>-1</code> or <code>-2</code> tells the browser to go back in history. 
              Passing positive numbers like <code>1</code> goes forward.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
