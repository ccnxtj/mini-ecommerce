import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { healthArticles } from "@/data/health-articles";
import ShopHeader from "@/components/shop-header";
import HealthArticleCard from "@/components/health-article-card";
import ArticleShareButtons from "@/components/article-share-buttons";

export const dynamicParams = false;

export function generateStaticParams() {
  return healthArticles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = healthArticles.find((a) => a.id === id);
  if (!article) return { title: "ไม่พบบทความ" };

  return {
    title: `${article.title} | Allwell สาระความรู้สุขภาพ`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.image }],
    },
  };
}

export default async function HealthArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = healthArticles.find((item) => item.id === id);
  if (!article) notFound();

  // Related articles (excluding current one, prioritizes same category, max 3)
  const sameCategory = healthArticles.filter(
    (item) => item.id !== article.id && item.category === article.category
  );
  const otherCategory = healthArticles.filter(
    (item) => item.id !== article.id && item.category !== article.category
  );
  const relatedArticles = [...sameCategory, ...otherCategory].slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />

      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-6 overflow-x-clip">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-8"
        >
          <Link href="/" className="hover:text-zinc-700 transition-colors">
            หน้าแรก
          </Link>
          <span aria-hidden="true" className="text-zinc-300">/</span>
          <Link href="/health-articles" className="hover:text-zinc-700 transition-colors">
            บทความสุขภาพ
          </Link>
          <span aria-hidden="true" className="text-zinc-300">/</span>
          <span className="text-zinc-600">{article.category}</span>
        </nav>

        {/* Editorial Article */}
        <article>
          {/* Category Tag */}
          <p className="text-xs font-semibold text-[#622576] tracking-wider uppercase mb-2">
            {article.category}
          </p>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-zinc-900 leading-[1.3] tracking-tight">
            {article.title}
          </h1>

          {/* Byline / Author Information (Clean, No Buttons) */}
          <div className="mt-3 mb-8 flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <span className="font-medium text-zinc-700">{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>อ่าน {article.readTime}</span>
          </div>

          {/* Featured Hero Image */}
          <div className="my-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Lead Intro Paragraph */}
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal mb-10">
            {article.summary}
          </p>

          {/* Article Editorial Sections */}
          {article.sections && (
            <div className="space-y-10 text-zinc-800">
              {article.sections.map((section, idx) => {
                const cleanHeading = section.heading.replace(/^\d+\.\s*/, "");
                return (
                  <section key={idx} className="space-y-3.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-snug tracking-tight">
                      {cleanHeading}
                    </h2>

                    <div className="space-y-3 text-base sm:text-[17px] leading-[1.85] text-zinc-600">
                      {section.points.map((point, pIdx) => (
                        <p key={pIdx}>
                          {point}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* Article Bottom Actions: Back to list + Minimal Share */}
          <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/health-articles"
              className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              ← กลับไปหน้ารวมบทความ
            </Link>
            <ArticleShareButtons title={article.title} />
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                บทความที่เกี่ยวข้อง
              </h2>
              <Link
                href="/health-articles"
                className="text-xs font-semibold text-[#622576] hover:underline"
              >
                ดูทั้งหมด →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {relatedArticles.map((relArticle) => (
                <HealthArticleCard key={relArticle.id} article={relArticle} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
