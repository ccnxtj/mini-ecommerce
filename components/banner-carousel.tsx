"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const banners = [
  { src: "/banner-1.jpg", alt: "Allwell สินค้าเพื่อสุขภาพสำหรับทุกคนในครอบครัว" },
  { src: "/banner-2.jpg", alt: "Allwell สินค้าเพื่อสุขภาพและการดูแลผู้สูงอายุ" },
];

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const isMoving = useRef(false);

  const move = useCallback((step: number) => {
    if (isMoving.current) return;

    const nextIndex = (activeIndex + step + banners.length) % banners.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(nextIndex);
      return;
    }

    isMoving.current = true;
    setDirection(step);
    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);
  }, [activeIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => move(1), 5000);
    return () => window.clearInterval(timer);
  }, [move]);

  useEffect(() => {
    if (previousIndex === null) return;
    const timer = window.setTimeout(() => {
      setPreviousIndex(null);
      isMoving.current = false;
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [previousIndex]);

  return (
    <section aria-label="แบนเนอร์ Allwell" aria-roledescription="carousel">
      <h1 className="sr-only">Allwell สินค้าเพื่อสุขภาพ</h1>
      <div className="relative aspect-[3319/1263] w-full overflow-hidden bg-[#f7f0f8]">
        {previousIndex !== null && (
          <div className={`absolute inset-0 ${direction === 1 ? "banner-exit-next" : "banner-exit-previous"}`} aria-hidden="true">
            <Image src={banners[previousIndex].src} alt="" fill sizes="100vw" className="object-contain" />
          </div>
        )}
        <div className={`absolute inset-0 ${previousIndex !== null ? direction === 1 ? "banner-enter-next" : "banner-enter-previous" : ""}`}>
          <Image
            src={banners[activeIndex].src}
            alt={banners[activeIndex].alt}
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="แบนเนอร์ก่อนหน้า"
          className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-xl text-[#40184f] shadow-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#622576] sm:left-5"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="แบนเนอร์ถัดไป"
          className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-xl text-[#40184f] shadow-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#622576] sm:right-5"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center gap-3 py-3" aria-label="เลือกแบนเนอร์">
        {banners.map((banner, index) => (
          <button
            key={banner.src}
            type="button"
            onClick={() => {
              if (index !== activeIndex) move(index > activeIndex ? 1 : -1);
            }}
            aria-label={`แสดงแบนเนอร์ ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`size-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#622576] ${index === activeIndex ? "bg-[#622576]" : "bg-[#dbc2e1]"}`}
          />
        ))}
      </div>
    </section>
  );
}
