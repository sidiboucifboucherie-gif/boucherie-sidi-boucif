import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Upload } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category_id: number | null;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  is_active: boolean;
  badges: string[] | null;
}

interface Category {
  id: number;
  name: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    badges: ''
  });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');
    
    if (error) console.error('Error fetching categories:', error);
    else setCategories(data || []);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) console.error('Error fetching products:', error);
    else setProducts(data || []);
    setLoading(false);
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error) {
      alert('Erreur lors du téléchargement de l\'image');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    await uploadFile(e.target.files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Erreur lors de la suppression');
      console.error(error);
    } else {
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: (product.price_cents / 100).toFixed(2),
      image_url: product.image_url || '',
      category_id: product.category_id?.toString() || '',
      badges: product.badges ? product.badges.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category_id: '',
      badges: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceCents = Math.round(parseFloat(formData.price) * 100);
    
    // Validate and parse category_id
    let categoryId: number | null = null;
    if (formData.category_id && formData.category_id.trim() !== '') {
      const parsedId = parseInt(formData.category_id);
      if (isNaN(parsedId)) {
        alert('Erreur: ID de catégorie invalide');
        return;
      }
      // Verify that the category exists in the database
      const categoryExists = categories.some(c => c.id === parsedId);
      if (!categoryExists) {
        alert('Erreur: La catégorie sélectionnée n\'existe pas. Veuillez sélectionner une catégorie valide.');
        return;
      }
      categoryId = parsedId;
    }
    
    const productData = {
      name: formData.name,
      description: formData.description || null,
      price_cents: priceCents,
      image_url: formData.image_url || null,
      category_id: categoryId,
      is_active: true,
      badges: formData.badges ? formData.badges.split(',').map(b => b.trim()).filter(b => b) : []
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      
      if (error) {
        console.error('Error updating product:', error);
        if (error.message.includes('permission denied') || error.message.includes('policy')) {
          alert('Erreur: Vous n\'avez pas les permissions nécessaires. Vérifiez que votre compte a le rôle administrateur.');
        } else {
          alert(`Erreur lors de la mise à jour: ${error.message}`);
        }
        return;
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([productData]);
      
      if (error) {
        console.error('Error creating product:', error);
        if (error.message.includes('foreign key constraint')) {
          alert('Erreur: La catégorie sélectionnée n\'existe pas dans la base de données. Veuillez d\'abord créer la catégorie ou sélectionner une catégorie existante.');
        } else if (error.message.includes('permission denied') || error.message.includes('policy')) {
          alert('Erreur: Vous n\'avez pas les permissions nécessaires. Vérifiez que votre compte a le rôle administrateur.');
        } else {
          alert(`Erreur lors de la création: ${error.message}`);
        }
        return;
      }
    }

    setIsModalOpen(false);
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">Gestion des Produits</h1>
        <button 
          onClick={handleAddNew}
          className="bg-burgundy-900 text-white px-4 py-2 rounded-sm flex items-center hover:bg-burgundy-800 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Ajouter un produit
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center">Chargement...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center">Aucun produit trouvé.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <ImageIcon size={16} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {categories.find(c => c.id === product.category_id)?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(product.price_cents / 100).toFixed(2)}€</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                    </h3>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                      <input 
                        type="text" 
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Badges (séparés par des virgules)</label>
                      <input 
                        type="text" 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                        placeholder="Ex: Halal, Bio, Promo"
                        value={formData.badges}
                        onChange={(e) => setFormData({...formData, badges: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                      <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                        value={formData.category_id}
                        onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea 
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      
                      {/* Drag and Drop Zone */}
                      <div 
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
                          isDragging 
                            ? 'border-burgundy-500 bg-burgundy-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="space-y-1 text-center">
                          {formData.image_url ? (
                            <div className="relative inline-block">
                              <img src={formData.image_url} alt="Aperçu" className="mx-auto h-32 object-cover rounded-md" />
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                                className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 shadow-sm"
                                title="Supprimer l'image"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          )}
                          
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label
                              htmlFor="image-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-burgundy-600 hover:text-burgundy-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-burgundy-500"
                            >
                              <span>{formData.image_url ? 'Remplacer l\'image' : 'Télécharger un fichier'}</span>
                              <input
                                id="image-upload"
                                name="image-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                              />
                            </label>
                            <p className="pl-1">ou glisser-déposer</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                        </div>
                      </div>

                      {/* URL Input Fallback */}
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Ou via URL externe</label>
                        <input 
                          type="text" 
                          placeholder="https://exemple.com/image.jpg"
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500 sm:text-sm"
                          value={formData.image_url || ''}
                          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-burgundy-900 text-base font-medium text-white hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <Save size={18} className="mr-2" />
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
