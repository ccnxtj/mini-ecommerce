"use client";

import { useWishlist } from "@/contexts/wishlist-context";

export default function WishlistButton({ productName, compact = false }: { productName: string; compact?: boolean }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(productName);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // ป้องกันการเปลี่ยนหน้าถ้าวางอยู่ใน Link
    toggleWishlist(productName);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isLiked ? `นำ ${productName} ออกจากรายการโปรด` : `เพิ่ม ${productName} ในรายการโปรด`}
      title={isLiked ? "บันทึกในรายการโปรดแล้ว" : "เพิ่มในรายการโปรด"}
      className={compact
        ? `grid size-11 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#58206c] ${
            isLiked 
              ? "border-[#ff646b] bg-white text-[#ff646b]" 
              : "border-[#ebdfee] bg-white text-[#58206c] hover:bg-[#f7f0f8] shadow-sm"
          }`
        : `inline-flex min-h-11 items-center gap-2 rounded-full border px-5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#58206c] ${
            isLiked
              ? "border-[#ff646b] bg-[#fff4f4] text-[#ff646b]"
              : "border-[#dbc2e1] text-[#622576] hover:bg-[#f7f0f8]"
          }`}
    >
      <svg className="size-5 transition-transform active:scale-75" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 8.4c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" />
      </svg>
      {!compact && <span>{isLiked ? "บันทึกแล้ว" : "เพิ่มในรายการโปรด"}</span>}
    </button>
  );
}
