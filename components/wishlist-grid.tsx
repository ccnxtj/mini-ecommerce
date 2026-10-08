"use client";

import Link from "next/link";
import ProductCard from "@/components/product-card";
import { products } from "@/data/products";
import { useWishlist } from "@/contexts/wishlist-context";

export default function WishlistGrid() {
  const { wishlist } = useWishlist();

  // Filter products that are in the wishlist
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.name)
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="mt-12 text-center text-[#69576e]">
        <p className="text-lg">คุณยังไม่มีสินค้าที่ชื่นชอบ</p>
        <Link href="/products" className="mt-6 inline-block rounded-lg bg-[#622576] px-6 py-3 font-semibold text-white hover:bg-[#58206c]">
          เลือกดูสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {wishlistProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
