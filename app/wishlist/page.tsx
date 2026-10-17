import type { Metadata } from "next";
import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import WishlistGrid from "@/components/wishlist-grid";

export const metadata: Metadata = {
  title: "สินค้าที่ชื่นชอบ",
  description: "รายการสินค้าที่คุณกดหัวใจเก็บไว้",
};

export default function WishlistPage() {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-5 sm:px-8 sm:py-10 lg:px-10 overflow-x-clip">
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800 transition-colors">หน้าแรก</Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-zinc-900">สินค้าที่ชื่นชอบ</span>
        </nav>

        <WishlistGrid />
      </main>
    </>
  );
}
