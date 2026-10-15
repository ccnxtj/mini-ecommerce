import Link from "next/link";
import ShopHeader from "@/components/shop-header";

export default function ProductNotFound() {
  return (
    <><ShopHeader /><main className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 lg:px-10">
      <h1 className="text-3xl font-bold text-[#40184f]">ไม่พบสินค้านี้</h1>
      <p className="mt-3 text-[#69576e]">สินค้าที่คุณต้องการอาจไม่มีอยู่ในรายการ</p>
      <Link
        href="/products"
        className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-[#622576] px-6 py-2.5 text-sm font-semibold text-[#622576] transition-colors hover:bg-[#622576] hover:text-white"
      >
        <span>ดูสินค้าทั้งหมด</span>
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
      </Link>
    </main></>
  );
}
