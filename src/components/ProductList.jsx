import React from 'react';

const ProductList = ({ products, unlockedVendors, onUnlock }) => {
  return (
    <div className="product-grid">
      {products.slice(0, 12).map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p className="price">₹{product.price.toLocaleString()}</p>
          {!unlockedVendors[product.id] ? (
            <button 
              className="unlock-btn"
              onClick={() => onUnlock(product.id)}
            >
              Unlock Vendors (₹10)
            </button>
          ) : (
            <span className="unlocked">✅ Vendors Unlocked</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;

