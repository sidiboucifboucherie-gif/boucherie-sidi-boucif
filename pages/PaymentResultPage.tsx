import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentResultPage: React.FC = () => {
  const { status } = useParams<{ status: string }>();
  const { clearCart } = useCart();

  useEffect(() => {
    if (status === 'success') {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      {status === 'success' ? (
        <div className="max-w-md mx-auto bg-green-50 p-8 rounded-lg border border-green-200">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Paiement Réussi !</h1>
          <p className="text-green-700 mb-6">
            Merci pour votre commande. Vous recevrez un email de confirmation bientôt.
          </p>
          <Link 
            to="/orders" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Voir mes commandes
          </Link>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-red-50 p-8 rounded-lg border border-red-200">
          <h1 className="text-3xl font-bold text-red-800 mb-4">Paiement Échoué</h1>
          <p className="text-red-700 mb-6">
            Le paiement a été annulé ou refusé. Aucune somme n'a été débitée.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/checkout" 
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
            >
              Réessayer
            </Link>
            <Link 
              to="/contact" 
              className="inline-block border border-red-600 text-red-600 px-6 py-3 rounded-md hover:bg-red-50 transition-colors"
            >
              Contacter le support
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResultPage;
