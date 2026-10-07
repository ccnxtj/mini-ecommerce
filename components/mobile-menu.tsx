"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";

const menuLinkClass = "flex min-h-12 items-center justify-between rounded-xl px-4 font-semibold text-[#40184f] hover:bg-[#f7f0f8] focus-visible:outline-2 focus-visible:outline-[#58206c]";

const otherLinks = [
  { href: "/promotions", label: "โปรโมชั่น" },
  { href: "/health-articles", label: "บทความสุขภาพ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default function MobileMenu({ inline = false }: { inline?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className={`relative z-50 shrink-0 lg:hidden ${inline ? "" : "order-2 ml-auto"}`} aria-label="เมนูหลักบนมือถือ">
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
        className={`fixed inset-0 z-40 bg-[#211431]/55 transition-opacity duration-300 motion-reduce:transition-none ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        id="mobile-navigation-panel"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-white text-[#40184f] shadow-[18px_0_55px_rgba(26,15,45,0.22)] transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between bg-[#58206c] px-5 py-5 text-white">
          <Image src="/logo.png" alt="Allwell" width={800} height={233} className="h-9 w-auto sm:h-12" />
          <button
            ref={closeRef}
            type="button"
            aria-label="ปิดเมนูหลัก"
            onClick={() => {
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            className="grid size-11 place-items-center rounded-full border border-white/30 text-2xl hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4 text-base">
          <div className="grid gap-1">
            <Link href="/" onClick={() => setIsOpen(false)} className={menuLinkClass}>หน้าแรก</Link>
            <details className="group/products rounded-xl bg-[#f7f0f8]">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-xl px-4 font-bold text-[#40184f] hover:bg-[#f0e3f2] focus-visible:outline-2 focus-visible:outline-[#58206c] [&::-webkit-details-marker]:hidden">
                สินค้า <span className="text-xl leading-none text-[#58206c] transition-transform group-open/products:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div className="space-y-1 px-2 pb-2">
                <Link href="/products" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#622576] hover:bg-white">สินค้าทั้งหมด</Link>
                {categories.map((category) => (
                  <div key={category.id}>
                    <p className="flex min-h-10 items-center gap-2 px-3 py-2 text-sm leading-snug text-[#69576e]">
                      <span aria-hidden="true">•</span>{category.title}
                    </p>
                    {category.id === "bedroom-care" && <Link href="/products" onClick={() => setIsOpen(false)} className="ml-8 block rounded-lg px-3 py-2 text-sm text-[#622576] hover:bg-white">เตียงผู้ป่วยไฟฟ้า</Link>}
                  </div>
                ))}
              </div>
            </details>
            {otherLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={menuLinkClass}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
