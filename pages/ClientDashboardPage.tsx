import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, Heart, LogOut, ChevronRight, User } from 'lucide-react';

interface Order {
  id: number;
  created_at: string;
  total_cents: number;
  status: string;
  is_favorite: boolean;
  items: {
    product_id: number;
    quantity: number;
    product: {
      name: string;
      image_url: string;
      price_cents: number;
      id: string; // Ensure ID matches CartItem type
      category: string;
      description: string;
    };
  }[];
}

const ClientDashboardPage: React.FC = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { toggleCart, addToCart } = useCart();
  const navigate = useNavigate();
  const [favoriteOrder, setFavoriteOrder] = useState<Order | null>(null);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading, navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch favorite order (client-side only until is_favorite column is added to schema)
      let favoriteOrderIds: number[] = [];
      try {
        const stored = localStorage.getItem('favoriteOrders');
        if (stored) favoriteOrderIds = JSON.parse(stored);
      } catch {}
      
      // Try to get favorite order from localStorage preference
      if (favoriteOrderIds.length > 0) {
        const { data: favData } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items (
              quantity,
              product:products (
                id,
                name,
                image_url,
                price_cents,
                category,
                description
              )
            )
          `)
          .eq('user_id', user?.id)
          .in('id', favoriteOrderIds)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (favData) {
          setFavoriteOrder({ ...favData, is_favorite: true });
        }
      }
      
      // If no favorite found, get most recent order as fallback
      if (!favoriteOrder) {
        const { data: recentData } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items (
              quantity,
              product:products (
                id,
                name,
                image_url,
                price_cents,
                category,
                description
              )
            )
          `)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (recentData) {
          setFavoriteOrder({ ...recentData, is_favorite: false });
        }
      }

      // Fetch most recent order (if not already fetched as favorite)
      if (!recentOrder) {
        const { data: recentData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (recentData) setRecentOrder(recentData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (order: Order) => {
    if (!order.items) return;
    
    order.items.forEach(item => {
      if (item.product) {
        // Adapt product to match CartItem interface
        const productForCart = {
           id: String(item.product.id),
           name: item.product.name,
           price: (item.product.price_cents / 100).toFixed(2).replace('.', ',') + '€',
           image: item.product.image_url,
           category: item.product.category as any, // Cast if necessary or ensure type match
           description: item.product.description,
           badges: [] // Default empty badges
        };
        addToCart(productForCart);
      }
    });
    toggleCart(); // Open cart to show items
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-stone-50">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-burgundy-100 p-3 rounded-full">
              <User className="h-8 w-8 text-burgundy-900" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-dark-900">Mon Espace Client</h1>
              <p className="text-sm text-gray-500">Bonjour, {user?.email?.split('@')[0] || 'Client'}</p>
            </div>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* My Cart Button */}
          <button 
            onClick={toggleCart}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center space-y-3 group"
          >
            <div className="bg-gold-100 p-4 rounded-full group-hover:bg-gold-200 transition-colors">
              <ShoppingBag className="h-8 w-8 text-burgundy-900" />
            </div>
            <span className="font-bold text-gray-900">Mon Panier</span>
          </button>

          {/* Order History Button */}
          <Link 
            to="/orders"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center space-y-3 group"
          >
            <div className="bg-burgundy-50 p-4 rounded-full group-hover:bg-burgundy-100 transition-colors">
              <Clock className="h-8 w-8 text-burgundy-900" />
            </div>
            <span className="font-bold text-gray-900">Historique</span>
          </Link>
        </div>

        {/* Favorite Order Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif font-bold text-dark-900 flex items-center">
              <Heart className="h-5 w-5 text-burgundy-900 mr-2" fill="currentColor" />
              Commande Préférée
            </h2>
          </div>
          
          {favoriteOrder ? (
            <div>
              <div className="bg-stone-50 rounded-lg p-4 mb-4 border border-stone-100">
                <p className="font-medium text-gray-900 mb-2">Commande du {new Date(favoriteOrder.created_at).toLocaleDateString('fr-FR')}</p>
                <p className="text-burgundy-900 font-bold text-xl mb-1">{(favoriteOrder.total_cents / 100).toFixed(2)}€</p>
                <p className="text-xs text-gray-500">{favoriteOrder.items?.length || 0} articles</p>
              </div>
              <button 
                onClick={() => handleReorder(favoriteOrder)}
                className="w-full bg-burgundy-900 text-white py-3 rounded-lg font-bold shadow-sm hover:bg-burgundy-800 transition-colors flex items-center justify-center"
              >
                <ShoppingBag size={18} className="mr-2" />
                Commander à nouveau
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm mb-4">Vous n'avez pas encore défini de commande préférée.</p>
              <Link to="/orders" className="text-burgundy-900 font-medium text-sm flex items-center justify-center hover:underline">
                Aller à l'historique pour en définir une <ChevronRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity / Quick Stats */}
        {recentOrder && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Dernière commande</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">#{recentOrder.id}</p>
                <p className="text-sm text-gray-500">{new Date(recentOrder.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                recentOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                recentOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {recentOrder.status === 'delivered' ? 'Livrée' :
                 recentOrder.status === 'pending' ? 'En attente' :
                 recentOrder.status === 'processing' ? 'En préparation' : recentOrder.status}
              </span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button 
          onClick={() => signOut()}
          className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <LogOut size={18} className="mr-2" />
          Se déconnecter
        </button>

      </div>
    </div>
  );
};

export default ClientDashboardPage;
