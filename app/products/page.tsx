import type { Metadata } from "next";
import { Suspense } from "react";
import ShopHeader from "@/components/shop-header";
import ProductsClient from "@/components/products-client";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "ศูนย์รวมเตียงผู้ป่วยไฟฟ้า ที่นอนป้องกันแผลกดทับ และอุปกรณ์ดูแลผู้สูงอายุมาตรฐานสากล",
};

export default function ProductsPage() {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-5 py-5 sm:py-8 lg:py-12 sm:px-8 lg:px-10 overflow-x-clip">
        <Suspense fallback={<div className="py-20 text-center text-zinc-400">กำลังโหลดรายการสินค้า...</div>}>
          <ProductsClient />
        </Suspense>
      </main>
    </>
  );
}
