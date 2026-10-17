/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import Image from "next/image";
import Link from "next/link";
import type { HealthArticle } from "@/data/health-articles";

interface HealthArticleCardProps {
  article: HealthArticle;
  variant?: "default" | "featured" | "horizontal";
  onClick?: () => void;
}

export default function HealthArticleCard({
  article,
  variant = "default",
  onClick,
}: HealthArticleCardProps) {
  let content: React.ReactNode;

  if (variant === "featured") {
    content = (
      <article className="group flex flex-col h-full justify-between">
        <div>
          {/* รูปภาพหน้าปกบทความเด่น (16:9 cinematic) */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-surface border border-neutral-border">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* รายละเอียดบทความเด่น */}
          <div className="pt-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md bg-primary-tint px-2.5 py-0.5 font-semibold text-primary">
                {article.category}
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-text-muted">{article.date}</span>
              <span className="text-text-muted">·</span>
              <span className="font-medium text-emerald-600">อ่าน {article.readTime}</span>
            </div>
            <h3 className="mt-2.5 text-lg font-bold text-text-heading group-hover:text-primary transition-colors leading-snug sm:text-xl">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-3">
              {article.summary}
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-dark transition-colors">
          <span>อ่านบทความฉบับเต็ม</span>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </div>
      </article>
    );
  } else if (variant === "horizontal") {
    content = (
      <article className="group flex flex-col sm:flex-row gap-4 items-start sm:items-center py-3.5 border-b border-neutral-border/80 last:border-b-0">
        <div className="relative aspect-[16/10] w-full sm:w-36 shrink-0 overflow-hidden rounded-lg bg-neutral-surface border border-neutral-border">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, 150px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="font-semibold text-primary">{article.category}</span>
            <span>·</span>
            <span>อ่าน {article.readTime}</span>
          </div>
          <h3 className="mt-1 text-sm sm:text-base font-semibold text-text-heading group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-text-muted">
            {article.date}
          </p>
        </div>
      </article>
    );
  } else {
    content = (
      <article className="group flex flex-col h-full">
        {/* รูปภาพหน้าปกบทความแบบมาตรฐาน */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-surface border border-neutral-border">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>

        {/* เนื้อหาการ์ด */}
        <div className="flex flex-1 flex-col pt-3.5">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="font-medium text-text-body">{article.category}</span>
            <span>·</span>
            <span>{article.date}</span>
            {article.readTime && (
              <>
                <span>·</span>
                <span className="text-emerald-600">อ่าน {article.readTime}</span>
              </>
            )}
          </div>
          <h3 className="mt-2 text-sm font-semibold text-text-heading group-hover:text-primary transition-colors leading-snug line-clamp-2 sm:text-base">
            {article.title}
          </h3>
        </div>
      </article>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer h-full">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/health-articles/${article.id}`} className="h-full block focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-xl">
      {content}
    </Link>
  );
}
