import { Suspense } from "react";
import ShopHeader from "@/components/shop-header";
import HealthArticlesClient from "@/components/health-articles-client";

export default function HealthArticlesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <Suspense
          fallback={
            <div className="py-20 text-center text-zinc-400">
              กำลังโหลดบทความสุขภาพ...
            </div>
          }
        >
          <HealthArticlesClient />
        </Suspense>
      </main>
    </div>
  );
}
