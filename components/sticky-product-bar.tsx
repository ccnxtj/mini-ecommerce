"use client";

import { useCart } from "@/contexts/cart-context";
import { formatPrice, type Product } from "@/data/products";
import WishlistButton from "@/components/wishlist-button";
import { useState } from "react";

export default function StickyProductBar({ product }: { product: Product }) {
  const { addToCart } = useCart();
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
      1
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <aside
      aria-label="แถบสั่งซื้อสินค้าด่วน"
      className="fixed bottom-0 inset-x-0 z-40 block md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-border px-4 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* แสดงราคาและเงื่อนไขการส่ง */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-accent-price leading-tight truncate">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-text-muted line-through truncate">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-status-success font-medium flex items-center gap-1 mt-0.5 leading-none">
            <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
            <span>ส่งและติดตั้งฟรี</span>
          </p>
        </div>

        {/* ปุ่มบันทึกรายการโปรดและเพิ่มลงตะกร้า */}
        <div className="flex items-center gap-2 shrink-0">
          <WishlistButton
            productName={product.name}
            compact
            className="!size-10 !rounded-full border-zinc-200/90 bg-white shadow-2xs hover:bg-neutral-surface active:scale-95 shrink-0"
          />
          <button
            type="button"
            onClick={handleAdd}
            className={`h-10 px-4 sm:px-5 rounded-full text-xs font-semibold text-white shadow-xs transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
              isAdded ? "bg-status-success" : "bg-primary hover:bg-primary-hover active:bg-primary-dark"
            }`}
          >
            {isAdded ? (
              <>
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>เพิ่มแล้ว</span>
              </>
            ) : (
              <>
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>เพิ่มลงตะกร้า</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
