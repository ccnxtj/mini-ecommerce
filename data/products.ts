import { electricBeds } from "@/data/electricBeds";

export type Specification = {
  label: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  color?: string;
  colorCode?: string;
  size?: string;
  price?: number;
  sku?: string;
  stock?: number;
};

export type Product = {
  id: string;
  numericId?: number;
  sku?: string;
  slug?: string;
  name: string;
  shortName?: string;
  category: string;
  categoryName?: string;
  brand?: string;
  price: number;
  priceMin?: number;
  priceMax?: number;
  originalPrice?: number;
  discountPercent?: number;
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
  attributes?: Record<string, any>;
  variants?: ProductVariant[];
  careInstructions?: string[];
  specifications?: Specification[];
  tags?: string[];
  sourceUrl?: string;
  productUrl?: string;
  details?: { title?: string; items: string[] }[];
  registration?: string;
  rating?: number;
  reviewCount?: number;
  isMock?: boolean;
};

// ข้อมูลสินค้าที่เพิ่มเข้ามาใหม่
export const newProducts: Product[] = [
  {
    id: "allwell-bedside-armrest",
    slug: "bedside-armrest",
    name: "ราวกั้นเตียง ALLWELL BEDSIDE ARMREST",
    shortName: "BEDSIDE ARMREST",
    category: "ราวกั้นเตียง",
    categoryName: "ราวกั้นเตียง",
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
    category: "เตียงตรวจไฟฟ้า",
    categoryName: "เตียงตรวจไฟฟ้า",
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
    category: "เตียงตรวจไฟฟ้า",
    categoryName: "เตียงตรวจไฟฟ้า",
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
    category: "เตียงตรวจไฟฟ้า",
    categoryName: "เตียงตรวจไฟฟ้า",
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
    category: "เตียงตรวจไฟฟ้า",
    categoryName: "เตียงตรวจไฟฟ้า",
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

  {
    id: "allwell-microtex-sheet",
    numericId: 1,
    sku: "AW-MICROTEX-001",
    slug: "microtex-sheet",
    name: "ผ้าปูที่นอน Allwell Microtex Sheets",
    shortName: "Microtex Sheets",
    category: "เตียงผู้ป่วยและอุปกรณ์ในห้องนอน",
    categoryName: "เตียงผู้ป่วยและอุปกรณ์ในห้องนอน",
    brand: "ALLWELL",
    description: "ผ้าปูที่นอนเนื้อ Microtex สัมผัสนุ่ม ลื่น เย็นสบาย แห้งเร็ว และไม่ยับง่าย",
    shortDescription: "ผ้าปูที่นอนเนื้อ Microtex สัมผัสนุ่ม ลื่น เย็นสบาย แห้งเร็ว และไม่ยับง่าย",
    price: 1090,
    originalPrice: 2490,
    currency: "THB",
    discountPercent: 56.2,
    stock: 50,
    stockStatus: "in-stock",
    image: "/products/allwell-microtex-sheet.jpg",
    images: [
      "/products/allwell-microtex-sheet.jpg",
    ],
    attributes: {
      material: "Microtex",
      threadCount: 350,
      size: "3 ฟุต",
      antiDustMite: true,
      wrinkleResistant: true,
      quickDry: true,
      breathable: true,
    },
    variants: [
      {
        id: "MICRO-D1",
        color: "เทาเข้ม",
        colorCode: "#55565A",
        sku: "AW-MICRO-D1",
        stock: 20,
      },
      {
        id: "MICRO-M1",
        color: "ชมพู",
        colorCode: "#E7A4B5",
        sku: "AW-MICRO-M1",
        stock: 15,
      },
      {
        id: "MICRO-M2",
        color: "ม่วงกะปิ",
        colorCode: "#9A8299",
        sku: "AW-MICRO-M2",
        stock: 15,
      },
    ],
    features: [
      "เนื้อผ้า Microtex 350 เส้นด้าย",
      "สัมผัสนุ่ม ลื่น เย็นสบาย",
      "ระบายความร้อนได้ดี",
      "ซักง่าย แห้งเร็ว ไม่ยับง่าย",
    ],
    careInstructions: [
      "ซักมือหรือใช้โปรแกรมถนอมผ้า",
      "ใช้อุณหภูมิไม่เกิน 40 องศาเซลเซียส",
      "หลีกเลี่ยงการใช้สารฟอกขาวในปริมาณมาก",
    ],
    specifications: [
      { label: "วัสดุเนื้อผ้า", value: "Microtex 350 เส้นด้าย" },
      { label: "ขนาด", value: "3 ฟุต (สำหรับเตียงผู้ป่วย / เตียงเดี่ยว)" },
      { label: "การป้องกันไรฝุ่น", value: "มีคุณสมบัติป้องกันไรฝุ่นและสารก่อภูมิแพ้" },
      { label: "ตัวเลือกสี", value: "เทาเข้ม, ชมพู, ม่วงกะปิ" },
      { label: "คุณสมบัติเด่น", value: "สัมผัสนุ่ม ลื่น เย็นสบาย แห้งเร็ว ไม่ยับง่าย" },
    ],
    tags: ["ผ้าปูที่นอน", "Microtex", "กันไรฝุ่น", "ผู้สูงอายุ", "ALLWELL"],
    productUrl: "https://allwellhealthcare.com/product/microtex-sheet/",
    sourceUrl: "https://allwellhealthcare.com/product/microtex-sheet/",
    rating: 4.8,
    reviewCount: 24,
    isMock: true,
    details: [
      {
        title: "รายละเอียดสินค้า",
        items: [
          "ผ้าปูที่นอนเนื้อ Microtex สัมผัสนุ่ม ลื่น เย็นสบาย แห้งเร็ว และไม่ยับง่าย",
          "ทอด้วยความละเอียด 350 เส้นด้าย ให้สัมผัสที่นุ่มสบาย อ่อนโยนต่อผิว ไม่ระคายเคือง",
          "ระบายความร้อนได้ดี ไม่สะสมเหงื่อ ช่วยให้นอนหลับสบายตลอดทั้งคืน",
          "ซักทำความสะอาดง่าย แห้งไว ไม่ต้องรีด ประหยัดเวลาในการดูแลรักษา",
        ],
      },
      {
        title: "คุณสมบัติเด่น",
        items: [
          "เนื้อผ้า Microtex 350 เส้นด้าย",
          "สัมผัสนุ่ม ลื่น เย็นสบาย",
          "ระบายความร้อนได้ดี",
          "ซักง่าย แห้งเร็ว ไม่ยับง่าย",
        ],
      },
      {
        title: "ตัวเลือกสี",
        items: [
          "เทาเข้ม (#55565A) — รหัส: AW-MICRO-D1 (สต็อก 20 ชิ้น)",
          "ชมพู (#E7A4B5) — รหัส: AW-MICRO-M1 (สต็อก 15 ชิ้น)",
          "ม่วงกะปิ (#9A8299) — รหัส: AW-MICRO-M2 (สต็อก 15 ชิ้น)",
        ],
      },
      {
        title: "คำแนะนำในการดูแลรักษา",
        items: [
          "ซักมือหรือใช้โปรแกรมถนอมผ้า",
          "ใช้อุณหภูมิไม่เกิน 40 องศาเซลเซียส",
          "หลีกเลี่ยงการใช้สารฟอกขาวในปริมาณมาก",
        ],
      },
    ],
  },

  {
    id: "allwell-mattress-protector",
    numericId: 2,
    sku: "AW-MATTRESS-001",
    slug: "mattress-protector",
    name: "ผ้ารองกันเปื้อน ALLWELL ชนิดกันน้ำ",
    shortName: "ผ้ารองกันเปื้อนกันน้ำ",
    category: "เตียงผู้ป่วยและอุปกรณ์ในห้องนอน",
    categoryName: "เตียงผู้ป่วยและอุปกรณ์ในห้องนอน",
    brand: "ALLWELL",
    description: "ผ้ารองกันเปื้อนที่นอน ช่วยป้องกันของเหลวซึมผ่าน ระบายอากาศ และทำความสะอาดง่าย",
    shortDescription: "ผ้ารองกันเปื้อนที่นอน ช่วยป้องกันของเหลวซึมผ่าน ระบายอากาศ และทำความสะอาดง่าย",
    price: 1490,
    priceMin: 1490,
    priceMax: 1650,
    currency: "THB",
    stock: 40,
    stockStatus: "in-stock",
    image: "/products/allwell-mattress-protector.jpg",
    images: [
      "/products/allwell-mattress-protector.jpg",
    ],
    attributes: {
      waterproof: true,
      breathable: true,
      antiDustMite: true,
      antiBacterial: true,
      antiOdor: true,
      easyToClean: true,
    },
    variants: [
      {
        id: "PROTECTOR-S",
        size: "S",
        price: 1490,
        sku: "AW-PROTECTOR-S",
        stock: 20,
      },
      {
        id: "PROTECTOR-L",
        size: "L",
        price: 1650,
        sku: "AW-PROTECTOR-L",
        stock: 20,
      },
    ],
    features: [
      "ป้องกันของเหลวซึมผ่านที่นอน",
      "ระบายอากาศ ลดความอับชื้น",
      "เทคโนโลยี Anti-odor",
      "ช่วยป้องกันไรฝุ่นและแบคทีเรีย",
      "ทำความสะอาดง่ายและแห้งไว",
    ],
    suitableFor: [
      "ผู้สูงอายุ",
      "ผู้ป่วยติดเตียง",
      "ผู้หญิงหลังคลอด",
      "บุคคลทั่วไป",
    ],
    specifications: [
      { label: "การกันน้ำ", value: "ป้องกันของเหลวซึมผ่านที่นอน 100%" },
      { label: "การระบายอากาศ", value: "ระบายอากาศได้ดี ลดความอับชื้น" },
      { label: "เทคโนโลยีการปกป้อง", value: "Anti-odor, ป้องกันไรฝุ่นและแบคทีเรีย" },
      { label: "ขนาดที่มีให้เลือก", value: "ไซส์ S (1,490 บาท), ไซส์ L (1,650 บาท)" },
      { label: "การดูแลรักษา", value: "ทำความสะอาดง่ายและแห้งไว" },
    ],
    tags: ["ผ้ารองกันเปื้อน", "ผ้ารองกันน้ำ", "ผู้ป่วยติดเตียง", "ผู้สูงอายุ", "ALLWELL"],
    productUrl: "https://allwellhealthcare.com/product/mattress-protector/",
    sourceUrl: "https://allwellhealthcare.com/product/mattress-protector/",
    rating: 4.9,
    reviewCount: 36,
    isMock: true,
    details: [
      {
        title: "รายละเอียดสินค้า",
        items: [
          "ผ้ารองกันเปื้อนที่นอน ช่วยป้องกันของเหลวซึมผ่าน ระบายอากาศ และทำความสะอาดง่าย",
          "ช่วยปกป้องที่นอนจากคราบสกปรก ของเหลว ปัสสาวะ หรือเหงื่อไคล ยืดอายุการใช้งานที่นอน",
          "เทคโนโลยี Anti-odor ช่วยลดกลิ่นไม่พึงประสงค์ และยับยั้งการเจริญเติบโตของแบคทีเรียและไรฝุ่น",
        ],
      },
      {
        title: "คุณสมบัติเด่น",
        items: [
          "ป้องกันของเหลวซึมผ่านที่นอน",
          "ระบายอากาศ ลดความอับชื้น",
          "เทคโนโลยี Anti-odor",
          "ช่วยป้องกันไรฝุ่นและแบคทีเรีย",
          "ทำความสะอาดง่ายและแห้งไว",
        ],
      },
      {
        title: "เหมาะสำหรับ",
        items: [
          "ผู้สูงอายุ",
          "ผู้ป่วยติดเตียง",
          "ผู้หญิงหลังคลอด",
          "บุคคลทั่วไป",
        ],
      },
      {
        title: "ตัวเลือกไซส์และราคา",
        items: [
          "ไซส์ S: ราคา 1,490 บาท (รหัสสินค้า: AW-PROTECTOR-S, สต็อก 20 ชิ้น)",
          "ไซส์ L: ราคา 1,650 บาท (รหัสสินค้า: AW-PROTECTOR-L, สต็อก 20 ชิ้น)",
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
    numericId: bed.id,
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
