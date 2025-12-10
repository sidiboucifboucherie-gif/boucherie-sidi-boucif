import React from 'react';
import { User, ShieldCheck, Heart, FileText, Lock, Scale, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Story: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Image Grid */}
          <div className="relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-100 rounded-tl-3xl -z-0"></div>
             <img 
               src="/images/boucher-au-travail.png" 
               alt="Boucher au travail" 
               className="relative z-10 w-full h-[500px] object-cover rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute -bottom-6 -right-6 bg-burgundy-800 p-8 rounded-sm shadow-lg z-20 hidden md:block">
                <p className="text-gold-500 text-4xl font-serif font-bold">10</p>
                <p className="text-white text-sm uppercase tracking-wider">Ans d'expérience</p>
             </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-burgundy-800 text-sm font-bold tracking-widest uppercase mb-2">À Propos</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-dark-900 mb-6">
              L'Artisanat au service du <span className="text-burgundy-700">Goût</span>
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Fondée en mars 2015 par <strong>Mohamed Sidi Boucif</strong>, notre boucherie est née d'une volonté simple : réconcilier l'exigence de la certification Halal avec l'excellence de la gastronomie française.
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Situés Avenue Gambetta à Béziers, nous sommes fiers de proposer une sélection rigoureuse : volailles fermières Label Rouge, bœuf VBF maturé, et une spécialité rare : la <strong>Triperie artisanale</strong> (cœur, foie, abats), découpée avec un savoir-faire traditionnel.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-sm hover:shadow-md transition-shadow">
                <User className="text-gold-500 mb-3" size={32} />
                <h4 className="font-bold text-dark-900">Artisan Proche</h4>
                <p className="text-sm text-gray-500">Un service humain et des conseils personnalisés.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-sm hover:shadow-md transition-shadow">
                <ShieldCheck className="text-gold-500 mb-3" size={32} />
                <h4 className="font-bold text-dark-900">Transparence</h4>
                <p className="text-sm text-gray-500">Origine France garantie et certification Halal stricte.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-sm hover:shadow-md transition-shadow">
                <Heart className="text-gold-500 mb-3" size={32} />
                <h4 className="font-bold text-dark-900">Passion</h4>
                <p className="text-sm text-gray-500">L'amour du produit bien fait et du travail soigné.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links Buttons */}
        <div className="border-t border-gray-100 pt-16">
           <h3 className="text-2xl font-serif font-bold text-dark-900 mb-8 text-center">Informations Légales & Engagements</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <button 
                onClick={() => navigate('/legal')}
                className="group flex items-center justify-between p-6 bg-white border border-gray-200 rounded-sm hover:border-burgundy-800 hover:shadow-lg transition-all duration-300"
              >
                 <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full group-hover:bg-burgundy-100 transition-colors">
                       <Scale className="text-gray-600 group-hover:text-burgundy-800" size={24} />
                    </div>
                    <span className="ml-4 font-bold text-gray-700 group-hover:text-burgundy-900 text-lg">Mentions Légales</span>
                 </div>
                 <ChevronRight className="text-gray-400 group-hover:text-gold-500 transform group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={() => navigate('/privacy')}
                className="group flex items-center justify-between p-6 bg-white border border-gray-200 rounded-sm hover:border-burgundy-800 hover:shadow-lg transition-all duration-300"
              >
                 <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full group-hover:bg-burgundy-100 transition-colors">
                       <Lock className="text-gray-600 group-hover:text-burgundy-800" size={24} />
                    </div>
                    <span className="ml-4 font-bold text-gray-700 group-hover:text-burgundy-900 text-lg">Confidentialité</span>
                 </div>
                 <ChevronRight className="text-gray-400 group-hover:text-gold-500 transform group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={() => navigate('/terms')}
                className="group flex items-center justify-between p-6 bg-white border border-gray-200 rounded-sm hover:border-burgundy-800 hover:shadow-lg transition-all duration-300"
              >
                 <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full group-hover:bg-burgundy-100 transition-colors">
                       <FileText className="text-gray-600 group-hover:text-burgundy-800" size={24} />
                    </div>
                    <span className="ml-4 font-bold text-gray-700 group-hover:text-burgundy-900 text-lg">CGV</span>
                 </div>
                 <ChevronRight className="text-gray-400 group-hover:text-gold-500 transform group-hover:translate-x-1 transition-all" />
              </button>

           </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
