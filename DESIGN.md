---
name: Mini E-commerce (Allwell Medical Equipment)
description: ร้านค้าออนไลน์สำหรับอุปกรณ์ทางการแพทย์ เตียงผู้ป่วยไฟฟ้า และสินค้าเพื่อสุขภาพผู้สูงอายุ
colors:
  primary: "#6e2b84"
  primary-dark: "#622576"
  primary-light: "#713487"
  primary-hover: "#58206c"
  primary-tint: "#fbf4fc"
  accent-discount: "#f43f5e"
  accent-price: "#e11d48"
  status-success: "#059669"
  neutral-bg: "#ffffff"
  neutral-surface: "#fafafa"
  neutral-border: "#e4e4e7"
  text-heading: "#18181b"
  text-body: "#27272a"
  text-muted: "#71717a"
typography:
  display:
    fontFamily: "Prompt, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Prompt, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  heading:
    fontFamily: "Prompt, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Prompt, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Prompt, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  caption:
    fontFamily: "Prompt, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System

## Overview

ระบบการออกแบบ (Design System) ของ **Mini E-commerce** สร้างขึ้นภายใต้แนวคิด **Trust, Clarity, and Care** เพื่อรองรับร้านค้าอุปกรณ์การแพทย์ เตียงผู้ป่วยไฟฟ้า และเครื่องมือดูแลสุขภาพผู้สูงอายุ เน้นความรู้สึกสะอาด อบอุ่น น่าเชื่อถือ และใช้งานง่ายสำหรับทั้งผู้ดูแลและผู้สูงอายุ รองรับการแสดงผลบนหน้าจอมือถือ (Mobile-First) และเดสก์ท็อปอย่างสมบูรณ์แบบ

## Colors

ระบบสีถูกแบ่งออกเป็น 4 บทบาทหลัก:

* **Brand Primary (ความน่าเชื่อถือและความเชี่ยวชาญ):**
  * `primary` (`#6e2b84`): สีม่วงเอกลักษณ์ ใช้กับปุ่ม Call-to-Action หลัก และเน้นย้ำจุดสำคัญ
  * `primary-dark` (`#622576`): สีม่วงเข้มสำหรับส่วนท้าย Gradients และข้อความไฮไลต์
  * `primary-light` (`#713487`): สีม่วงสว่างสำหรับส่วนหัว Gradients ของ Header
  * `primary-hover` (`#58206c`): สีสถานะเมื่อผู้ใช้ชี้เมาส์
  * `primary-tint` (`#fbf4fc`): สีม่วงจางสำหรับพื้นหลังการเลือกหรือกล่องข้อมูลเน้นย้ำ
* **Commercial & Price (การขายและโปรโมชัน):**
  * `accent-discount` (`#f43f5e` / `rose-500`): ป้าย Badge ลดราคา เพื่อนำสายตา
  * `accent-price` (`#e11d48` / `rose-600`): ตัวเลขราคาสินค้า เพื่อความชัดเจนในการซื้อ
* **Feedback & Status (สถานะการทำงาน):**
  * `status-success` (`#059669` / `emerald-600`): แจ้งเตือนสินค้าพร้อมส่ง ยอดชำระเงินสำเร็จ และการเพิ่มลงในตะกร้า
* **Neutrals (พื้นหลังและข้อความ):**
  * `neutral-bg` (`#ffffff`): พื้นหลังหลัก
  * `neutral-surface` (`#fafafa` / `zinc-50`): พื้นหลังกล่องสินค้าและ Section ย่อย
  * `neutral-border` (`#e4e4e7` / `zinc-200`): เส้นขอบเบา ไม่รบกวนเนื้อหา
  * `text-heading` (`#18181b` / `zinc-900`): หัวข้อหลัก คมชัด
  * `text-body` (`#27272a` / `zinc-800`): เนื้อความปกติ
  * `text-muted` (`#71717a` / `zinc-500`): ข้อความรองและคำอธิบาย

## Typography

ใช้ฟอนต์ **Prompt** (Google Fonts) ซึ่งมีความทันสมัย หัวกลมมน เข้ากับสไตล์สุขภาพและภาษาไทย:

* **Display (Hero Titles):** `Prompt` 700, 24px - 36px (Fluid scaling), `line-height: 1.25`
* **Heading (Section / Card Titles):** `Prompt` 600, 16px - 20px, `line-height: 1.35`
* **Body (Paragraphs & Specs):** `Prompt` 400, 14px (0.875rem), `line-height: 1.6`
* **Caption / Label:** `Prompt` 500, 11px - 12px สำหรับป้ายกำกับและส่วนลด

