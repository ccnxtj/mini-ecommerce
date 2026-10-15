import { electricBeds } from "@/data/electricBeds";

export type Specification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug?: string;
  name: string;
  shortName?: string;
  category: string;
  categoryName?: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  stockStatus?: string;
  warranty?: string | null;
  stock?: number;
  image: string;
  images?: string[];
  shortDescription?: string;
  description?: string;
  features: string[];
  suitableFor?: string[];
  specifications?: Specification[];
  tags?: string[];
  sourceUrl?: string;
  details?: { title?: string; items: string[] }[];
  registration?: string;
};

// ข้อมูลสินค้าที่เพิ่มเข้ามาใหม่
export const newProducts: Product[] = [
  {
    id: "allwell-bedside-armrest",
    slug: "bedside-armrest",
    name: "ราวกั้นเตียง ALLWELL BEDSIDE ARMREST",
    shortName: "BEDSIDE ARMREST",
    category: "bedroom-accessories",
    categoryName: "อุปกรณ์ข้างเตียง",
    brand: "ALLWELL",
    price: 1990,
    originalPrice: 3360,
    currency: "THB",
    stockStatus: "in-stock",
    stock: 12,
    warranty: "1 ปี",
    image: "/products/allwell-bedside-armrest.jpg",
    images: [
      "/products/allwell-bedside-armrest.jpg",
    ],
    shortDescription:
      "ราวกั้นเตียงช่วยพยุงตัวสำหรับผู้สูงอายุและผู้ที่ต้องการความช่วยเหลือในการขึ้นลงเตียง",
    description:
      "ราวกั้นเตียงที่ช่วยเพิ่มความสะดวกในการลุกขึ้นและลงจากเตียง พร้อมกระเป๋าตาข่ายสำหรับจัดเก็บสิ่งของใกล้มือ",
    features: [
      "ปรับระดับความสูงได้ 4 ระดับ",
      "ด้ามจับบุโฟม นุ่ม จับถนัดมือ",
      "โครงสร้างโลหะเคลือบสี",
      "มีกระเป๋าตาข่ายสำหรับเก็บสิ่งของ",
      "ประกอบและติดตั้งได้โดยไม่ต้องใช้เครื่องมือ",
      "ติดตั้งได้กับเตียงไม้ เตียงเหล็ก และเตียงผู้ป่วย",
    ],
    suitableFor: [
      "ผู้สูงอายุ",
      "ผู้ที่กำลังพักฟื้นหลังผ่าตัด",
      "ผู้ที่ต้องการอุปกรณ์ช่วยพยุงตัวข้างเตียง",
    ],
    specifications: [
      { label: "การปรับระดับ", value: "4 ระดับ" },
      { label: "วัสดุโครงสร้าง", value: "โลหะเคลือบสี" },
      { label: "กระเป๋าจัดเก็บ", value: "มี" },
      { label: "การรับประกัน", value: "1 ปี" },
    ],
    tags: ["ผู้สูงอายุ", "อุปกรณ์ช่วยพยุง", "ขายดี"],
    sourceUrl: "https://allwellhealthcare.com/product/bedside-armrest/",
    details: [
      {
        title: "รายละเอียดสินค้า",
        items: [
          "ราวกั้นเตียงที่ช่วยเพิ่มความสะดวกในการลุกขึ้นและลงจากเตียง พร้อมกระเป๋าตาข่ายสำหรับจัดเก็บสิ่งของใกล้มือ",
          "ช่วยป้องกันการพลัดตกเตียงในเวลากลางคืน เสริมความมั่นใจในการลุกขึ้นยืน",
        ],
      },
      {
        title: "เหมาะสำหรับ",
        items: [
          "ผู้สูงอายุที่ต้องการความมั่นคงเวลาลุกขึ้นหรือลงจากเตียง",
          "ผู้ที่กำลังพักฟื้นหลังผ่าตัด",
          "ผู้ที่ต้องการอุปกรณ์ช่วยพยุงตัวข้างเตียง",
        ],
      },
      {
        title: "คุณสมบัติและสเปก",
        items: [
          "การปรับระดับ: 4 ระดับ",
          "วัสดุโครงสร้าง: โลหะเคลือบสี แข็งแรง ทนทาน",
          "ด้ามจับบุโฟม นุ่มกระชับมือ ไม่ลื่น",
          "มีกระเป๋าตาข่ายสำหรับเก็บแว่นตา รีโมท หรือสิ่งของใกล้มือ",
          "การรับประกันโครงสร้าง: 1 ปี",
        ],
      },
    ],
  },

  {
    id: "allwell-clinik-3s-3m",
    slug: "clinik-3s-3m",
    name: "เตียงตรวจผู้ป่วยปรับไฟฟ้า CLINIK-3S-3M",
    shortName: "CLINIK-3S-3M",
    category: "examination-bed",
    categoryName: "เตียงตรวจผู้ป่วย",
    brand: "ALLWELL",
    price: 66500,
    originalPrice: 124000,
    currency: "THB",
    stockStatus: "contact-for-availability",
    stock: 3,
    warranty: null,
    image: "/products/allwell-clinik-3s-3m.png",
    images: [
      "/products/allwell-clinik-3s-3m.png",
    ],
    shortDescription:
      "เตียงตรวจผู้ป่วยระบบไฟฟ้าสำหรับสถานพยาบาล",
    description:
      "เตียงตรวจผู้ป่วยปรับไฟฟ้า พร้อมแผงควบคุมและ Foot Control แบบไร้สาย",
    features: [
      "แผงควบคุมและ Foot Control แบบไร้สาย",
      "ปรับท่าได้จากทั้งสองฝั่งของเตียง",
      "มีล้อและระบบล็อกล้อ",
    ],
    specifications: [
      { label: "รุ่น", value: "CLINIK-3S-3M" },
      { label: "ระบบควบคุม", value: "ไร้สาย" },
      { label: "ใบรับจดแจ้ง", value: "66-2-3-2-0011565" },
    ],
    tags: ["เตียงตรวจ", "ระบบไฟฟ้า"],
    sourceUrl: "https://allwell.co.th/examination-bed/",
    registration: "66-2-3-2-0011565",
    details: [
      {
        title: "รายละเอียดสินค้า",
        items: [
          "เตียงตรวจผู้ป่วยระบบไฟฟ้าสำหรับคลินิก โรงพยาบาล และสถานพยาบาลชั้นนำ",
          "เตียงตรวจผู้ป่วยปรับไฟฟ้า พร้อมแผงควบคุมและ Foot Control แบบไร้สาย",
        ],
      },
      {
        title: "คุณสมบัติเด่น",
        items: [
          "แผงควบคุมและ Foot Control แบบไร้สาย สะดวกต่อแพทย์และพยาบาลในการตรวจรักษา",
          "ปรับท่าได้จากทั้งสองฝั่งของเตียงอย่างอิสระ",
          "มีล้อและระบบเซ็นทรัลล็อกล้อเพื่อความปลอดภัยสูงสุด",
        ],
      },
    ],
  },

  {
    id: "allwell-clinik-4s-5m",
    slug: "clinik-4s-5m",
    name: "เตียงตรวจผู้ป่วยปรับไฟฟ้า CLINIK-4S-5M",
    shortName: "CLINIK-4S-5M",
    category: "examination-bed",
    categoryName: "เตียงตรวจผู้ป่วย",
    brand: "ALLWELL",
    price: 79000,
    originalPrice: 146000,
    currency: "THB",
    stockStatus: "contact-for-availability",
    stock: 2,
    warranty: null,
    image: "/products/allwell-clinik-4s-5m.png",
    images: [
      "/products/allwell-clinik-4s-5m.png",
    ],
    shortDescription:
      "เตียงตรวจผู้ป่วยระบบไฟฟ้าที่สามารถปรับแยกขาซ้ายและขาขวา",
    description:
      "เตียงตรวจผู้ป่วยปรับไฟฟ้า พร้อมที่พักแขนและระบบควบคุมด้วยรีโมท",
    features: [
      "ปรับแยกขาซ้ายและขาขวา",
      "มีที่พักแขนเพื่อความปลอดภัย",
      "ควบคุมการทำงานด้วยรีโมท",
    ],
    specifications: [
      { label: "รุ่น", value: "CLINIK-4S-5M" },
      { label: "ระบบควบคุม", value: "รีโมท" },
      { label: "ใบรับจดแจ้ง", value: "66-2-3-2-0011312" },
    ],
    tags: ["เตียงตรวจ", "ระบบไฟฟ้า"],
    sourceUrl: "https://allwell.co.th/examination-bed/",
    registration: "66-2-3-2-0011312",
    details: [
      {
        title: "รายละเอียดสินค้า",
        items: [
          "เตียงตรวจผู้ป่วยปรับไฟฟ้า รุ่น CLINIK-4S-5M รองรับการตรวจรักษาเฉพาะทาง",
          "สามารถปรับแยกขาซ้ายและขาขวาอย่างอิสระ เพื่อความสะดวกในการทำหัตถการ",
        ],
      },
      {
        title: "คุณสมบัติเด่น",
        items: [
          "ปรับแยกขาซ้ายและขาขวา",
          "มีที่พักแขนเพื่อความปลอดภัยและความสบายของผู้รับการตรวจ",
          "ควบคุมการทำงานด้วยรีโมทคอนโทรลระบบไฟฟ้า",
        ],
      },
    ],
  },

  {
    id: "allwell-clinik-bc-4m",
    slug: "clinik-bc-4m",
    name: "เตียงตรวจผู้ป่วยปรับไฟฟ้า CLINIK-BC-4M",
    shortName: "CLINIK-BC-4M",
    category: "examination-bed",
    categoryName: "เตียงตรวจผู้ป่วย",
    brand: "ALLWELL",
    price: 80000,
    originalPrice: 160000,
    currency: "THB",
    stockStatus: "contact-for-availability",
    stock: 2,
    warranty: null,
    image: "/products/allwell-clinik-bc-4m.jpg",
    images: [
      "/products/allwell-clinik-bc-4m.jpg",
    ],
    shortDescription:
      "เตียงตรวจผู้ป่วยระบบไฟฟ้าพร้อมฟังก์ชัน Memory",
    description:
      "เตียงตรวจผู้ป่วยที่สามารถหมุนได้ 120 องศา พร้อมระบบควบคุมไร้สาย",
    features: [
      "เตียงหมุนได้ 120 องศา",
      "มีฟังก์ชัน Memory",
      "แผงควบคุมไร้สาย",
    ],
    specifications: [
      { label: "รุ่น", value: "CLINIK-BC-4M" },
      { label: "มุมการหมุน", value: "120 องศา" },
      { label: "ฟังก์ชัน Memory", value: "มี" },
      { label: "ใบรับจดแจ้ง", value: "66-2-3-2-0011317" },
    ],
    tags: ["เตียงตรวจ", "ระบบไฟฟ้า"],
    sourceUrl: "https://allwell.co.th/examination-bed/",
    registration: "66-2-3-2-0011317",
    details: [
      {
        title: "รายละเอียดสินค้า",
        items: [
          "เตียงตรวจผู้ป่วยระบบไฟฟ้าพร้อมฟังก์ชัน Memory และสามารถหมุนปรับทิศทางได้ 120 องศา",
          "ออกแบบสำหรับการตรวจรักษาและเวชปฏิบัติที่ต้องการความคล่องตัวสูง",
        ],
      },
      {
        title: "คุณสมบัติเด่น",
        items: [
          "เตียงหมุนได้ 120 องศา เพื่อการเข้าถึงคนไข้ในทุกมุมมอง",
          "มีฟังก์ชัน Memory จดจำตำแหน่งท่าตรวจที่ใช้งานบ่อย",
          "แผงควบคุมแบบไร้สาย ทันสมัย ปลอดภัย",
        ],
      },
    ],
  },

  {
    id: "allwell-clinik-bf-4m",
    slug: "clinik-bf-4m",
    name: "เตียงตรวจผู้ป่วยปรับไฟฟ้า CLINIK-BF-4M",
    shortName: "CLINIK-BF-4M",
    category: "examination-bed",
    categoryName: "เตียงตรวจผู้ป่วย",
    brand: "ALLWELL",
    price: 95000,
    originalPrice: 198000,
    currency: "THB",
    stockStatus: "contact-for-availability",
    stock: 2,
    warranty: null,
    image: "/products/allwell-clinik-bf-4m.jpg",
    images: [
      "/products/allwell-clinik-bf-4m.jpg",
    ],
    shortDescription:
      "เตียงตรวจผู้ป่วยระบบไฟฟ้าพร้อมฟังก์ชัน Memory และ Emergency Switch",
    description:
      "เตียงตรวจผู้ป่วยที่สามารถหมุนได้ 120 องศา พร้อมฟังก์ชันควบคุมและรีเซ็ต",
    features: [
      "เตียงหมุนได้ 120 องศา",
      "มีฟังก์ชัน Reset, Lock และ Memory",
      "มี Emergency Switch",
    ],
    specifications: [
      { label: "รุ่น", value: "CLINIK-BF-4M" },
      { label: "มุมการหมุน", value: "120 องศา" },
      { label: "ฟังก์ชัน Memory", value: "มี" },
      { label: "ใบรับจดแจ้ง", value: "66-2-3-2-0011317" },
    ],
    tags: ["เตียงตรวจ", "ระบบไฟฟ้า"],
    sourceUrl: "https://allwell.co.th/examination-bed/",
    registration: "66-2-3-2-0011317",
    details: [
      {
        title: "รายละเอียดสินค้า",
        items: [
          "เตียงตรวจผู้ป่วยไฟฟ้าระดับพรีเมียม CLINIK-BF-4M พร้อมระบบความปลอดภัย Emergency Switch",
          "สามารถหมุนได้ 120 องศา พร้อมฟังก์ชันควบคุม Reset, Lock และ Memory ครบครัน",
        ],
      },
      {
        title: "คุณสมบัติเด่น",
        items: [
          "เตียงหมุนได้ 120 องศา เพิ่มความยืดหยุ่นในการจัดห้องตรวจ",
          "ฟังก์ชัน Reset, Lock และ Memory ปรับคืนสู่ตำแหน่งเดิมได้อย่างรวดเร็ว",
          "Emergency Switch ระบบตัดไฟและหยุดการทำงานฉุกเฉิน",
        ],
      },
    ],
  },
];

const sharedDetails = electricBeds[0].details;

// รวมสินค้าเตียงผู้ป่วยไฟฟ้าเดิม + สินค้าใหม่ทั้งหมด
export const products: Product[] = [
  ...electricBeds.map((bed) => ({
    id: bed.slug,
    slug: bed.slug,
    name: bed.name,
    shortName: bed.name,
    category: bed.category,
    categoryName: bed.category,
    brand: "ALLWELL",
    price: bed.price,
    originalPrice: bed.originalPrice,
    currency: "THB",
    stockStatus: "in-stock",
    warranty: "3 ปี",
    stock: bed.stock,
    image: bed.image,
    images: [bed.image],
    features: bed.features,
    details: bed.details ?? sharedDetails,
    registration: bed.registration,
  })),
  ...newProducts,
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(price);
