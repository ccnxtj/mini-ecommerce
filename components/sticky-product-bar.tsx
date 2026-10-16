"use client";

import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { formatPrice, type Product } from "@/data/products";
import WishlistButton from "@/components/wishlist-button";
import { useState } from "react";

export default function StickyProductBar({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
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
    toast(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว (${qty} ชิ้น)`, "success");
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 block md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200/90 px-3 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Wishlist Button */}
        <div className="shrink-0">
          <WishlistButton productName={product.name} compact />
        </div>

        {/* ตัวเลือกจำนวน (- 1 +) */}
        <div className="flex h-11 items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-1.5 shrink-0 shadow-2xs">
          <button
            type="button"
            aria-label="ลดจำนวน"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="flex size-7 items-center justify-center rounded-lg text-zinc-600 hover:bg-white disabled:opacity-30 transition-all active:scale-95"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <span className="min-w-[1.5rem] text-center font-bold text-zinc-800 text-sm">
            {qty}
          </span>
          <button
            type="button"
            aria-label="เพิ่มจำนวน"
            onClick={() => setQty((q) => q + 1)}
            className="flex size-7 items-center justify-center rounded-lg text-zinc-600 hover:bg-white transition-all active:scale-95"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
            </svg>
          </button>
        </div>

        {/* ปุ่มเพิ่มลงตะกร้า */}
        <button
          type="button"
          onClick={handleAdd}
          className={`flex-1 h-11 min-w-0 rounded-full px-3 text-xs font-semibold text-white shadow-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 ${
            isAdded ? "bg-emerald-600" : "bg-[#622576] hover:bg-[#521e64]"
          }`}
        >
          {isAdded ? (
            <>
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="truncate">เพิ่มแล้ว ({qty})!</span>
            </>
          ) : (
            <>
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="truncate">เพิ่มลงตะกร้า • {formatPrice(product.price * qty)}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
