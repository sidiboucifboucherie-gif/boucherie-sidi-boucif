import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Nos Produits', path: '/products' },
    { label: 'À Propos', path: '/about' },
    { label: 'Livraison', path: '/delivery' },
    { label: 'Recettes', path: '/recipes' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-burgundy-900 shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <Link to="/" className="flex items-center cursor-pointer">
             <img src="/logo.png" alt="Sidi Boucif" className="h-12 w-auto mr-3" />
             <div className="text-white">
                <h1 className="font-serif text-xl md:text-2xl font-bold tracking-wide">SIDI BOUCIF</h1>
                <p className="text-gold-400 text-xs uppercase tracking-widest hidden md:block">Artisan Boucher • Béziers</p>
             </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wider transition-colors duration-200 ${
                  isActive(item.path) ? 'text-gold-500 border-b-2 border-gold-500' : 'text-white hover:text-gold-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 px-4 py-2 rounded-sm font-bold text-sm transition-colors flex items-center shadow-md"
            >
              <ShoppingBag size={18} className="mr-2" />
              <span>Panier</span>
              {totalItems > 0 && (
                <span className="ml-2 bg-burgundy-900 text-gold-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-burgundy-800 absolute top-full left-0 w-full shadow-xl border-t border-burgundy-700">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${
                  isActive(item.path) ? 'bg-burgundy-900 text-gold-500' : 'text-white hover:bg-burgundy-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-burgundy-700 text-gold-400 flex flex-col space-y-2 px-3">
               <div className="flex items-center"><MapPin size={16} className="mr-2"/> 5 Avenue Gambetta, Béziers</div>
               <div className="flex items-center"><Phone size={16} className="mr-2"/> Ouvert Dimanche</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