## Layout

* **Container Max-Width:** กำหนดความกว้างหน้าเว็บไว้ที่ `max-w-6xl` (1152px) จัดกึ่งกลางเพื่อระยะสายตาที่พอดี
* **Mobile Clean Viewport:** คืนพื้นที่หน้าจอแนวตั้ง 100% ไร้แถบ Bottom Navigation ซ้ำซ้อน โดยใช้งานผ่าน Top Header + Mobile Drawer และปุ่มลอยปรึกษาผู้เชี่ยวชาญ (`ConsultationFab`)
* **Product Grid:**
  * หน้าจอมือถือ (< 640px): 2 คอลัมน์ (`grid-cols-2 gap-2.5 sm:gap-4`)
  * แท็บเล็ต (640px - 1024px): 3 คอลัมน์
  * เดสก์ท็อป (> 1024px): 4 คอลัมน์
* **Touch-First Action:** ปุ่มลอยปรึกษาผู้เชี่ยวชาญ และ Sticky Action Bar ในหน้ารายละเอียดสินค้า วางในระดับนิ้วโป้งเอื้อมถึง (Thumb-zone) พร้อมรองรับ iOS safe-area-inset-bottom

## Elevation & Depth

* **Flat & Soft Borders:** ใช้เส้นขอบ `border border-zinc-200/80` เป็นหลักสำหรับแยกการ์ดสินค้า
* **Soft Shadows:**
  * Resting State: `shadow-xs` หรือ `shadow-2xs`
  * Hover / Focus State: `hover:shadow-md` พร้อม smooth transition เพื่อให้รับรู้ว่าคลิกได้
  * หลีกเลี่ยงเงาหนาและสีฉูดฉาด

## Shapes

* **Pill Radius (`rounded-full`):** ใช้สำหรับ Search Bar, ปุ่ม Call to Action, และ Badge หมวดหมู่
* **Container Radius (`rounded-xl` ถึง `rounded-2xl`):** ใช้สำหรับการ์ดสินค้า กล่องสรุปคำสั่งซื้อ และ Modal
* **Interactive Radius (`rounded-lg`):** ใช้สำหรับกล่องเพิ่ม/ลดจำนวนสินค้า และปุ่มย่อย

## Components

1. **Button (`components/ui/button.tsx`):**
   * Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
   * Sizes: `sm` (h-8), `md` (h-10), `lg` (h-12)
   * Focus Ring: `focus-visible:ring-2 focus-visible:ring-primary`
2. **Badge (`components/ui/badge.tsx`):**
   * Variants: `primary`, `discount`, `success`, `neutral`, `outline`
   * Sizes: `sm` (text-10px), `md` (text-xs)
3. **ProductCard (`components/product-card.tsx`):**
   * โครงสร้าง: รูปภาพอัตราส่วน 4:3 -> ป้ายลดราคา -> หัวข้อ 2 บรรทัด (`line-clamp-2`) -> ราคา & ปุ่มเพิ่มลงตะกร้า
4. **PromptPay Modal (`components/promptpay-modal.tsx`):**
   * แสดง QR Code พร้อม Smooth Pulse Dots ขณะรอระบบตรวจสอบการชำระเงิน

## Do's and Don'ts

### Do's (ควรทำ)
* ✅ ใช้ Utility Tokens เช่น `bg-primary`, `text-primary` แทนการฮาร์ดโค้ด Hex `#6e2b84`
* ✅ ตั้งปุ่มกดบนหน้าจอมือถือให้มีขนาดไม่ต่ำกว่า `44x44px` (Touch Target)
* ✅ แสดงราคาลดควบคู่กับราคาเต็มแบบขีดฆ่า เพื่อกระตุ้นการตัดสินใจซื้อ
* ✅ ใช้ Smooth Pulse หรือ Fade Transition กับสถานะการโหลด เพื่อความสุภาพของแบรนด์การแพทย์

### Don'ts (ข้อห้าม)
* ❌ อย่าใช้ `animate-bounce` หรือ Animation เด้งดึ๋งในระบบการเงินและชำระเงิน
* ❌ อย่าใช้ตัวอักษรสีเทาที่ Contrast ต่ำกว่า `4.5:1` บนพื้นหลัง
* ❌ อย่าซ้อนการ์ดในตัวการ์ด (Nested Cards) เพราะทำให้หน้าจอดูรกและสับสน
* ❌ อย่าฮาร์ดโค้ดสี Hex เฉพาะจุดโดยไม่ประกาศไว้ในระบบดีไซน์
