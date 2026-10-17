"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@/data/products";

export default function AddToCartHover({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    // สลับเป็นติ๊กถูกชั่วคราว 1.2 วินาที แล้วกลับเป็นปุ่มบวกเดิม (In-button feedback)
    setIsAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-label={isAdded ? "เพิ่มสำเร็จแล้ว" : "เพิ่มลงตะกร้า"}
      title={isAdded ? "เพิ่มสำเร็จแล้ว" : "เพิ่มลงตะกร้า (+1)"}
      className={`flex size-9 sm:size-9.5 shrink-0 items-center justify-center rounded-full text-white shadow-xs transition-all duration-200 active:scale-95 cursor-pointer ${
        isAdded
          ? "bg-emerald-600 scale-105"
          : "bg-brand-purple hover:scale-105 hover:bg-brand-purple-hover"
      }`}
    >
      {isAdded ? (
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 animate-[toast-in_0.2s_ease-out]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  );
}
