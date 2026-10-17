/* Hallmark · genre: editorial · macrostructure: Clinical Commerce Gazette · design-system: DESIGN.md · designed-as-app · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import BannerCarousel from "@/components/banner-carousel";
import ShopHeader from "@/components/shop-header";
import AllwellServiceBanner from "@/components/allwell-service-banner";
import { products } from "@/data/products";
import { healthArticles, type HealthArticle } from "@/data/health-articles";
import HealthArticleCard from "@/components/health-article-card";

export const metadata: Metadata = {
  title: "หน้าแรก | ALLWELL Healthcare",
  description: "ศูนย์รวมเตียงผู้ป่วยไฟฟ้า ที่นอนป้องกันแผลกดทับ และอุปกรณ์ดูแลผู้สูงอายุมาตรฐานสากล",
};

export default function Home() {
  // เลือกเฉพาะบทความที่ตรงกับกลุ่มเป้าหมายผู้สูงอายุและการดูแลผู้ป่วย
  const prioritizedArticleIds = [
    "elderly-walking-cane-guide",
    "high-sodium-kidney-warning-signs",
    "foldable-walking-stick",
  ];
  const featuredArticles: HealthArticle[] = prioritizedArticleIds
    .map((id) => healthArticles.find((a) => a.id === id))
    .filter((a): a is HealthArticle => Boolean(a));

  return (
    <>
      <ShopHeader />

      <main className="overflow-x-clip">
        {/* Hero Banner Carousel */}
        <BannerCarousel />

        {/* Featured Products */}
        <section id="products" className="py-8 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-3 mb-5 sm:mb-8">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-text-heading">สินค้าแนะนำ</h2>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-text-muted">คัดสรรเพื่อการดูแลผู้สูงอายุและผู้ป่วยที่บ้าน</p>
              </div>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark transition-colors shrink-0"
              >
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Allwell Service Banner (ทีมช่างประกอบติดตั้ง & การรับประกัน) */}
        <AllwellServiceBanner />

        {/* Health Articles (สาระสุขภาพสำหรับผู้ดูแล — เลย์เอาต์ 3 คอลัมน์ คล้าย Allwell Service Banner) */}
        <section className="border-t border-neutral-border bg-neutral-surface/40 py-8 sm:py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-3 mb-5 sm:mb-8">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-text-heading">สาระสุขภาพสำหรับผู้ดูแล</h2>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-text-muted">คู่มือและการดูแลผู้ป่วยติดเตียงและผู้สูงอายุ โดยทีมผู้เชี่ยวชาญ</p>
              </div>
              <Link
                href="/health-articles"
                className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark transition-colors shrink-0"
              >
                อ่านทั้งหมด →
              </Link>
            </div>

            {/* การ์ดบทความ 3 คอลัมน์ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {featuredArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  href={`/health-articles/${article.id}`}
                  className="group flex flex-col justify-between rounded-2xl border border-neutral-border bg-white p-3.5 sm:p-5 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div>
                    {/* ภาพหน้าปกบทความ */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-surface border border-neutral-border/60">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* ข้อมูลหมวดหมู่และเวลาอ่าน */}
                    <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                      <span className="rounded-md bg-primary-tint px-2 py-0.5 font-semibold text-primary">
                        {article.category}
                      </span>
                      <span className="text-text-muted">·</span>
                      <span className="font-medium text-emerald-600">อ่าน {article.readTime}</span>
                      <span className="text-text-muted">·</span>
                      <span className="text-text-muted">{article.date}</span>
                    </div>

                    {/* หัวข้อบทความ */}
                    <h3 className="mt-2 text-sm sm:text-base md:text-lg font-bold text-text-heading group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    {/* สรุปเนื้อหาย่อ */}
                    <p className="mt-1.5 text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </div>

                  {/* ลิงก์อ่านต่อ */}
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-neutral-border/60 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-dark transition-colors">
                    <span>อ่านบทความฉบับเต็ม</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
