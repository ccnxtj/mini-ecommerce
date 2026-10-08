"use client";

import { useCart } from "@/contexts/cart-context";

export default function CartBadge() {
  const { cart } = useCart();
  
  if (cart.length === 0) return null;
  
  return (
    <span className="absolute -top-3 -right-2 grid size-4 place-items-center rounded-full bg-[#ff646b] text-[10px] font-bold text-white">
      {cart.length}
    </span>
  );
}
