"use client";

import { useCart } from "@/contexts/cart-context";

export default function AddToCartButton({ productName }: { productName: string }) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(productName);

  const handleToggle = () => {
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
      className={`mt-8 min-h-12 rounded-full px-8 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#58206c] ${
        inCart 
          ? "bg-[#ebdfee] text-[#40184f] hover:bg-[#e1d0e5]" 
          : "bg-[#6e2b84] text-white hover:bg-[#58206c]"
      }`}
    >
      {inCart ? "นำออกจากตะกร้า" : "เพิ่มลงตะกร้า"}
    </button>
  );
}
