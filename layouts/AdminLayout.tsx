import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    MessageSquare, 
    Users, 
    Package, 
    LogOut, 
    Menu, 
    X,
    ChevronLeft,
    Tags
  } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy-900"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
    { icon: Package, label: 'Produits', path: '/admin/products' },
    { icon: Tags, label: 'Catégories', path: '/admin/categories' },
    { icon: ShoppingBag, label: 'Commandes', path: '/admin/orders' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-burgundy-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${!sidebarOpen && 'lg:w-20'}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-burgundy-950">
          <div className={`font-serif font-bold tracking-wide transition-opacity duration-300 ${!sidebarOpen ? 'lg:hidden' : 'block'}`}>
            ADMIN PANEL
          </div>
          {/* Desktop Toggle */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-1 rounded-md hover:bg-burgundy-800 text-gold-500"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
          {/* Mobile Close */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-burgundy-800 text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-sm transition-colors duration-200 group ${
                location.pathname === item.path 
                  ? 'bg-burgundy-800 text-gold-500' 
                  : 'text-gray-300 hover:bg-burgundy-800 hover:text-white'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              <span className={`${!sidebarOpen ? 'lg:hidden' : 'block'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-burgundy-800 bg-burgundy-950">
          <Link 
            to="/" 
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-burgundy-800 rounded-sm mb-2"
            title={!sidebarOpen ? "Retour au site" : undefined}
          >
            <LogOut size={20} className={`transform rotate-180 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
            <span className={`${!sidebarOpen ? 'lg:hidden' : 'block'}`}>Retour au site</span>
          </Link>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-2 text-sm text-red-300 hover:text-red-100 hover:bg-burgundy-800 rounded-sm"
            title={!sidebarOpen ? "Déconnexion" : undefined}
          >
            <LogOut size={20} className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
            <span className={`${!sidebarOpen ? 'lg:hidden' : 'block'}`}>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm h-16 flex items-center px-4 justify-between">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
          <span className="font-serif font-bold text-burgundy-900">Administration</span>
          <div className="w-6"></div> {/* Spacer for centering */}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
