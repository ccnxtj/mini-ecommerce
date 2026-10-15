import Link from "next/link";
import ShopHeader from "@/components/shop-header";

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold text-zinc-900">{title}</h1>
          <p className="mt-4 text-zinc-500">
            เราอยู่ระหว่างพัฒนาส่วนนี้อยู่ครับ กลับมาใหม่เร็ว ๆ นี้!
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#622576] px-6 py-3 text-sm font-semibold text-white hover:bg-[#58206c]"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </main>
    </>
  );
}
