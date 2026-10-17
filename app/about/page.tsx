/* Hallmark · page: about · genre: editorial · theme: allwell-medical
 * polished: 4-column 2-row borderless awards grid, full-bleed hero banner, clean partners showcase
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 * mobile: verified at 320 / 375 / 414 / 768 / 1024 / 1280 px
 */
import type { Metadata } from "next";
import Image from "next/image";
import ShopHeader from "@/components/shop-header";
import AllwellServiceBanner from "@/components/allwell-service-banner";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | ALLWELL LIFE Co., LTD.",
  description:
    "บริษัท ออลล์เวล ไลฟ์ จำกัด ก่อตั้งขึ้นในปี พ.ศ. 2541 ผู้นำเข้าและจัดจำหน่ายเครื่องมือแพทย์และเตียงผู้ป่วยคุณภาพสูง รางวัลสุดยอด SME แห่งชาติ 3 ปีซ้อน และมาตรฐาน ISO 13485",
};

export default function AboutPage() {
  // ถ้วยรางวัลและมาตรฐานรับรอง 8 รายการ จัดเป็น 4 คอลัมน์ 2 แถว ไร้กรอบกล่อง
  const awardsAndCertifications = [
    {
      title: "สุดยอด SME แห่งชาติ 3 ปีซ้อน",
      year: "พ.ศ. 2563 - 2565",
      desc: "คะแนนสูงสุดจากกว่า 1,000 บริษัท จัดโดย สสว.",
      image: "/about/sme-national-award.jpg",
    },
    {
      title: "สุดยอด SME แห่งชาติ ครั้งที่ 14",
      year: "ประจำปี 2565",
      desc: "รางวัลระดับประเทศยืนยันความแข็งแกร่งขององค์กร",
      image: "/about/sme142.png",
    },
    {
      title: "สุดยอด SME แห่งชาติยอดเยี่ยม",
      year: "กลุ่มธุรกิจเครื่องมือแพทย์",
      desc: "ผลคะแนนอันดับ 1 ในหมวดธุรกิจสุขภาพและการแพทย์",
      image: "/about/sme143.png",
    },
    {
      title: "โล่รางวัล Top SME Award",
      year: "ประจำปี 2563",
      desc: "รางวัลผู้ประกอบการมาตรฐานและบริการยอดเยี่ยม",
      image: "/about/top-sme-award.jpg",
    },
    {
      title: "DAILYNEWS TOP CEO",
      year: "ประจำปี 2567",
      desc: "รางวัลผู้นำองค์กรยอดเยี่ยมแห่งปี โดยเดลินิวส์",
      image: "/about/top-ceo-award.png",
    },
    {
      title: "ธรรมาภิบาลธุรกิจยอดเยี่ยม",
      year: "กรมพัฒนาธุรกิจการค้า (DBD)",
      desc: "ผ่านเกณฑ์รับรองมาตรฐานธรรมาภิบาลธุรกิจ กระทรวงพาณิชย์",
      image: "/about/dbd-governance.png",
    },
    {
      title: "มาตรฐานสากล ISO 13485",
      year: "ISO 9001 ต่อเนื่อง 12 ปี",
      desc: "ระบบบริหารคุณภาพเครื่องมือแพทย์และคลังสินค้าระดับสากล",
      image: "/about/iso-certification.jpg",
    },
    {
      title: "โรงพยาบาลชั้นนำไว้วางใจ",
      year: "ประเมินบริการระดับดีมาก (A)",
      desc: "ส่งมอบอุปกรณ์การแพทย์ให้โรงพยาบาลชั้นนำทั่วประเทศ",
      image: "/about/hospital-certification.jpg",
    },
  ];

  return (
    <>
      <ShopHeader />

      <main className="bg-neutral-bg text-zinc-900 pb-16 overflow-x-clip selection:bg-primary/20 selection:text-primary">
        {/* Hero Web Banner — แบบเต็มจอ (Full Bleed Edge-to-Edge) */}
        <div className="w-full bg-[#1e072b]">
          <Image
            src="/about/sme-banner.jpg"
            alt="ALLWELL Life - ได้รับรางวัลสุดยอด SME แห่งชาติ ครั้งที่ 14"
            width={2560}
            height={977}
            className="w-full h-auto block object-cover"
            priority
          />
        </div>

        {/* ข้อมูลองค์กรและประวัติ — ดีไซน์บรรยากาศตัดโทนม่วงหรูหรา นุ่มนวล ไม่ขาวโพลน */}
        <section className="relative py-10 sm:py-16 md:py-20 bg-gradient-to-b from-primary/6 via-primary/[0.02] to-transparent">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* ฝั่งซ้าย: บทความแนะนำองค์กร & สโลแกน */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                  ALLWELL LIFE · ก่อตั้งเมื่อปี พ.ศ. 2541
                </div>

                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-snug sm:leading-[1.25]">
                  Better Care, Better Life <br />
                  <span className="text-primary font-semibold text-lg sm:text-2xl">
                    การดูแลที่ดีกว่า เพื่อคุณภาพชีวิตที่ดียิ่งขึ้น
                  </span>
                </h1>

                <p className="text-xs sm:text-base text-zinc-600 leading-relaxed pt-0.5 sm:pt-1">
                  บริษัท ออลล์เวล ไลฟ์ จำกัด ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะเป็นผู้นำเข้าและจัดจำหน่ายเครื่องมือ
                  อุปกรณ์ทางการแพทย์คุณภาพสูงในราคายุติธรรม และเน้นประโยชน์ต่อระบบสาธารณสุขของประเทศชาติ
                  ตลอดระยะเวลากว่า 25 ปีที่ผ่านมา เราคัดสรรสินค้ามาตรฐานสากล พร้อมทีมผู้เชี่ยวชาญบริการหลังการขายที่วางใจได้
                </p>
              </div>

              {/* ฝั่งขวา: สถิติความสำเร็จ 4 ด้านในกริด 2x2 โทนม่วงนวล มีมิติ ลึกซึ้ง */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60 transition-all hover:shadow-sm hover:ring-primary/25">
                  <div className="text-xl sm:text-3xl font-extrabold tracking-tight text-primary">
                    25+ ปี
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1">
                    ประสบการณ์ยาวนาน
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                    ก่อตั้ง พ.ศ. 2541
                  </div>
                </div>

                <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60 transition-all hover:shadow-sm hover:ring-primary/25">
                  <div className="text-xl sm:text-3xl font-extrabold tracking-tight text-primary">
                    3 ปีซ้อน
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1">
                    สุดยอด SME แห่งชาติ
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                    รางวัลเกียรติยศสูงสุด
                  </div>
                </div>

                <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60 transition-all hover:shadow-sm hover:ring-primary/25">
                  <div className="text-xl sm:text-3xl font-extrabold tracking-tight text-primary">
                    ISO 13485
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1">
                    มาตรฐานสากล
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                    เครื่องมือแพทย์ระดับโลก
                  </div>
                </div>

                <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60 transition-all hover:shadow-sm hover:ring-primary/25">
                  <div className="text-xl sm:text-3xl font-extrabold tracking-tight text-primary">
                    เกรด A
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1">
                    ประเมินบริการยอดเยี่ยม
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                    จาก รพ. ชั้นนำทั่วประเทศ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ส่วนที่ 1: ถ้วยรางวัล และมาตรฐานรับรอง — 4 คอลัมน์ 2 แถว เรียบหรู สะอาดตา */}
        <section className="py-12 sm:py-18 md:py-20 bg-primary/[0.03]">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                รางวัล และมาตรฐานรับรอง
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                การันตีความเชี่ยวชาญ คุณภาพ และธรรมาภิบาลโปร่งใส ด้วยรางวัลเกียรติยศระดับประเทศและมาตรฐานสากล
              </p>
            </div>

            {/* Grid 4 คอลัมน์ 2 แถว (8 รายการ) — ปรับขนาดรูปรางวัลให้ใหญ่ คมชัด โดดเด่น เห็นรายละเอียดชัดเจน */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-7 sm:gap-x-8 sm:gap-y-12">
              {awardsAndCertifications.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-2 sm:p-3 group transition-all"
                >
                  {/* แท่นรองภาพรางวัลสีขาวสะอาดตา ปรับขนาดให้ใหญ่ขึ้น ชัดเจน สมศักดิ์ศรีรางวัล */}
                  <div className="relative size-28 sm:size-36 md:size-40 flex items-center justify-center mb-3 shrink-0 rounded-2xl sm:rounded-3xl bg-white p-3.5 sm:p-5 shadow-xs ring-1 ring-zinc-200/60 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm group-hover:ring-primary/25">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={180}
                      height={180}
                      className="size-full object-contain"
                    />
                  </div>

                  <span className="text-[10px] sm:text-xs font-semibold text-primary mb-1">
                    {item.year}
                  </span>

                  <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug px-0.5">
                    {item.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 leading-relaxed max-w-[220px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ส่วนที่ 2: ALLWELL PARTNER | พันธมิตรทางธุรกิจของ ALLWELL */}
        <section className="py-12 sm:py-18 md:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                พันธมิตรทางธุรกิจของ ALLWELL
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                รายชื่อโรงพยาบาล สถาบันการแพทย์ และพันธมิตรชั้นนำทั่วประเทศที่ไว้วางใจเลือกใช้บริการของ ALLWELL
              </p>
            </div>

            {/* ภาพกราฟิกทางการพาร์ทเนอร์ (partner-web26.png) สบายตา อยู่บนการ์ดขาวนวลเนียนตา */}
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-50/70 p-3 sm:p-6 lg:p-8 ring-1 ring-zinc-200/50">
              <Image
                src="/about/partner-web26.png"
                alt="ALLWELL PARTNER - พาร์ทเนอร์และโรงพยาบาลชั้นนำที่ร่วมงานกับออลล์เวล"
                width={2048}
                height={829}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </div>
        </section>

        {/* แถบบริการและการรับประกัน ALLWELL */}
        <AllwellServiceBanner />
      </main>
    </>
  );
}
