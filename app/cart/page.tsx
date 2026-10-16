import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import CartGrid from "@/components/cart-grid";

export default function CartPage() {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">หน้าแรก</Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-zinc-900">ตะกร้าสินค้า</span>
        </nav>

        <CartGrid />
      </main>
    </>
  );
}
