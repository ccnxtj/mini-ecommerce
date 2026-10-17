"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import CartFeedbackModal, { type FeedbackModalState } from "@/components/cart-feedback-modal";

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
  isLoaded: boolean;
  addToCart: (item: Omit<CartItem, "quantity" | "selected">, qty?: number, silent?: boolean) => void;
  removeFromCart: (id: string, silent?: boolean) => void;
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
  // Feedback Modal
  feedbackModal: FeedbackModalState;
  showFeedbackModal: (type: "add" | "remove", item: FeedbackModalState["item"]) => void;
  closeFeedbackModal: () => void;
};

const CART_STORAGE_KEY = "allwell_cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. โหลดข้อมูลตะกร้าสินค้าจาก localStorage เมื่อ Component ถูก Mount บน Client (Side Effect)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. บันทึกข้อมูลตะกร้าสินค้าลง localStorage อัตโนมัติเมื่อ cart เปลี่ยนแปลง (หลังจากโหลดครั้งแรกเสร็จแล้ว)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart, isLoaded]);
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModalState>({
    isOpen: false,
    type: "add",
    status: "loading",
    item: { name: "" },
  });

  const closeFeedbackModal = () => {
    setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
  };

  const showFeedbackModal = (type: "add" | "remove", item: FeedbackModalState["item"]) => {
    setFeedbackModal({
      isOpen: true,
      type,
      status: "complete",
      item,
    });
  };

  const addToCart = (
    item: Omit<CartItem, "quantity" | "selected">,
    qty = 1,
    silent = false
  ) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty, selected: true } : i
        );
      }
      return [...prev, { ...item, quantity: qty, selected: true }];
    });

    if (!silent) {
      showFeedbackModal("add", {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: qty,
      });
    }
  };

  const removeFromCart = (id: string, silent = false) => {
    const itemToRemove = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((i) => i.id !== id));

    if (!silent && itemToRemove) {
      showFeedbackModal("remove", {
        id,
        name: itemToRemove.name,
        image: itemToRemove.image,
      });
    }
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
        isLoaded,
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
        feedbackModal,
        showFeedbackModal,
        closeFeedbackModal,
      }}
    >
      {children}
      <CartFeedbackModal feedback={feedbackModal} onClose={closeFeedbackModal} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
