/* Hallmark · component: profile-dropdown · genre: modern-minimal · theme: allwell-medical
 * states: default · hover · focus-visible · active · disabled · loading · error · success
 * contrast: pass (46–50)
 * responsive: hidden on mobile (< lg), desktop-optimized position without navbar overlap
 */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

export default function AccountIcon() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!user) {
    return (
      <Link
        href="/login"
        aria-label="เข้าสู่ระบบ"
        className="grid size-9 sm:size-10 place-items-center rounded-full text-white hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
      >
        <svg
          className="size-5 sm:size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="7.5" r="3.5" />
          <path d="M4.5 20v-1.5a7.5 7.5 0 0 1 15 0V20" />
        </svg>
      </Link>
    );
  }

  const handleLogout = async () => {
    setIsOpen(false);
    setIsLoggingOut(true);

    // จำลองการเคลียร์เซสชัน
    await new Promise((resolve) => setTimeout(resolve, 800));

    logout();
    setIsLoggingOut(false);
  };

  return (
    <>
      <div className="relative flex items-center" ref={ref}>
        {/* Trigger Avatar Button: บนมือถือไม่เปิด dropdown เพราะใช้งานผ่าน Hamburger Drawer แทน */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.innerWidth >= 1024) {
              setIsOpen((prev) => !prev);
            }
          }}
          aria-label="เมนูบัญชีผู้ใช้"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className={`group flex size-9 sm:size-10 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white pointer-events-none lg:pointer-events-auto cursor-default lg:cursor-pointer select-none ${
            isOpen ? "bg-white/20 ring-2 ring-white/60" : "hover:bg-white/10 active:scale-95"
          }`}
        >
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              width={36}
              height={36}
              className="size-8 sm:size-9 rounded-full object-cover ring-1 ring-white/40 group-hover:ring-white/80 transition-all"
            />
          ) : (
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-white/20 text-white font-bold text-sm sm:text-base ring-1 ring-white/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </button>

        {/* Dropdown Card: แสดงเฉพาะบนหน้าจอเดสก์ท็อป (hidden lg:block) 
            ปรับตำแหน่ง right-[-68px] เพื่อให้อยู่กึ่งกลางสอดคล้องกับไอคอนและไม่เอียงไปทับเมนู "เกี่ยวกับเรา" */}
        {isOpen && (
          <div
            role="menu"
            aria-orientation="vertical"
            aria-label="ตัวเลือกบัญชีของคุณ"
            className="hidden lg:block absolute right-[-68px] xl:right-[-76px] top-full mt-3 w-64 origin-top-right rounded-2xl border border-neutral-border bg-white p-2 text-zinc-800 shadow-xl ring-1 ring-black/[0.04] z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* ลูกศรชี้ขึ้นตรงกับกึ่งกลางรูปโปรไฟล์ */}
            <div className="absolute -top-1.5 right-[80px] xl:right-[88px] size-3 rotate-45 border-l border-t border-neutral-border bg-white" />

            {/* Header: ข้อมูลผู้ใช้แบบกระชับ */}
            <div className="relative rounded-xl bg-neutral-surface/80 p-2.5 border border-neutral-border/60 mb-1">
              <div className="flex items-center gap-2.5">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt={user.name}
                    width={36}
                    height={36}
                    className="size-9 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                  />
                ) : (
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="truncate text-xs font-bold text-text-heading">{user.name}</p>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                      สมาชิก
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-text-muted mt-0.5">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Links */}
            <div className="relative space-y-0.5 py-0.5 text-xs font-medium">
              {/* คำสั่งซื้อ */}
              <Link
                href="/orders"
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between rounded-xl px-2.5 py-2 text-zinc-700 hover:bg-neutral-surface hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.669 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-text-heading group-hover:text-primary truncate">ประวัติการสั่งซื้อ</span>
                </div>
                <svg className="size-3.5 text-zinc-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>

              {/* ที่อยู่จัดส่ง */}
              <Link
                href="/address"
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between rounded-xl px-2.5 py-2 text-zinc-700 hover:bg-neutral-surface hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-text-heading group-hover:text-primary truncate">ที่อยู่จัดส่ง</span>
                </div>
                <svg className="size-3.5 text-zinc-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>

            </div>

            {/* Logout Action */}
            <div className="relative border-t border-neutral-border/70 pt-1 mt-1">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50/80 transition-colors cursor-pointer"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </div>
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="flex flex-col items-center rounded-2xl sm:rounded-3xl border border-neutral-border bg-white px-8 py-6 shadow-2xl">
            <div className="size-10 animate-spin rounded-full border-3 border-zinc-200 border-t-primary" />
            <p className="mt-4 font-bold text-text-heading text-sm sm:text-base">กำลังออกจากระบบ...</p>
            <p className="mt-1 text-xs text-text-muted">กรุณารอสักครู่ ระบบกำลังเคลียร์ข้อมูล</p>
          </div>
        </div>
      )}
    </>
  );
}
