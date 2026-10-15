import Link from "next/link";
import ProductCard from "@/components/product-card";
import BannerCarousel from "@/components/banner-carousel";
import ShopHeader from "@/components/shop-header";
import { products } from "@/data/products";
import { healthArticles } from "@/data/health-articles";
import HealthArticleCard from "@/components/health-article-card";

export default function Home() {
  const featuredArticles = healthArticles.slice(0, 3);

  return (
    <>
      <ShopHeader />

      <main>
        {/* Hero Banner */}
        <BannerCarousel />

        {/* Featured Products */}
        <section id="products" className="py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#622576]">สินค้าแนะนำ</p>
                <h2 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">เตียงผู้ป่วยไฟฟ้า</h2>
                <p className="mt-2 text-zinc-500">คัดสรรเพื่อการดูแลที่บ้านอย่างมีคุณภาพ</p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#622576] px-5 py-2 text-sm font-semibold text-[#622576] transition-colors hover:bg-[#622576] hover:text-white"
              >
                ดูสินค้าทั้งหมด
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Health Articles Preview */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#622576]">บทความสุขภาพ</p>
                <h2 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">คู่มือดูแลผู้ป่วย</h2>
                <p className="mt-2 text-zinc-500">ข้อมูลที่เป็นประโยชน์สำหรับผู้ดูแลและครอบครัว</p>
              </div>
              <Link
                href="/health-articles"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#622576] px-5 py-2 text-sm font-semibold text-[#622576] transition-colors hover:bg-[#622576] hover:text-white"
              >
                อ่านทั้งหมด
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <HealthArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
