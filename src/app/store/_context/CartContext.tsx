'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ProductType = 'roupa' | 'acessorio' | 'outro';

export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  type: ProductType;
  size?: string | null;
};

type CartCtx = {
  cart: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // carregar do localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('cart');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as CartItem[];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  }, []);

  // salvar no localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + Number(item.price || 0), 0),
    [cart]
  );

  const addItem = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') localStorage.removeItem('cart');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);

  const value: CartCtx = {
    cart,
    total,
    addItem,
    removeItem,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
