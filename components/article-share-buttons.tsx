"use client";

import { useState } from "react";

interface ArticleShareButtonsProps {
  title: string;
}

export default function ArticleShareButtons({ title }: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");
    }
  };

  const handleShareLine = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, "_blank", "width=600,height=500");
    }
  };

  return (
    <div className="flex items-center gap-3 text-xs text-zinc-400">
      <span>แชร์:</span>
      <button
        type="button"
        onClick={handleShareLine}
        className="cursor-pointer font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        LINE
      </button>
      <span>·</span>
      <button
        type="button"
        onClick={handleShareFacebook}
        className="cursor-pointer font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        Facebook
      </button>
      <span>·</span>
      <button
        type="button"
        onClick={handleCopyLink}
        className="cursor-pointer font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        {copied ? "คัดลอกลิงก์แล้ว!" : "คัดลอกลิงก์"}
      </button>
    </div>
  );
}
