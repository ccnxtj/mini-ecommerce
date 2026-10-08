import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import CartGrid from "@/components/cart-grid";

export default function CartPage() {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm text-[#622576] hover:underline">
          ← กลับหน้าแรก
        </Link>

        <CartGrid />
      </main>
    </>
  );
}
