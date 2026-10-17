"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@/data/products";
import Button from "@/components/ui/button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
      qty
    );
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      {/* ตัวเลือกจำนวน — ขนาดเพรียวบาง ไม่เทอะทะบนมือถือ */}
      <div className="flex h-10 sm:h-11 items-center rounded-xl border border-zinc-200/90 bg-white px-1 sm:px-1.5 shadow-2xs shrink-0">
        <button
          type="button"
          aria-label="ลดจำนวน"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className="flex size-7 sm:size-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 disabled:opacity-25 transition-all"
        >
          <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <span className="w-6 sm:w-8 text-center font-semibold text-zinc-800 text-xs sm:text-sm tabular-nums select-none">
          {qty}
        </span>
        <button
          type="button"
          aria-label="เพิ่มจำนวน"
          onClick={() => setQty((q) => q + 1)}
          className="flex size-7 sm:size-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 transition-all"
        >
          <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
          </svg>
        </button>
      </div>

      {/* ปุ่มเพิ่มลงตะกร้า — ทรงเพรียว ฟอนต์ไม่ล้น พอดีสัดส่วน */}
      <Button
        type="button"
        onClick={handleAddToCart}
        variant="primary"
        className="flex-1 min-w-0 !h-10 sm:!h-11 !rounded-xl !px-2.5 sm:!px-5 !text-xs sm:!text-sm font-semibold shadow-xs whitespace-nowrap"
        icon={
          <svg className="size-4 sm:size-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        }
      >
        เพิ่มลงตะกร้า
      </Button>
    </div>
  );
}
