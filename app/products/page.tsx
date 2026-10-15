import { Suspense } from "react";
import ShopHeader from "@/components/shop-header";
import ProductsClient from "@/components/products-client";

export default function ProductsPage() {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <Suspense fallback={<div className="py-20 text-center text-zinc-400">กำลังโหลดรายการสินค้า...</div>}>
          <ProductsClient />
        </Suspense>
      </main>
    </>
  );
}
