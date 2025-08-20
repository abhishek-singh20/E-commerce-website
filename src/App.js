
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartFooter from './components/CartFooter';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/product/:id/details' element={<ProductDetailPage />} />
            </Routes>
          </div>
          <CartFooter />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
