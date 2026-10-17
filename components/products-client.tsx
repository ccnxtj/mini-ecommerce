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
  { label: "สินค้าขายดี", value: "best-seller" },
  { label: "สินค้ามาใหม่", value: "latest" },
  { label: "ราคา: ต่ำ – สูง", value: "price-asc" },
  { label: "ราคา: สูง – ต่ำ", value: "price-desc" },
  { label: "ชื่อสินค้า A–Z", value: "name-asc" },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "สินค้าทั้งหมด");
  const [searchQuery, setSearchQuery] = useState(queryParam);
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

  useEffect(() => {
    if (queryParam !== undefined) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  // Filter & sort logic
  const filtered = useMemo(() => {
    const { min, max } = PRICE_RANGES[priceRange];
    let result = products.filter((p) => {
      const matchCategory =
        selectedCategory === "สินค้าทั้งหมด" ||
        p.category === selectedCategory ||
        p.categoryName === selectedCategory;
      const matchPrice = p.price >= min && p.price < max;
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (p.shortName && p.shortName.toLowerCase().includes(searchQuery.toLowerCase().trim()));
      return matchCategory && matchPrice && matchSearch;
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
  }, [selectedCategory, priceRange, sort, searchQuery]);

  const activeFilterCount = useMemo(() => {
    return (
      (selectedCategory !== "สินค้าทั้งหมด" ? 1 : 0) +
      (priceRange > 0 ? 1 : 0) +
      (searchQuery.trim() ? 1 : 0)
    );
  }, [selectedCategory, priceRange, searchQuery]);

  const hasActiveFilter = activeFilterCount > 0;

  const currentSortLabel = useMemo(() => {
    if (sort === "default") return "เรียงลำดับ";
    const found = SORT_OPTIONS.find((s) => s.value === sort);
    return found ? found.label : "เรียงลำดับ";
  }, [sort]);

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



  const renderFilterContent = () => (
    <div className="space-y-4">
      {/* Shopee-style Category Header (แสดงเฉพาะบน Desktop เพราะบน Mobile มีหัวของ Modal แล้ว) */}
      <div className="hidden lg:flex items-center gap-2.5 pb-4 border-b border-zinc-100">
        <svg
          className="size-5 text-brand-purple-dark"
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
      <div className="space-y-3">
        {/* ค้นหาสินค้าจากชื่อ */}
        <div className="relative mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อสินค้า..."
            className="w-full h-9 rounded-xl border border-zinc-200 bg-zinc-50 pl-8 pr-7 text-base sm:text-xs text-zinc-800 placeholder-zinc-400 outline-none focus:border-brand-purple focus:bg-white transition-colors"
          />
          <svg
            className="absolute left-2.5 top-2.5 size-4 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="ล้างคำค้นหา"
              className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600 text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* All Products Option */}
        <div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("สินค้าทั้งหมด");
            }}
            className={`group flex w-full items-center justify-between text-left text-sm py-2 px-3 rounded-xl transition-all ${
              selectedCategory === "สินค้าทั้งหมด"
                ? "bg-brand-purple-tint font-bold text-brand-purple-dark"
                : "text-zinc-700 hover:bg-zinc-50 hover:text-brand-purple-dark"
            }`}
          >
            <span className="flex items-center gap-2">
              {selectedCategory === "สินค้าทั้งหมด" && (
                <span className="text-brand-purple-dark font-bold text-xs">▸</span>
              )}
              <span>สินค้าทั้งหมด</span>
            </span>
            <span
              className={`text-xs ${
                selectedCategory === "สินค้าทั้งหมด"
                  ? "text-brand-purple-dark font-semibold"
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
                      }}
                      className={`group flex w-full items-center justify-between text-left py-2 px-3 rounded-xl text-sm transition-all ${
                        isSelected
                          ? "bg-brand-purple-tint font-bold text-brand-purple-dark"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-brand-purple-dark"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        {isSelected && (
                          <span className="text-brand-purple-dark font-bold text-xs">▸</span>
                        )}
                        <span className="truncate">{item}</span>
                      </span>
                      <span
                        className={`text-xs shrink-0 ml-1.5 ${
                          isSelected ? "text-brand-purple-dark font-semibold" : "text-zinc-400"
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
                }}
                className={`group flex w-full items-center justify-between text-left py-2 px-3 rounded-xl text-sm transition-all ${
                  isSelected
                    ? "bg-brand-purple-tint font-bold text-brand-purple-dark"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-brand-purple-dark"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  {isSelected && (
                    <span className="text-brand-purple-dark font-bold text-xs">▸</span>
                  )}
                  <span className="truncate">{item}</span>
                </span>
                <span
                  className={`text-xs shrink-0 ml-1.5 ${
                    isSelected ? "text-brand-purple-dark font-semibold" : "text-zinc-400"
                  }`}
                >
                  ({count})
                </span>
              </button>
            </div>
          );
        })}

        {/* กรองตามช่วงราคา */}
        <div className="pt-3 border-t border-zinc-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-3 py-1 mb-1">
            ช่วงราคา
          </h3>
          <div className="space-y-1">
            {PRICE_RANGES.map((r, i) => {
              const isSelected = priceRange === i;
              return (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setPriceRange(i)}
                  className={`group flex w-full items-center justify-between text-left py-2 px-3 rounded-xl text-sm transition-all ${
                    isSelected
                      ? "bg-brand-purple-tint font-bold text-brand-purple-dark"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-brand-purple-dark"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`size-3.5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-brand-purple-dark bg-brand-purple-dark"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {isSelected && <span className="size-1.5 rounded-full bg-white" />}
                    </span>
                    <span>{r.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Breadcrumb Navigation (ซ่อนบนมือถือเพื่อคืนพื้นที่หน้าจอ แสดงเฉพาะจอคอม sm+) */}
      <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/" className="hover:text-zinc-800 transition-colors">
          หน้าแรก
        </Link>
        <span aria-hidden="true" className="text-zinc-300">/</span>
        <span className="text-zinc-500">หมวดหมู่สินค้า</span>
        <span aria-hidden="true" className="text-zinc-300">/</span>
        <span className="font-medium text-zinc-900">{selectedCategory}</span>
      </nav>

      {/* Mobile Minimal Filter & Sort Toolbar (Unified Segmented Bar) */}
      <div className="mb-4 flex items-center h-11 rounded-xl border border-zinc-200/90 bg-white shadow-2xs divide-x divide-zinc-200/80 overflow-hidden lg:hidden">
        {/* ปุ่มตัวกรอง */}
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen(true)}
          className={`flex-1 h-full flex items-center justify-center gap-2 px-3 text-xs transition-colors ${
            hasActiveFilter
              ? "bg-brand-purple-tint/70 text-brand-purple-dark font-semibold"
              : "text-zinc-700 font-medium hover:bg-zinc-50 active:bg-zinc-100"
          }`}
          aria-label="เปิดตัวกรองและหมวดหมู่"
        >
          <svg
            className={`size-4 shrink-0 transition-colors ${hasActiveFilter ? "text-brand-purple-dark" : "text-zinc-500"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <span className="truncate">ตัวกรอง</span>
          {hasActiveFilter && (
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-purple-dark text-[11px] font-bold text-white leading-none">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Dropdown เรียงลำดับ */}
        <div
          className={`flex-1 h-full relative flex items-center justify-center px-3 transition-colors ${
            sort !== "default"
              ? "bg-brand-purple-tint/40 text-brand-purple-dark font-semibold"
              : "text-zinc-700 font-medium hover:bg-zinc-50 active:bg-zinc-100"
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 min-w-0 pointer-events-none">
            <svg
              className={`size-3.5 shrink-0 transition-colors ${sort !== "default" ? "text-brand-purple-dark" : "text-zinc-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <span className="text-xs truncate">
              {currentSortLabel}
            </span>
            <svg
              className="size-3 shrink-0 text-zinc-400 ml-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="absolute inset-0 size-full opacity-0 cursor-pointer text-base"
            aria-label="เรียงลำดับสินค้า"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] flex flex-col rounded-t-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <svg className="size-5 text-brand-purple-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <h2 className="text-base font-bold text-zinc-900">ตัวกรองและหมวดหมู่</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex size-11 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                aria-label="ปิดหน้าต่างตัวกรอง"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {renderFilterContent()}
            </div>

            <div className="border-t border-zinc-150 px-5 py-3 bg-zinc-50 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("สินค้าทั้งหมด");
                  setPriceRange(0);
                  setSearchQuery("");
                }}
                className="flex-1 min-h-11 rounded-xl border border-zinc-300 bg-white py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                ล้างตัวกรอง
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 min-h-11 rounded-xl bg-brand-purple-dark py-2.5 text-xs font-semibold text-white hover:bg-brand-purple-hover shadow-xs transition-colors"
              >
                ดูสินค้า ({filtered.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* LEFT SIDEBAR (Category Sidebar - Desktop Only) */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
            {renderFilterContent()}
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT (Products Listing) */}
        <div className="flex-1 min-w-0 w-full">
          {/* Shopee-style Sort & Filter Bar (Desktop Only) */}
          <div className="hidden lg:flex rounded-xl bg-zinc-100/90 p-3 items-center justify-between gap-3 border border-zinc-200/70 shadow-2xs">
            {/* ฝั่งซ้าย: เรียงโดย + แท็บ ยอดนิยม ล่าสุด สินค้าขายดี */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-semibold text-zinc-500 shrink-0 hidden sm:inline px-1">
                เรียงโดย
              </span>
              <button
                type="button"
                onClick={() => setSort("default")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition-all ${
                  sort === "default"
                    ? "bg-brand-purple-dark text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80"
                }`}
              >
                ยอดนิยม
              </button>
              <button
                type="button"
                onClick={() => setSort("latest")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition-all ${
                  sort === "latest"
                    ? "bg-brand-purple-dark text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80"
                }`}
              >
                ล่าสุด
              </button>
              <button
                type="button"
                onClick={() => setSort("best-seller")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition-all ${
                  sort === "best-seller"
                    ? "bg-brand-purple-dark text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200/80"
                }`}
              >
                สินค้าขายดี
              </button>
            </div>

            {/* ฝั่งขวา: Dropdown ทุกราคา & เรียงตาม... */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="h-8.5 sm:h-9 w-full rounded-lg border border-zinc-200/90 bg-white px-2 sm:px-3 text-xs text-zinc-800 outline-none focus:border-brand-purple-dark shadow-2xs sm:w-36"
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
                className="h-8.5 sm:h-9 w-full rounded-lg border border-zinc-200/90 bg-white px-2 sm:px-3 text-xs text-zinc-800 outline-none focus:border-brand-purple-dark shadow-2xs sm:w-40"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid with relaxed macro breathing room */}
          <div className="mt-4">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3">
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
                <p className="text-brand-purple-dark font-bold text-base">
                  {searchQuery.trim()
                    ? `ไม่พบสินค้าที่ตรงกับการค้นหา "${searchQuery}"`
                    : priceRange > 0
                    ? `ไม่พบสินค้าในช่วงราคา ${PRICE_RANGES[priceRange].label}`
                    : `ยังไม่มีสินค้าในหมวดหมู่ "${selectedCategory}"`}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
                  {searchQuery.trim()
                    ? "ลองตรวจสอบตัวสะกด หรือค้นหาด้วยคำอื่น หรือกดล้างการค้นหาเพื่อดูสินค้าทั้งหมด"
                    : "ขณะนี้ทางร้านกำลังทยอยอัปเดตสต็อกสินค้าเพิ่มเติม ขอแนะนำให้เลือกดูเตียงผู้ป่วยไฟฟ้าที่มีพร้อมส่ง"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("สินค้าทั้งหมด");
                    setPriceRange(0);
                    setSort("default");
                    setSearchQuery("");
                  }}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-purple-dark px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-purple-hover transition-colors"
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
