import React from 'react';
import { useParams, Link } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { id: '101', name: 'Quantum Laptop Pro', category: 'Tech', price: 1499, rating: 4.9, desc: 'Next-generation quantum processor combined with an ultra-thin aerospace chassis. Built for developer workflows and advanced machine learning modeling.', specs: ['16-Core Quantum SoC', '32GB Unified Memory', '1TB NVMe PCIe 4.0 SSD', '120Hz Liquid Retina Display'] },
  { id: '102', name: 'Ergonomic Desk Chair', category: 'Home', price: 299, rating: 4.7, desc: 'Advanced spinal support chair with dynamic posture control, breathable hybrid mesh fabric, and 4D adjustable armrests.', specs: ['Dynamic Lumbar Support', 'Breathable Mesh Back', 'Tilt Tension Control', 'Aluminum Frame Support'] },
  { id: '103', name: 'Noise-Cancelling Headphones', category: 'Tech', price: 349, rating: 4.8, desc: 'Acoustic excellence featuring active adaptive noise-cancellation, high-fidelity sound, and 40 hours of continuous wireless playback.', specs: ['Hybrid Active ANC', '40mm High-Resolution Drivers', 'Bluetooth 5.2 Multipoint', 'Smart Ambient Sound Mode'] },
  { id: '104', name: 'Waterproof Smartwatch', category: 'Tech', price: 199, rating: 4.5, desc: 'Rugged adventure companion tracking heartbeat, sleep telemetry, blood-oxygen saturation, and GPS navigation. Submersible up to 50 meters.', specs: ['AMOLED Always-On Screen', 'Heart & SpO2 Sensor', 'Multi-System GPS Built-in', '5 ATM Water Resistant'] },
  { id: '105', name: 'Leather Travel Backpack', category: 'Fashion', price: 120, rating: 4.6, desc: 'Handcrafted full-grain leather pack with hidden pockets, expandable storage partitions, and dedicated protective sleeve for 16-inch laptops.', specs: ['Full-Grain Cowhide Leather', 'Waterproof Inner Liners', 'Hidden Anti-Theft Pockets', 'Luggage Trolley Attachment Strap'] },
  { id: '106', name: 'Minimalist Wall Clock', category: 'Home', price: 45, rating: 4.2, desc: 'Elegant and silent sweep second hand design. Made from concrete and real walnut hands. Blends in seamlessly with modern mid-century interiors.', specs: ['Silent Sweep Quartz Movement', 'Real Walnut Wood Hands', 'Architectural Concrete Dial', '12-inch Diameter'] },
  { id: '107', name: 'Premium Cotton Hoodie', category: 'Fashion', price: 80, rating: 4.4, desc: 'Ultra-heavyweight organic combed cotton loopback hoodie. Pigment dyed for a soft vintage wash aesthetic, with reinforced double-stitched seams.', specs: ['100% Organic Combed Cotton', 'Heavyweight 450 GSM Fabric', 'Double-Lined Hood Construction', 'Pre-shrunk Ribbed Cuffs'] }
];

export function ProductDetail() {
  // Use useParams to access route parameters
  const { productId } = useParams();

  // Find the product matching the route parameter id
  const product = MOCK_PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="page-container page-product-detail error-detail animate-fade-in">
        <div className="error-card">
          <h2>🚫 Product Not Found</h2>
          <p>We couldn't find a product matching the identifier: <code>"{productId}"</code></p>
          <div className="card-actions">
            <Link to="/products" className="btn btn-primary">
              Return to Product Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container page-product-detail animate-fade-in">
      <header className="page-header">
        <span className="section-label">Dynamic Route Parameters</span>
        <h2>Product Details: {product.name}</h2>
        <p className="section-desc">
          Matched route pattern: <code>/products/:productId</code>. Currently matching parameter: <code>productId = "{productId}"</code>.
        </p>
      </header>

      <div className="detail-layout">
        {/* Left column: product summary card */}
        <section className="product-summary-card">
          <div className="detail-category-badge">{product.category}</div>
          <h2>{product.name}</h2>
          <p className="product-description">{product.desc}</p>
          
          <div className="detail-pricing">
            <span className="detail-price">${product.price}</span>
            <span className="detail-rating">★ {product.rating}</span>
          </div>

          <div className="specs-list">
            <h4>📋 Technical Specs</h4>
            <ul>
              {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right column: router explanation & navigation playground */}
        <aside className="routing-explanation-card">
          <h3>🔍 Deep Dive: Route Params</h3>
          <p>
            The path config is set as <code>path="products/:productId"</code>. The colon (<code>:</code>) denotes a dynamic URL segment.
          </p>
          
          <div className="concept-flow">
            <div className="flow-step">
              <strong>URL:</strong> <code>/products/{productId}</code>
            </div>
            <div className="flow-step">
              <strong>Params Object:</strong> <code>{`{ productId: "${productId}" }`}</code>
            </div>
          </div>

          <p>
            By invoking <code>const {'{ productId }'} = useParams();</code>, the application extracts the value from the browser's path and pulls details.
          </p>

          <div className="navigation-options">
            <h4>🔄 Navigation Back Options</h4>
            <div className="options-links">
              {/* Absolute Link */}
              <Link to="/products" className="btn btn-outline">
                Absolute Link (to="/products")
              </Link>
              
              {/* Relative Link */}
              <Link to=".." relative="path" className="btn btn-outline">
                Relative Link (to=".." relative="path")
              </Link>
            </div>
            <p className="text-small text-muted">
              Note: <code>relative="path"</code> resolves the link relative to the current path segments rather than the Route definition hierarchy.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ProductDetail;
