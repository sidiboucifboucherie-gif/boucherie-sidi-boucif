import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Phone, Calendar, Trash2 } from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching messages:', error);
    else setMessages(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    const { error, count } = await supabase
      .from('contact_messages')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
      alert('Erreur technique lors de la suppression.');
    } else if (count === 0) {
      alert("Suppression impossible : Vous n'avez probablement pas les droits d'administrateur ou le message n'existe plus.");
    } else {
      setMessages(messages.filter(msg => msg.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-800 mb-6">Messages Reçus</h1>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Chargement...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun message</h3>
            <p className="mt-1 text-sm text-gray-500">Les messages du formulaire de contact apparaîtront ici.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-burgundy-900">
              <div className="flex flex-col md:flex-row justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{msg.subject || 'Sans sujet'}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-900 mr-2">{msg.name}</span>
                    <span className="flex items-center mr-4"><Mail size={14} className="mr-1" /> {msg.email}</span>
                    {msg.phone && <span className="flex items-center"><Phone size={14} className="mr-1" /> {msg.phone}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar size={14} className="mr-1" />
                    {new Date(msg.created_at).toLocaleString('fr-FR')}
                  </div>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                    title="Supprimer le message"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md text-gray-700 whitespace-pre-wrap text-sm">
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
