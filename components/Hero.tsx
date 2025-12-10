import React from 'react';
import { ChevronDown, Star, Award, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen min-h-[600px] bg-dark-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/90 via-burgundy-900/70 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-white pt-16">
          <div className="flex items-center space-x-2 mb-4 animate-fade-in-up">
            <span className="px-3 py-1 border border-gold-500 text-gold-500 text-xs font-bold tracking-widest uppercase rounded-sm">Depuis 2015</span>
            <span className="px-3 py-1 bg-gold-500 text-burgundy-900 text-xs font-bold tracking-widest uppercase rounded-sm">Ouvert Dimanche</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-white drop-shadow-lg">
            L'Excellence <br/>
            <span className="text-gold-500 italic">Halal & Française</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 font-light max-w-lg leading-relaxed">
            Une alliance unique entre la tradition bouchère artisanale et les meilleurs labels de la gastronomie française (Label Rouge, VBF).
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/products')}
              className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold py-4 px-8 rounded-sm transition-all transform hover:-translate-y-1 shadow-lg border-2 border-gold-500"
            >
              Découvrir nos viandes
            </button>
            <button 
              onClick={() => navigate('/recipes')}
              className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 rounded-sm transition-all border-2 border-white"
            >
              Nos Idées Recettes
            </button>
          </div>

          {/* Badges */}
          <div className="mt-12 flex items-center space-x-6 text-sm font-medium text-gray-300">
            <div className="flex items-center"><Award className="text-gold-500 mr-2" size={20}/> Viande Bovine Française</div>
            <div className="flex items-center"><CheckCircle className="text-gold-500 mr-2" size={20}/> Certifié Halal</div>
            <div className="flex items-center"><Star className="text-gold-500 mr-2" size={20}/> Label Rouge</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer" onClick={() => navigate('/about')}>
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

export default Hero;