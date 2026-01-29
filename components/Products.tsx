import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Category {
  id: string;
  label: string;
}

const Products: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([{ id: 'all', label: 'Tout' }]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch categories
        const { data: categoriesData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (catError) throw catError;

        if (categoriesData) {
          const formattedCategories = [
            { id: 'all', label: 'Tout' },
            ...categoriesData.map(c => ({ id: c.slug, label: c.name }))
          ];
          setCategories(formattedCategories);
        }

        // Fetch products with category
        const { data: productsData, error: prodError } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(slug)
          `)
          .eq('is_active', true)
          .order('id');

        if (prodError) throw prodError;

        if (productsData) {
          const formattedProducts: Product[] = productsData.map(p => ({
            id: p.id.toString(),
            name: p.name,
            category: p.category?.slug || 'uncategorized',
            description: p.description || '',
            badges: p.badges || [],
            imageUrl: p.image_url || '/images/placeholder-meat.png', // Fallback image
            price: (p.price_cents / 100).toFixed(2).replace('.', ',') + '€'
          }));
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

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
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des produits...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Products;