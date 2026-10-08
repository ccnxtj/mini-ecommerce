"use client";

import { useWishlist } from "@/contexts/wishlist-context";

export default function WishlistBadge() {
  const { wishlist } = useWishlist();
  
  if (wishlist.length === 0) return null;
  
  return (
    <span className="absolute -top-3 -right-2 grid size-4 place-items-center rounded-full bg-[#ff646b] text-[10px] font-bold text-white">
      {wishlist.length}
    </span>
  );
}
