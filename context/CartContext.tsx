import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: string;
  total: number;
  cart: CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    try {
      const savedItems = window.localStorage.getItem('cartItems');
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // Sync with Supabase when user logs in
  useEffect(() => {
    if (!user) {
      // If user logs out, keep the current cart or clear it?
      // Usually better to keep it for anonymous shopping.
      return;
    }

    const fetchUserCart = async () => {
      try {
        // Note: cart_items table may not exist - use local storage only for now
        // This allows the app to work without the cart_items table
        // If you need server-side cart sync, create the cart_items table first
        console.log('Cart: Using local storage only (cart_items table not in schema)');
      } catch (err) {
        console.error('Error in fetchUserCart:', err);
      }
    };

    fetchUserCart();
  }, [user]);

  // Persist to LocalStorage (always backup)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('cartItems', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = async (product: Product) => {
    // Optimistic Update
    let newQuantity = 1;
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        newQuantity = existingItem.quantity + 1;
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);

    // Supabase Sync - disabled as cart_items table doesn't exist in schema
    // Cart is stored in localStorage only
    // To enable server-side cart sync, add cart_items table to schema first
  };

  const removeFromCart = async (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));

    // Supabase Sync - disabled (cart_items table not in schema)
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    // Supabase Sync - disabled (cart_items table not in schema)
  };

  const clearCart = async () => {
    setItems([]);

    // Supabase Sync - disabled (cart_items table not in schema)
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const total = items.reduce((sum, item) => {
    // Parse price string "29.90€" to number 29.90
    const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
    return sum + (price * item.quantity);
  }, 0);
  
  const totalPrice = total.toFixed(2) + '€';

  return (
    <CartContext.Provider value={{
      items,
      cart: items,
      isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      totalItems,
      totalPrice,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};
