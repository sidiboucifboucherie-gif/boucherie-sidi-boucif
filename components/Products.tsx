import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const Products: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const { addToCart } = useCart();

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'beef', label: 'Bœuf' },
    { id: 'poultry', label: 'Volailles' },
    { id: 'lamb', label: 'Agneau & Veau' },
    { id: 'triperie', label: 'Triperie' },
  ];

  return (
    <section className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-burgundy-800 text-sm font-bold tracking-widest uppercase mb-2">Nos Produits</h2>
           <h3 className="text-4xl font-serif font-bold text-dark-900">Une Sélection d'Exception</h3>
           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
             Découvrez nos viandes sélectionnées pour leur qualité, leur origine et leur fraîcheur.
           </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat.id 
                  ? 'bg-burgundy-800 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gold-100 hover:text-burgundy-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.badges.map((badge, idx) => (
                    <span key={idx} className="bg-white/90 text-burgundy-900 text-xs font-bold px-2 py-1 rounded-sm shadow-sm backdrop-blur-sm">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-serif font-bold text-dark-900">{product.name}</h4>
                  <span className="text-lg font-bold text-burgundy-900 bg-gold-50 px-2 py-1 rounded-sm">{product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{product.description}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-burgundy-900 hover:bg-gold-500 hover:text-burgundy-900 text-white font-bold py-3 px-4 rounded-sm transition-all duration-300 flex items-center justify-center shadow-md"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;