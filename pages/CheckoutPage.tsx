import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, ChevronLeft, MapPin, Phone, Mail, User, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CheckoutPage: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [moneticoForm, setMoneticoForm] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  // Auto-submit form when monetico data is ready
  useEffect(() => {
    if (moneticoForm && formRef.current) {
        // DEBUG: Disable auto-submit to allow inspection
        console.log("DEBUG MONETICO FORM DATA:", moneticoForm);
        // formRef.current.submit();
    }
  }, [moneticoForm]);

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
      // 1. Create Order in Pending State
      // Note: Payment status is 'pending' initially.
      // If it's a card payment, we redirect to Monetico.
      // If it's cash on delivery (not implemented yet), we might confirm immediately.
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user?.id || null, // Allow guest checkout
          status: 'pending',
          payment_status: 'pending', // Always pending until callback
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

      // 3. Initiate Payment with Monetico (Edge Function)
      // We send the order ID and amount to get the signature
      const { data: paymentData, error: funcError } = await supabase.functions.invoke('monetico-init', {
        body: {
          orderId: order.id,
          amount: total.toFixed(2),
          email: formData.email,
          origin: window.location.origin
        }
      });

      if (funcError) throw funcError;
      
      // Check for application-level error from the function (status 200 but success: false)
      if (paymentData && !paymentData.success && paymentData.error) {
        throw new Error(`Erreur de paiement: ${paymentData.error}`);
      }

      console.log('Payment Init Data:', paymentData);
      
      // 4. Set form data to trigger auto-submit
      setMoneticoForm(paymentData);
      
      // We do NOT clear cart yet. We clear it on return (success page) or webhook.
      // Actually for UX, we might clear it here if we assume redirection works, 
      // but if they cancel, they lose the cart. Better to keep it until success.

    } catch (err: any) {
      console.error('Error placing order:', err);
      alert(`Une erreur est survenue: ${err.message || 'Veuillez réessayer.'}`);
      setLoading(false);
    }
  };

  if (step === 3) {
    // We shouldn't really get here directly anymore with Monetico redirection,
    // unless we have a different flow.
    return null; 
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Steps */}
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
                    <button onClick={() => setStep(1)} className="text-sm text-burgundy-900 hover:text-burgundy-700 flex items-center">
                      <Edit2 size={14} className="mr-1" /> Modifier
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm">
                    <p className="font-medium text-gray-900">{formData.fullName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.postalCode} {formData.city}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>

                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                    <div className="bg-burgundy-100 p-2 rounded-full mr-3">
                      <CreditCard className="h-5 w-5 text-burgundy-900" />
                    </div>
                    Paiement
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    {/* DEBUG MSG */}
                    {moneticoForm && (
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                            <p className="font-bold">Mode DEBUG activé</p>
                            <p>Le formulaire Monetico est prêt. Vérifiez la CONSOLE (F12) pour les détails de signature.</p>
                            <button 
                                onClick={() => formRef.current?.submit()}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
                            >
                                CONTINUER VERS LE PAIEMENT (Après vérification)
                            </button>
                        </div>
                    )}
                    
                    <label className={`relative flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-burgundy-500 bg-burgundy-50 ring-1 ring-burgundy-500' : 'border-gray-300 hover:bg-gray-50'}`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment-method"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300"
                        />
                        <span className="ml-3 block text-sm font-medium text-gray-900">
                          Carte Bancaire
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Icons for cards */}
                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Retour
                  </button>
                  
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="inline-flex justify-center py-4 px-8 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-burgundy-900 hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Redirection vers le paiement...
                      </span>
                    ) : (
                      `Payer ${total.toFixed(2)} €`
                    )}
                  </button>
                </div>

                {/* Hidden Form for Monetico Redirection */}
                {moneticoForm && (
                  <form 
                    ref={formRef} 
                    action={moneticoForm.actionUrl} 
                    method="POST" 
                    className="hidden"
                  >
                    {Object.entries(moneticoForm.fields).map(([key, value]) => (
                      <input key={key} type="hidden" name={key} value={value as string} />
                    ))}
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
