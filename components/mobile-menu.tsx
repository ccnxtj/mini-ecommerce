"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { useAuth } from "@/contexts/auth-context";

const menuLinkClass =
  "flex min-h-12 items-center justify-between rounded-xl px-4 font-semibold text-[#40184f] hover:bg-[#f7f0f8] focus-visible:outline-2 focus-visible:outline-[#58206c]";

const otherLinks = [
  { href: "/promotions", label: "โปรโมชั่น" },
  { href: "/health-articles", label: "บทความสุขภาพ" },
];

export default function MobileMenu({ inline = false }: { inline?: boolean }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
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

  return (
    <nav
      className={`relative z-50 shrink-0 lg:hidden ${
        inline ? "" : "order-2 ml-auto"
      }`}
      aria-label="เมนูหลักบนมือถือ"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label="เปิดเมนูหลัก"
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex min-h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white sm:min-h-12 sm:w-12"
      >
        <span className="grid h-7 w-7 content-center gap-1" aria-hidden="true">
          <span className="h-0.5 w-7 rounded bg-current" />
          <span className="h-0.5 w-7 rounded bg-current" />
          <span className="h-0.5 w-7 rounded bg-current" />
        </span>
      </button>
      <button
        type="button"
        aria-label="ปิดเมนูหลัก"
        aria-hidden={!isOpen}
        inert={!isOpen}
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-[#211431]/55 transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="mobile-navigation-panel"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] flex w-full flex-col bg-white text-[#40184f] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between bg-[#58206c] px-5 py-4 text-white shrink-0 pt-[max(1rem,env(safe-area-inset-top))]">
          <Image
            src="/logo.png"
            alt="Allwell"
            width={800}
            height={233}
            className="h-8 w-auto sm:h-10"
          />
          <button
            ref={closeRef}
            type="button"
            aria-label="ปิดเมนูหลัก"
            onClick={() => {
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* บัตรข้อมูลโปรไฟล์ผู้ใช้ หรือ ปุ่มเข้าสู่ระบบ */}
        {user ? (
          <div className="border-b border-zinc-150 bg-[#fbf6fc]/70 px-4 py-3.5">
            <div className="flex items-center gap-3">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover ring-2 ring-[#622576]/20"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-[#622576] font-bold text-white shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-zinc-900">{user.name}</p>
                <p className="truncate text-xs text-zinc-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-2 px-2 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-[#622576] transition-colors"
              >
                <svg className="size-3.5 text-[#622576]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.669 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span>ประวัติคำสั่งซื้อ</span>
              </Link>
              <Link
                href="/address"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-2 px-2 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-[#622576] transition-colors"
              >
                <svg className="size-3.5 text-[#622576]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>ที่อยู่จัดส่ง</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="border-b border-zinc-150 bg-[#fbf6fc]/70 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-zinc-200/80 text-zinc-500">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-zinc-900">ยินดีต้อนรับ</p>
                <p className="text-xs text-zinc-500">เข้าสู่ระบบเพื่อจัดการคำสั่งซื้อ</p>
              </div>
            </div>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#622576] py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#521e64] transition-colors"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
            </Link>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-3 py-4 text-base">
          <div className="grid gap-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={menuLinkClass}
            >
              หน้าแรก
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className={menuLinkClass}
            >
              สินค้า
            </Link>

            {/* หมวดหมู่สินค้าที่มีในสต็อกจริง */}
            <div className="rounded-xl bg-[#f7f0f8] overflow-hidden transition-colors">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                className="flex min-h-12 w-full cursor-pointer items-center justify-between rounded-xl px-4 font-bold text-[#40184f] hover:bg-[#f0e3f2] focus-visible:outline-2 focus-visible:outline-[#58206c] transition-colors"
              >
                <span>หมวดหมู่สินค้า</span>
                <svg
                  className={`size-4 text-[#622576] transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isCategoriesOpen && (
                <div className="space-y-1 px-2 pb-2 animate-slide-in-left">
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-semibold text-[#622576] hover:bg-white transition-all transform hover:translate-x-1"
                  >
                    <span>สินค้าทั้งหมด</span>
                  </Link>

                  {categories.map((category) => (
                    <div key={category.id} className="pt-1">
                      {category.items.map((item) => (
                        <Link
                          key={item}
                          href={`/products?category=${encodeURIComponent(
                            item
                          )}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#55435d] hover:bg-white hover:text-[#622576] transition-all transform hover:translate-x-1"
                        >
                          <span className="text-xs text-[#622576]">▸</span>
                          <span className="truncate">{item}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={menuLinkClass}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ปุ่มออกจากระบบ (กรณีล็อกอิน) */}
        {user && (
          <div className="border-t border-zinc-150 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-zinc-50/80">
            <button
              type="button"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors shadow-2xs"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span>ออกจากระบบ</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
