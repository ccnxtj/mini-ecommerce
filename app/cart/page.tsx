import type { Metadata } from "next";
import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import CartGrid from "@/components/cart-grid";

export const metadata: Metadata = {
  title: "ตะกร้าสินค้า",
  description: "ตะกร้าสินค้าของคุณ",
};

export default function CartPage() {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-5 sm:px-8 sm:py-10 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800 transition-colors">หน้าแรก</Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-zinc-900">ตะกร้าสินค้า</span>
        </nav>

        <CartGrid />
      </main>
    </>
  );
}
