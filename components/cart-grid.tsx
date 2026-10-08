"use client";

import Link from "next/link";
import Image from "next/image";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function CartGrid() {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Filter products that are in the cart
  const cartProducts = products.filter((product) =>
    cart.includes(product.name)
  );

  if (cartProducts.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-[#ebdfee] bg-white px-5 py-16 text-center shadow-sm">
        <div className="flex size-24 items-center justify-center rounded-full bg-[#f7f0f8] text-[#80508f]">
          <svg className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
        
        <h2 className="mt-6 text-2xl font-bold text-[#40184f]">ตะกร้าของคุณยังว่างอยู่</h2>
        
        <div className="mt-4 max-w-md space-y-2">
          
          <p className="text-[#69576e]">
            ให้เราช่วยส่งมอบความห่วงใย เพื่อคนที่คุณรัก<br />ลองเลือกดูสินค้าอุปกรณ์ทางการแพทย์ของเราสิครับ
          </p>
        </div>

        <Link href="/products" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#622576] px-8 py-3.5 font-bold text-white transition-transform hover:scale-105 hover:bg-[#58206c] shadow-lg shadow-[#622576]/20">
          <span>เลือกชมสินค้าเลย</span>
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    );
  }

  const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">
      <div className="space-y-4">
        {cartProducts.map((product) => (
          <div key={product.id} className="flex gap-4 rounded-2xl border border-[#ebdfee] bg-white p-4 shadow-sm sm:items-center">
            <Link href={`/products/${product.id}`} className="shrink-0 overflow-hidden rounded-xl border border-[#ebdfee] bg-[#f7f0f8]">
              <Image src={product.image} alt={product.name} width={120} height={96} className="h-24 w-[120px] object-cover sm:h-28 sm:w-[140px]" />
            </Link>
            <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
              <div className="space-y-1">
                <p className="text-xs text-[#80508f] sm:text-sm">{product.category}</p>
                <Link href={`/products/${product.id}`} className="block font-semibold text-[#40184f] hover:underline">
                  {product.name}
                </Link>
                <p className="font-bold text-[#622576]">{formatPrice(product.price)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(product.name)}
                className="mt-3 w-fit rounded-lg bg-[#fff4f4] px-4 py-2 text-sm font-semibold text-[#ff646b] hover:bg-[#ffebeb] sm:mt-0"
              >
                ลบออก
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[#ebdfee] bg-[#fcf9fc] p-6 h-fit">
        <h2 className="text-lg font-bold text-[#40184f]">สรุปคำสั่งซื้อ</h2>
        <div className="mt-4 space-y-3 border-b border-[#ebdfee] pb-4 text-[#69576e]">
          <div className="flex justify-between">
            <span>ยอดรวม ({cartProducts.length} ชิ้น)</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>ค่าจัดส่ง</span>
            <span>ฟรี</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-lg font-bold text-[#622576]">
          <span>ยอดสุทธิ</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!user) {
              alert("กรุณาเข้าสู่ระบบก่อนสั่งสินค้า");
              router.push("/login?redirect=/checkout");
            } else {
              router.push("/checkout");
            }
          }}
          className="mt-6 w-full rounded-full bg-[#622576] py-3 font-bold text-white hover:bg-[#58206c]"
        >
          สั่งสินค้า
        </button>
      </div>
    </div>
  );
}
