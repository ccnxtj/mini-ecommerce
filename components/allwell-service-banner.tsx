import Image from "next/image";

export default function AllwellServiceBanner() {
  return (
    <section
      className="w-full bg-gradient-to-r from-[#713487] via-[#6e2b84] to-[#622576] py-12 sm:py-16 text-white"
      aria-labelledby="allwell-services-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* ส่วนหัวข้อ พร้อมไอคอนดาว และเส้นขีดแนวนอน ซ้าย-ขวา */}
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <div className="h-px flex-1 bg-white/40 max-w-[60px] sm:max-w-[160px] md:max-w-[220px]" />
          <div className="flex items-center gap-2 text-white">
            <svg
              className="size-5 sm:size-6 shrink-0 fill-white text-white drop-shadow-xs"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <h2
              id="allwell-services-heading"
              className="text-base sm:text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-xs text-center"
            >
              ALLWELL ดูแลก่อนและหลังการขายแบบครบวงจร
            </h2>
          </div>
          <div className="h-px flex-1 bg-white/40 max-w-[60px] sm:max-w-[160px] md:max-w-[220px]" />
        </div>

        {/* การ์ดบริการ 3 รายการ */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* การ์ด 1: สินค้ามีรับประกันทุกรุ่น */}
          <div className="flex flex-col items-center rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src="/services/Allwell-1.jpg"
                alt="สินค้ามีรับประกันทุกรุ่น ช่างติดตั้งเตียงผู้ป่วย Allwell"
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <h3 className="mt-5 text-center font-bold text-zinc-900 text-lg sm:text-xl">
              สินค้ามีรับประกันทุกรุ่น
            </h3>
            <p className="mt-2 text-center text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xs">
              รับประกันสูงสุด 3 ปี* บริการดูแลและให้คำปรึกษาต่อเนื่องตลอดอายุการใช้งานสินค้า
            </p>
          </div>

          {/* การ์ด 2: บริการจัดส่งและติดตั้งทั่วประเทศ */}
          <div className="flex flex-col items-center rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src="/services/Allwell-2.jpg"
                alt="บริการจัดส่งและติดตั้งทั่วประเทศ รถขนส่งและทีมงาน Allwell"
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <h3 className="mt-5 text-center font-bold text-zinc-900 text-lg sm:text-xl">
              บริการจัดส่งและติดตั้งทั่วประเทศ
            </h3>
            <p className="mt-2 text-center text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xs">
              จัดส่งเร็วที่สุดภายใน 2 ชม.* ด้วยทีมงานมืออาชีพและช่างเทคนิค ดูแลติดตั้งให้จนพร้อมใช้งาน
            </p>
          </div>

          {/* การ์ด 3: มีศูนย์บริการหลังการขาย */}
          <div className="flex flex-col items-center rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src="/services/Allwell-3.jpg"
                alt="มีศูนย์บริการหลังการขาย เจ้าหน้าที่คอลเซ็นเตอร์ Allwell ให้คำปรึกษา"
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <h3 className="mt-5 text-center font-bold text-zinc-900 text-lg sm:text-xl">
              มีศูนย์บริการหลังการขาย
            </h3>
            <p className="mt-2 text-center text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xs">
              แม้สิ้นสุดการขาย ก็มีเจ้าหน้าที่ดูแลให้คำปรึกษาและบริการ หากสินค้ามีปัญหามีบริการเข้าซ่อมถึงบ้าน
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
