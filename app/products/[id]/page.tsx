/* Hallmark · genre: editorial · macrostructure: Clean Clinical Specimen · design-system: DESIGN.md · designed-as-app · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, products } from "@/data/products";
import ShopHeader from "@/components/shop-header";
import WishlistButton from "@/components/wishlist-button";
import AddToCartButton from "@/components/add-to-cart-button";
import AllwellServiceBanner from "@/components/allwell-service-banner";
import ProductFaqSection from "@/components/product-faq-section";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { id: string }[] = [];
  for (const product of products) {
    params.push({ id: product.id });
    if (product.slug && product.slug !== product.id) {
      params.push({ id: product.slug });
    }
    if (product.numericId) {
      params.push({ id: String(product.numericId) });
    }
  }
  return params;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find(
    (item) => item.id === id || item.slug === id || (item.numericId && String(item.numericId) === id)
  );
  if (!product) notFound();

  const discountPct =
    product.discountPercent
      ? Math.round(product.discountPercent)
      : product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <>
      <ShopHeader />
      <div className="bg-white min-h-screen text-text-body overflow-x-clip">

        {/* Breadcrumb — เรียบง่าย คอนทราสต์ชัดเจน */}
        <div className="mx-auto max-w-6xl px-4 pt-4 pb-3 sm:px-8 lg:px-10 border-b border-neutral-border/60">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-text-heading transition-colors">หน้าแรก</Link>
            <span aria-hidden="true" className="text-neutral-border">/</span>
            <Link href="/products" className="hover:text-text-heading transition-colors">สินค้า</Link>
            <span aria-hidden="true" className="text-neutral-border">/</span>
            <span className="text-text-heading font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Product Hero — เลย์เอาต์โปร่งตา สไตล์ Clinical Simplicity */}
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

            {/* ฝั่งซ้าย: รูปสินค้าแสดงเด่นชัดเต็มการ์ด สะอาดตา (6 คอลัมน์) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-border bg-white p-2 sm:p-4 flex items-center justify-center shadow-xs">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={650}
                  height={650}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>

            {/* ฝั่งขวา: รายละเอียด ราคา และสั่งซื้อ (6 คอลัมน์) */}
            <div className="lg:col-span-6 flex flex-col">

              {/* หมวดหมู่และชื่อสินค้า */}
              <div>
                <span className="inline-flex items-center rounded-md bg-primary-tint px-2.5 py-1 text-xs font-semibold text-primary">
                  {product.category === "เตียงผู้ป่วยไฟฟ้า"
                    ? "เตียงผู้ป่วยปรับไฟฟ้า"
                    : product.categoryName || product.category}
                </span>
                <h1 className="mt-2.5 text-2xl font-bold leading-tight text-text-heading sm:text-3xl tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* กล่องราคาและเงื่อนไขการผ่อนชำระ — สะอาดตา ไร้สีส้มฉูดฉาด */}
              <div className="mt-5 rounded-2xl bg-neutral-surface border border-neutral-border/80 p-5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-bold text-accent-price">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-muted line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      {discountPct && (
                        <span className="rounded-md bg-rose-50 border border-rose-200/60 px-2 py-0.5 text-xs font-bold text-accent-discount">
                          ลด {discountPct}%
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {product.price >= 5000 && (
                  <p className="mt-2 text-xs text-text-muted flex items-center gap-1.5">
                    <svg className="size-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>ผ่อน 0% เริ่มต้น {formatPrice(Math.ceil(product.price / 10))}/เดือน (สูงสุด 10 เดือน)</span>
                  </p>
                )}
              </div>

              {/* สถานะสต็อกและบริการจัดส่ง */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-muted border-b border-neutral-border/60 pb-5">
                <div className="flex items-center gap-1.5 font-medium text-status-success">
                  <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span>
                    {product.stockStatus === "contact-for-availability"
                      ? "สั่งผลิต — ติดต่อสอบถาม"
                      : "สินค้าพร้อมส่งทันที"}
                  </span>
                </div>
                <span className="text-neutral-border" aria-hidden="true">•</span>
                <div className="flex items-center gap-1.5">
                  <svg className="size-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v10.875" />
                  </svg>
                  <span>บริการจัดส่งและยกติดตั้งฟรีถึงบ้าน</span>
                </div>
              </div>

              {/* คุณสมบัติเด่นของสินค้า */}
              {product.features.length > 0 && (
                <div className="mt-5 space-y-2.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    จุดเด่นของรุ่นนี้
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-body">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ปุ่มสั่งซื้อและบันทึกสินค้า */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-border/70 flex items-center gap-2 sm:gap-3">
                <WishlistButton productName={product.name} compact className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ข้อมูลจำเพาะและรายละเอียดสินค้า — จัดระเบียบให้อ่านสบายตา ไร้รูปโบรชัวร์ยักษ์ */}
        {(product.details || product.category === "เตียงผู้ป่วยไฟฟ้า") && (
          <section className="border-t border-neutral-border bg-neutral-surface/40 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10">
              <div className="max-w-3xl mb-8">
                <h2 className="text-xl font-bold text-text-heading sm:text-2xl">
                  รายละเอียดและข้อมูลจำเพาะ
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-text-muted">
                  ข้อมูลฟังก์ชันการทำงาน มาตรฐานความปลอดภัย และขนาดของอุปกรณ์
                </p>
              </div>

              {/* เนื้อหารายละเอียดและข้อมูลจำเพาะแบบเรียบง่าย สไตล์อ่านบทความ (Editorial Reading Text) */}
              <div className="rounded-2xl border border-neutral-border bg-white p-6 sm:p-10 shadow-xs">
                {/* รูปภาพแผนภาพฟังก์ชันเตียงผู้ป่วยไฟฟ้า */}
                {product.category === "เตียงผู้ป่วยไฟฟ้า" && (
                  <div className="mb-10 overflow-hidden rounded-xl border border-neutral-border/70 bg-neutral-surface/40 p-2 sm:p-4">
                    <Image
                      src="/products/Komfortbed-Healthybed.jpg"
                      alt="ฟังก์ชันปรับระดับเตียงผู้ป่วยไฟฟ้า"
                      width={1024}
                      height={551}
                      className="h-auto w-full rounded-lg object-contain"
                    />
                  </div>
                )}

                {product.details ? (
                  <div className="space-y-10 divide-y divide-neutral-border/60">
                    {product.details.map((section, idx) => {
                      const isFunctionSection = section.title?.includes("ฟังก์ชัน");

                      return (
                        <div key={section.title ?? idx} className={idx > 0 ? "pt-8" : ""}>
                          {section.title && (
                            <h3 className="text-base sm:text-lg font-bold text-text-heading flex items-center gap-2 mb-4">
                              <span className="size-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                              <span>{section.title}</span>
                            </h3>
                          )}

                          {/* ทั้ง 4 ฟังก์ชัน และคุณสมบัติ: แสดงเป็นข้อความต่อเนื่องแบบมี Bullet จุดกลม สบายตาสม่ำเสมอเท่ากัน */}
                          <ul className="space-y-3 pl-1">
                            {section.items.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                className="flex items-start gap-3 text-sm sm:text-base text-text-body leading-relaxed"
                              >
                                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-text-muted">
                    สินค้ามาตรฐานนำเข้าตามข้อกำหนดเครื่องมือแพทย์สากล
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

      </div>

      <AllwellServiceBanner />
      <ProductFaqSection />
    </>
  );
}
