import Link from "next/link";
import ProductCard from "@/components/product-card";
import ShopHeader from "@/components/shop-header";
import { products } from "@/data/products";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    (product.features && product.features.some(f => f.toLowerCase().includes(query)))
  );

  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm text-[#622576] hover:underline">← กลับหน้าแรก</Link>
        <h1 className="mt-5 text-3xl font-bold text-[#40184f]">
          {query ? `ผลการค้นหา: "${q}"` : "ค้นหาสินค้า"}
        </h1>
        <p className="mt-2 text-[#69576e]">พบสินค้าทั้งหมด {filteredProducts.length} รายการ</p>
        
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center text-[#69576e]">
            <p className="text-lg">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
            <Link href="/products" className="mt-6 inline-block rounded-lg bg-[#622576] px-6 py-3 font-semibold text-white hover:bg-[#58206c]">
              ดูสินค้าทั้งหมด
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
