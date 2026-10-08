"use client";

import { useCart } from "@/contexts/cart-context";

export default function AddToCartHover({ productName }: { productName: string }) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(productName);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // ป้องกันการเปลี่ยนหน้าตอนคลิกปุ่ม
    e.stopPropagation();
    
    if (inCart) {
      removeFromCart(productName);
    } else {
      addToCart(productName);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={inCart ? "นำออกจากตะกร้า" : "เพิ่มลงตะกร้า"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-transform hover:scale-110 ${
        inCart
          ? "bg-[#ebdfee] text-[#40184f] hover:bg-[#e1d0e5]"
          : "bg-[#622576] text-white hover:bg-[#58206c]"
      }`}
    >
      {inCart ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  );
}
