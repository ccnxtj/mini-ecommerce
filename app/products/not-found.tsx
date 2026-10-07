import Link from "next/link";
import ShopHeader from "@/components/shop-header";

export default function ProductNotFound() {
  return (
    <><ShopHeader /><main className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 lg:px-10">
      <h1 className="text-3xl font-bold text-[#40184f]">ไม่พบสินค้านี้</h1>
      <p className="mt-3 text-[#69576e]">สินค้าที่คุณต้องการอาจไม่มีอยู่ในรายการ</p>
      <Link href="/products" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#6e2b84] px-7 font-semibold text-white hover:bg-[#622576]">ดูสินค้าทั้งหมด</Link>
    </main></>
  );
}
