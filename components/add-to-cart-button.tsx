"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import type { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, isInCart, getQuantity } = useCart();
  const { toast } = useToast();
  const inCart = isInCart(product.id);
  const cartQty = getQuantity(product.id);
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
    toast(`เพิ่มลงในตะกร้าแล้ว (${qty} ชิ้น)`, "success");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {/* ตัวเลือกจำนวน */}
        <div className="flex h-11 items-center gap-1 rounded-xl border border-zinc-200 bg-white px-2 py-1 shadow-2xs">
          <button
            type="button"
            aria-label="ลดจำนวน"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30 transition-colors"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <span className="min-w-[2.5rem] text-center font-bold text-zinc-800 text-base">
            {qty}
          </span>
          <button
            type="button"
            aria-label="เพิ่มจำนวน"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
            </svg>
          </button>
        </div>

        {/* ปุ่มเพิ่มลงตะกร้า (ไม่ยุบหายไป สามารถกด + เพิ่มต่อไปได้เรื่อยๆ) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="h-11 flex-1 rounded-full bg-[#6e2b84] px-6 text-sm font-semibold text-white hover:bg-[#58206c] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>เพิ่มลงตะกร้า</span>
        </button>
      </div>

      {/* ข้อความบอกสถานะจำนวนในตะกร้าปัจจุบัน */}
      {inCart && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>มีสินค้านี้ในตะกร้าแล้ว {cartQty} ชิ้น (สามารถกดเพิ่มต่อได้)</span>
        </div>
      )}
    </div>
  );
}
