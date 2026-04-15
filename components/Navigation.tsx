import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, ShoppingBag, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { blogPosts } from '../data/seoContent';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);
  const [isMobileBlogMenuOpen, setIsMobileBlogMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleCart, totalItems } = useCart();
  const { user, signOut, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsBlogMenuOpen(false);
    setIsMobileBlogMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Nos Produits', path: '/products' },
    { label: 'À Propos', path: '/about' },
    { label: 'Livraison', path: '/delivery' },
    { label: 'Recettes', path: '/recipes' },
    { label: 'Contact', path: '/contact' },
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
             <img src="/logo.png" alt="Sidi Boucif" className="h-12 w-12 rounded-full mr-3 border-2 border-gold-500" />
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

            <div className="relative">
              <button
                onClick={() => setIsBlogMenuOpen((open) => !open)}
                className={`text-sm font-medium tracking-wider transition-colors duration-200 flex items-center ${
                  location.pathname.startsWith('/blog') ? 'text-gold-500 border-b-2 border-gold-500' : 'text-white hover:text-gold-400'
                }`}
                aria-expanded={isBlogMenuOpen}
                aria-haspopup="true"
              >
                <span>Blog</span>
                <ChevronDown size={16} className={`ml-2 transition-transform ${isBlogMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBlogMenuOpen && (
                <div className="absolute top-full left-0 mt-4 w-96 bg-white text-dark-900 rounded-sm shadow-2xl border border-stone-200 overflow-hidden">
                  <div className="p-4 bg-stone-50 border-b border-stone-200">
                    <Link
                      to="/blog"
                      className="block font-bold text-burgundy-900 hover:text-gold-600 transition-colors"
                    >
                      Tous les articles du blog
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">Acces direct au hub blog et a chaque page conseil.</p>
                  </div>
                  <div className="py-2">
                    {blogPosts.map((post) => (
                      <Link
                        key={post.path}
                        to={post.path}
                        className="block px-4 py-3 hover:bg-stone-50 transition-colors"
                      >
                        <p className="font-semibold text-dark-900">{post.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 px-4 py-2 rounded-sm font-bold text-sm transition-colors flex items-center shadow-md mr-4"
            >
              <ShoppingBag size={18} className="mr-2" />
              <span>Panier</span>
              {totalItems > 0 && (
                <span className="ml-2 bg-burgundy-900 text-gold-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
              )}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm hidden lg:block">
                  Bonjour, {user.user_metadata?.full_name || 'Client'}
                </span>
                <Link 
                  to="/dashboard" 
                  className="text-white hover:text-gold-400 text-sm font-medium transition-colors"
                >
                  Mon Espace Client
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="bg-burgundy-800 hover:bg-burgundy-700 text-gold-500 px-3 py-1 rounded-sm text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => signOut()}
                  className="text-white hover:text-gold-400 transition-colors"
                  title="Se déconnecter"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="text-white hover:text-gold-400 transition-colors flex items-center font-medium text-sm"
              >
                <UserIcon size={18} className="mr-2" />
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Cart + Menu Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleCart}
              className="relative text-white p-2"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-burgundy-900 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              aria-label="Ouvrir le menu"
            >
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
                className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${
                  isActive(item.path) ? 'bg-burgundy-900 text-gold-500' : 'text-white hover:bg-burgundy-700'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-1">
              <button
                onClick={() => setIsMobileBlogMenuOpen((open) => !open)}
                className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium rounded-md ${
                  location.pathname.startsWith('/blog') ? 'bg-burgundy-900 text-gold-500' : 'text-white hover:bg-burgundy-700'
                }`}
              >
                <span>Blog</span>
                <ChevronDown size={18} className={`transition-transform ${isMobileBlogMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileBlogMenuOpen && (
                <div className="mt-2 ml-3 border-l border-burgundy-600 pl-3 space-y-2">
                  <Link
                    to="/blog"
                    className="block px-3 py-2 rounded-md text-sm font-semibold text-gold-400 hover:bg-burgundy-700"
                  >
                    Tous les articles
                  </Link>
                  {blogPosts.map((post) => (
                    <Link
                      key={post.path}
                      to={post.path}
                      className="block px-3 py-2 rounded-md text-sm text-white hover:bg-burgundy-700"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => {
                toggleCart();
                setIsMobileMenuOpen(false);
              }}
              className="mt-2 w-full flex items-center justify-between px-3 py-3 text-base font-medium rounded-md bg-gold-500 text-burgundy-900 hover:bg-gold-600"
            >
              <span className="flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Panier
              </span>
              {totalItems > 0 && (
                <span className="ml-2 bg-burgundy-900 text-gold-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobile Auth Link */}
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-3 text-base font-medium rounded-md text-white hover:bg-burgundy-700 mb-2"
              >
                Mon Espace Client
              </Link>
            )}
            {user && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-3 text-base font-medium rounded-md text-gold-500 bg-burgundy-900 hover:bg-burgundy-700 mb-2"
              >
                Administration
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium rounded-md text-white hover:bg-burgundy-700 flex items-center"
              >
                <LogOut size={18} className="mr-2" />
                Se déconnecter
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-3 text-base font-medium rounded-md text-white hover:bg-burgundy-700 flex items-center"
              >
                <UserIcon size={18} className="mr-2" />
                Connexion
              </Link>
            )}

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
