/* Hallmark · component: cart-badge · genre: modern-minimal · theme: allwell-medical
 * states: empty (hidden) · active (animated pill count)
 */
"use client";

import { useCart } from "@/contexts/cart-context";

interface CartBadgeProps {
  className?: string;
}

export default function CartBadge({ className = "ring-2 ring-primary-dark" }: CartBadgeProps) {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <span
      key={totalItems}
      className={`absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold tabular-nums text-white leading-none shadow-xs select-none animate-in zoom-in-75 duration-200 ${className}`}
      aria-label={`สินค้าในตะกร้า ${totalItems} ชิ้น`}
    >
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  );
}

