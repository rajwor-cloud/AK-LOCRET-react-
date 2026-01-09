import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import PaymentModal from './components/PaymentModal';
import VendorCard from './components/VendorCard';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [unlockedVendors, setUnlockedVendors] = useState({});
  const [filters, setFilters] = useState({ location: 'Patna', category: 'All', price: [0, 5000] });

  useEffect(() => {
    const expandedProducts = Array.from({length: 500}, (_, i) => ({
      id: i + 1,
      category: ['Home Textiles', 'Technical Textiles', 'Packaging', 'Apparel'][Math.floor(Math.random() * 4)],
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 4900) + 100,
      vendors: [
        {name: 'Omdeo Packaging', location: 'Hajipur', price: 0, rating: 4.8},
        {name: 'Adarsh Packaging', location: 'Patna', price: 0, rating: 4.5}
      ]
    }));
    setProducts(expandedProducts);
    setFilteredProducts(expandedProducts);
  }, []);

  const handleUnlockVendor = (productId) => {
    setSelectedProduct(productId);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setUnlockedVendors(prev => ({...prev, [selectedProduct]: true}));
    setShowPaymentModal(false);
  };

  return (
    <div className="App">
      <Header />
      <Filters filters={filters} setFilters={setFilters} />
      <ProductList products={filteredProducts} onUnlockVendor={handleUnlockVendor} unlockedVendors={unlockedVendors} />
      {selectedProduct && unlockedVendors[selectedProduct] && (
        <VendorCard productId={selectedProduct} />
      )}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={10}
      />
    </div>
  );
};

export default App;
