import React from 'react';
import { Truck, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliveryPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-stone-100 min-h-screen">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-4xl md:text-5xl font-serif font-bold text-burgundy-900 mb-8 text-center">Livraison & Service</h1>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Delivery Info */}
            <div className="space-y-8">
               <div className="bg-white p-8 rounded-sm shadow-md border-t-4 border-gold-500">
                  <h3 className="text-2xl font-bold mb-4 flex items-center text-dark-900">
                     <Truck className="mr-3 text-gold-500" size={28}/> Service de Livraison
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                     Pour votre confort, la Boucherie Sidi Boucif propose un service de livraison rapide et respectueux de la chaîne du froid. 
                     Commandez vos pièces préférées et recevez-les directement chez vous.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                     <li className="flex items-center"><MapPin className="text-burgundy-800 mr-2" size={18}/> <strong>Zone :</strong> Béziers et ses environs (15km)</li>
                     <li className="flex items-center"><Clock className="text-burgundy-800 mr-2" size={18}/> <strong>Horaires :</strong> 12:00 - 14:00 et après 20:00</li>
                     <li className="flex items-center"><Truck className="text-burgundy-800 mr-2" size={18}/> <strong>Frais :</strong> Gratuit dès 50€ d'achat</li>
                  </ul>
               </div>

               <div className="bg-white p-8 rounded-sm shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-dark-900">Notre Engagement</h3>
                  <p className="text-gray-600 mb-4">
                     En tant qu'artisan boucher passionné, nous nous engageons à vous fournir des viandes d'une qualité irréprochable. 
                     Chaque pièce est préparée à la demande pour garantir une fraîcheur optimale à la livraison.
                  </p>
                  <p className="text-gray-600">
                     Nous desservons les quartiers de Béziers ainsi que les communes limitrophes : Boujan-sur-Libron, Maraussan, Lignan-sur-Orb, Villeneuve-lès-Béziers.
                  </p>
               </div>
            </div>

            {/* Map */}
            <div className="h-full min-h-[400px] bg-white p-2 rounded-sm shadow-md">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.8!2d3.2!3d43.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b10f!2s5%20Av.%20Gambetta%2C%2034500%20B%C3%A9ziers!5e0!3m2!1sfr!2sfr!4v1600000000000!5m2!1sfr!2sfr" 
                 width="100%" 
                 height="100%" 
                 style={{border:0, minHeight: '400px'}} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
         </div>

         {/* CTA Section */}
         <div className="mt-16 text-center bg-white p-12 rounded-sm shadow-md border-t-4 border-burgundy-900">
            <h2 className="text-3xl font-serif font-bold text-burgundy-900 mb-6">Prêt à commander ?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
               Découvrez notre sélection de viandes d'exception et passez votre commande dès maintenant pour une livraison rapide.
            </p>
            <Link to="/products" className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-sm transition-colors text-lg shadow-lg">
               Découvrir nos produits
            </Link>
         </div>
       </div>
    </div>
  );
};

export default DeliveryPage;
