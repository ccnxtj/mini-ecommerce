/* Impeccable · polish: contact page · simple, calm, medical trust UI
 * refined contrast, quiet input states, precise typography and spacing
 */
import type { Metadata } from "next";
import ShopHeader from "@/components/shop-header";
import AllwellServiceBanner from "@/components/allwell-service-banner";

export const metadata: Metadata = {
  title: "ติดต่อเรา & นัดหมายชมโชว์รูม | ALLWELL Healthcare",
  description:
    "ติดต่อบริษัท ออลล์เวล ไลฟ์ จำกัด นัดหมายทดลองเตียงผู้ป่วยและอุปกรณ์การแพทย์ที่โชว์รูมตรงข้าม รพ.ยันฮี หรือโทร 02-109-9999",
};

export default function ContactPage() {
  return (
    <>
      <ShopHeader />

      <main className="bg-neutral-bg text-zinc-900 pb-16 overflow-x-clip selection:bg-primary/20 selection:text-primary">
        {/* Header สไตล์ Editorial เรียบหรู สง่างาม ไม่ใช้ kicker ซ้ำซ้อน */}
        <section className="pt-8 sm:pt-14 md:pt-16 pb-6 sm:pb-12 bg-gradient-to-b from-primary/8 via-primary/[0.02] to-transparent">
          <div className="mx-auto max-w-4xl px-4 sm:px-8 text-center">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-snug sm:leading-tight">
              ติดต่อ ALLWELL และนัดหมายชมโชว์รูม
            </h1>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
              ยินดีให้คำปรึกษาเรื่องเตียงผู้ป่วยและอุปกรณ์ดูแลผู้สูงอายุอย่างจริงใจ โดยทีมพยาบาลและผู้เชี่ยวชาญ
            </p>
          </div>
        </section>

        {/* แถบช่องทางติดต่อด่วน 3 ช่องทางหลัก (โทร, LINE, เวลาทำการ) — ปรับให้พอดีในมือถือ */}
        <section className="pb-8 sm:pb-14 -mt-2 sm:-mt-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-5">
              {/* Call Center */}
              <a
                href="tel:021099999"
                className="group flex items-center gap-3.5 sm:gap-4 rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60 transition-all hover:shadow-sm hover:ring-primary/30 active:scale-[0.99]"
              >
                <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <svg className="size-4.5 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-medium">โทรสายด่วน Call Center</div>
                  <div className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-primary transition-colors">
                    02-109-9999
                  </div>
                </div>
              </a>

              {/* LINE Official */}
              <a
                href="https://line.me/R/ti/p/@allwellth"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 sm:gap-4 rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60 transition-all hover:shadow-sm hover:ring-emerald-500/30 active:scale-[0.99]"
              >
                <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#06C755] transition-transform group-hover:scale-105">
                  <svg className="size-4.5 sm:size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.346 0 .629.285.629.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-medium">LINE Official</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-600">
                    @allwellth
                  </div>
                </div>
              </a>

              {/* Showroom Hours */}
              <div className="flex items-center gap-3.5 sm:gap-4 rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60">
                <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="size-4.5 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-medium">เวลาเปิดให้บริการโชว์รูม</div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-900">
                    จันทร์ - เสาร์ 08:00 - 17:30 น.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ส่วนเนื้อหาหลัก: ข้อมูลโชว์รูม + แผนที่ และฟอร์มติดต่อที่กระชับ */}
        <section className="py-8 sm:py-16 bg-primary/[0.03]">
          <div className="mx-auto max-w-5xl px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
              {/* ข้อมูลโชว์รูม & แผนที่ (7 คอลัมน์) */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-zinc-900 leading-snug">
                    โชว์รูม ALLWELL สำนักงานใหญ่ (จรัญสนิทวงศ์)
                  </h2>
                  <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-emerald-700 font-medium flex items-center gap-1.5">
                    <span className="size-1.5 sm:size-2 rounded-full bg-emerald-500" />
                    มีที่จอดรถสะดวกสบาย • มีเตียงจริงให้ทดลองนอนทุกรุ่น
                  </p>
                </div>

                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-zinc-600 leading-relaxed bg-white/70 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl ring-1 ring-zinc-200/50">
                  <p>
                    <strong className="text-zinc-800">ที่ตั้ง:</strong> 73, 75 ซอยจรัญสนิทวงศ์ 89/2 แขวงบางอ้อ เขตบางพลัด กรุงเทพมหานคร 10700
                  </p>
                  <p>
                    <strong className="text-zinc-800">จุดสังเกต:</strong> ตั้งอยู่ริมถนนจรัญสนิทวงศ์ ตรงข้ามโรงพยาบาลยันฮี (ใกล้ MRT บางอ้อ ทางออก 1)
                  </p>
                </div>

                {/* Google Maps Embed — ขอบมน เรียบง่าย มีมิติเบาบาง */}
                <div className="overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/11] sm:aspect-[16/10] w-full bg-zinc-100 shadow-xs ring-1 ring-zinc-200/60">
                  <iframe
                    title="แผนที่โชว์รูม ALLWELL สำนักงานใหญ่"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.654817758252!2d100.510002!3d13.799000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ3JzU2LjQiTiAxMDDCsDMwJzM2LjAiRQ!5e0!3m2!1sth!2sth!4v1600000000000!5m2!1sth!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* ฟอร์มส่งข้อความติดต่อกลับ — เรียบง่าย สะอาดตา (5 คอลัมน์) */}
              <div className="lg:col-span-5 rounded-xl sm:rounded-2xl bg-white p-4.5 sm:p-7 shadow-xs ring-1 ring-zinc-200/60 space-y-3.5 sm:space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900">ส่งข้อความติดต่อกลับ</h3>
                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                    ฝากข้อมูลเพื่อให้ทีมผู้เชี่ยวชาญติดต่อกลับหรือนัดหมายเข้าชมเตียงจริง
                  </p>
                </div>

                <form className="space-y-3 sm:space-y-3.5" action="#">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-zinc-700 mb-1">
                      ชื่อ - นามสกุล *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ระบุชื่อของคุณ"
                      className="w-full rounded-lg sm:rounded-xl bg-zinc-50 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 border border-zinc-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-zinc-700 mb-1">
                      เบอร์โทรติดต่อ *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08x-xxx-xxxx"
                      className="w-full rounded-lg sm:rounded-xl bg-zinc-50 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 border border-zinc-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-zinc-700 mb-1">
                      สินค้าที่สนใจ
                    </label>
                    <select
                      className="w-full rounded-lg sm:rounded-xl bg-zinc-50 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-zinc-900 border border-zinc-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    >
                      <option>เตียงผู้ป่วยปรับไฟฟ้า</option>
                      <option>ที่นอนลมป้องกันแผลกดทับ</option>
                      <option>รถเข็นวีลแชร์ / เก้าอี้นั่งถ่าย</option>
                      <option>สอบถามบริการหรืออะไหล่</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-zinc-700 mb-1">
                      ข้อความเพิ่มเติม
                    </label>
                    <textarea
                      rows={3}
                      placeholder="ระบุอาการผู้ป่วย หรือสิ่งที่ต้องการปรึกษา..."
                      className="w-full rounded-lg sm:rounded-xl bg-zinc-50 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 border border-zinc-200 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg sm:rounded-xl bg-primary text-white py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-primary-dark active:scale-[0.99] transition-all cursor-pointer shadow-xs mt-1"
                  >
                    ส่งข้อความติดต่อกลับ
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* แถบบริการและการรับประกัน ALLWELL */}
        <AllwellServiceBanner />
      </main>
    </>
  );
}
