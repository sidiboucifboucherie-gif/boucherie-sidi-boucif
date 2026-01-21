import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Users, ShoppingBag, Package, MessageSquare, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Produits', value: stats.products, icon: Package, color: 'bg-blue-500' },
    { label: 'Commandes', value: stats.orders, icon: ShoppingBag, color: 'bg-green-500' },
    { label: 'Utilisateurs', value: stats.users, icon: Users, color: 'bg-purple-500' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'bg-yellow-500' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-800 mb-6">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Activités Récentes</h2>
            <TrendingUp className="text-gray-400" size={20} />
          </div>
          <p className="text-gray-500 text-sm">Aucune activité récente à afficher.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Aperçu des Ventes</h2>
          </div>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">Graphique des ventes à venir</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
