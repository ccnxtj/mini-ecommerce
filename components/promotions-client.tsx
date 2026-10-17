"use client";

import Link from "next/link";
import ProductCard from "@/components/product-card";
import { products } from "@/data/products";

export default function PromotionsClient() {
  // ดึงสินค้าที่มีโปรโมชั่นส่วนลด (originalPrice > price)
  const promoProducts = products.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  return (
    <div className="pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-800 transition-colors">
          หน้าแรก
        </Link>
        <span aria-hidden="true" className="text-zinc-300">/</span>
        <span className="font-medium text-zinc-900">โปรโมชั่น</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          โปรโมชั่น
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-zinc-500">
          รวมรายการสินค้าลดราคาพิเศษ พร้อมสิทธิ์ผ่อนชำระ 0% และบริการจัดส่งติดตั้งฟรี
        </p>
      </div>

      {/* Grid of Promotional Products */}
      <section>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4">
          {promoProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
