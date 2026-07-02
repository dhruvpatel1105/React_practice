import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const routingConcepts = [
    {
      title: 'Declarative Routing',
      tag: '<Routes> & <Route>',
      desc: 'Define your application page tree using JSX components. React Router handles swapping components matching the current path.',
      link: '/about',
      btnText: 'Learn in About'
    },
    {
      title: 'Dynamic Route Params',
      tag: 'useParams()',
      desc: 'Define segments in paths (like /products/:productId) that match wildcard values. Retrieve them instantly inside components.',
      link: '/products',
      btnText: 'View Product List'
    },
    {
      title: 'Search/Query Parameters',
      tag: 'useSearchParams()',
      desc: 'Read and update URL query strings (e.g. ?category=shoes&sort=price) with an interface similar to React useState hook.',
      link: '/products?category=Fashion&sort=rating',
      btnText: 'Try Query Params'
    },
    {
      title: 'Nested Routing & Outlets',
      tag: '<Outlet />',
      desc: 'Build dashboard layouts with side menus where child pages render inside the parent component. Ideal for nested workspaces.',
      link: '/dashboard',
      btnText: 'Go to Dashboard'
    },
    {
      title: 'Protected Routes (Guards)',
      tag: 'Auth Redirection',
      desc: 'Restrict sub-paths to authenticated users. Automatically intercept access, redirect to /login, and return users on success.',
      link: '/dashboard/settings',
      btnText: 'Test Auth Interceptor'
    },
    {
      title: 'Catch-All Routing',
      tag: 'path="*"',
      desc: 'Gracefully handle incorrect URLs by routing users to a custom 404 page rather than letting the application crash or display blank.',
      link: '/invalid-path-demo',
      btnText: 'Trigger 404 Page'
    }
  ];

  return (
    <div className="page-container page-home animate-fade-in">
      <header className="hero-section">
        <h1 className="hero-title">
          Master React Routing <span>In-Depth</span>
        </h1>
        <p className="hero-subtitle">
          Welcome to the ultimate interactive router sandbox. Build, experiment, and learn client-side routing architectures with high-fidelity visualization.
        </p>
      </header>

      <section className="learning-grid">
        {routingConcepts.map((concept, index) => (
          <div className="concept-card" key={index}>
            <div className="card-header">
              <span className="concept-badge">{concept.tag}</span>
              <h3>{concept.title}</h3>
            </div>
            <p>{concept.desc}</p>
            <div className="card-footer">
              <Link to={concept.link} className="btn-card-action">
                {concept.btnText} →
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="educational-note">
        <h3>💡 How Client-Side Routing Works</h3>
        <p>
          Unlike traditional web servers that request a new HTML file from a server on every link click (causing page refreshes), 
          React Router intercepts link clicks. It updates the URL in the browser address bar using the HTML5 History API 
          and re-renders the appropriate component tree directly in the browser—delivering instant page swaps without any load delay.
        </p>
      </section>
    </div>
  );
}

export default Home;
