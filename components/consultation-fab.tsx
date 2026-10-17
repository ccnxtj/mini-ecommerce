"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ConsultationFab() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // ไม่แสดงในหน้า checkout เพื่อไม่รบกวนขั้นตอนการชำระเงิน
  if (pathname === "/checkout") {
    return null;
  }

  // ในหน้ารายละเอียดสินค้า และหน้าตะกร้า มี Sticky Bar อยู่ด้านล่าง จึงยกตำแหน่ง FAB ให้ลอยเหนือขึ้นไป
  const isDetailPage = pathname.startsWith("/products/") && pathname !== "/products";
  const isCartPage = pathname === "/cart";
  const hasBottomBar = isDetailPage || isCartPage;

  return (
    <>
      {/* Floating Action Button */}
      <aside
        aria-label="ติดต่อและปรึกษาผู้เชี่ยวชาญ"
        className={`fixed right-4 z-40 transition-all duration-300 sm:right-6 ${
          hasBottomBar
            ? "bottom-[4.75rem] md:bottom-6"
            : "bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:bottom-6"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="ปรึกษาผู้เชี่ยวชาญ ALLWELL"
          className="group flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover active:bg-primary-dark px-3.5 py-2.5 text-white shadow-md transition-all hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {/* Pulse ping effect */}
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>

          {/* Headset / Nurse consultation SVG icon */}
          <svg
            className="size-5 shrink-0 transition-transform group-hover:rotate-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>

          <span className="text-xs font-semibold tracking-wide sm:text-sm">
            ปรึกษาเรา
          </span>
        </button>
      </aside>

      {/* Popover Consultation Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-zinc-950/45 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-heading"
            className="relative z-10 w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-zinc-100 animate-slide-in-left sm:animate-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="grid size-9 place-items-center rounded-xl bg-brand-purple-tint text-brand-purple">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                  </svg>
                </div>
                <div>
                  <h3 id="consultation-heading" className="text-base font-bold text-zinc-900 leading-tight">
                    ปรึกษาผู้เชี่ยวชาญ ALLWELL
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    เตียงผู้ป่วยและอุปกรณ์ดูแลผู้สูงอายุ
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                aria-label="ปิดหน้าต่าง"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Channels List */}
            <div className="mt-4 space-y-2.5">
              {/* ช่องทาง 1: โทรสายด่วน */}
              <a
                href="tel:021099999"
                className="flex items-center gap-3.5 rounded-2xl border border-zinc-200/90 bg-zinc-50/60 p-3.5 hover:bg-zinc-100 hover:border-zinc-300 transition-all group"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-900">โทรสายด่วน 24 ชม.</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">โทรฟรี</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">02-109-9999</p>
                </div>
              </a>

              {/* ช่องทาง 2: LINE Official Account */}
              <a
                href="https://line.me/R/ti/p/@allwellth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-2xl border border-zinc-200/90 bg-zinc-50/60 p-3.5 hover:bg-zinc-100 hover:border-zinc-300 transition-all group"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.98 1.74 5.61 4.41 7.15-.19.68-.7 2.47-.8 2.85-.13.48.18.47.38.34.26-.17 3.52-2.39 4.95-3.37.67.1 1.36.16 2.06.16 5.52 0 10-3.92 10-8.75S17.52 2 12 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-900">แชท LINE กับพยาบาล</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">ตอบไว</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">LINE ID: @allwellth</p>
                </div>
              </a>

              {/* ช่องทาง 3: โชว์รูมทดลองนอน */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3.5 rounded-2xl border border-zinc-200/90 bg-zinc-50/60 p-3.5 hover:bg-zinc-100 hover:border-zinc-300 transition-all group"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-purple text-white shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-900">โชว์รูมทดลองสินค้าจริง</span>
                    <span className="text-[11px] font-medium text-brand-purple bg-brand-purple-tint px-2 py-0.5 rounded-full">แผนที่</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">บางพลัด จรัญสนิทวงศ์ (เปิดทุกวัน 08:30–17:30)</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
