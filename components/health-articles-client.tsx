"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import HealthArticleCard from "@/components/health-article-card";
import { healthArticles, articleCategories } from "@/data/health-articles";

export default function HealthArticlesClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ทั้งหมด");

  const filteredArticles = useMemo(() => {
    return healthArticles.filter((article) =>
      selectedCategory === "ทั้งหมด" || article.category === selectedCategory
    );
  }, [selectedCategory]);

  const featuredArticle = selectedCategory === "ทั้งหมด" ? filteredArticles[0] : null;
  const gridArticles = selectedCategory === "ทั้งหมด" ? filteredArticles.slice(1) : filteredArticles;

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

      {/* Category Tabs — flex-wrap ไม่มี scroll arrows */}
      <div className="mb-10 flex flex-wrap items-center gap-x-6 border-b border-zinc-100">
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

      {/* Featured Article */}
      {featuredArticle && (
        <div className="mb-12">
          <Link
            href={`/health-articles/${featuredArticle.id}`}
            className="group grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <p className="text-xs text-[#622576] font-medium">{featuredArticle.category}</p>
              <h2 className="mt-2 text-xl font-bold text-zinc-900 leading-snug group-hover:text-[#622576] transition-colors sm:text-2xl">
                {featuredArticle.title}
              </h2>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed line-clamp-3">
                {featuredArticle.summary}
              </p>
              <p className="mt-4 text-xs text-zinc-400">
                {featuredArticle.author} · {featuredArticle.date}
              </p>
            </div>
          </Link>
          <div className="mt-10 border-t border-zinc-100" />
        </div>
      )}

      {/* Articles Grid */}
      {gridArticles.length > 0 ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {gridArticles.map((article) => (
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
