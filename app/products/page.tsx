import Link from "next/link";
import ProductCard from "@/components/product-card";
import { brands, products } from "@/data/products";
import ShopHeader from "@/components/shop-header";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ brand?: string | string[] }> }) {
  const requestedBrand = (await searchParams).brand;
  const brand = typeof requestedBrand === "string" && brands.includes(requestedBrand) ? requestedBrand : undefined;
  const visibleProducts = brand ? products.filter((product) => product.name.startsWith(`${brand} `)) : products;
  return (
    <><ShopHeader /><main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
      <Link href="/" className="text-sm text-[#6a4bbf] hover:underline">← กลับหน้าแรก</Link>
      <h1 className="mt-5 text-3xl font-bold text-[#392567]">{brand ? `รองเท้าวิ่ง ${brand}` : "สินค้าทั้งหมด"}</h1>
      <p className="mt-2 text-[#66577d]">เลือกดูสินค้าที่คุณสนใจ</p>
      {brand && <Link href="/products" className="mt-4 inline-block text-sm font-semibold text-[#6a4bbf] hover:underline">ดูทุกแบรนด์</Link>}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </main></>
  );
}
