import Link from "next/link";
import Image from "next/image";

export default function ShopFooter() {
  return (
    <footer id="contact" className="border-t border-primary-dark bg-primary-dark text-white">
      {/* ส่วนเนื้อหาหลักของ Footer: แบ่งสัดส่วนแบบ Medical Trust Colophon บนพื้นหลังสีม่วงแบรนด์ */}
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ส่วนข้อมูลแบรนด์ และโชว์รูม (5 คอลัมน์เด่น) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block" aria-label="กลับหน้าแรก ALLWELL">
              <Image
                src="/logo.png"
                alt="ALLWELL Healthcare"
                width={800}
                height={233}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-md">
              ผู้นำเข้าและจัดจำหน่ายเตียงผู้ป่วยไฟฟ้า ที่นอนลมป้องกันแผลกดทับ และอุปกรณ์ดูแลผู้สูงอายุมาตรฐานสากล พร้อมทีมช่างผู้เชี่ยวชาญบริการจัดส่งและติดตั้งถึงบ้านทั่วประเทศ
            </p>
            <div className="pt-2 text-xs text-white/75 space-y-1.5 border-t border-white/15">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                โชว์รูม ALLWELL (ตรงข้าม รพ.ยันฮี)
              </p>
              <p>73, 75 ซอยจรัญสนิทวงศ์ 89/2 แขวงบางอ้อ เขตบางพลัด กรุงเทพฯ 10700</p>
              <p className="text-emerald-300 font-medium">เปิดบริการ: จันทร์ – เสาร์ 08:00 – 17:30 น.</p>
              <p className="text-[11px] text-white/60 pt-1">
                ใบจดทะเบียนสถานประกอบการนำเข้าเครื่องมือแพทย์ สน. 8/2550
              </p>
            </div>
          </div>

          {/* ลิงก์หมวดหมู่และบริการ (3 คอลัมน์) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              หมวดหมู่และบริการ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/products?category=เตียงผู้ป่วยไฟฟ้า" className="hover:text-white transition-colors">
                  เตียงผู้ป่วยปรับไฟฟ้า
                </Link>
              </li>
              <li>
                <Link href="/products?category=ที่นอนป้องกันแผลกดทับ" className="hover:text-white transition-colors">
                  ที่นอนป้องกันแผลกดทับ
                </Link>
              </li>
              <li>
                <Link href="/products?category=เก้าอี้และรถเข็น" className="hover:text-white transition-colors">
                  รถเข็นวีลแชร์และอุปกรณ์ช่วยเดิน
                </Link>
              </li>
              <li>
                <Link href="/health-articles" className="hover:text-white transition-colors">
                  สาระสุขภาพและคู่มือผู้ดูแล
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors font-medium text-white underline underline-offset-4">
                  ตรวจสอบสถานะคำสั่งซื้อ →
                </Link>
              </li>
            </ul>
          </div>

          {/* กล่องติดต่อผู้เชี่ยวชาญโดยตรง (4 คอลัมน์) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xs p-5 sm:p-6 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-sm font-bold text-white">ปรึกษาพยาบาลและผู้เชี่ยวชาญ</h4>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              ยินดีให้คำปรึกษาเลือกรุ่นเตียงและอุปกรณ์การแพทย์ที่เหมาะสมกับอาการของผู้ป่วยโดยตรง
            </p>
            <div className="space-y-2 pt-1 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-white/80">โทรสายด่วน:</span>
                <a href="tel:021099999" className="font-bold text-white hover:underline">
                  02-109-9999
                </a>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-white/80">LINE Official:</span>
                <a
                  href="https://line.me/R/ti/p/@allwellth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-300 hover:underline"
                >
                  @allwellth
                </a>
              </div>
            </div>
            <a
              href="https://line.me/R/ti/p/@allwellth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              <span>ทัก LINE ปรึกษาผู้เชี่ยวชาญฟรี</span>
            </a>
          </div>
        </div>
      </div>

      {/* แถบล่างสุด: มาตรฐานและการรับรอง */}
      <div className="border-t border-white/10 bg-black/15 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-xs text-white/75 sm:flex-row sm:px-8 lg:px-10">
          <div>
            © 2026 บริษัท ออลเวล ไลฟ์ จำกัด (Allwell Life Co., Ltd.)
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/70">
            <span>มาตรฐานสากล ISO 13485</span>
            <span aria-hidden="true">•</span>
            <span>จัดส่งและติดตั้งโดยช่างผู้เชี่ยวชาญ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
