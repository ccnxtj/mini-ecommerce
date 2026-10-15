"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const PRICE_RANGES = [
  { label: "ทุกราคา", min: 0, max: Infinity },
  { label: "ต่ำกว่า 50,000", min: 0, max: 50000 },
  { label: "50,000 – 100,000", min: 50000, max: 100000 },
  { label: "100,000 – 200,000", min: 100000, max: 200000 },
  { label: "มากกว่า 200,000", min: 200000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "เรียงตาม...", value: "default" },
  { label: "ราคา: ต่ำ – สูง", value: "price-asc" },
  { label: "ราคา: สูง – ต่ำ", value: "price-desc" },
  { label: "ชื่อสินค้า A–Z", value: "name-asc" },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "สินค้าทั้งหมด");
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("สินค้าทั้งหมด");
    }
  }, [categoryParam]);

  // Filter & sort logic
  const filtered = useMemo(() => {
    const { min, max } = PRICE_RANGES[priceRange];
    let result = products.filter((p) => {
      const matchCategory =
        selectedCategory === "สินค้าทั้งหมด" ||
        p.category === selectedCategory ||
        p.categoryName === selectedCategory;
      const matchPrice = p.price >= min && p.price < max;
      return matchCategory && matchPrice;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "latest") result = [...result].reverse();
    else if (sort === "best-seller")
      result = [...result].sort(
        (a, b) =>
          (b.originalPrice ? b.originalPrice - b.price : 0) -
          (a.originalPrice ? a.originalPrice - a.price : 0)
      );

    return result;
  }, [selectedCategory, priceRange, sort]);

  // ซ่อนหมวดหมู่อื่นๆ ไว้ก่อน เอาเฉพาะที่มีใน mockdata จริง
  const availableCategoryGroups = useMemo(() => {
    return categories
      .map((group) => {
        const matchingItems = group.items.filter((item) =>
          products.some((p) => p.category === item || p.categoryName === item)
        );
        return {
          ...group,
          items: matchingItems,
        };
      })
      .filter((group) => group.items.length > 0);
  }, []);

  const otherAvailableCategories = useMemo(() => {
    const knownItems = new Set<string>(categories.flatMap((g) => g.items));
    const allInProducts = Array.from(
      new Set(products.map((p) => p.categoryName || p.category))
    );
    return allInProducts.filter((c) => !knownItems.has(c));
  }, []);


  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/" className="hover:text-zinc-800 transition-colors">
          หน้าแรก
        </Link>
        <span aria-hidden="true" className="text-zinc-300">/</span>
        <span className="text-zinc-500">หมวดหมู่สินค้า</span>
        <span aria-hidden="true" className="text-zinc-300">/</span>
        <span className="font-medium text-zinc-900">{selectedCategory}</span>
      </nav>

      {/* Mobile Filter Toggle Button */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center gap-2 rounded-lg border border-[#e0d0e8] bg-white px-3.5 py-2 text-xs font-semibold text-[#40184f] shadow-xs hover:bg-zinc-50"
        >
          <svg className="size-4 text-[#622576]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span>หมวดหมู่ & ตัวกรอง</span>
          <span className="rounded-full bg-[#622576]/10 px-1.5 py-0.2 text-[10px] font-bold text-[#622576]">
            {selectedCategory === "สินค้าทั้งหมด" ? "ทั้งหมด" : selectedCategory}
          </span>
        </button>
        <span className="text-xs text-zinc-400">
          {filtered.length} รายการ
        </span>
      </div>

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* LEFT SIDEBAR (Category Sidebar) */}
        <aside
          className={`w-full lg:w-72 shrink-0 ${
            isMobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
            {/* Shopee-style Category Header */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100">
              <svg
                className="size-5 text-[#622576]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <h2 className="text-base font-bold text-zinc-900">
                หมวดหมู่สินค้า
              </h2>
            </div>

            {/* Category Tree Navigation */}
            <div className="py-4 space-y-3">
              {/* All Products Option */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("สินค้าทั้งหมด");
                    setIsMobileFilterOpen(false);
                  }}
                  className={`group flex w-full items-center justify-between text-left text-sm py-2 px-3 rounded-xl transition-all ${
                    selectedCategory === "สินค้าทั้งหมด"
                      ? "bg-[#fbf6fc] font-bold text-[#622576]"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-[#622576]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {selectedCategory === "สินค้าทั้งหมด" && (
                      <span className="text-[#622576] font-bold text-xs">▸</span>
                    )}
                    <span>สินค้าทั้งหมด</span>
                  </span>
                  <span
                    className={`text-xs ${
                      selectedCategory === "สินค้าทั้งหมด"
                        ? "text-[#622576] font-semibold"
                        : "text-zinc-400"
                    }`}
                  >
                    ({products.length})
                  </span>
                </button>
              </div>

              {/* Grouped Categories from data/categories (เฉพาะที่มีใน mockdata จริง) */}
              {availableCategoryGroups.map((group) => (
                <div key={group.id} className="space-y-1 pt-2 border-t border-zinc-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-3 py-1">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const isSelected = selectedCategory === item;
                      const count = products.filter((p) => p.category === item || p.categoryName === item).length;
                      return (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCategory(item);
                              setIsMobileFilterOpen(false);
                            }}
                            className={`group flex w-full items-center justify-between text-left py-2 px-3 rounded-xl text-sm transition-all ${
                              isSelected
                                ? "bg-[#fbf6fc] font-bold text-[#622576]"
                                : "text-zinc-700 hover:bg-zinc-50 hover:text-[#622576]"
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              {isSelected && (
                                <span className="text-[#622576] font-bold text-xs">▸</span>
                              )}
                              <span className="truncate">{item}</span>
                            </span>
                            <span
                              className={`text-xs shrink-0 ml-1.5 ${
                                isSelected ? "text-[#622576] font-semibold" : "text-zinc-400"
                              }`}
                            >
                              ({count})
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {/* หมวดหมู่อื่นๆ ใน mockdata (ถ้ามี) */}
              {otherAvailableCategories.map((item) => {
                const isSelected = selectedCategory === item;
                const count = products.filter((p) => p.category === item || p.categoryName === item).length;
                return (
                  <div key={item} className="pt-2 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(item);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`group flex w-full items-center justify-between text-left py-2 px-3 rounded-xl text-sm transition-all ${
                        isSelected
                          ? "bg-[#fbf6fc] font-bold text-[#622576]"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-[#622576]"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        {isSelected && (
                          <span className="text-[#622576] font-bold text-xs">▸</span>
                        )}
                        <span className="truncate">{item}</span>
                      </span>
                      <span
                        className={`text-xs shrink-0 ml-1.5 ${
                          isSelected ? "text-[#622576] font-semibold" : "text-zinc-400"
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT (Products Listing) */}
        <div className="flex-1 min-w-0 w-full">
          {/* Shopee-style Sort & Filter Bar */}
          <div className="rounded-xl bg-zinc-100/90 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-3 border border-zinc-200/70 shadow-2xs">
            {/* ฝั่งซ้าย: เรียงโดย + แท็บ ยอดนิยม ล่าสุด สินค้าขายดี */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-zinc-600 px-1">
                เรียงโดย
              </span>
              <button
                type="button"
                onClick={() => setSort("default")}
                className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  sort === "default"
                    ? "bg-[#622576] text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80"
                }`}
              >
                ยอดนิยม
              </button>
              <button
                type="button"
                onClick={() => setSort("latest")}
                className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  sort === "latest"
                    ? "bg-[#622576] text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80"
                }`}
              >
                ล่าสุด
              </button>
              <button
                type="button"
                onClick={() => setSort("best-seller")}
                className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  sort === "best-seller"
                    ? "bg-[#622576] text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80"
                }`}
              >
                สินค้าขายดี
              </button>
            </div>

            {/* ฝั่งขวา: Dropdown ทุกราคา & เรียงตาม... */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="h-9 rounded-lg border border-zinc-200/90 bg-white px-3 text-xs sm:text-sm text-zinc-800 outline-none focus:border-[#622576] shadow-2xs sm:w-40"
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 rounded-lg border border-zinc-200/90 bg-white px-3 text-xs sm:text-sm text-zinc-800 outline-none focus:border-[#622576] shadow-2xs sm:w-44"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {/* Products Grid */}
          <div className="mt-4">
            {filtered.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-200 py-16 text-center">
                <svg
                  className="mx-auto size-12 text-zinc-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-[#40184f] font-bold text-base">
                  ยังไม่มีสินค้าในหมวดหมู่ &quot;{selectedCategory}&quot;
                </p>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
                  ขณะนี้ทางร้านกำลังทยอยอัปเดตสต็อกสินค้าเพิ่มเติม ขอแนะนำให้เลือกดูเตียงผู้ป่วยไฟฟ้าที่มีพร้อมส่ง
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("สินค้าทั้งหมด");
                    setPriceRange(0);
                    setSort("default");
                  }}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#622576] px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#521e64] transition-colors"
                >
                  <span>ดูสินค้าทั้งหมด ({products.length} รายการ)</span>
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
