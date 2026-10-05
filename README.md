# Mini E-commerce

เว็บไซต์ตัวอย่างร้านรองเท้าวิ่ง สร้างด้วย Next.js App Router และข้อมูลสินค้าแบบ Mock Data เพื่อฝึกการทำหน้าเว็บและการนำทางระหว่างหน้า

## เริ่มต้นใช้งาน

ต้องติดตั้ง Node.js และ npm ก่อน จากนั้นเปิด Terminal ที่โฟลเดอร์โปรเจกต์แล้วรัน:

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) เพื่อดูเว็บไซต์

คำสั่งอื่นที่ใช้ได้:

```bash
npm run lint   # ตรวจรูปแบบและข้อผิดพลาดของโค้ด
npm run build  # สร้างเวอร์ชันสำหรับใช้งานจริง
npm run start  # เปิดเวอร์ชันที่ build แล้ว
```

## ฟีเจอร์

- หน้าแรกมี Hero banner, เมนูนำทาง, โลโก้แบรนด์, หมวดหมู่ และสินค้าแนะนำ
- เมนู Brands เปิดรายการแบรนด์และกรองสินค้าได้
- หน้ารวมสินค้ามีรูป ชื่อ ราคา หมวดหมู่ และลิงก์ดูรายละเอียด
- หน้ารายละเอียดสินค้าใช้ Dynamic Route เช่น `/products/1`
- แสดงหน้า Not Found เมื่อเปิดรหัสสินค้าที่ไม่มี
- มี Loading UI สำหรับหน้าสินค้า
- รองรับหน้าจอมือถือและเดสก์ท็อป

Wishlist, การเลือกไซส์และจำนวน, ตะกร้าสินค้า และบางหมวดหมู่เป็น UI ตัวอย่าง ยังไม่มีการบันทึกข้อมูลหรือเชื่อม Backend

## แก้ไขข้อมูลสินค้า

ข้อมูลสินค้าอยู่ใน `data/products.ts` แต่ละรายการมี `id`, `name`, `price`, `category`, `description` และ `image`

รูปภาพสินค้าอยู่ใน `public/products` และอ้างอิงจากโค้ดโดยใช้ path ที่ขึ้นต้นด้วย `/products/` เช่น:

```ts
{
  id: "11",
  name: "ชื่อรุ่นรองเท้า",
  price: 3500,
  category: "รองเท้าวิ่ง",
  description: "รายละเอียดสินค้า",
  image: "/products/shoe-image.jpg",
}
```

นำไฟล์ `shoe-image.jpg` ไปใส่ใน `public/products` ก่อนเพิ่มสินค้า และกำหนด `id` ให้ไม่ซ้ำกัน

## โครงสร้างโปรเจกต์

```text
app/
  page.tsx                 หน้าแรก
  layout.tsx               Layout หลักและ Footer
  products/page.tsx        หน้ารวมสินค้า
  products/[id]/page.tsx   หน้ารายละเอียดสินค้า
  products/loading.tsx     Loading UI
  products/not-found.tsx   หน้าไม่พบสินค้า
components/                 ส่วนประกอบที่ใช้ซ้ำ
data/products.ts            Mock Data สินค้าและแบรนด์
public/brands/              โลโก้แบรนด์
public/products/            รูปสินค้า
```

## เทคโนโลยี

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- IBM Plex Sans Thai
