/* Hallmark · component: mobile-menu · genre: editorial · theme: allwell-medical
 * states: default · hover · focus-visible · active · open · closed
 * mobile: verified at 320 / 375 / 414 / 768 px
 * contrast: pass (46–50)
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { useAuth } from "@/contexts/auth-context";

export default function MobileMenu({ inline = false }: { inline?: boolean }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`relative z-50 shrink-0 lg:hidden ${
        inline ? "" : "order-2 ml-auto"
      }`}
      aria-label="เมนูหลักบนมือถือ"
    >
      {/* ปุ่มเปิดเมนู Hamburger ทรงกลม เข้าชุดกับปุ่มไอคอนอื่นๆ ใน Header */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="เปิดเมนูหลัก"
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 active:scale-95 focus-visible:outline-2 focus-visible:outline-white transition-all cursor-pointer"
      >
        <svg
          className="size-5.5 sm:size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="6.5" x2="20" y2="6.5" />
          <line x1="4" y1="12" x2="15.5" y2="12" />
          <line x1="4" y1="17.5" x2="20" y2="17.5" />
        </svg>
      </button>

      {/* ฉากหลังสีเข้มโปร่งแสง (Backdrop) */}
      <div
        role="presentation"
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Off-Canvas Drawer กว้าง 85vw (สูงสุด 340px) เรียบหรู สะอาดตา */}
      <aside
        id="mobile-navigation-panel"
        role="dialog"
        aria-modal="true"
        aria-label="เมนูหลักบนมือถือ"
        inert={!isOpen}
        className={`fixed top-0 bottom-0 left-0 z-[60] flex w-[85vw] max-w-[340px] flex-col bg-white text-zinc-900 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* หัว Drawer สีม่วงคลาสสิกของ ALLWELL พร้อมเส้นขอบคมชัด */}
        <div className="flex items-center justify-between bg-primary-dark px-4 sm:px-5 py-3.5 text-white shrink-0 pt-[max(0.875rem,env(safe-area-inset-top))] border-b border-white/10">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            aria-label="กลับหน้าแรก ALLWELL"
            className="shrink-0 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Allwell"
              width={800}
              height={233}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <button
            ref={closeRef}
            type="button"
            aria-label="ปิดเมนูหลัก"
            onClick={() => {
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            className="flex size-8.5 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white border border-white/15 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ข้อมูลโปรไฟล์ผู้ใช้ หรือ บล็อกเข้าสู่ระบบ */}
        {user ? (
          <div className="border-b border-zinc-150 bg-neutral-surface/60 px-4 py-3 shrink-0">
            <div className="flex items-center gap-2.5">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="size-8.5 rounded-full object-cover ring-2 ring-primary/20 shadow-2xs"
                />
              ) : (
                <div className="flex size-8.5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-2xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-zinc-900">{user.name}</p>
                <p className="truncate text-[11px] text-zinc-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              <Link
                href="/orders"
                onClick={() => setIsOpen(false)}
                className="flex h-9 items-center justify-center gap-1 rounded-lg border border-zinc-200/90 bg-white px-1 text-[11px] font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-primary active:scale-98 transition-all"
              >
                <svg className="size-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.669 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="truncate">คำสั่งซื้อ</span>
              </Link>
              <Link
                href="/address"
                onClick={() => setIsOpen(false)}
                className="flex h-9 items-center justify-center gap-1 rounded-lg border border-zinc-200/90 bg-white px-1 text-[11px] font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-primary active:scale-98 transition-all"
              >
                <svg className="size-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="truncate">ที่อยู่</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex h-9 items-center justify-center gap-1 rounded-lg border border-zinc-200/90 bg-white px-1 text-[11px] font-semibold text-rose-600 shadow-2xs hover:bg-rose-50 active:scale-98 transition-all"
              >
                <svg className="size-3.5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span className="truncate">ที่ถูกใจ</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="border-b border-zinc-150 bg-neutral-surface/60 px-4 py-3 shrink-0 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold text-zinc-900">ยินดีต้อนรับสู่ ALLWELL</p>
              <p className="text-[11px] text-zinc-500 truncate">จัดการคำสั่งซื้อและการรับประกัน</p>
            </div>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex h-8.5 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-white shadow-xs hover:bg-primary-hover active:scale-98 transition-all shrink-0"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        )}

        {/* เนื้อหาเมนูเลื่อนได้ในตัว — จัดเรียงกระชับและดึงปุ่มออกจากระบบขึ้นมาต่อท้ายทันที */}
        <div className="flex-1 overflow-y-auto px-3 py-3 text-sm space-y-3">
          {/* ลิงก์หน้าหลัก */}
          <div className="space-y-0.5">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex h-11 items-center justify-between rounded-xl px-3 font-medium transition-colors active:scale-[0.99] ${
                pathname === "/"
                  ? "bg-primary/8 text-primary font-bold shadow-2xs"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg className="size-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span>หน้าแรก</span>
              </div>
              {pathname === "/" && <span className="size-1.5 rounded-full bg-primary" />}
            </Link>

            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className={`flex h-11 items-center justify-between rounded-xl px-3 font-medium transition-colors active:scale-[0.99] ${
                pathname === "/products" && !pathname.includes("category")
                  ? "bg-primary/8 text-primary font-bold shadow-2xs"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg className="size-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <span>สินค้าทั้งหมด</span>
              </div>
              {pathname === "/products" && !pathname.includes("category") && (
                <span className="size-1.5 rounded-full bg-primary" />
              )}
            </Link>

            {/* หมวดหมู่สินค้า (Accordion เรียบง่าย) */}
            <div className="rounded-xl overflow-hidden">
              <button
                type="button"
                aria-expanded={isCategoriesOpen}
                aria-controls="drawer-category-list"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                className="flex h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3 font-medium text-zinc-700 hover:bg-zinc-50 hover:text-primary transition-colors active:scale-[0.99]"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="size-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>หมวดหมู่สินค้า</span>
                </div>
                <svg
                  className={`size-3.5 text-zinc-400 transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180 text-primary" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isCategoriesOpen && (
                <div id="drawer-category-list" className="mt-0.5 space-y-0.5 pl-4 pr-1 pb-1.5 border-l border-zinc-200 ml-4.5">
                  {categories.flatMap((category) => category.items).map((item) => (
                    <Link
                      key={item}
                      href={`/products?category=${encodeURIComponent(item)}`}
                      onClick={() => setIsOpen(false)}
                      className="flex h-9 items-center justify-between rounded-lg px-2 text-xs text-zinc-600 hover:bg-neutral-surface hover:text-primary active:bg-zinc-100 transition-colors"
                    >
                      <span className="truncate">{item}</span>
                      <span className="text-zinc-300 text-sm">›</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/promotions"
              onClick={() => setIsOpen(false)}
              className={`flex h-11 items-center justify-between rounded-xl px-3 font-medium transition-colors active:scale-[0.99] ${
                isActive("/promotions")
                  ? "bg-primary/8 text-primary font-bold shadow-2xs"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg className="size-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <span>โปรโมชั่นพิเศษ</span>
              </div>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-100">
                HOT
              </span>
            </Link>

            <Link
              href="/health-articles"
              onClick={() => setIsOpen(false)}
              className={`flex h-11 items-center justify-between rounded-xl px-3 font-medium transition-colors active:scale-[0.99] ${
                isActive("/health-articles")
                  ? "bg-primary/8 text-primary font-bold shadow-2xs"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg className="size-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span>บทความสุขภาพ</span>
              </div>
              {isActive("/health-articles") && <span className="size-1.5 rounded-full bg-primary" />}
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className={`flex h-11 items-center justify-between rounded-xl px-3 font-medium transition-colors active:scale-[0.99] ${
                isActive("/wishlist")
                  ? "bg-rose-50 text-rose-600 font-bold shadow-2xs"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-rose-600"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg className="size-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span>สินค้าที่ถูกใจ</span>
              </div>
              {isActive("/wishlist") && <span className="size-1.5 rounded-full bg-rose-500" />}
            </Link>
          </div>

          {/* กลุ่มข้อมูลเกี่ยวกับองค์กรและการติดต่อ */}
          <div className="pt-2.5 border-t border-zinc-150 space-y-0.5">
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`flex h-10 items-center justify-between rounded-xl px-3 text-xs font-medium transition-colors active:scale-[0.99] ${
                isActive("/about")
                  ? "bg-primary/8 text-primary font-bold shadow-2xs"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-primary"
              }`}
            >
              <span>เกี่ยวกับ ALLWELL</span>
              {isActive("/about") && <span className="size-1.5 rounded-full bg-primary" />}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`flex h-10 items-center justify-between rounded-xl px-3 text-xs font-medium transition-colors active:scale-[0.99] ${
                isActive("/contact")
                  ? "bg-primary/8 text-primary font-bold shadow-2xs"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-primary"
              }`}
            >
              <span>ติดต่อเรา & โชว์รูมทดลองสินค้า</span>
              {isActive("/contact") && <span className="size-1.5 rounded-full bg-primary" />}
            </Link>
          </div>

          {/* ส่วนติดต่อด่วน & ออกจากระบบ — ดันขึ้นมาต่อท้ายรายการด้านบนทันที ไม่เว้นว่าง */}
          <div className="pt-2.5 border-t border-zinc-150 space-y-2">
            {/* ข้อมูลการติดต่อด่วน */}
            <div className="rounded-xl border border-zinc-200/80 bg-neutral-surface/60 p-2.5 shadow-2xs">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                ปรึกษาผู้เชี่ยวชาญเครื่องมือแพทย์
              </p>
              <div className="mt-1 flex items-center justify-between text-xs">
                <a
                  href="tel:020266224"
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <svg className="size-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>02-026-6224</span>
                </a>
                <span className="text-[11px] text-zinc-500">ทุกวัน 08:30-17:30</span>
              </div>
            </div>

            {/* ปุ่มออกจากระบบ (กรณีล็อกอิน) ดันขึ้นมาตรงนี้ทันที */}
            {user && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/60 text-xs font-semibold text-rose-600 hover:bg-rose-50 active:scale-98 transition-colors cursor-pointer"
              >
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span>ออกจากระบบ</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </nav>
  );
}
