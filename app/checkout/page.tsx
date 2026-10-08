"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ShopHeader from "@/components/shop-header";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useOrders } from "@/contexts/order-context";
import { products, formatPrice } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const { cart, clearCart } = useCart();
  
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("promptpay");
  const [discountCode, setDiscountCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [savedAddress, setSavedAddress] = useState("123/45 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110");
  const [savedPhone, setSavedPhone] = useState("081-234-5678");

  const { addOrder } = useOrders();

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login?redirect=/checkout");
    } else if (user) {
      const addr = localStorage.getItem(`address_${user.email}`);
      const ph = localStorage.getItem(`phone_${user.email}`);
      if (addr) setSavedAddress(addr);
      if (ph) setSavedPhone(ph);
    }
  }, [user, isInitialized, router]);

  if (!isInitialized || !user) return null;

  const cartProducts = products.filter((p) => cart.includes(p.name));
  const subtotal = cartProducts.reduce((sum, p) => sum + p.price, 0);
  const shippingCost = shippingMethod === "express" ? 50 : 0;
  const total = subtotal + shippingCost - discountAmount;

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      if (discountCode.toUpperCase() === "DISCOUNT100") {
        setDiscountAmount(100);
        alert("ใช้โค้ดส่วนลด 100 บาท สำเร็จ!");
      } else {
        alert("ไม่พบโค้ดส่วนลดนี้ หรือ โค้ดหมดอายุ");
        setDiscountAmount(0);
      }
    }, 800);
  };

  const handlePlaceOrder = async () => {
    if (cartProducts.length === 0) {
      alert("ไม่พบสินค้าในตะกร้า");
      return;
    }
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newOrder = {
      id: "ORD-" + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString("th-TH"),
      items: cartProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
      })),
      total: total > 0 ? total : 0,
      status: "กำลังจัดเตรียม"
    };

    addOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    alert("สั่งซื้อสำเร็จ! ขอบคุณที่ไว้วางใจเราครับ");
    router.push("/orders");
  };

  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 sm:px-8 lg:px-10 bg-[#fcf9fc]">
        <Link href="/cart" className="text-sm font-semibold text-[#622576] hover:underline">← กลับไปหน้าตะกร้าสินค้า</Link>
        <h1 className="mt-5 text-3xl font-bold text-[#40184f]">ชำระเงิน (Checkout)</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* ฝั่งซ้าย: ข้อมูลจัดส่งและชำระเงิน */}
          <div className="space-y-6">
            {/* ที่อยู่จัดส่ง */}
            <section className="rounded-2xl border border-[#ebdfee] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#40184f]">ที่อยู่จัดส่ง</h2>
                <Link href="/address?redirect=/checkout" className="text-sm font-semibold text-[#622576] hover:underline">เปลี่ยน</Link>
              </div>
              <div className="mt-4 rounded-xl border border-[#ebdfee] bg-[#f7f0f8] p-4 text-sm text-[#40184f]">
                <p className="font-bold">{user.name}</p>
                <p className="mt-1">{savedAddress}</p>
                <p className="mt-1 text-[#69576e]">เบอร์โทร: {savedPhone}</p>
              </div>
            </section>

            {/* ตัวเลือกการจัดส่ง */}
            <section className="rounded-2xl border border-[#ebdfee] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#40184f]">ตัวเลือกการจัดส่ง</h2>
              <div className="mt-4 space-y-3">
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${shippingMethod === "standard" ? "border-[#622576] bg-[#fdfafb]" : "border-[#ebdfee] hover:bg-[#f7f0f8]"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="standard" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="h-4 w-4 text-[#622576]" />
                    <div>
                      <p className="font-bold text-[#40184f]">จัดส่งธรรมดา (Standard)</p>
                      <p className="text-xs text-[#69576e]">ได้รับภายใน 2-3 วันทำการ</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#622576]">ฟรี</span>
                </label>
                
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${shippingMethod === "express" ? "border-[#622576] bg-[#fdfafb]" : "border-[#ebdfee] hover:bg-[#f7f0f8]"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="express" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} className="h-4 w-4 text-[#622576]" />
                    <div>
                      <p className="font-bold text-[#40184f]">จัดส่งด่วน (Express)</p>
                      <p className="text-xs text-[#69576e]">ได้รับภายในวันพรุ่งนี้</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#622576]">+฿50</span>
                </label>
              </div>
            </section>

            {/* วิธีการชำระเงิน */}
            <section className="rounded-2xl border border-[#ebdfee] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#40184f]">วิธีการชำระเงิน</h2>
              <div className="mt-4 space-y-3">
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${paymentMethod === "promptpay" ? "border-[#622576] bg-[#fdfafb]" : "border-[#ebdfee] hover:bg-[#f7f0f8]"}`}>
                  <input type="radio" name="payment" value="promptpay" checked={paymentMethod === "promptpay"} onChange={() => setPaymentMethod("promptpay")} className="h-4 w-4 text-[#622576]" />
                  <span className="font-bold text-[#40184f]">สแกนจ่าย QR Code / PromptPay</span>
                </label>
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${paymentMethod === "creditcard" ? "border-[#622576] bg-[#fdfafb]" : "border-[#ebdfee] hover:bg-[#f7f0f8]"}`}>
                  <input type="radio" name="payment" value="creditcard" checked={paymentMethod === "creditcard"} onChange={() => setPaymentMethod("creditcard")} className="h-4 w-4 text-[#622576]" />
                  <span className="font-bold text-[#40184f]">บัตรเครดิต / เดบิต</span>
                </label>
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${paymentMethod === "cod" ? "border-[#622576] bg-[#fdfafb]" : "border-[#ebdfee] hover:bg-[#f7f0f8]"}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="h-4 w-4 text-[#622576]" />
                  <span className="font-bold text-[#40184f]">ชำระเงินปลายทาง (COD)</span>
                </label>
              </div>
            </section>
          </div>

          {/* ฝั่งขวา: สรุปรายการสั่งซื้อ */}
          <div>
            <div className="sticky top-6 rounded-2xl border border-[#ebdfee] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#40184f]">สรุปรายการสินค้า</h2>
              
              {/* รายการสินค้าย่อ */}
              <div className="mt-4 max-h-60 overflow-y-auto border-b border-[#ebdfee] pb-4 space-y-4">
                {cartProducts.length === 0 ? (
                  <p className="text-sm text-[#69576e]">ไม่มีสินค้าในตะกร้า</p>
                ) : (
                  cartProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <Image src={p.image} alt={p.name} width={48} height={48} className="h-12 w-12 rounded-lg border border-[#ebdfee] object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-[#40184f]">{p.name}</p>
                        <p className="text-xs text-[#69576e]">1 ชิ้น</p>
                      </div>
                      <p className="font-bold text-[#622576]">{formatPrice(p.price)}</p>
                    </div>
                  ))
                )}
              </div>

              {/* โค้ดส่วนลด */}
              <div className="mt-4 border-b border-[#ebdfee] pb-4">
                <p className="text-sm font-semibold text-[#40184f]">โค้ดส่วนลด (ลองใช้: DISCOUNT100)</p>
                <div className="mt-2 flex gap-2">
                  <input 
                    type="text" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="ใส่โค้ดส่วนลด" 
                    className="flex-1 rounded-lg border border-[#ebdfee] bg-[#f7f0f8] px-3 py-2 text-sm outline-none focus:border-[#622576] focus:bg-white"
                  />
                  <button 
                    type="button" 
                    onClick={handleApplyDiscount}
                    disabled={isApplying || !discountCode}
                    className="rounded-lg bg-[#40184f] px-4 py-2 text-sm font-bold text-white hover:bg-[#2d1138] disabled:opacity-50"
                  >
                    {isApplying ? "กำลังใช้..." : "ใช้โค้ด"}
                  </button>
                </div>
              </div>

              {/* สรุปราคา */}
              <div className="mt-4 space-y-2 text-sm text-[#69576e]">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span>{shippingCost === 0 ? "ฟรี" : formatPrice(shippingCost)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#ff646b]">
                    <span>ส่วนลด</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 border-t border-[#ebdfee] pt-4 flex justify-between text-lg font-bold text-[#622576]">
                <span>ยอดสุทธิ</span>
                <span>{formatPrice(total > 0 ? total : 0)}</span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing || cartProducts.length === 0}
                className="mt-6 w-full rounded-full bg-[#622576] py-3.5 font-bold text-white hover:bg-[#58206c] disabled:bg-zinc-300 disabled:text-zinc-500 relative overflow-hidden"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>กำลังดำเนินการ...</span>
                  </div>
                ) : (
                  "ยืนยันสั่งซื้อสินค้า"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-2xl">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ebdfee] border-t-[#622576]" />
            <p className="mt-4 font-bold text-[#40184f]">กำลังบันทึกคำสั่งซื้อ...</p>
            <p className="mt-1 text-xs text-[#69576e]">กรุณารอสักครู่ ห้ามปิดหน้าต่างนี้</p>
          </div>
        </div>
      )}
    </>
  );
}
