import type { Metadata } from "next";
import ShopHeader from "@/components/shop-header";
import PromotionsClient from "@/components/promotions-client";

export const metadata: Metadata = {
  title: "โปรโมชั่นและสิทธิพิเศษ",
  description: "รวมโปรโมชั่น ส่วนลด และข้อเสนอพิเศษสำหรับเตียงผู้ป่วยไฟฟ้าและอุปกรณ์ดูแลสุขภาพ",
};

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <PromotionsClient />
      </main>
    </div>
  );
}
