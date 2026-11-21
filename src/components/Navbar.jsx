import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Clock, Phone, ShieldCheck } from 'lucide-react';
import { restaurantData, isRestaurantOpen } from '../data/restaurant';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(() => isRestaurantOpen());
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setOpenStatus(isRestaurantOpen());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Location', path: '/location' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-charcoal/95 backdrop-blur-md border-b border-brand-border">
      {/* Top micro bar for open hours and direct call */}
      <div className="bg-brand-dark/80 border-b border-brand-border/40 px-4 py-1.5 text-xs text-brand-muted">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            <span className="font-medium text-brand-cream">
              {openStatus.isOpen ? 'Open Now' : 'Closed Now'}
            </span>
            <span className="hidden sm:inline text-brand-muted">
              • {openStatus.statusText}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={restaurantData.info.phoneDial}
              className="flex items-center gap-1 hover:text-brand-accent transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-accent" />
              <span>{restaurantData.info.phone}</span>
            </a>
            <Link
              to="/owner-login"
              className="hidden sm:flex items-center gap-1 text-brand-gold/80 hover:text-brand-gold transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent/50 p-0.5 bg-brand-card shadow-lg group-hover:border-brand-accent transition-all">
            <ImageWithFallback
              src={restaurantData.info.logoImage.path}
              alt={restaurantData.info.logoImage.alt}
              className="w-full h-full object-cover rounded-full"
              width="48"
              height="48"
              loading="eager"
            />
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold tracking-wide text-brand-cream group-hover:text-brand-gold transition-colors">
              ZENZI
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-brand-accent font-semibold -mt-1">
              Restaurant &bull; Cafe
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                isActive(link.path)
                  ? 'text-brand-accent border-b-2 border-brand-accent pb-1'
                  : 'text-brand-cream/80 hover:text-brand-cream'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-card hover:bg-brand-surface border border-brand-border text-brand-cream transition-all group"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-brand-dark bg-brand-accent rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/menu"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold bg-brand-accent hover:bg-brand-accentHover text-brand-dark shadow-md hover:shadow-brand-accent/20 transition-all"
          >
            Order Online
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-brand-card border border-brand-border text-brand-cream hover:text-brand-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-card border-b border-brand-border px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-brand-surface text-brand-accent'
                  : 'text-brand-cream hover:bg-brand-surface/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/owner-login"
            className="block px-3 py-2 rounded-md text-base font-medium text-brand-gold bg-brand-surface/30 hover:bg-brand-surface/60 transition-colors"
          >
            Owner Dashboard (Demo)
          </Link>
          <div className="pt-2">
            <Link
              to="/menu"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold bg-brand-accent hover:bg-brand-accentHover text-brand-dark shadow-md transition-all"
            >
              Order Online Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
