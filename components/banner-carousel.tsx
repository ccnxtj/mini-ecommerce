"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const banners = [
  { src: "/banners/banner-1.jpg", alt: "Allwell สินค้าเพื่อสุขภาพสำหรับทุกคนในครอบครัว" },
  { src: "/banners/banner-2.jpg", alt: "Allwell สินค้าเพื่อสุขภาพและการดูแลผู้สูงอายุ" },
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

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        move(1);
      } else {
        move(-1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section aria-label="แบนเนอร์ Allwell" aria-roledescription="carousel">
      <h1 className="sr-only">Allwell สินค้าเพื่อสุขภาพ</h1>
      <div
        className="relative aspect-[16/9] sm:aspect-[21/8] w-full overflow-hidden touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {previousIndex !== null && (
          <div className={`absolute inset-0 ${direction === 1 ? "banner-exit-next" : "banner-exit-previous"}`} aria-hidden="true">
            <Image src={banners[previousIndex].src} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        )}
        <div className={`absolute inset-0 ${previousIndex !== null ? direction === 1 ? "banner-enter-next" : "banner-enter-previous" : ""}`}>
          <Image
            src={banners[activeIndex].src}
            alt={banners[activeIndex].alt}
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="แบนเนอร์ก่อนหน้า"
          className="absolute left-2 top-1/2 grid size-8 sm:size-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 sm:bg-white/90 text-brand-purple-dark shadow-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple sm:left-5 cursor-pointer active:scale-95 transition-transform"
        >
          <svg className="size-4 sm:size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="แบนเนอร์ถัดไป"
          className="absolute right-2 top-1/2 grid size-8 sm:size-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 sm:bg-white/90 text-brand-purple-dark shadow-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple sm:right-5 cursor-pointer active:scale-95 transition-transform"
        >
          <svg className="size-4 sm:size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3" aria-label="เลือกแบนเนอร์">
        {banners.map((banner, index) => (
          <button
            key={banner.src}
            type="button"
            onClick={() => {
              if (index !== activeIndex) move(index > activeIndex ? 1 : -1);
            }}
            aria-label={`แสดงแบนเนอร์ ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className="flex items-center justify-center p-1.5 sm:p-2 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-brand-purple"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-brand-purple/25 hover:bg-brand-purple/40"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
