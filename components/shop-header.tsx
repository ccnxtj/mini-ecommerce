import Link from "next/link";

export default function ShopHeader() {
  return (
    <header className="bg-[#7652ae] text-white">
      <nav className="mx-auto flex min-h-20 max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10" aria-label="เมนูหลัก">
        <Link href="/" className="text-xl font-bold">Mini E-commerce</Link>
        <div className="flex gap-6 font-semibold">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/products" className="hover:underline">Products</Link>
        </div>
      </nav>
    </header>
  );
}
