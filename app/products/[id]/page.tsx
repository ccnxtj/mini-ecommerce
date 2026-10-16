import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, products } from "@/data/products";
import ShopHeader from "@/components/shop-header";
import WishlistButton from "@/components/wishlist-button";
import AddToCartButton from "@/components/add-to-cart-button";
import AllwellServiceBanner from "@/components/allwell-service-banner";
import ProductFaqSection from "@/components/product-faq-section";
import StickyProductBar from "@/components/sticky-product-bar";

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
      <div className="bg-zinc-100 min-h-screen pb-16 md:pb-0">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pt-3 pb-2 sm:px-8 lg:px-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Link href="/" className="hover:text-zinc-600">หน้าแรก</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="hover:text-zinc-600">สินค้า</Link>
            <span aria-hidden="true">/</span>
            <span className="text-zinc-500 line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <div className="mx-auto max-w-6xl px-3 pb-4 sm:px-8 lg:px-10">
          <div className="bg-white grid md:grid-cols-[420px_1fr] lg:grid-cols-[480px_1fr] rounded-xl sm:rounded-2xl border border-zinc-200/80 overflow-hidden shadow-2xs">

            {/* รูปสินค้า */}
            <div className="relative flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-100 p-4 sm:p-6 lg:p-8">
              <Image
                src={product.image}
                alt={product.name}
                width={420}
                height={420}
                className="max-h-[320px] sm:max-h-[400px] w-full object-contain"
                priority
              />
            </div>

            {/* ข้อมูลสินค้า */}
            <div className="flex flex-col p-4 sm:p-6 lg:p-8">

              {/* ชื่อสินค้า */}
              <h1 className="text-lg font-bold leading-snug text-zinc-900 sm:text-2xl">
                {product.name}
              </h1>

              {/* รายละเอียดใต้ชื่อ */}
              <div className="mt-2">
                <span className="inline-flex items-center rounded-md bg-[#622576]/10 px-2.5 py-0.5 text-xs font-semibold text-[#622576]">
                  {product.category === "เตียงผู้ป่วยไฟฟ้า"
                    ? "เตียงผู้ป่วยปรับไฟฟ้า"
                    : product.categoryName || product.category}
                </span>
              </div>

              {/* ราคา */}
              <div className="mt-4 sm:mt-6 bg-zinc-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-rose-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      {discountPct && (
                        <span className="rounded-[3px] bg-[#fef0ec] px-1.5 py-0.5 text-xs font-bold text-[#ee4d2d]">
                          -{discountPct}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {product.price >= 5000 && (
                  <p className="mt-1 text-xs text-zinc-400">
                    ผ่อน 0% เริ่ม {formatPrice(Math.ceil(product.price / 10))}/เดือน
                  </p>
                )}
              </div>

              {/* สต็อก */}
              <div className="mt-6 flex items-center gap-3 text-sm text-zinc-500">
                <span className="shrink-0">สต็อก</span>
                <span className={`font-medium ${product.stockStatus === "contact-for-availability" ? "text-amber-600" : "text-emerald-600"}`}>
                  {product.stockStatus === "contact-for-availability"
                    ? "สั่งผลิต — ติดต่อสอบถาม"
                    : `${product.stock ?? 5} ชิ้น`}
                </span>
              </div>

              {/* คุณสมบัติ */}
              {product.features.length > 0 && (
                <ul className="mt-6 space-y-2 border-t border-zinc-100 pt-5">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-zinc-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#622576]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {product.registration && (
                <p className="mt-4 text-xs text-zinc-400">อย.: {product.registration}</p>
              )}

              {/* ปุ่มสั่งซื้อสำหรับ PC (บนมือถือย้ายไปรวมที่ Sticky Bottom Bar ด้านล่างจอ) */}
              <div className="mt-auto pt-8 hidden md:flex items-start gap-3">
                <WishlistButton productName={product.name} compact />
                <div className="flex-1 min-w-0">
                  <AddToCartButton product={product} />
                </div>
              </div>

              {product.stockStatus === "contact-for-availability" && (
                <a
                  href="https://line.me/ti/p/~@allwellth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-2 bg-[#06C755] py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.346 0 .629.285.629.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  สอบถามผู้เชี่ยวชาญ (LINE)
                </a>
              )}

            </div>
          </div>
        </div>

        {/* รายละเอียดสินค้า */}
        {(product.details || product.category === "เตียงผู้ป่วยไฟฟ้า") && (
          <div className="mx-auto max-w-6xl px-3 pb-6 sm:px-8 lg:px-10">
            <div className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-zinc-200/80 shadow-2xs">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                รายละเอียดสินค้า
              </h2>
              {product.category === "เตียงผู้ป่วยไฟฟ้า" && (
                <div className="mb-8">
                  <Image
                    src="/products/Komfortbed-Healthybed.jpg"
                    alt="ฟังก์ชันปรับระดับเตียงผู้ป่วยไฟฟ้า"
                    width={1024}
                    height={551}
                    className="h-auto w-full"
                  />
                </div>
              )}
              {product.details && (
                <div className="space-y-6">
                  {product.details.map((section, index) => (
                    <div key={section.title ?? index}>
                      {section.title && (
                        <h3 className="mb-2 text-sm font-semibold text-zinc-700">{section.title}</h3>
                      )}
                      <ul className="space-y-1.5">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-zinc-500">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      <AllwellServiceBanner />
      <ProductFaqSection />
      <StickyProductBar product={product} />
    </>
  );
}
