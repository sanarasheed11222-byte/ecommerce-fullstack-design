'use client';
import toast from 'react-hot-toast';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  savedItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  removeSaved: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('luxemart_cart');
      const storedSaved = localStorage.getItem('luxemart_saved');
      if (storedCart) setCartItems(JSON.parse(storedCart));
      if (storedSaved) setSavedItems(JSON.parse(storedSaved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('luxemart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('luxemart_saved', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    toast.success(`${product.name} added to cart!`);
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity } : i))
    );
  };

  const saveForLater = (id: string) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;
    setCartItems((prev) => prev.filter((i) => i._id !== id));
    setSavedItems((prev) => {
      if (prev.find((i) => i._id === id)) return prev;
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const moveToCart = (id: string) => {
    const item = savedItems.find((i) => i._id === id);
    if (!item) return;
    setSavedItems((prev) => prev.filter((i) => i._id !== id));
    addToCart(item);
  };

  const removeSaved = (id: string) => {
    setSavedItems((prev) => prev.filter((i) => i._id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, savedItems, addToCart, removeFromCart, updateQuantity, saveForLater, moveToCart, removeSaved, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}