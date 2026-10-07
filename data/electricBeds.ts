export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  features: string[];
  details?: { title?: string; items: string[] }[];
  registration?: string;
  image: string;
};

export const electricBeds: Product[] = [
  {
    id: 1,
    slug: "healthybed",
    name: "Healthybed",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 45000,
    originalPrice: 119000,
    features: [
      "รับน้ำหนัก 260 kg",
      "หัวเตียงเสริมเบาะนุ่ม ช่วยลดแรงกระแทก",
    ],
    details: [
      {
        title: "ปรับไฟฟ้าได้ 4 ฟังก์ชัน",
        items: [
          "ปรับสูง-ต่ำได้ 35-65 เซนติเมตร",
          "ปรับพนักพิงหลังได้ 75 องศา",
          "ปรับชันเข่าได้ 30 องศา",
          "ปรับหลังพร้อมเข่า",
        ],
      },
      {
        title: "คุณสมบัติ",
        items: [
          "ปรับต่ำสุดถึง 35 cm ขึ้น-ลงจากเตียงสะดวก เพราะเท้าสัมผัสพื้นได้อย่างพอดี และลดความเสี่ยงในการพลัดตกเตียงบาดเจ็บ",
          "หัวเตียงเสริมเบาะนุ่ม ช่วยลดแรงกระแทกเมื่อศีรษะสัมผัสหัวเตียงโดยไม่ตั้งใจ",
          "ส่วนท้ายเตียงมีช่องสำหรับช่วยเคลื่อนย้ายเตียง และใช้เป็นที่ค้ำพยุงได้",
          "ราวกั้นเตียงแบบสไลด์ ปรับขึ้น-ลงได้ด้วยมือเดียว สะดวกต่อการใช้งาน และสามารถพับซ่อนไปกับเตียง",
          "แผ่นปิดหัว-ท้ายเตียงสามารถถอดออกได้ สะดวกในการดูแลผู้ป่วยบนเตียง",
          "รับน้ำหนักได้สูงสุดถึง 260 kg",
        ],
      },
    ],
    registration: "68-2-3-2-0008935",
    image: "/products/Healthybed.jpg",
  },
  {
    id: 2,
    slug: "komfortbed",
    name: "Komfortbed",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 42000,
    originalPrice: 119000,
    features: [
      "รับน้ำหนัก 260 kg",
      "หัวเตียงเสริมเบาะนุ่ม ช่วยลดแรงกระแทก",
    ],
    registration: "68-2-3-2-0008935",
    image: "/products/Komfortbed.jpg",
  },
  {
    id: 3,
    slug: "ks-888",
    name: "KS-888",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 48000,
    originalPrice: 99000,
    features: [
      "ฟรี! แบตเตอรี่สำรองไฟ",
      "ปรับต่ำ 28 cm ลดการเกิดอุบัติเหตุ",
    ],
    registration: "65-2-3-2-0003334",
    image: "/products/Allwell-KS-888.jpg",
  },
  {
    id: 4,
    slug: "venta",
    name: "VENTA",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 180000,
    originalPrice: 429000,
    features: [
      "ราวกั้นเตียง Telescopic extension",
      "รางวัล RED DOT DESIGN AWARD",
    ],
    registration: "64-2-3-2-0008411",
    image: "/products/Allwell-VENTA.jpg",
  },
  {
    id: 5,
    slug: "pantographe-3-4",
    name: "PANTOGRAPHE 3/4",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 89000,
    originalPrice: 179000,
    features: [
      "ปรับต่ำ 24 cm (Super-Low)",
      "ปรับได้สูงสุด 8 ฟังก์ชัน",
    ],
    registration: "67-2-3-2-0008506",
    image: "/products/Allwell-Pantographe.jpg",
  },
  {
    id: 6,
    slug: "gs-828",
    name: "GS-828",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 59900,
    originalPrice: 119000,
    features: [
      "ฟรี! แบตเตอรี่สำรองไฟ",
      "มีจุดควบคุมเตียงสูงถึง 5 จุด",
    ],
    registration: "64-2-3-2-0001480",
    image: "/products/Allwell-GS-828.jpg",
  },
  {
    id: 7,
    slug: "dali-low-entry",
    name: "DALI LOW ENTRY",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 70000,
    originalPrice: 169000,
    features: [
      "ปรับต่ำ 23 cm (Super-Low)",
      "พับเก็บได้ จัดส่งได้ทุกที่",
    ],
    registration: "67-2-3-2-0004073",
    image: "/products/Allwell-Dali-Low-Entry.jpg",
  },
  {
    id: 8,
    slug: "libra",
    name: "LIBRA",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 170000,
    originalPrice: 419000,
    features: [
      "ปรับต่ำ 25 cm (Low)",
      "ราวกั้นเตียงปรับความสูงได้ 3 ระดับ",
    ],
    registration: "64-2-3-2-0008421",
    image: "/products/Allwell-Libra.jpg",
  },
  {
    id: 9,
    slug: "floore",
    name: "FLOORE",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 149000,
    originalPrice: 299000,
    features: [
      "มีไฟใต้เตียง และแบตเตอรี่สำรองไฟ",
      "มีจุดควบคุมเตียง 2 จุด",
    ],
    registration: "สน.233/2553",
    image: "/products/Allwell-Floore.jpg",
  },
  {
    id: 10,
    slug: "resyone-plus",
    name: "RESYONE PLUS",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 320000,
    originalPrice: 659000,
    features: [
      "ปรับเตียงแยกเป็นรถเข็นไฟฟ้าได้",
      "นวัตกรรมจาก PANASONIC ญี่ปุ่น",
    ],
    image: "/products/Allwell-RESYONE-PLUS.jpg",
  },
  {
    id: 11,
    slug: "mobilia-cura-e-plus",
    name: "MOBILIA CURA E PLUS",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 380000,
    originalPrice: 799000,
    features: [
      "เตียงปรับหมุนด้านข้างได้",
      "มีฟังก์ชันพยุงให้ลุกขึ้นยืน",
    ],
    registration: "65-2-3-2-0003183",
    image: "/products/Allwell-MOBILIA-CURA-E-PLUS.jpg",
  },
  {
    id: 12,
    slug: "evario-one",
    name: "EVARIO ONE",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 135000,
    originalPrice: 319000,
    features: [
      "รับน้ำหนัก 250 kg",
      "ปรับได้สูงสุดถึง 5 ฟังก์ชัน",
    ],
    registration: "67-2-3-2-0007352",
    image: "/products/Allwell-EVARIO-ONE.jpg",
  },
  {
    id: 13,
    slug: "ks-828b",
    name: "KS-828B",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 48000,
    originalPrice: 99000,
    features: [
      "ฟรี! แบตเตอรี่สำรองไฟ",
      "ราวปีกนกปรับขึ้น-ลงง่าย",
    ],
    registration: "65-2-3-2-0007744",
    image: "/products/Allwell-KS-828B.jpg",
  },
  {
    id: 14,
    slug: "gracecare",
    name: "GraceCare / GraceCare1R",
    category: "เตียงผู้ป่วยไฟฟ้า",
    price: 45000,
    features: [
      "ฟรี! ตัวบอกองศาที่ราวข้างเตียง",
      "ราวปีกนกปรับขึ้น-ลงง่าย",
    ],
    registration: "68-2-3-2-0008940",
    image: "/products/Allwell-GraceCare.jpg",
  },
];
