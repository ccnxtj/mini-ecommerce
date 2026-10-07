import Link from "next/link";
import ShopHeader from "@/components/shop-header";

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <>
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <h1 className="text-3xl font-bold text-[#40184f]">{title}</h1>
        <p className="mt-4 text-[#69576e]">Content coming soon.</p>
        <Link href="/" className="mt-8 inline-block font-semibold text-[#622576] hover:underline">
          ← Back to Home
        </Link>
      </main>
    </>
  );
}
