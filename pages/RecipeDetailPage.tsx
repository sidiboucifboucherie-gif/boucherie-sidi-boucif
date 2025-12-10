import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';
import { RECIPES } from '../constants';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = RECIPES.find(r => r.id === id);

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  return (
    <div className="pt-28 pb-20 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/recipes" className="inline-flex items-center text-burgundy-900 hover:text-gold-500 mb-8 transition-colors font-medium">
          <ArrowLeft className="mr-2" size={20} /> Retour aux recettes
        </Link>

        <div className="bg-white rounded-sm shadow-xl overflow-hidden">
          <div className="h-96 relative">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-burgundy-900 shadow-lg">
              {recipe.difficulty}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-serif font-bold text-dark-900 mb-6">{recipe.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-10 text-gray-600 border-b border-stone-100 pb-8">
              <div className="flex items-center bg-stone-50 px-4 py-2 rounded-full">
                <Clock size={20} className="mr-2 text-gold-500" />
                <span className="font-semibold">{recipe.prepTime}</span>
              </div>
              <div className="flex items-center bg-stone-50 px-4 py-2 rounded-full">
                <Users size={20} className="mr-2 text-gold-500" />
                <span className="font-semibold">{recipe.servings} personnes</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-serif font-bold text-burgundy-900 mb-6 flex items-center">
                  <ChefHat className="mr-3" /> Ingrédients
                </h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-gold-500 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-burgundy-900 mb-6">Préparation</h3>
                <div className="space-y-6">
                  {recipe.steps.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-burgundy-100 text-burgundy-900 flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;