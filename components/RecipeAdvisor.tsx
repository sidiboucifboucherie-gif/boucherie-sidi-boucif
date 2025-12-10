import React, { useState } from 'react';
import { getCookingAdvice } from '../services/geminiService';
import { ChefHat, Loader2, Sparkles, Send } from 'lucide-react';

const RecipeAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setAdvice(null);
    
    // Simulate thinking delay for UX if API is instant
    const response = await getCookingAdvice(input);
    
    setLoading(false);
    setAdvice(response);
  };

  return (
    <section className="py-16 bg-burgundy-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <ChefHat size={300} />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-burgundy-800 rounded-full mb-4 border border-gold-500/30">
             <Sparkles className="text-gold-400 mr-2" size={20}/>
             <span className="text-gold-400 font-bold text-sm uppercase">Nouveau</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">L'Assistant Culinaire du Boucher</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Vous ne savez pas comment cuisiner un morceau ? Demandez à notre assistant intelligent. 
            Indiquez une viande (ex: "Gigot d'agneau", "Foie de veau") et recevez le conseil du chef.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10 shadow-2xl">
          <form onSubmit={handleAsk} className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Cuisiner un rôti de bœuf..."
              className="flex-1 px-6 py-4 rounded-sm text-dark-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button
              type="submit"
              disabled={loading || !input}
              className={`px-8 py-4 bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold rounded-sm transition-all flex items-center justify-center ${
                (loading || !input) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} className="mr-2"/> Demander</>}
            </button>
          </form>

          {advice && (
            <div className="bg-burgundy-800/50 border-l-4 border-gold-500 p-6 rounded-r-sm animate-fade-in">
              <h4 className="flex items-center text-gold-400 font-serif font-bold mb-2">
                <ChefHat className="mr-2" size={20}/> Le conseil de l'artisan
              </h4>
              <p className="text-lg text-gray-100 leading-relaxed italic">
                "{advice}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeAdvisor;