import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Users, ShoppingBag, Package, MessageSquare, TrendingUp, RefreshCw, DollarSign, Clock, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  products: number;
  orders: number;
  users: number;
  messages: number;
}

interface RecentOrder {
  id: string; // uuid
  created_at: string;
  customer_name: string;
  total_cents: number;
  status: string;
  payment_status: string;
}

interface RecentMessage {
  id: number;
  created_at: string;
  name: string;
  subject: string;
  read: boolean;
}

type ActivityItem = 
  | { type: 'order'; data: RecentOrder }
  | { type: 'message'; data: RecentMessage };

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    orders: 0,
    users: 0,
    messages: 0
  });
  
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      
      // 1. Fetch Counts
      const [
        { count: productsCount },
        { count: ordersCount },
        { count: usersCount },
        { count: messagesCount }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        products: productsCount || 0,
        orders: ordersCount || 0,
        users: usersCount || 0,
        messages: messagesCount || 0
      });

      // 2. Fetch Recent Orders (Last 5)
      const { data: ordersData } = await supabase
        .from('orders')
        .select('id, created_at, customer_name, total_cents, status, payment_status')
        .order('created_at', { ascending: false })
        .limit(5);

      const fetchedOrders = (ordersData || []) as RecentOrder[];
      setRecentOrders(fetchedOrders);

      // 3. Fetch Recent Messages (Last 5)
      const { data: messagesData } = await supabase
        .from('contact_messages')
        .select('id, created_at, name, subject, read')
        .order('created_at', { ascending: false })
        .limit(5);

      const fetchedMessages = (messagesData || []) as RecentMessage[];

      // 4. Combine for Recent Activity
      const activities: ActivityItem[] = [
        ...fetchedOrders.map(o => ({ type: 'order' as const, data: o })),
        ...fetchedMessages.map(m => ({ type: 'message' as const, data: m }))
      ].sort((a, b) => new Date(b.data.created_at).getTime() - new Date(a.data.created_at).getTime())
      .slice(0, 10); // Show top 10 combined

      setRecentActivity(activities);

      // 5. Calculate Revenue (approximate - sum of all non-cancelled orders or just paid ones)
      // For now, let's sum 'paid' orders.
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total_cents')
        .eq('payment_status', 'paid');
      
      const total = (revenueData || []).reduce((acc, curr) => acc + curr.total_cents, 0);
      setTotalRevenue(total);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2) + '€';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const statCards = [
    { label: 'Total Produits', value: stats.products, icon: Package, color: 'bg-blue-500' },
    { label: 'Commandes', value: stats.orders, icon: ShoppingBag, color: 'bg-green-500' },
    { label: 'Utilisateurs', value: stats.users, icon: Users, color: 'bg-purple-500' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'bg-yellow-500' },
  ];

  if (loading && !refreshing && stats.orders === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">Tableau de Bord</h1>
        <button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 transition-colors"
        >
          <RefreshCw size={16} className={`${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Actualisation...' : 'Actualiser'}</span>
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <div className={`p-4 rounded-full ${card.color} bg-opacity-10 mr-4`}>
              <card.icon className={`w-8 h-8 ${card.color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sales Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <DollarSign className="mr-2 text-green-600" size={20} />
              Aperçu des Ventes
            </h2>
            <div className="text-sm text-gray-500">
              Total Revenus (Payés): <span className="font-bold text-gray-900">{formatPrice(totalRevenue)}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">Aucune vente récente.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${order.payment_status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      <ShoppingBag size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer_name || 'Client'}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{formatPrice(order.total_cents)}</p>
                    <p className={`text-xs capitalize ${order.status === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                      {order.status === 'delivered' ? 'Livrée' : order.status}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {recentOrders.length > 0 && (
              <div className="pt-4 text-center">
                <Link to="/admin/orders" className="text-sm text-burgundy-900 hover:text-burgundy-700 font-medium">
                  Voir toutes les commandes
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <TrendingUp className="mr-2 text-blue-600" size={20} />
              Activités Récentes
            </h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">Aucune activité récente.</p>
            ) : (
              recentActivity.map((item, index) => (
                <div key={`${item.type}-${index}`} className="flex items-start space-x-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="mt-1">
                    {item.type === 'order' ? (
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full">
                        <ShoppingBag size={14} />
                      </div>
                    ) : (
                      <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-full">
                        <Mail size={14} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">
                      {item.type === 'order' ? (
                        <>
                          <span className="font-medium">Nouvelle commande</span> de {item.data.customer_name}
                        </>
                      ) : (
                        <>
                          <span className="font-medium">Nouveau message</span> de {item.data.name}
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {item.type === 'order' ? (
                        `Montant: ${formatPrice(item.data.total_cents)} • Statut: ${item.data.status}`
                      ) : (
                        `Sujet: ${item.data.subject}`
                      )}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(item.data.created_at)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
