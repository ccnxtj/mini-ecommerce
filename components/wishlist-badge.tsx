/* Hallmark · component: wishlist-badge · genre: modern-minimal · theme: allwell-medical
 * states: empty (hidden) · active (animated pill count)
 */
"use client";

import { useWishlist } from "@/contexts/wishlist-context";

interface WishlistBadgeProps {
  className?: string;
}

export default function WishlistBadge({ className = "ring-2 ring-primary-dark" }: WishlistBadgeProps) {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) return null;

  return (
    <span
      key={wishlist.length}
      className={`absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold tabular-nums text-white leading-none shadow-xs select-none animate-in zoom-in-75 duration-200 ${className}`}
      aria-label={`สินค้าที่ถูกใจ ${wishlist.length} รายการ`}
    >
      {wishlist.length > 99 ? "99+" : wishlist.length}
    </span>
  );
}

