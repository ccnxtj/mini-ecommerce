"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  cart: string[];
  addToCart: (item: string) => void;
  removeFromCart: (item: string) => void;
  clearCart: () => void;
  isInCart: (item: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (item: string) => {
    setCart((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

  const removeFromCart = (item: string) => {
    setCart((prev) => prev.filter((i) => i !== item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (item: string) => cart.includes(item);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
