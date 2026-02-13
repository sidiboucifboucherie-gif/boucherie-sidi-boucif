import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { ShoppingBag, Eye, CheckCircle, Truck, XCircle, Clock, X, Edit2, Trash2 } from 'lucide-react';

interface Order {
  id: string;
  created_at: string;
  total_cents: number;
  status: string;
  payment_status: string;
  customer_name: string;
  contact_email: string;
  contact_phone: string;
  delivery_address: string;
  notes: string;
}

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price_cents: number;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching orders:', error);
    else setOrders(data || []);
    setLoading(false);
  };

  const fetchOrderItems = async (orderId: string) => {
    setItemsLoading(true);
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        id,
        quantity,
        price_cents,
        product_id,
        products (name)
      `)
      .eq('order_id', orderId);

    if (error) {
      console.error('Error fetching items:', error);
    } else {
      // Map the joined data to flat structure
      const formattedItems = data.map((item: any) => ({
        id: item.id,
        product_name: item.products?.name || 'Produit supprimé',
        quantity: item.quantity,
        price_cents: item.price_cents
      }));
      setOrderItems(formattedItems);
    }
    setItemsLoading(false);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.id);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedOrder) return;
    setUpdating(true);

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', selectedOrder.id);

    if (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    } else {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      fetchOrders(); // Refresh list
    }
    setUpdating(false);
  };

  const handleUpdatePaymentStatus = async (newStatus: string) => {
    if (!selectedOrder) return;
    setUpdating(true);

    const { error } = await supabase
      .from('orders')
      .update({ payment_status: newStatus })
      .eq('id', selectedOrder.id);

    if (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    } else {
      setSelectedOrder({ ...selectedOrder, payment_status: newStatus });
      fetchOrders(); // Refresh list
    }
    setUpdating(false);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.')) {
      return;
    }

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) {
      console.error('Error deleting order:', error);
      alert('Erreur lors de la suppression de la commande');
    } else {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"><CheckCircle size={14} className="mr-1"/> Confirmée</span>;
      case 'shipped': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"><Truck size={14} className="mr-1"/> Expédiée (Livrée)</span>;
      case 'cancelled': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"><XCircle size={14} className="mr-1"/> Annulée</span>;
      default: return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"><Clock size={14} className="mr-1"/> En attente</span>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Payé</span>;
      case 'refunded': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Remboursé</span>;
      default: return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Non payé</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-800 mb-6">Gestion des Commandes</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Commande</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-4 text-center">Chargement...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-4 text-center">Aucune commande trouvée.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">#{order.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.customer_name}
                    <div className="text-xs text-gray-500">{order.contact_email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {(order.total_cents / 100).toFixed(2)}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPaymentBadge(order.payment_status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-burgundy-900 hover:text-burgundy-700 mr-3"
                      title="Voir détails"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Commande #{selectedOrder.id.slice(0, 8)}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                    <X size={24} />
                  </button>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Client</h4>
                      <p className="text-sm text-gray-900">{selectedOrder.customer_name}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.contact_email}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.contact_phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Livraison</h4>
                      <p className="text-sm text-gray-900">{selectedOrder.delivery_address}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                    <p className="text-sm text-gray-900 italic">{selectedOrder.notes || "Aucune note"}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Articles</h4>
                    {itemsLoading ? (
                      <p className="text-sm text-gray-500">Chargement des articles...</p>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {orderItems.map((item) => (
                          <li key={item.id} className="py-2 flex justify-between">
                            <span className="text-sm text-gray-900">
                              {item.quantity}x {item.product_name}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {(item.price_cents * item.quantity / 100).toFixed(2)}€
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-2 text-right font-bold text-lg text-burgundy-900">
                      Total: {(selectedOrder.total_cents / 100).toFixed(2)}€
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="mt-8 bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Mettre à jour le statut</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">État de la commande</label>
                        <select 
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm rounded-md"
                          value={selectedOrder.status}
                          onChange={(e) => handleUpdateStatus(e.target.value)}
                          disabled={updating}
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmée</option>
                          <option value="shipped">Expédiée / Livrée</option>
                          <option value="cancelled">Annulée</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Paiement</label>
                        <select 
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm rounded-md"
                          value={selectedOrder.payment_status}
                          onChange={(e) => handleUpdatePaymentStatus(e.target.value)}
                          disabled={updating}
                        >
                          <option value="pending">Non payé</option>
                          <option value="paid">Payé</option>
                          <option value="refunded">Remboursé</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-burgundy-900 text-base font-medium text-white hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
