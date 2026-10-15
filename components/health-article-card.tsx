import Image from "next/image";
import Link from "next/link";
import type { HealthArticle } from "@/data/health-articles";

interface HealthArticleCardProps {
  article: HealthArticle;
  onClick?: () => void;
}

export default function HealthArticleCard({ article, onClick }: HealthArticleCardProps) {
  const content = (
    <article className="group flex flex-col h-full">
      {/* รูปภาพหน้าปกบทความ */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* เนื้อหาการ์ด */}
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs text-zinc-400">
          {article.category} · {article.date}
        </p>
        <h3 className="mt-2 text-sm font-semibold text-zinc-900 group-hover:text-[#622576] transition-colors leading-snug line-clamp-2 sm:text-base">
          {article.title}
        </h3>
      </div>
    </article>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer h-full">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/health-articles/${article.id}`} className="h-full block">
      {content}
    </Link>
  );
}
