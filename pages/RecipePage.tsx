import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RECIPES } from '../constants';

const RecipePage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-burgundy-800 text-sm font-bold tracking-widest uppercase mb-2">Inspiration</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-900 mb-6">Nos Recettes Gourmandes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Découvrez comment sublimer nos produits avec ces recettes traditionnelles et savoureuses.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECIPES.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-burgundy-900 shadow-sm">
                  {recipe.difficulty}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-dark-900 mb-3">{recipe.title}</h3>
                
                <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-gold-500" />
                    {recipe.prepTime}
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1 text-gold-500" />
                    {recipe.servings} pers.
                  </div>
                </div>

                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <h4 className="font-bold text-burgundy-900 text-sm mb-2 flex items-center">
                      <ChefHat size={16} className="mr-2" /> Ingrédients
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="list-none text-gold-600 italic text-xs pl-4">et {recipe.ingredients.length - 3} autres...</li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <Link 
                  to={`/recipes/${recipe.id}`}
                  className="mt-auto w-full bg-stone-100 hover:bg-gold-500 hover:text-white text-burgundy-900 font-bold py-2 px-4 rounded-sm transition-colors text-sm border border-stone-200 hover:border-gold-500 text-center block"
                >
                  Voir la recette complète
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;