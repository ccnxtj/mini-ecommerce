import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, products } from "@/data/products";
import ShopHeader from "@/components/shop-header";
import WishlistButton from "@/components/wishlist-button";

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
          className="text-sm text-[#6a4bbf] hover:underline"
        >
          ← สินค้าทั้งหมด
        </Link>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl bg-[#f5f0fc] p-3">
            <div className="overflow-hidden rounded-2xl border border-[#e9e2f3] bg-white">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={480}
                className="aspect-[5/4] w-full object-cover"
                priority
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#765b9f]">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#392567] sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-bold text-[#6a4bbf]">
              {formatPrice(product.price)}
            </p>
            <div className="mt-5">
              <WishlistButton productName={product.name} />
            </div>
            <p className="mt-6 leading-7 text-[#66577d]">
              {product.description}
            </p>
            <div className="mt-7 grid max-w-md gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="shoe-size"
                  className="mb-2 block text-sm font-semibold text-[#392567]"
                >
                  ขนาดรองเท้า (EU)
                </label>
                <select
                  id="shoe-size"
                  name="size"
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-[#d8c8ee] bg-white px-3 text-[#392567] outline-none focus:border-[#7c4dd6] focus:ring-2 focus:ring-[#7c4dd6]/20"
                >
                  <option value="" disabled>
                    เลือกไซส์
                  </option>
                  {Array.from({ length: 10 }, (_, index) => index + 36).map(
                    (size) => (
                      <option key={size} value={`EU ${size}`}>
                        EU {size}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-[#392567]"
                >
                  จำนวนคู่
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="h-12 w-full rounded-xl border border-[#d8c8ee] bg-white px-3 text-[#392567] outline-none focus:border-[#7c4dd6] focus:ring-2 focus:ring-[#7c4dd6]/20"
                />
              </div>
            </div>
            <button
              type="button"
              disabled
              title="ระบบตะกร้าสินค้าจะเพิ่มในสัปดาห์ถัดไป"
              className="mt-8 min-h-12 rounded-full bg-[#7c4dd6] px-8 font-semibold text-white opacity-60"
            >
              เพิ่มลงตะกร้า (เร็ว ๆ นี้)
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
