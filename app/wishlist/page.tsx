import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import WishlistGrid from "@/components/wishlist-grid";

export default function WishlistPage() {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm text-[#622576] hover:underline">← กลับหน้าแรก</Link>
        <h1 className="mt-5 text-3xl font-bold text-[#40184f]">สินค้าที่ชื่นชอบ</h1>
        <p className="mt-2 text-[#69576e]">รายการสินค้าที่คุณกดหัวใจเก็บไว้</p>
        
        <WishlistGrid />
      </main>
    </>
  );
}
