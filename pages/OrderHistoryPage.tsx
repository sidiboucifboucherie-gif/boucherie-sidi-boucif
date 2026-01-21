import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Clock, Package, CheckCircle, XCircle, ShoppingBag, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: number;
  quantity: number;
  price_cents: number;
  product: {
    name: string;
    image_url: string;
  };
}

interface Order {
  id: number;
  created_at: string;
  status: string;
  payment_status: string;
  total_cents: number;
  delivery_address: string;
  is_favorite?: boolean; // Optional as it may not exist in schema
  items?: OrderItem[];
}

const OrderHistoryPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items (
            id,
            quantity,
            price_cents,
            product:products (
              name,
              image_url
            )
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Load favorite orders from localStorage (client-side only until schema is updated)
      let favoriteOrderIds: number[] = [];
      try {
        const stored = localStorage.getItem('favoriteOrders');
        if (stored) favoriteOrderIds = JSON.parse(stored);
      } catch {}
      
      // Add is_favorite field based on localStorage
      setOrders((data || []).map(order => ({ 
        ...order, 
        is_favorite: favoriteOrderIds.includes(order.id) || order.is_favorite || false 
      })));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livrée';
      case 'processing': return 'En préparation';
      case 'cancelled': return 'Annulée';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2) + '€';
  };

  const toggleOrder = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const toggleFavorite = async (e: React.MouseEvent, order: Order) => {
    e.stopPropagation();
    try {
      // Note: is_favorite field doesn't exist in the orders table schema
      // This is a client-side only feature until the schema is updated
      // For now, we'll just update the local state
      setOrders(orders.map(o => 
        o.id === order.id ? { ...o, is_favorite: !(o.is_favorite ?? false) } : 
        // Unmark others if marking this one as favorite (only one favorite allowed)
        !(o.is_favorite ?? false) ? o : { ...o, is_favorite: false }
      ));
      
      // Store in localStorage as a fallback until schema is updated
      const favoriteOrderIds = orders
        .map(o => o.id === order.id ? (!order.is_favorite ? o.id : null) : (o.is_favorite ? o.id : null))
        .filter((id): id is number => id !== null);
      localStorage.setItem('favoriteOrders', JSON.stringify(favoriteOrderIds));
      
      // TODO: Add is_favorite column to orders table in schema to enable server-side persistence
      // When schema is updated, uncomment the following:
      /*
      if (!order.is_favorite) {
        await supabase.from('orders').update({ is_favorite: false }).eq('user_id', user?.id);
      }
      const { error } = await supabase
        .from('orders')
        .update({ is_favorite: !order.is_favorite })
        .eq('id', order.id);
      if (error) throw error;
      */
    } catch (error) {
      console.error('Error updating favorite status:', error);
      fetchOrders(); // Revert on error
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 bg-stone-50 flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-serif font-bold text-dark-900 mb-4">Connectez-vous pour voir vos commandes</h2>
          <Link to="/login" className="inline-block bg-burgundy-900 text-white px-6 py-2 rounded-sm font-bold">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-dark-900 mb-8">Mes Commandes</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
            <Link to="/products" className="inline-block bg-burgundy-900 text-white px-6 py-2 rounded-sm font-bold hover:bg-burgundy-800 transition-colors">
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-stone-100 rounded-full">
                        <Package className="text-burgundy-900" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Commande #{order.id}</p>
                        <p className="font-bold text-dark-900">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <button 
                        onClick={(e) => toggleFavorite(e, order)}
                        className={`p-2 rounded-full transition-colors ${order.is_favorite ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-gray-400'}`}
                        title={order.is_favorite ? "Retirer des favoris" : "Marquer comme commande préférée"}
                      >
                        <Heart fill={order.is_favorite ? "currentColor" : "none"} size={24} />
                      </button>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-bold text-burgundy-900">{formatPrice(order.total_cents)}</p>
                      </div>
                      {expandedOrder === order.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t border-gray-100 bg-stone-50 p-6 animate-fadeIn">
                    <h4 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wide">Détails de la commande</h4>
                    <div className="space-y-4">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {item.product?.image_url && (
                              <img src={item.product.image_url} alt={item.product.name} className="w-12 h-12 object-cover rounded-sm" />
                            )}
                            <div>
                              <p className="font-medium text-dark-900">{item.product?.name || 'Produit'}</p>
                              <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-900">{formatPrice(item.price_cents * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <p className="font-medium mb-1">Adresse de livraison:</p>
                        <p>{order.delivery_address}</p>
                      </div>
                      {/* Can add re-order button here later */}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
