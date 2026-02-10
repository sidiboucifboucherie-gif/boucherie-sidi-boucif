import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, ChefHat, Truck, MapPin, ShoppingCart } from 'lucide-react';
import Hero from '../components/Hero';
import { RECIPES } from '../constants';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';
import { Product } from '../types';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const featuredRecipes = RECIPES.slice(0, 2);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(slug)
          `)
          .eq('is_active', true)
          .limit(3)
          .order('id'); // Or order by popularity/created_at if available

        if (error) {
          console.error('Error fetching featured products:', error);
          return;
        }

        if (data) {
          const formattedProducts: Product[] = data.map(p => ({
            id: p.id.toString(),
            name: p.name,
            category: p.category?.slug || 'uncategorized',
            description: p.description || '',
            badges: p.badges || [],
            imageUrl: p.image_url || '/images/placeholder-meat.png',
            price: (p.price_cents / 100).toFixed(2).replace('.', ',') + '€'
          }));
          setFeaturedProducts(formattedProducts);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <Hero />

      {/* Featured Products Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-burgundy-800 text-sm font-bold tracking-widest uppercase mb-2">Nos Viandes</h2>
            <h2 className="text-4xl font-serif font-bold text-dark-900 mb-4">Découvrez nos produits d'exception</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Sélectionnés avec rigueur auprès des meilleurs éleveurs français.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-0 right-0 p-4">
                    {product.badges.slice(0, 1).map((badge, idx) => (
                      <span key={idx} className="bg-gold-500 text-burgundy-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-dark-900">{product.name}</h3>
                    <span className="text-lg font-bold text-burgundy-900 bg-gold-50 px-2 py-1 rounded-sm">{product.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-stone-100 hover:bg-gold-500 hover:text-white text-burgundy-900 font-bold py-2 px-4 rounded-sm transition-colors text-sm border border-stone-200 hover:border-gold-500 flex items-center justify-center"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products" className="inline-block bg-burgundy-900 hover:bg-burgundy-800 text-white font-bold py-3 px-8 rounded-sm transition-colors shadow-md">
              Voir toute la boutique
            </Link>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 items-center">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-burgundy-800 text-sm font-bold tracking-widest uppercase mb-2">Inspiration</h2>
              <h2 className="text-4xl font-serif font-bold text-dark-900 mb-6">Nos Idées Recettes</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Manque d'inspiration pour le dîner ? Découvrez nos recettes exclusives, élaborées pour sublimer nos viandes. Du traditionnel bœuf bourguignon au tajine parfumé.
              </p>
              
              <div className="space-y-6 text-left">
                {featuredRecipes.map((recipe) => (
                  <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="flex items-center p-4 bg-stone-50 rounded-sm hover:bg-stone-100 transition-colors group">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm mr-4">
                      <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark-900 group-hover:text-burgundy-900 transition-colors">{recipe.title}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                        <span className="flex items-center"><Clock size={12} className="mr-1"/> {recipe.prepTime}</span>
                        <span className="flex items-center"><ChefHat size={12} className="mr-1"/> {recipe.difficulty}</span>
                      </div>
                    </div>
                    <ArrowRight size={20} className="ml-auto text-gray-400 group-hover:text-gold-500 transition-colors" />
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/recipes" className="text-burgundy-900 font-bold hover:text-gold-600 inline-flex items-center transition-colors border-b-2 border-gold-500 pb-1">
                  Découvrir toutes nos recettes <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery CTA Section */}
      <section className="py-20 bg-burgundy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Truck size={48} className="mx-auto text-gold-500 mb-6" />
          <h2 className="text-4xl font-serif font-bold mb-6">Faites-vous livrer dès aujourd'hui</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Profitez de notre service de livraison à domicile sur Béziers et ses environs. Gratuit dès 50€ d'achat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/delivery" className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold py-4 px-8 rounded-sm transition-colors shadow-lg">
              Voir les zones de livraison
            </Link>
            <Link to="/products" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-sm transition-colors">
              Commander maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] relative">
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.8!2d3.2!3d43.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b10f!2s5%20Av.%20Gambetta%2C%2034500%20B%C3%A9ziers!5e0!3m2!1sfr!2sfr!4v1600000000000!5m2!1sfr!2sfr" 
           width="100%" 
           height="100%" 
           style={{border:0}} 
           allowFullScreen 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
           className="grayscale hover:grayscale-0 transition-all duration-500"
         ></iframe>
         
         <div className="absolute top-8 left-8 bg-white p-6 rounded-sm shadow-lg max-w-xs hidden md:block">
            <div className="flex items-center mb-4">
              <MapPin className="text-gold-500 mr-3" size={24} />
              <h3 className="font-bold text-burgundy-900 text-lg">Nous trouver</h3>
            </div>
            <p className="text-gray-600 mb-2">5 Avenue Gambetta<br/>34500 Béziers</p>
            <p className="text-sm text-gray-500 mt-4 border-t border-gray-100 pt-4">
              <span className="block font-semibold text-burgundy-900 mb-1">Horaires :</span>
              Mardi - Dimanche<br/>
              08:00 - 12:00 / 16:00 - 20:00
            </p>
         </div>
      </section>
    </div>
  );
};

export default Home;