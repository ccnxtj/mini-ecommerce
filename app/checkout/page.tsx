"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ShopHeader from "@/components/shop-header";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useOrders } from "@/contexts/order-context";
import { useToast } from "@/contexts/toast-context";
import { formatPrice } from "@/data/products";
import PromptPayModal from "@/components/promptpay-modal";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const {
    cart,
    clearCart,
    removeSelectedFromCart,
    selectedItems,
    selectedTotalPrice,
    totalPrice: cartTotal,
  } = useCart();
  const { toast } = useToast();
  
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("promptpay");
  const [discountCode, setDiscountCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showPromptPay, setShowPromptPay] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");

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

  // รายการสินค้าเฉพาะที่ถูกเลือกจากตะกร้า
  const cartProducts = selectedItems.length > 0 ? selectedItems : cart;
  const subtotal = selectedItems.length > 0 ? selectedTotalPrice : cartTotal;
  const shippingCost = shippingMethod === "express" ? 50 : 0;
  const total = subtotal + shippingCost - discountAmount;

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      if (discountCode.toUpperCase() === "DISCOUNT100") {
        setDiscountAmount(100);
        toast("ใช้โค้ดส่วนลด 100 บาท สำเร็จ!", "success");
      } else {
        toast("ไม่พบโค้ดส่วนลดนี้ หรือโค้ดหมดอายุ", "error");
        setDiscountAmount(0);
      }
    }, 800);
  };

  const executeOrderCompletion = async (orderId: string, status = "ชำระเงินแล้ว") => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("th-TH"),
      items: cartProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
      })),
      total: total > 0 ? total : 0,
      status: status
    };

    addOrder(newOrder);
    // ลบเฉพาะรายการที่เลือกชำระเงินออกจากตะกร้า
    if (selectedItems.length > 0) {
      removeSelectedFromCart();
    } else {
      clearCart();
    }
    setIsProcessing(false);
    toast("สั่งซื้อสำเร็จ! ขอบคุณที่ไว้วางใจเราครับ", "success");
    router.push("/orders");
  };

  const handlePlaceOrder = () => {
    if (cartProducts.length === 0) {
      toast("ไม่พบสินค้าที่เลือกเพื่อสั่งซื้อ", "error");
      router.push("/cart");
      return;
    }

    const orderId = "ORD-" + Date.now().toString().slice(-6);
    setCurrentOrderId(orderId);

    // หากเลือกพร้อมเพย์ หรือ โมบายแบงก์กิ้ง ให้เปิดหน้าต่าง QR Code สแกนจ่าย
    if (paymentMethod === "promptpay" || paymentMethod === "mobilebanking") {
      setShowPromptPay(true);
      return;
    }

    // หากเลือก COD หรือบัตรเครดิต ให้ดำเนินการสั่งซื้อทันที
    executeOrderCompletion(orderId, paymentMethod === "cod" ? "รอชำระเงินปลายทาง" : "ชำระเงินแล้ว");
  };

  const handlePromptPaySuccess = (orderId: string) => {
    setShowPromptPay(false);
    executeOrderCompletion(orderId, "ชำระเงินแล้ว");
  };

  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">หน้าแรก</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cart" className="hover:text-zinc-800">ตะกร้าสินค้า</Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-zinc-900">ชำระเงิน</span>
        </nav>
        <h1 className="mt-5 text-3xl font-bold text-zinc-900">ชำระเงิน</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* ฝั่งซ้าย: ข้อมูลจัดส่งและชำระเงิน */}
          <div className="space-y-6">
            {/* ที่อยู่จัดส่ง */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900">ที่อยู่จัดส่ง</h2>
                <Link href="/address?redirect=/checkout" className="text-sm font-semibold text-[#622576] hover:underline">เปลี่ยน</Link>
              </div>
              <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800">
                <p className="font-bold">{user.name}</p>
                <p className="mt-1">{savedAddress}</p>
                <p className="mt-1 text-zinc-500">เบอร์โทร: {savedPhone}</p>
              </div>
            </section>

            {/* ตัวเลือกการจัดส่ง */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-bold text-zinc-900">ตัวเลือกการจัดส่ง</h2>
              <div className="mt-4 space-y-3">
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${shippingMethod === "standard" ? "border-[#622576] bg-white ring-2 ring-[#622576]/15 shadow-xs" : "border-zinc-200 hover:bg-zinc-50"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="standard" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="h-4 w-4 text-[#622576]" />
                    <div>
                      <p className="font-bold text-zinc-900">จัดส่งธรรมดา</p>
                      <p className="text-xs text-zinc-500">ได้รับภายใน 2–3 วันทำการ</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600">ฟรี</span>
                </label>
                
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${shippingMethod === "express" ? "border-[#622576] bg-white ring-2 ring-[#622576]/15 shadow-xs" : "border-zinc-200 hover:bg-zinc-50"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="express" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} className="h-4 w-4 text-[#622576]" />
                    <div>
                      <p className="font-bold text-zinc-900">จัดส่งด่วน</p>
                      <p className="text-xs text-zinc-500">ได้รับภายในวันพรุ่งนี้</p>
                    </div>
                  </div>
                  <span className="font-bold text-zinc-700">+฿50</span>
                </label>
              </div>
            </section>

            {/* วิธีการชำระเงิน */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900">วิธีการชำระเงิน</h2>
                <span className="text-xs text-zinc-500">ปลอดภัยด้วยมาตรฐานสากล</span>
              </div>

              <div className="mt-4 space-y-3">
                {/* 1. พร้อมเพย์ PromptPay QR */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition-all ${paymentMethod === "promptpay" ? "border-[#622576] bg-white ring-2 ring-[#622576]/15 shadow-xs" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/70"}`}>
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="promptpay"
                      checked={paymentMethod === "promptpay"}
                      onChange={() => setPaymentMethod("promptpay")}
                      className="mt-0.5 sm:mt-0 h-4 w-4 text-[#622576] focus:ring-[#622576]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-zinc-900">พร้อมเพย์ (PromptPay QR)</p>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">แนะนำ</span>
                      </div>
                      <p className="text-xs text-zinc-500">สแกนจ่ายผ่าน Mobile Banking ทุกธนาคาร ฟรีค่าธรรมเนียม</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0">
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="Thai QR Payment">
                      <Image src="/payments/thaiqr-logo.png" alt="Thai QR" width={24} height={24} className="h-5 w-auto object-contain" />
                    </div>
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="PromptPay">
                      <Image src="/payments/promptpay-white130x70.png" alt="PromptPay" width={52} height={28} className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 2. บัตรเครดิต / บัตรเดบิต */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition-all ${paymentMethod === "creditcard" ? "border-[#622576] bg-white ring-2 ring-[#622576]/15 shadow-xs" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/70"}`}>
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="creditcard"
                      checked={paymentMethod === "creditcard"}
                      onChange={() => setPaymentMethod("creditcard")}
                      className="mt-0.5 sm:mt-0 h-4 w-4 text-[#622576] focus:ring-[#622576]"
                    />
                    <div>
                      <p className="font-semibold text-zinc-900">บัตรเครดิต / เดบิต</p>
                      <p className="text-xs text-zinc-500">รองรับ Visa และ Mastercard ปลอดภัยด้วยระบบ 3D Secure</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0">
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="Visa">
                      <Image src="/payments/visa-white130x70.png" alt="Visa" width={52} height={28} className="h-5 w-auto object-contain" />
                    </div>
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="Mastercard">
                      <Image src="/payments/mastercard-white130x70.png" alt="Mastercard" width={52} height={28} className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 3. โมบายแบงก์กิ้ง / ธนาคารชั้นนำ */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition-all ${paymentMethod === "mobilebanking" ? "border-[#622576] bg-white ring-2 ring-[#622576]/15 shadow-xs" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/70"}`}>
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="mobilebanking"
                      checked={paymentMethod === "mobilebanking"}
                      onChange={() => setPaymentMethod("mobilebanking")}
                      className="mt-0.5 sm:mt-0 h-4 w-4 text-[#622576] focus:ring-[#622576]"
                    />
                    <div>
                      <p className="font-semibold text-zinc-900">โมบายแบงก์กิ้ง (Mobile Banking)</p>
                      <p className="text-xs text-zinc-500">ชำระผ่านแอปพลิเคชันธนาคารชั้นนำของไทย</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0 flex-wrap">
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="ธนาคารกสิกรไทย (KBank)">
                      <Image src="/payments/kbank-white130x70.png" alt="KBank" width={50} height={27} className="h-5 w-auto object-contain" />
                    </div>
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="ธนาคารกรุงเทพ (Bangkok Bank)">
                      <Image src="/payments/bangkokbank-white130x70.png" alt="Bangkok Bank" width={50} height={27} className="h-5 w-auto object-contain" />
                    </div>
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="ธนาคารกรุงไทย (Krungthai Bank)">
                      <Image src="/payments/krungthaibank-130x70.png" alt="Krungthai Bank" width={50} height={27} className="h-5 w-auto object-contain" />
                    </div>
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="ธนาคารกรุงศรีอยุธยา (Krungsri)">
                      <Image src="/payments/ayudhya-white130x70.png" alt="Krungsri Bank" width={50} height={27} className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 4. กระเป๋าเงินออนไลน์ E-Wallet & PayPal */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition-all ${paymentMethod === "ewallet" ? "border-[#622576] bg-white ring-2 ring-[#622576]/15 shadow-xs" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/70"}`}>
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="ewallet"
                      checked={paymentMethod === "ewallet"}
                      onChange={() => setPaymentMethod("ewallet")}
                      className="mt-0.5 sm:mt-0 h-4 w-4 text-[#622576] focus:ring-[#622576]"
                    />
                    <div>
                      <p className="font-semibold text-zinc-900">กระเป๋าเงินออนไลน์ (E-Wallet & PayPal)</p>
                      <p className="text-xs text-zinc-500">ชำระสะดวกผ่าน ShopeePay หรือบัญชี PayPal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0">
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="ShopeePay">
                      <Image src="/payments/shopeepay-white130x70.png" alt="ShopeePay" width={52} height={28} className="h-5 w-auto object-contain" />
                    </div>
                    <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" title="PayPal">
                      <Image src="/payments/paypal-white130x70.png" alt="PayPal" width={52} height={28} className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 5. ชำระเงินปลายทาง COD */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition-all ${paymentMethod === "cod" ? "border-[#622576] bg-white ring-2 ring-[#622576]/15 shadow-xs" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/70"}`}>
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-0.5 sm:mt-0 h-4 w-4 text-[#622576] focus:ring-[#622576]"
                    />
                    <div>
                      <p className="font-semibold text-zinc-900">ชำระเงินปลายทาง (COD)</p>
                      <p className="text-xs text-zinc-500">ชำระเงินสดกับเจ้าหน้าที่จัดส่งเมื่อได้รับสินค้า</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      <svg className="size-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      เงินสดปลายทาง
                    </span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* ฝั่งขวา: สรุปรายการสั่งซื้อ */}
          <div>
            <div className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-bold text-zinc-900">สรุปรายการสินค้า</h2>
              
              {/* รายการสินค้าย่อ */}
              <div className="mt-4 max-h-60 overflow-y-auto border-b border-zinc-100 pb-4 space-y-4">
                {cartProducts.length === 0 ? (
                  <p className="text-sm text-zinc-500">ไม่มีสินค้าในตะกร้า</p>
                ) : (
                  cartProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <Image src={p.image} alt={p.name} width={48} height={48} className="h-12 w-12 rounded-lg border border-zinc-200 object-cover bg-zinc-50" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-900">{p.name}</p>
                        <p className="text-xs text-zinc-500">1 ชิ้น</p>
                      </div>
                      <p className="font-bold text-[#622576]">{formatPrice(p.price)}</p>
                    </div>
                  ))
                )}
              </div>

              {/* โค้ดส่วนลด */}
              <div className="mt-4 border-b border-zinc-100 pb-4">
                <p className="text-sm font-semibold text-zinc-800">โค้ดส่วนลด <span className="font-normal text-zinc-400">(ลองใช้: DISCOUNT100)</span></p>
                <div className="mt-2 flex gap-2">
                  <input 
                    type="text" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="ใส่โค้ดส่วนลด" 
                    className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-[#622576] focus:bg-white"
                  />
                  <button 
                    type="button" 
                    onClick={handleApplyDiscount}
                    disabled={isApplying || !discountCode}
                    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-bold text-white hover:bg-zinc-900 disabled:opacity-50"
                  >
                    {isApplying ? "กำลังใช้..." : "ใช้โค้ด"}
                  </button>
                </div>
              </div>

              {/* สรุปราคา */}
              <div className="mt-4 space-y-2 text-sm text-zinc-600">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span className={shippingCost === 0 ? "text-emerald-600 font-semibold" : ""}>{shippingCost === 0 ? "ฟรี" : formatPrice(shippingCost)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>ส่วนลด</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 border-t border-zinc-200 pt-4 flex justify-between text-lg font-bold text-zinc-900">
                <span>ยอดสุทธิ</span>
                <span className="text-[#622576]">{formatPrice(total > 0 ? total : 0)}</span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing || cartProducts.length === 0}
                className="mt-6 w-full rounded-full bg-[#622576] py-3.5 font-bold text-white hover:bg-[#58206c] disabled:bg-zinc-300 disabled:text-zinc-500 relative overflow-hidden transition-all shadow-md active:scale-[0.99]"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>กำลังดำเนินการ...</span>
                  </div>
                ) : paymentMethod === "promptpay" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span>เปิด QR Code ชำระเงิน</span>
                  </span>
                ) : (
                  "ยืนยันสั่งซื้อสินค้า"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal สแกนจ่าย PromptPay QR */}
      <PromptPayModal
        isOpen={showPromptPay}
        onClose={() => setShowPromptPay(false)}
        onSuccess={handlePromptPaySuccess}
        totalAmount={total > 0 ? total : 0}
        orderId={currentOrderId}
      />

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm animate-[toast-in_0.2s_ease-out]">
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-2xl border border-zinc-100">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-[#622576]" />
            <p className="mt-4 font-bold text-zinc-900">กำลังบันทึกคำสั่งซื้อ...</p>
            <p className="mt-1 text-xs text-zinc-500">กรุณารอสักครู่ ระบบกำลังจัดทำรายการ</p>
          </div>
        </div>
      )}
    </>
  );
}
