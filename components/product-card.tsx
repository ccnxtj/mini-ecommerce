import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import WishlistButton from "@/components/wishlist-button";
import AddToCartHover from "@/components/add-to-cart-hover";

export default function ProductCard({ product }: { product: Product }) {
  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md">
      {/* รูปสินค้า */}
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={320}
            className="aspect-[5/4] w-full object-cover bg-zinc-50"
          />
        </Link>

        {/* Badges — ส่วนลด สีแดงสดใสตัดกับโทนเว็บ ไม่ม่วงกลืน */}
        {discountPct && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
            -{discountPct}%
          </span>
        )}

        {/* Wishlist */}
        <div className="absolute right-3 top-3 z-20">
          <WishlistButton productName={product.name} compact />
        </div>
      </div>

      {/* ข้อมูลสินค้า */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{product.categoryName || product.category}</p>
        <h3 className="mt-1 text-base font-semibold text-zinc-900 leading-snug">{product.name}</h3>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-lg font-bold text-rose-600">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="mb-0.5 text-sm text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <Link
            href={`/products/${product.id}`}
            className="text-sm font-semibold text-[#622576] hover:underline underline-offset-4"
          >
            ดูรายละเอียด
          </Link>
          <AddToCartHover product={product} />
        </div>
      </div>
    </article>
  );
}
