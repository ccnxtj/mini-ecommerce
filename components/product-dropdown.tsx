"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { categories } from "@/data/categories";

export default function ProductDropdown() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openMenu = () => {
    cancelClose();
    detailsRef.current?.setAttribute("open", "");
  };

  const closeMenu = () => {
    cancelClose();
    detailsRef.current?.removeAttribute("open");
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(closeMenu, 400);
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) detailsRef.current?.removeAttribute("open");
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") detailsRef.current?.removeAttribute("open");
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <details
      ref={detailsRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose();
      }}
      className="group flex min-h-12 items-center justify-center"
    >
      <summary onClick={(event) => { event.preventDefault(); openMenu(); }} className="flex min-h-12 cursor-pointer list-none items-center justify-center gap-2 rounded-lg px-3 text-center text-base font-bold hover:bg-white/10 group-open:bg-white/10 focus-visible:outline-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
        สินค้า
        <svg className="size-3 transition-transform group-open:rotate-180" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div onMouseEnter={cancelClose} className="absolute left-1/2 top-full z-50 max-h-[min(75vh,760px)] w-[min(1000px,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-b-2xl border border-[#ebdfee] bg-white p-6 text-left text-[#40184f] shadow-[0_20px_45px_rgba(42,24,75,0.16)]">
        <div className="flex items-center justify-between gap-4 border-b border-[#ebdfee] pb-4">
          <h2 className="text-lg font-bold">หมวดหมู่สินค้า</h2>
          <Link href="/products" onClick={closeMenu} className="rounded-lg px-3 py-2 text-sm font-semibold text-[#622576] hover:bg-[#f7f0f8] focus-visible:outline-2 focus-visible:outline-[#622576]">
            ดูสินค้าทั้งหมด
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-3 divide-x divide-[#ebdfee]">
          {categories.map((category) => (
            <section key={category.id} className="min-w-0 px-5 first:pl-0 last:pr-0">
              <h3 className="min-h-12 text-base font-bold leading-snug text-[#40184f]">{category.title}</h3>
              <ul className="mt-2 space-y-0.5">
                {category.items.map((item) => (
                  <li key={item} className="rounded-lg text-sm leading-snug text-[#55435d] transition-colors duration-150 hover:bg-[#f7f0f8] hover:text-[#622576]">
                    {item === "เตียงผู้ป่วยไฟฟ้า" ? <Link href="/products" onClick={closeMenu} className="block px-3 py-1.5">{item}</Link> : <span className="block px-3 py-1.5">{item}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </details>
  );
}
