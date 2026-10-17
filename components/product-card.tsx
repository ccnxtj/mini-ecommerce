import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import WishlistButton from "@/components/wishlist-button";
import AddToCartHover from "@/components/add-to-cart-hover";
import Badge from "@/components/ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-zinc-200/80 transition-shadow hover:shadow-md">
      {/* รูปสินค้า */}
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="aspect-square sm:aspect-[5/4] w-full object-cover bg-zinc-50"
          />
        </Link>

        {/* Badge ส่วนลด */}
        {discountPct && (
          <div className="pointer-events-none absolute left-2 top-2 sm:left-3 sm:top-3">
            <Badge variant="discount" size="sm">
              -{discountPct}%
            </Badge>
          </div>
        )}

        {/* Wishlist Button — แสดงทั้งบนมือถือและเดสก์ท็อป สวยงาม ไม่เกะกะ */}
        <div className="absolute right-2 top-2 sm:right-2.5 sm:top-2.5 z-20">
          <WishlistButton
            productName={product.name}
            compact
            className="!size-8 sm:!size-9 !rounded-full bg-white/95 backdrop-blur-xs shadow-xs border-zinc-200/80 hover:bg-white active:scale-90"
          />
        </div>
      </div>

      {/* ข้อมูลสินค้า */}
      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2 p-3 sm:p-4">
        <Link href={`/products/${product.id}`} className="block group-hover:text-brand-purple transition-colors">
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-800 leading-snug line-clamp-2 min-h-[2.2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-1.5 pt-1">
          <div className="min-w-0">
            <span className="text-sm sm:text-base font-bold text-rose-600 block leading-tight truncate">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through block mt-0.5 truncate">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {/* ปุ่มบวกใส่ตะกร้า แสดงทั้งบนมือถือและ PC */}
          <div className="shrink-0">
            <AddToCartHover product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
