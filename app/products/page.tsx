import Link from "next/link";
import ProductCard from "@/components/product-card";
import { products } from "@/data/products";
import ShopHeader from "@/components/shop-header";

export default function ProductsPage() {
  return (
    <><ShopHeader /><main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
      <Link href="/" className="text-sm text-[#622576] hover:underline">← กลับหน้าแรก</Link>
      <h1 className="mt-5 text-3xl font-bold text-[#40184f]">เตียงผู้ป่วยไฟฟ้า</h1>
      <p className="mt-2 text-[#69576e]">เลือกดูเตียงผู้ป่วยไฟฟ้าที่เหมาะกับการดูแลของคุณ</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </main></>
  );
}
