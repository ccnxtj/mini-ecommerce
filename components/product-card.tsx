import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import WishlistButton from "@/components/wishlist-button";
import AddToCartHover from "@/components/add-to-cart-hover";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#ebdfee] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative bg-[#f7f0f8] p-3">
        <Link href={`/products/${product.id}`} className="block overflow-hidden rounded-xl border border-[#ebdfee] bg-white relative">
          <Image src={product.image} alt={product.name} width={400} height={320} className="aspect-[5/4] w-full object-cover" />
          
          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
            {/* In Stock Badge */}
            <span className="inline-block rounded-md bg-[#e3f9e5] px-2.5 py-1 text-[10px] font-bold text-[#1f8b24] shadow-sm">
              ✓ มีสินค้า
            </span>
            
            {/* Discount Badge */}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="inline-block w-fit rounded-md bg-[#ff646b] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </Link>
        <div className="absolute right-5 top-5 z-20"><WishlistButton productName={product.name} compact /></div>
      </div>
      <div className="p-5 flex flex-col h-full">
        <p className="text-sm text-[#80508f]">{product.category}</p>
        <h3 className="mt-1 text-lg font-semibold text-[#40184f]">{product.name}</h3>
        <p className="mt-2 font-bold text-[#622576]">{formatPrice(product.price)}</p>
        {product.originalPrice && <p className="text-sm text-[#806e86] line-through">{formatPrice(product.originalPrice)}</p>}
        
        <div className="mt-4 flex items-center justify-between">
          <Link href={`/products/${product.id}`} className="inline-flex min-h-11 items-center font-semibold text-[#622576] underline-offset-4 hover:underline">
            ดูรายละเอียด <span aria-hidden="true" className="ml-2">→</span>
          </Link>
          <AddToCartHover productName={product.name} />
        </div>
      </div>
    </article>
  );
}
