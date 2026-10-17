"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import HealthArticleCard from "@/components/health-article-card";
import { healthArticles, articleCategories } from "@/data/health-articles";

export default function HealthArticlesClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ทั้งหมด");

  const filteredArticles = useMemo(() => {
    return healthArticles.filter((article) =>
      selectedCategory === "ทั้งหมด" || article.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
        <Link href="/" className="hover:text-zinc-700 transition-colors">หน้าแรก</Link>
        <span aria-hidden="true" className="text-zinc-300">/</span>
        <span className="text-zinc-600">บทความสุขภาพ</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">บทความสุขภาพ</h1>
        <p className="mt-2 text-zinc-500 text-sm sm:text-base">
          สาระความรู้เพื่อการดูแลผู้ป่วยและผู้สูงอายุ
        </p>
      </div>

      {/* Category Filter — บนมือถือเป็น Pill Chips แบบเลื่อนแนวนอนนุ่มนวล ไม่แออัดเบียดเสียด / เดสก์ท็อปเป็น Tab เรียบหรู */}
      <div className="mb-8 sm:mb-10">
        {/* มุมมองมือถือ (Mobile: < sm): เลื่อนแนวนอนอิสระ (Horizontal Scroll Pill Bar) มีระยะหายใจ ไม่ตกบรรทัดเบียดกัน */}
        <div className="flex sm:hidden items-center gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 py-1">
          {articleCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all active:scale-95 ${
                  isActive
                    ? "bg-[#622576] text-white shadow-2xs font-semibold"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* มุมมองแท็บเล็ต/เดสก์ท็อป (Desktop: sm+): Underline Tab สะอาดตา */}
        <div className="hidden sm:flex flex-wrap items-center gap-x-6 border-b border-zinc-100">
          {articleCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`pb-3 text-sm transition-colors cursor-pointer border-b-2 -mb-px ${
                  isActive
                    ? "border-[#622576] font-semibold text-zinc-900"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid (3 Columns) */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <HealthArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-zinc-500">ไม่พบบทความในหมวดหมู่นี้</p>
          <button
            type="button"
            onClick={() => setSelectedCategory("ทั้งหมด")}
            className="mt-4 text-sm text-[#622576] underline underline-offset-4 hover:opacity-80"
          >
            ดูบทความทั้งหมด
          </button>
        </div>
      )}
    </div>
  );
}
