"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type WishlistContextType = {
  wishlist: string[];
  isLoaded: boolean;
  toggleWishlist: (item: string) => void;
  isInWishlist: (item: string) => boolean;
};

const WISHLIST_STORAGE_KEY = "allwell_wishlist";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. โหลดข้อมูลสินค้าที่ถูกใจจาก localStorage เมื่อ Component ถูก Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. บันทึกข้อมูลสินค้าที่ถูกใจลง localStorage เมื่อ wishlist เปลี่ยนแปลง
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist, isLoaded]);

  const toggleWishlist = (item: string) => {
    setWishlist((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const isInWishlist = (item: string) => wishlist.includes(item);

  return (
    <WishlistContext.Provider value={{ wishlist, isLoaded, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
