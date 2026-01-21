import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, ChevronLeft, MapPin, Phone, Mail, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CheckoutPage: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    instructions: ''
  });

  useEffect(() => {
    if (user && profile) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        email: profile.email || user.email || '',
        phone: profile.phone || ''
      }));
    }
  }, [user, profile]);

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      navigate('/products');
    }
  }, [cart, step, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user?.id || null, // Allow guest checkout if needed, or enforce auth
          status: 'pending',
          payment_status: paymentMethod === 'card' ? 'paid' : 'pending',
          total_cents: Math.round(total * 100),
          customer_name: formData.fullName,
          delivery_address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
          contact_email: formData.email,
          contact_phone: formData.phone,
          notes: formData.instructions
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: parseInt(item.id),
        quantity: item.quantity,
        price_cents: Math.round(parseFloat(item.price.replace('€', '').replace(',', '.')) * 100)
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Clear Cart & Success
      clearCart();
      setStep(3);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Commande Confirmée !</h2>
            <p className="mt-2 text-sm text-gray-600">
              Merci pour votre commande. Vous recevrez un email de confirmation bientôt.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-900 hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Steps (Optional visual cue) */}
        <div className="mb-8 flex items-center justify-center space-x-4 text-sm font-medium">
          <div className={`flex items-center ${step >= 1 ? 'text-burgundy-900' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-2 ${step >= 1 ? 'border-burgundy-900 bg-burgundy-50' : 'border-gray-300'}`}>1</span>
            Livraison
          </div>
          <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-burgundy-900' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-burgundy-900' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-2 ${step >= 2 ? 'border-burgundy-900 bg-burgundy-50' : 'border-gray-300'}`}>2</span>
            Paiement
          </div>
        </div>

        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center md:text-left">
          {step === 1 ? 'Informations de livraison' : 'Paiement sécurisé'}
        </h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Order Summary */}
          <div className="lg:col-span-5 bg-white shadow-sm rounded-lg p-6 mb-8 lg:mb-0 order-last lg:order-last">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif de la commande</h2>
            <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded-md object-cover mr-4" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {((parseFloat(item.price.replace('€', '').replace(',', '.')) * item.quantity)).toFixed(2)} €
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>{total.toFixed(2)} €</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">Taxes et frais de livraison inclus.</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-7">
            
            {step === 1 ? (
              /* STEP 1: DELIVERY FORM */
              <form onSubmit={handleDeliverySubmit} className="space-y-6">
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <div className="bg-burgundy-100 p-2 rounded-full mr-3">
                      <Truck className="h-5 w-5 text-burgundy-900" />
                    </div>
                    Adresse de livraison
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nom complet</label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm border p-3"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm border p-3"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm border p-3"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm border p-3"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm border p-3"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Code Postal</label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm border p-3"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions de livraison (optionnel)</label>
                      <textarea
                        name="instructions"
                        id="instructions"
                        rows={3}
                        value={formData.instructions}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm border p-3"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-burgundy-900 hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 transition-colors"
                >
                  Passer au paiement
                </button>
              </form>
            ) : (
              /* STEP 2: PAYMENT */
              <div className="space-y-6">
                
                {/* Recap Info */}
                <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Adresse de livraison</h2>
                    <button onClick={() => setStep(1)} className="text-burgundy-900 text-sm font-medium hover:underline">Modifier</button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900 flex items-center"><User size={14} className="mr-2"/> {formData.fullName}</p>
                    <p className="flex items-center"><MapPin size={14} className="mr-2"/> {formData.address}, {formData.postalCode} {formData.city}</p>
                    <p className="flex items-center"><Phone size={14} className="mr-2"/> {formData.phone}</p>
                    <p className="flex items-center"><Mail size={14} className="mr-2"/> {formData.email}</p>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                   <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                    <div className="bg-burgundy-100 p-2 rounded-full mr-3">
                      <CreditCard className="h-5 w-5 text-burgundy-900" />
                    </div>
                    Moyen de paiement
                  </h2>
                  
                  <div className="space-y-4">
                    <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-burgundy-500 bg-burgundy-50 ring-1 ring-burgundy-500' : 'border-gray-200 hover:border-burgundy-200'}`}>
                      <input
                        name="paymentMethod"
                        type="radio"
                        className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <div className="ml-3 flex-1">
                        <span className="block text-sm font-medium text-gray-900">Carte Bancaire</span>
                        <span className="block text-sm text-gray-500">Paiement sécurisé par Stripe (Test)</span>
                      </div>
                      <CreditCard className="h-6 w-6 text-gray-400" />
                    </label>

                    <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-burgundy-500 bg-burgundy-50 ring-1 ring-burgundy-500' : 'border-gray-200 hover:border-burgundy-200'}`}>
                      <input
                        name="paymentMethod"
                        type="radio"
                        className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                      />
                      <div className="ml-3 flex-1">
                        <span className="block text-sm font-medium text-gray-900">Paiement à la livraison</span>
                        <span className="block text-sm text-gray-500">Espèces ou Carte au livreur</span>
                      </div>
                      <Truck className="h-6 w-6 text-gray-400" />
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 pt-4">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-burgundy-900 hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50 transition-colors"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement en cours...
                      </span>
                    ) : (
                      `Payer ${total.toFixed(2)} €`
                    )}
                  </button>
                  
                  <button
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                  >
                    <ChevronLeft size={16} className="mr-1" /> Retour aux informations
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
