"use client";

import Image from "next/image";
import { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  content: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "bed-difference",
    question: "สินค้าเตียงผู้ป่วยไฟฟ้า ALLWELL แตกต่างกันอย่างไร",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-zinc-600 leading-relaxed">
          ตารางเปรียบเทียบฟังก์ชันและคุณสมบัติของเตียงผู้ป่วยไฟฟ้า ALLWELL แต่ละรุ่น เพื่อช่วยให้ท่านเลือกเตียงที่ตอบโจทย์ความต้องการของผู้ป่วยและผู้ดูแลได้ดีที่สุด
        </p>
        <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-xs">
          <Image
            src="/products/allwell-bed-comparison.jpg"
            alt="เปรียบเทียบสินค้าเตียงผู้ป่วยไฟฟ้า ALLWELL"
            width={918}
            height={1112}
            className="w-full h-auto object-contain"
            priority={false}
          />
        </div>
      </div>
    ),
  },
  {
    id: "showroom",
    question: "อยากเห็นสินค้าจริงก่อนตัดสินใจซื้อมี Showroom ไหม?",
    content: (
      <div className="space-y-4 text-sm text-zinc-600 leading-relaxed">
        <p>
          ลูกค้าสามารถชมสินค้าเตียงผู้ป่วยไฟฟ้าและสินค้าอื่น ๆ ทั้งหมด ได้ที่บริษัทของเราค่ะ เปิดทำการทุกวัน เวลา 8.00-17.00 น. (ยกเว้นวันหยุดนักขัตฤกษ์)
        </p>
        <p className="font-medium text-zinc-800 flex items-start gap-2">
          <svg className="size-5 shrink-0 text-[#622576] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            บริษัทอยู่ที่ 12,14 ซ.จรัญสนิทวงศ์ 89/2 ถนนจรัญสนิทวงศ์ แขวงบางอ้อ เขตบางพลัด กรุงเทพ 10700 (ตรงข้ามโรงพยาบาลยันฮี)
          </span>
        </p>
        <div className="w-full overflow-hidden rounded-xl border border-zinc-200 shadow-xs aspect-[16/10] sm:aspect-[16/9] max-h-[420px]">
          <iframe
            title="แผนที่ Showroom ALLWELL"
            loading="lazy"
            className="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14950.126321266367!2d100.52420821913023!3d13.783277168632502!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2860862b760252ec!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4n-C4suC4o-C5jCDguJfguKPguLTguKXguYDguKXguLXguKLguJkg4LiI4Liz4LiB4Lix4LiUIChQaGFyIFRyaWxsaW9uIENvLixMdGQuKQ!5e0!3m2!1sth!2sth!4v1544601570599"
            allowFullScreen
          />
        </div>
      </div>
    ),
  },
  {
    id: "delivery-upcountry",
    question: "ถ้าอยู่ต่างจังหวัด มีบริการจัดส่งไหม / มีค่าจัดส่งหรือเปล่า?",
    content: (
      <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
        <p className="font-semibold text-zinc-800">เรามีบริการจัดส่งทั่วประเทศค่ะ</p>
        <div className="rounded-xl bg-zinc-50 p-4 sm:p-5 border border-zinc-200 space-y-2.5">
          <p>
            <strong className="text-zinc-900">กรณีสินค้าทั่วไป:</strong> ทางบริษัทใช้บริการขนส่งของ Kerry ลูกค้าสามารถเลือกการจัดส่งแบบโอนเงิน หรือ COD ก็ได้ค่ะ
          </p>
          <p>
            <strong className="text-zinc-900">กรณีสินค้าเตียงไฟฟ้า:</strong> ถ้าส่งภายในจังหวัดกรุงเทพ จัดส่งฟรีค่ะ แต่ถ้าส่งต่างจังหวัด บริษัทคิดค่าจัดส่งตามระยะทาง (สามารถสอบถามราคาที่คำนวณแล้วอย่างแน่นอนได้กับเจ้าหน้าที่ได้ค่ะ)
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "warranty-service",
    question: "มีการรับประกันสินค้า และบริการหลังการขายหรือไม่?",
    content: (
      <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
        <p>
          ถึงแม้สินค้าเตียงผู้ป่วยหรือสินค้าทั่วไปจะหมดการรับประกันแล้ว ลูกค้ายังสามารถติดต่อบริษัท เพื่อให้เราดูแลบริการได้เหมือนเดิมค่ะ เพียงแต่อาจจะมีการคิดค่าใช้จ่ายในส่วนของอะไหล่ (ถ้ามี) หมดห่วงเรื่องการบริการหลังการขายได้เลยค่ะ
        </p>
        <p className="rounded-xl bg-[#622576]/5 p-4 border border-[#622576]/15 text-[#40184f]">
          บริษัทมีการสำรองอะไหล่ และอุปกรณ์ของ เตียงผู้ป่วย ในคลังสินค้าทุกรุ่น และมีทีมช่างที่ผ่านการอบรมจากทางบริษัทผู้ผลิตโดยตรง ดังนั้น หากสินค้าชำรุด ลูกค้าสามารถมั่นใจได้ว่า สินค้าของท่านจะถูกซ่อมแซมให้กลับมาใช้งานได้สมบูรณ์เหมือนเดิม โดยไม่ต้องรออะไหล่จากทางต่างประเทศ หรือส่งเตียงไฟฟ้ากลับบริษัทผู้ผลิตเพื่อซ่อมสินค้า
        </p>
      </div>
    ),
  },
  {
    id: "thai-manual",
    question: "เป็นสินค้านำเข้าจะมีคู่มือวิธีใช้งานภาษาไทยให้ไหม?",
    content: (
      <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
        <p>
          สินค้าของเราทุกชิ้นมีคู่มือภาษาไทยบรรจุภายในกล่องสินค้าค่ะ นอกจากนี้เรายังมี VDO สาธิตวิธีการใช้งานสินค้า เพื่อให้ลูกค้าเข้าใจวิธีการใช้งานง่ายขึ้น
        </p>
        <p>
          หรือหากลูกค้าสะดวกสามารถติดต่อศูนย์บริการหลังการขาย เพื่อให้ทีมงานของเราแนะนำวิธีการใช้งานเตียงผู้ป่วย เตียงไฟฟ้า หรือสินค้าอื่น ๆ ก็ได้เช่นกันค่ะ
        </p>
      </div>
    ),
  },
];

export default function ProductFaqSection() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full bg-[#fdfbfd] py-14 sm:py-20 border-t border-zinc-200" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* หัวข้อส่วนคำถามที่พบบ่อย */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="h-px flex-1 bg-zinc-200 max-w-[80px] sm:max-w-[160px]" />
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 text-center"
          >
            คำถามที่พบบ่อย
          </h2>
          <div className="h-px flex-1 bg-zinc-200 max-w-[80px] sm:max-w-[160px]" />
        </div>

        {/* รายการ Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs transition-shadow hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${item.id}`}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-zinc-900 transition-colors hover:text-[#622576] cursor-pointer"
                >
                  <span className="text-sm sm:text-base leading-snug">{item.question}</span>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-500 transition-all duration-200 ${
                      isOpen ? "rotate-180 bg-[#622576] text-white" : "hover:bg-zinc-200"
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-content-${item.id}`}
                    role="region"
                    className="border-t border-zinc-100 p-4 sm:p-6 bg-white"
                  >
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
