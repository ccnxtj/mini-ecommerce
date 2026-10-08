"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function AboutDropdown() {
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
      if (!detailsRef.current?.contains(event.target as Node))
        detailsRef.current?.removeAttribute("open");
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
      className="group relative flex min-h-12 items-center justify-center"
    >
      <summary
        onClick={(event) => {
          event.preventDefault();
          openMenu();
        }}
        className="flex min-h-12 cursor-pointer list-none items-center justify-center gap-2 rounded-lg px-3 text-center text-base font-bold hover:bg-white/10 group-open:bg-white/10 focus-visible:outline-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden"
      >
        เกี่ยวกับเรา
        <svg
          className="size-3 transition-transform group-open:rotate-180"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m1 1 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div
        onMouseEnter={cancelClose}
        className="absolute left-1/2 top-full z-50 mt-2 w-40 -translate-x-1/2 overflow-hidden rounded-b-2xl border border-[#ebdfee] bg-white p-3 text-left text-[#40184f] shadow-[0_20px_45px_rgba(42,24,75,0.16)] lg:mt-[8px]"
      >
        <ul className="space-y-1">
          <li>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#55435d] hover:bg-[#f7f0f8] hover:text-[#622576] focus-visible:outline-2 focus-visible:outline-[#622576] text-center"
            >
              รู้จักเรา
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#55435d] hover:bg-[#f7f0f8] hover:text-[#622576] focus-visible:outline-2 focus-visible:outline-[#622576] text-center"
            >
              ติดต่อเรา
            </Link>
          </li>
        </ul>
      </div>
    </details>
  );
}
