import React from 'react';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 border-t border-burgundy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Brand & Socials */}
          <div>
            <div className="mb-6">
                <img src="/logo.png" alt="Boucherie Sidi Boucif" className="h-16 w-16 rounded-full border-2 border-gold-500" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Boucherie artisanale de référence à Béziers depuis 1980. 
              Nous nous engageons à vous offrir le meilleur de la viande Halal et Française (Label Rouge, VBF).
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-gold-500 font-bold mb-4 text-lg uppercase tracking-wider">
              <Clock className="mr-2 inline-block mb-1" size={20} /> Horaires
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
               <p>Ouvert du <span className="text-white font-medium">Mardi au Dimanche</span></p>
               <p className="flex justify-between max-w-[200px]"><span>Matin:</span> <span className="text-white">08:00 - 12:00</span></p>
               <p className="flex justify-between max-w-[200px]"><span>Après-midi:</span> <span className="text-white">16:00 - 20:00</span></p>
               <p className="mt-4 pt-2 border-t border-gray-800 text-red-400">Fermé le Lundi</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 font-bold mb-4 text-lg uppercase tracking-wider">Nous Trouver</h4>
            <div className="space-y-4">
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start text-gray-400 hover:text-white transition-colors text-sm">
                <MapPin className="mr-3 text-gold-500 flex-shrink-0" size={18} />
                <span>5 Avenue Gambetta,<br/>34500 Béziers</span>
              </a>
              <a href="tel:0467282788" className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                <Phone className="mr-3 text-gold-500 flex-shrink-0" size={18} />
                <span>04 67 28 27 88</span>
              </a>
              <a href="mailto:contact@sidiboucif.fr" className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                <Mail className="mr-3 text-gold-500 flex-shrink-0" size={18} />
                <span>contact@sidiboucif.fr</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Boucherie Sidi Boucif. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link to="/legal" className="text-gray-500 hover:text-gold-500 transition-colors">Mentions Légales</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gold-500 transition-colors">Politique de Confidentialité</Link>
            <Link to="/terms" className="text-gray-500 hover:text-gold-500 transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
