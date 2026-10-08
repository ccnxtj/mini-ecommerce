import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, products } from "@/data/products";
import ShopHeader from "@/components/shop-header";
import WishlistButton from "@/components/wishlist-button";
import AddToCartButton from "@/components/add-to-cart-button";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  return (
    <>
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <Link
          href="/products"
          className="text-sm text-[#622576] hover:underline"
        >
          ← สินค้าทั้งหมด
        </Link>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl bg-[#f7f0f8] p-3">
            <div className="relative overflow-hidden rounded-2xl border border-[#ebdfee] bg-white">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={480}
                className="aspect-[5/4] w-full object-cover"
                priority
              />
              
              {/* Badges Container */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {/* In Stock Badge */}
                <span className="inline-block w-fit rounded-md bg-[#e3f9e5] px-3 py-1.5 text-xs font-bold text-[#1f8b24] shadow-sm">
                  ✓ มีสินค้าพร้อมส่ง
                </span>
                
                {/* Discount Badge */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="inline-block w-fit rounded-md bg-[#ff646b] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                    ลดราคา {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#80508f]">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#40184f] sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-bold text-[#622576]">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && <p className="mt-1 text-sm text-[#806e86] line-through">{formatPrice(product.originalPrice)}</p>}
            <div className="mt-5">
              <WishlistButton productName={product.name} />
            </div>
            <ul className="mt-6 space-y-2 text-[#69576e]">
              {product.features.map((feature) => <li key={feature}>• {feature}</li>)}
            </ul>
            {product.registration && <p className="mt-5 text-sm text-[#69576e]">เลขทะเบียน: {product.registration}</p>}
            <AddToCartButton productName={product.name} />
          </div>
        </div>
        <section className="mt-16 border-t border-[#ebdfee] pt-10" aria-labelledby="product-details-heading">
          <h2 id="product-details-heading" className="text-center text-2xl font-bold text-[#40184f] sm:text-3xl">รายละเอียดสินค้า</h2>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src="/products/Komfortbed-Healthybed.jpg"
              alt="ภาพแสดงฟังก์ชันปรับระดับเตียงผู้ป่วยไฟฟ้า"
              width={1024}
              height={551}
              className="h-auto w-full"
            />
          </div>
          {product.details && <div className="mx-auto mt-8 max-w-3xl space-y-8 text-[#55435d]">
            {product.details.map((section, index) => (
              <div key={section.title ?? index}>
                {section.title && <h3 className="mb-4 text-xl font-bold text-[#40184f]">{section.title}</h3>}
                <ul className="list-disc space-y-3 pl-6 leading-8 marker:text-[#622576]">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>}
        </section>
      </main>
    </>
  );
}
