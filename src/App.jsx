import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OwnerProvider } from './context/OwnerContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { OwnerLoginPage } from './pages/OwnerLoginPage';
import { OwnerDashboardPage } from './pages/OwnerDashboardPage';

// Scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <OwnerProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-brand-dark text-brand-cream selection:bg-brand-accent selection:text-brand-dark">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/owner-login" element={<OwnerLoginPage />} />
                <Route path="/owner" element={<OwnerDashboardPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <FloatingActions />
          </div>
        </OwnerProvider>
      </CartProvider>
    </Router>
  );
}
