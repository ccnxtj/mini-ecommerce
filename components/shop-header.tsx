import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import ProductDropdown from "@/components/product-dropdown";
import MobileMenu from "@/components/mobile-menu";
import WishlistBadge from "@/components/wishlist-badge";
import CartBadge from "@/components/cart-badge";
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

export default function ShopHeader() {
  return (
    <header className="relative bg-gradient-to-r from-[#713487] via-[#6e2b84] to-[#622576] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:min-h-[100px] lg:px-10 lg:py-0">
        <Link href="/" aria-label="กลับหน้าแรก" className="shrink-0">
          <Image src="/logo.png" alt="Mini E-commerce" width={800} height={233} priority className="h-9 w-auto sm:h-12" />
        </Link>
        
        <nav className="hidden flex-1 items-center justify-center gap-1 text-base font-bold [&>a]:flex [&>a]:min-h-12 [&>a]:items-center [&>a]:justify-center [&>a]:whitespace-nowrap [&>a]:rounded-lg [&>a]:px-3 [&>a]:text-center [&>a]:hover:bg-white/10 [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-white lg:flex" aria-label="เมนูหลัก">
          <Link href="/">หน้าแรก</Link>
          <Link href="/products">สินค้า</Link>
          <ProductDropdown />
          <Link href="/promotions">โปรโมชั่น</Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 [&>a]:grid [&>a]:size-10 [&>a]:place-items-center [&>a]:rounded-full [&>a]:hover:bg-white/10 [&_svg]:size-6 sm:gap-3 lg:gap-4">
          <AccountIcon />
          <Link className="relative" href="/wishlist" aria-label="Wishlist">
            <Icon>
              <path d="M20.5 8.4c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" />
            </Icon>
            <WishlistBadge />
          </Link>
          <Link className="relative" href="/cart" aria-label="Cart">
            <Icon>
              <path d="M4 9h16l-1.4 10H5.4L4 9ZM8 9l4-5 4 5M9 13v3m6-3v3" />
            </Icon>
            <CartBadge />
          </Link>
          <MobileMenu inline />
        </div>
      </div>
    </header>
  );
}
