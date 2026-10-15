"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-10">
      <p className="text-xs uppercase tracking-widest text-[#9e84a8]">เกิดข้อผิดพลาด</p>
      <h1 className="mt-3 text-2xl font-bold text-[#40184f]">
        โหลดข้อมูลไม่สำเร็จ
      </h1>
      <p className="mt-2 text-[#69576e]">
        ระบบเจอปัญหาบางอย่างครับ ลองโหลดใหม่อีกครั้ง หรือกลับไปหน้าแรกได้เลย
      </p>
      <div className="mt-7 flex items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#622576] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#58206c]"
        >
          ลองอีกครั้ง
        </button>
        <Link href="/" className="text-sm text-[#622576] hover:underline">
          กลับหน้าแรก
        </Link>
      </div>
    </main>
  );
}
