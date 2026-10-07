import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import WishlistButton from "@/components/wishlist-button";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#ebdfee] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative bg-[#f7f0f8] p-3">
        <Link href={`/products/${product.id}`} className="block overflow-hidden rounded-xl border border-[#ebdfee] bg-white">
          <Image src={product.image} alt={product.name} width={400} height={320} className="aspect-[5/4] w-full object-cover" />
        </Link>
        <div className="absolute right-5 top-5"><WishlistButton productName={product.name} compact /></div>
      </div>
      <div className="p-5">
        <p className="text-sm text-[#80508f]">{product.category}</p>
        <h3 className="mt-1 text-lg font-semibold text-[#40184f]">{product.name}</h3>
        <p className="mt-2 font-bold text-[#622576]">{formatPrice(product.price)}</p>
        {product.originalPrice && <p className="text-sm text-[#806e86] line-through">{formatPrice(product.originalPrice)}</p>}
        <Link href={`/products/${product.id}`} className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#622576] underline-offset-4 hover:underline">
          ดูรายละเอียด <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}
