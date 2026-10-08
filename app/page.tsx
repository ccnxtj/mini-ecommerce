import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import BannerCarousel from "@/components/banner-carousel";
import ProductDropdown from "@/components/product-dropdown";
import AboutDropdown from "@/components/about-dropdown";
import WishlistBadge from "@/components/wishlist-badge";
import CartBadge from "@/components/cart-badge";
import MobileMenu from "@/components/mobile-menu";
import { products } from "@/data/products";
import AccountIcon from "@/components/account-icon";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Home() {

  return (
    <>
      <header className="relative bg-gradient-to-r from-[#713487] via-[#6e2b84] to-[#622576] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 gap-y-3 px-3 py-4 sm:gap-x-6 sm:px-8 lg:min-h-[100px] lg:flex-nowrap lg:gap-x-9 lg:px-10 lg:py-0">
          <Link
            className="order-1 shrink-0 lg:order-none"
            href="/"
            aria-label="กลับหน้าแรก"
          >
            <Image src="/logo.png" alt="Mini E-commerce" width={800} height={233} priority className="h-7 w-auto sm:h-12" />
          </Link>
          <form
            className="order-3 flex h-12 w-full min-w-0 items-center overflow-hidden rounded-full bg-white text-[#622576] shadow-sm lg:order-none lg:flex-1"
            role="search"
            action="/search"
          >
            <input
              className="h-full min-w-0 flex-1 border-0 px-5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
              name="q"
              type="search"
              placeholder="ค้นหาสินค้า..."
              aria-label="ค้นหาสินค้า"
            />
            <button
              className="grid h-full w-12 shrink-0 cursor-pointer place-items-center"
              type="submit"
              aria-label="Search"
            >
              <Icon>
                <circle cx="10.8" cy="10.8" r="6.2" />
                <path d="m16 16 4.5 4.5" />
              </Icon>
            </button>
          </form>
          <div className="order-2 ml-auto flex shrink-0 items-center gap-1 sm:gap-2 [&>a]:grid [&>a]:size-9 sm:[&>a]:size-10 [&>a]:place-items-center [&>a]:rounded-full [&>a]:hover:bg-white/10 [&_svg]:size-5 sm:[&_svg]:size-6 sm:gap-3 lg:order-none lg:gap-4">
            <AccountIcon />
            <Link className="relative" href="/wishlist" aria-label="Wishlist">
              <Icon>
                <path d="M20.5 8.4c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" />
              </Icon>
              <WishlistBadge />
            </Link>
            <Link className="relative" href="/cart" aria-label={`Cart, items`}>
              <Icon>
                <path d="M4 9h16l-1.4 10H5.4L4 9ZM8 9l4-5 4 5M9 13v3m6-3v3" />
              </Icon>
              <CartBadge />
            </Link>
            <MobileMenu inline />
          </div>
        </div>
        <nav
          className="hidden border-t border-white/10 px-5 py-2 text-base font-bold [&>a]:min-h-12 [&>a]:items-center [&>a]:justify-center [&>a]:rounded-lg [&>a]:px-2 [&>a]:text-center [&>a]:hover:bg-white/10 [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-white lg:flex lg:min-h-16 lg:items-center lg:justify-center lg:gap-7 lg:py-1 lg:[&>a]:flex xl:gap-10"
          aria-label="เมนูหลัก"
        >
          <Link href="/">หน้าแรก</Link>
          <Link href="/products">สินค้า</Link>
          <ProductDropdown />
          <Link href="/promotions">โปรโมชั่น</Link>
          <Link href="/health-articles">บทความสุขภาพ</Link>
          <AboutDropdown />
        </nav>
      </header>
      <main>
        <BannerCarousel />
        <section id="products" className="bg-[#fcf9fc] py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="new-arrival" className="text-2xl font-bold text-[#40184f]">สินค้าแนะนำ</h2>
                <p className="mt-2 text-[#69576e]">เตียงผู้ป่วยไฟฟ้าสำหรับการดูแลที่บ้าน</p>
              </div>
              <Link href="/products" className="font-semibold text-[#622576] hover:underline">ดูสินค้าทั้งหมด →</Link>
            </div>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
