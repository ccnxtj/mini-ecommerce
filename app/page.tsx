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
        <section id="products" className="py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">สินค้าแนะนำ</h2>
                <p className="mt-1 text-sm text-zinc-400">คัดสรรเพื่อการดูแลที่บ้านอย่างมีคุณภาพ</p>
              </div>
              <Link
                href="/products"
                className="text-sm font-medium text-[#622576] hover:underline underline-offset-4"
              >
                ดูสินค้าทั้งหมด →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Health Articles Preview */}
        <section className="border-t border-zinc-100 bg-zinc-50/60 py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">บทความสุขภาพ</h2>
                <p className="mt-1 text-sm text-zinc-400">ข้อมูลที่เป็นประโยชน์สำหรับผู้ดูแลและครอบครัว</p>
              </div>
              <Link
                href="/health-articles"
                className="text-sm font-medium text-[#622576] hover:underline underline-offset-4"
              >
                อ่านทั้งหมด →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
