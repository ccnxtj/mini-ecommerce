import Image from "next/image";

export default function AllwellServiceBanner() {
  return (
    <section
      className="w-full bg-gradient-to-r from-primary-light via-primary to-primary-dark py-8 sm:py-14 md:py-16 text-white"
      aria-labelledby="allwell-services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10">
        {/* ส่วนหัวข้อ พร้อมเส้นขีดแนวนอน ซ้าย-ขวา สไตล์เรียบหรู */}
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <div className="h-px flex-1 bg-white/30 max-w-[36px] sm:max-w-[160px] md:max-w-[220px]" />
          <h2
            id="allwell-services-heading"
            className="text-sm sm:text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-xs text-center leading-snug"
          >
            ALLWELL ดูแลก่อนและหลังการขายแบบครบวงจร
          </h2>
          <div className="h-px flex-1 bg-white/30 max-w-[36px] sm:max-w-[160px] md:max-w-[220px]" />
        </div>

        {/* การ์ดบริการ 3 รายการ */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* การ์ด 1: สินค้ามีรับประกันทุกรุ่น */}
          <div className="flex flex-col items-center rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-full overflow-hidden rounded-xl bg-neutral-surface">
              <Image
                src="/services/Allwell-1.jpg"
                alt="สินค้ามีรับประกันทุกรุ่น ช่างติดตั้งเตียงผู้ป่วย Allwell"
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <h3 className="mt-4 sm:mt-5 text-center font-bold text-text-heading text-base sm:text-xl">
              สินค้ามีรับประกันทุกรุ่น
            </h3>
            <p className="mt-1.5 sm:mt-2 text-center text-xs sm:text-sm text-text-muted leading-relaxed max-w-xs">
              รับประกันสูงสุด 3 ปี* บริการดูแลและให้คำปรึกษาต่อเนื่องตลอดอายุการใช้งานสินค้า
            </p>
          </div>

          {/* การ์ด 2: บริการจัดส่งและติดตั้งทั่วประเทศ */}
          <div className="flex flex-col items-center rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-full overflow-hidden rounded-xl bg-neutral-surface">
              <Image
                src="/services/Allwell-2.jpg"
                alt="บริการจัดส่งและติดตั้งทั่วประเทศ รถขนส่งและทีมงาน Allwell"
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <h3 className="mt-4 sm:mt-5 text-center font-bold text-text-heading text-base sm:text-xl">
              บริการจัดส่งและติดตั้งทั่วประเทศ
            </h3>
            <p className="mt-1.5 sm:mt-2 text-center text-xs sm:text-sm text-text-muted leading-relaxed max-w-xs">
              จัดส่งเร็วที่สุดภายใน 2 ชม.* ด้วยทีมงานมืออาชีพและช่างเทคนิค ดูแลติดตั้งให้จนพร้อมใช้งาน
            </p>
          </div>

          {/* การ์ด 3: มีศูนย์บริการหลังการขาย */}
          <div className="flex flex-col items-center rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-full overflow-hidden rounded-xl bg-neutral-surface">
              <Image
                src="/services/Allwell-3.jpg"
                alt="มีศูนย์บริการหลังการขาย เจ้าหน้าที่คอลเซ็นเตอร์ Allwell ให้คำปรึกษา"
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <h3 className="mt-4 sm:mt-5 text-center font-bold text-text-heading text-base sm:text-xl">
              มีศูนย์บริการหลังการขาย
            </h3>
            <p className="mt-1.5 sm:mt-2 text-center text-xs sm:text-sm text-text-muted leading-relaxed max-w-xs">
              แม้สิ้นสุดการขาย ก็มีเจ้าหน้าที่ดูแลให้คำปรึกษาและบริการ หากสินค้ามีปัญหามีบริการเข้าซ่อมถึงบ้าน
            </p>
          </div>
        </div>

        {/* แถบคำอธิบายเชิงอรรถ */}
        <p className="mt-6 sm:mt-8 text-center text-[10px] sm:text-[11px] text-white/70 leading-relaxed border-t border-white/15 pt-3 sm:pt-4">
          * เงื่อนไขการจัดส่งด่วนขึ้นอยู่กับพื้นที่ให้บริการในเขตกรุงเทพฯ และปริมณฑล / ระยะเวลารับประกันสินค้าขึ้นอยู่กับรุ่น กรุณาสอบถามเจ้าหน้าที่ก่อนสั่งซื้อ
        </p>
      </div>
    </section>
  );
}
