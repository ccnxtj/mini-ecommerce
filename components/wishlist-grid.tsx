"use client";

import Link from "next/link";
import ProductCard from "@/components/product-card";
import { products } from "@/data/products";
import { useWishlist } from "@/contexts/wishlist-context";

export default function WishlistGrid() {
  const { wishlist, isLoaded } = useWishlist();

  // Filter products that are in the wishlist
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.name)
  );

  const recommendedProducts = products.slice(0, 4);

  const recommendedSection = (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-neutral-border">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base sm:text-xl font-bold text-text-heading">
            สินค้าแนะนำสำหรับคุณ
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-text-muted">
            เตียงผู้ป่วยปรับไฟฟ้าและอุปกรณ์ดูแลสุขภาพยอดนิยมที่ได้รับความไว้วางใจ
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          <span>ดูทั้งหมด</span>
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );

  if (!isLoaded) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-xs text-text-muted">กำลังโหลดสินค้าที่ชื่นชอบ...</p>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="space-y-10 sm:space-y-14">
        {/* Empty State Box */}
        <div className="rounded-2xl sm:rounded-3xl bg-neutral-surface border border-neutral-border py-8 sm:py-12 px-4 sm:px-6 text-center shadow-xs">
          <div className="mx-auto flex size-14 sm:size-16 items-center justify-center rounded-full bg-white text-rose-500 mb-3.5 shadow-2xs ring-4 ring-rose-50">
            <svg className="size-7 sm:size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-text-heading tracking-tight">คุณยังไม่มีสินค้าที่ชื่นชอบ</h2>
          <p className="mt-1 text-xs sm:text-sm text-text-muted max-w-xs sm:max-w-sm mx-auto leading-relaxed">
            กดไอคอนหัวใจที่สินค้าที่คุณสนใจ เพื่อบันทึกไว้เปรียบเทียบสเปกหรือกลับมาสั่งซื้อภายหลังได้สะดวก
          </p>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-hover hover:shadow-sm active:scale-95 transition-all"
          >
            <span>เลือกดูสินค้าทั้งหมด</span>
            <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {recommendedSection}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {recommendedSection}
    </>
  );
}
