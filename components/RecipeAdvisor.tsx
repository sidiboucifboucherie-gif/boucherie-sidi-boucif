import React from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

const RecipeAdvisor: React.FC = () => {
  return (
    <section className="py-16 bg-burgundy-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <ChefHat size={300} />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-burgundy-800 rounded-full mb-4 border border-gold-500/30">
            <Sparkles className="text-gold-400 mr-2" size={20} />
            <span className="text-gold-400 font-bold text-sm uppercase">Conseil du boucher</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Nos Conseils de Préparation</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Besoin d&apos;une idée pour cuisiner une pièce de viande ? Passez directement à la
            boucherie ou appelez-nous : Mohamed se fera un plaisir de vous conseiller selon votre
            menu, votre budget et le nombre de convives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecipeAdvisor;
