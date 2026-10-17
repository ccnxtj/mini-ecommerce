"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "@/components/cart-badge";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // ซ่อน Bottom Navigation ในหน้าเฉพาะทาง เช่น หน้ารายละเอียดสินค้า, ตะกร้าสินค้า, หน้าชำระเงิน
  // เพื่อให้พื้นที่ด้านล่างแก่ Sticky Action Bar ของหน้านั้นๆ
  const isDetailPage = pathname.startsWith("/products/") && pathname !== "/products";
  const isCartPage = pathname === "/cart";
  const isCheckoutPage = pathname === "/checkout";

  if (isDetailPage || isCartPage || isCheckoutPage) {
    return null;
  }

  const navItems = [
    {
      label: "หน้าแรก",
      href: "/",
      icon: (active: boolean) => (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      label: "สินค้า",
      href: "/products",
      icon: (active: boolean) => (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.614A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 6.378 3.5h11.244a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 0c.18.25.412.46.685.614m12.13 0c.273-.153.504-.364.685-.614" />
        </svg>
      ),
    },
    {
      label: "โปรโมชั่น",
      href: "/promotions",
      icon: (active: boolean) => (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
      ),
    },
    {
      label: "ตะกร้า",
      href: "/cart",
      icon: (active: boolean) => (
        <div className="relative">
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <CartBadge className="ring-2 ring-white" />
        </div>
      ),
    },
  ];

  return (
    <nav
      aria-label="เมนูหลักสำหรับมือถือ"
      className="fixed bottom-0 inset-x-0 z-40 block md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-14 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center py-1 transition-colors select-none ${
                isActive ? "text-brand-purple font-semibold" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {item.icon(isActive)}
              <span className="text-xs mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
