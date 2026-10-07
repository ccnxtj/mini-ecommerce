import Link from "next/link";
import Image from "next/image";
import ProductDropdown from "@/components/product-dropdown";
import MobileMenu from "@/components/mobile-menu";

export default function ShopHeader() {
  return (
    <header className="relative bg-gradient-to-r from-[#713487] via-[#6e2b84] to-[#622576] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-5 py-5 sm:px-8 lg:min-h-[100px] lg:px-10 lg:py-0">
        <Link href="/" aria-label="กลับหน้าแรก" className="shrink-0">
          <Image src="/logo.png" alt="Mini E-commerce" width={800} height={233} priority className="h-9 w-auto sm:h-12" />
        </Link>
        <MobileMenu />
        <nav className="hidden items-center gap-1 text-base font-bold [&>a]:flex [&>a]:min-h-12 [&>a]:items-center [&>a]:justify-center [&>a]:whitespace-nowrap [&>a]:rounded-lg [&>a]:px-3 [&>a]:text-center [&>a]:hover:bg-white/10 [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-white lg:flex" aria-label="เมนูหลัก">
          <Link href="/">หน้าแรก</Link>
          <ProductDropdown />
          <Link href="/promotions">โปรโมชั่น</Link>
          <Link href="/health-articles">บทความสุขภาพ</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
          <Link href="/contact">ติดต่อเรา</Link>
        </nav>
      </div>
    </header>
  );
}
