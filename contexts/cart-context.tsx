"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  selected?: boolean;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "selected">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getQuantity: (id: string) => number;
  totalItems: number;
  totalPrice: number;
  // Selection
  toggleSelectItem: (id: string) => void;
  selectAllItems: (selected: boolean) => void;
  removeSelectedFromCart: () => void;
  selectedItems: CartItem[];
  selectedTotalItems: number;
  selectedTotalPrice: number;
  isAllSelected: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity" | "selected">, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, quantity: qty, selected: false }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleSelectItem = (id: string) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  };

  const selectAllItems = (selected: boolean) => {
    setCart((prev) => prev.map((i) => ({ ...i, selected })));
  };

  const removeSelectedFromCart = () => {
    setCart((prev) => prev.filter((i) => !i.selected));
  };

  const isInCart = (id: string) => cart.some((i) => i.id === id);

  const getQuantity = (id: string) =>
    cart.find((i) => i.id === id)?.quantity ?? 0;

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const selectedItems = cart.filter((i) => Boolean(i.selected));
  const selectedTotalItems = selectedItems.reduce((sum, i) => sum + i.quantity, 0);
  const selectedTotalPrice = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const isAllSelected = cart.length > 0 && cart.every((i) => Boolean(i.selected));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getQuantity,
        totalItems,
        totalPrice,
        toggleSelectItem,
        selectAllItems,
        removeSelectedFromCart,
        selectedItems,
        selectedTotalItems,
        selectedTotalPrice,
        isAllSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
