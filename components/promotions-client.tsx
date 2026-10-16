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
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-zinc-700 transition-colors">
          หน้าแรก
        </Link>
        <span aria-hidden="true" className="text-zinc-300">/</span>
        <span className="text-zinc-600">โปรโมชั่น</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          สินค้าโปรโมชั่น
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500">
          รวมรายการสินค้าลดราคาพิเศษ พร้อมสิทธิ์ผ่อนชำระ 0% และบริการจัดส่งติดตั้งฟรี
        </p>
      </div>

      {/* Grid of Promotional Products */}
      <section className="mb-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promoProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Service Guarantees — แถบสิทธิพิเศษเรียบหรูท้ายหน้า */}
      <section className="border-t border-zinc-100 pt-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-50 text-zinc-700 border border-zinc-200/60">
              <svg className="size-5 text-[#622576]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125h-9.75c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">ส่งและติดตั้งฟรี</p>
              <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                โดยทีมช่างผู้เชี่ยวชาญ พร้อมสาธิตการใช้งานถึงบ้าน
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-50 text-zinc-700 border border-zinc-200/60">
              <svg className="size-5 text-[#622576]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">ผ่อน 0% สูงสุด 10 เดือน</p>
              <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                รองรับบัตรเครดิตธนาคารชั้นนำหลากหลาย
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-50 text-zinc-700 border border-zinc-200/60">
              <svg className="size-5 text-[#622576]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">รับประกันสูงสุด 3 ปี</p>
              <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                มาตรฐานเครื่องมือแพทย์ พร้อมบริการอะไหล่แท้
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-50 text-zinc-700 border border-zinc-200/60">
              <svg className="size-5 text-[#622576]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">ปรึกษาผู้เชี่ยวชาญฟรี</p>
              <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                ให้คำแนะนำการเลือกอุปกรณ์ที่เหมาะสมกับคนไข้
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
