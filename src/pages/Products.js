import React from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { id: '101', name: 'Quantum Laptop Pro', category: 'Tech', price: 1499, rating: 4.9 },
  { id: '102', name: 'Ergonomic Desk Chair', category: 'Home', price: 299, rating: 4.7 },
  { id: '103', name: 'Noise-Cancelling Headphones', category: 'Tech', price: 349, rating: 4.8 },
  { id: '104', name: 'Waterproof Smartwatch', category: 'Tech', price: 199, rating: 4.5 },
  { id: '105', name: 'Leather Travel Backpack', category: 'Fashion', price: 120, rating: 4.6 },
  { id: '106', name: 'Minimalist Wall Clock', category: 'Home', price: 45, rating: 4.2 },
  { id: '107', name: 'Premium Cotton Hoodie', category: 'Fashion', price: 80, rating: 4.4 }
];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Extract query parameters with default values
  const currentCategory = searchParams.get('category') || 'All';
  const currentSortBy = searchParams.get('sort') || 'name';

  // Read state passed during navigation (from useNavigate in About page, for instance)
  const tipState = location.state;

  // Filter logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (currentCategory === 'All') return true;
    return product.category === currentCategory;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (currentSortBy === 'price') {
      return a.price - b.price;
    }
    if (currentSortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default sort by name
    return a.name.localeCompare(b.name);
  });

  // Helper functions to update URL search parameters
  const handleCategoryChange = (category) => {
    // We update search parameters while keeping other existing parameters
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sortType) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sortType);
    setSearchParams(newParams);
  };

  return (
    <div className="page-container page-products animate-fade-in">
      <header className="page-header">
        <span className="section-label">URL Query Strings</span>
        <h2>Search Parameters Playground</h2>
        <p className="section-desc">
          Learn how to bind filters, sorting states, and search queries directly to the URL using <code>useSearchParams</code>.
        </p>
      </header>

      {tipState && (
        <div className="alert-box info-alert">
          <strong>ℹ️ Received Navigation State:</strong> "{tipState.searchTip || tipState.fromPage}"
        </div>
      )}

      <div className="products-layout">
        {/* Controls Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h4>📁 Category Filter</h4>
            <div className="filter-options">
              {['All', 'Tech', 'Home', 'Fashion'].map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${currentCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>⚡ Sort By</h4>
            <select
              value={currentSortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-dropdown"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price">Price (Low to High)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>

          <div className="explain-box">
            <h4>💡 How useSearchParams works</h4>
            <p>
              It works just like React's <code>useState</code> hook, but stores the values in the URL address bar!
            </p>
            <p>
              Current query string in browser:<br />
              <code className="url-preview">
                ?category={currentCategory}&sort={currentSortBy}
              </code>
            </p>
            <p className="text-small">
              Bookmarking or refreshing this page maintains filters because the configuration is saved directly in the URL query string.
            </p>
          </div>
        </aside>

        {/* Product Cards List */}
        <main className="products-list-container">
          <div className="list-header">
            <span>Showing {sortedProducts.length} items</span>
            <span className="current-state-indicator">
              Category: <strong>{currentCategory}</strong> | Sort: <strong>{currentSortBy}</strong>
            </span>
          </div>

          <div className="products-grid">
            {sortedProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-category-tag">{product.category}</div>
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <span className="product-price">${product.price}</span>
                  <span className="product-rating">★ {product.rating}</span>
                </div>
                <div className="product-card-footer">
                  <Link to={`/products/${product.id}`} className="btn-view-details">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
