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
    isLoaded,
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

  const [recipientName, setRecipientName] = useState("");
  const [savedAddress, setSavedAddress] = useState("123/45 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110");
  const [savedPhone, setSavedPhone] = useState("081-234-5678");

  const [isEditingRecipient, setIsEditingRecipient] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const { addOrder } = useOrders();

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login?redirect=/checkout");
    } else if (user) {
      const recName = localStorage.getItem(`recipient_name_${user.email}`) || user.name || "สมชาย ใจดี";
      const addr = localStorage.getItem(`address_${user.email}`);
      const ph = localStorage.getItem(`phone_${user.email}`);
      setRecipientName(recName);
      setEditName(recName);
      if (addr) {
        setSavedAddress(addr);
        setEditAddress(addr);
      } else {
        setEditAddress("123/45 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110");
      }
      if (ph) {
        setSavedPhone(ph);
        setEditPhone(ph);
      } else {
        setEditPhone("081-234-5678");
      }
    }
  }, [user, isInitialized, router]);

  const handleSaveRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast("กรุณาระบุชื่อ-นามสกุล ผู้รับพัสดุ", "error");
      return;
    }
    if (!editPhone.trim()) {
      toast("กรุณาระบุเบอร์โทรศัพท์สำหรับติดต่อ", "error");
      return;
    }
    if (!editAddress.trim()) {
      toast("กรุณาระบุที่อยู่สำหรับจัดส่ง", "error");
      return;
    }

    setRecipientName(editName);
    setSavedPhone(editPhone);
    setSavedAddress(editAddress);
    if (user) {
      localStorage.setItem(`recipient_name_${user.email}`, editName);
      localStorage.setItem(`phone_${user.email}`, editPhone);
      localStorage.setItem(`address_${user.email}`, editAddress);
    }
    setIsEditingRecipient(false);
    toast("บันทึกข้อมูลผู้รับพัสดุเรียบร้อยแล้ว", "success");
  };

  if (!isInitialized || !user || !isLoaded) return null;

  // รายการสินค้าเฉพาะที่ถูกเลือกจากตะกร้า
  const cartProducts = selectedItems.length > 0 ? selectedItems : cart;
  const subtotal = selectedItems.length > 0 ? selectedTotalPrice : cartTotal;
  const shippingCost = shippingMethod === "express" ? 300 : 0;
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
        quantity: p.quantity,
      })),
      total: total > 0 ? total : 0,
      status: status,
      recipientName: recipientName || user.name,
      phone: savedPhone,
      address: savedAddress,
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
      <main className="mx-auto min-h-[60vh] max-w-6xl w-full px-3.5 sm:px-8 py-5 sm:py-8 lg:px-10 overflow-x-clip">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-muted">
          <Link href="/" className="hover:text-text-heading transition-colors">หน้าแรก</Link>
          <span aria-hidden="true" className="text-zinc-300">/</span>
          <Link href="/cart" className="hover:text-text-heading transition-colors">ตะกร้าสินค้า</Link>
          <span aria-hidden="true" className="text-zinc-300">/</span>
          <span className="font-medium text-text-heading">ชำระเงิน</span>
        </nav>

        {/* Page Title & Trust Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-border pb-4 mb-5 sm:mb-6 w-full min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-heading">ชำระเงิน</h1>
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <svg className="size-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            การชำระเงินปลอดภัย 100%
          </span>
        </div>

        <div className="grid gap-5 lg:gap-8 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px] items-start w-full min-w-0">
          {/* ฝั่งซ้าย: ข้อมูลจัดส่งและชำระเงิน */}
          <div className="space-y-4 sm:space-y-5 w-full min-w-0">
            {/* 1. ข้อมูลผู้รับพัสดุและที่อยู่จัดส่ง */}
            <section className="rounded-2xl border border-neutral-border bg-white p-4 sm:p-6 shadow-2xs w-full min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="grid size-6 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-text-heading shrink-0">1</span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-text-heading">ข้อมูลผู้รับพัสดุและที่อยู่จัดส่ง</h2>
                    <p className="text-[11px] text-text-muted hidden sm:block">สำหรับจัดส่งสินค้าและประสานงานติดตั้ง</p>
                  </div>
                </div>
                {!isEditingRecipient ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditName(recipientName);
                      setEditPhone(savedPhone);
                      setEditAddress(savedAddress);
                      setIsEditingRecipient(true);
                    }}
                    className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>แก้ไข</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingRecipient(false)}
                    className="text-xs font-medium text-text-muted hover:text-text-heading shrink-0 cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                )}
              </div>

              {!isEditingRecipient ? (
                <div className="mt-3.5 flex items-start gap-2.5 sm:gap-3 rounded-xl bg-neutral-surface p-3.5 sm:p-4 text-xs sm:text-sm text-text-body w-full min-w-0 border border-neutral-border/50">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                    <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold text-text-heading text-sm sm:text-base">{recipientName}</span>
                      <span className="text-xs text-text-muted font-mono">({savedPhone})</span>
                    </div>
                    <p className="leading-relaxed text-text-body break-words text-xs sm:text-sm">{savedAddress}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveRecipient} className="mt-3.5 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-heading mb-1">
                      ชื่อ-นามสกุล ผู้รับพัสดุ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="เช่น สมชาย ใจดี"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-text-heading placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-heading mb-1">
                      เบอร์โทรศัพท์สำหรับติดต่อ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="เช่น 081-234-5678"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-text-heading placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-heading mb-1">
                      ที่อยู่สำหรับจัดส่งและติดตั้ง <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      placeholder="บ้านเลขที่, ถนน, ซอย, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, รหัสไปรษณีย์"
                      className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs sm:text-sm text-text-heading placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="rounded-xl bg-primary hover:bg-primary-hover px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-2xs active:scale-95 transition-all cursor-pointer"
                    >
                      บันทึกข้อมูลผู้รับ
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingRecipient(false)}
                      className="rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 px-3.5 py-2 text-xs sm:text-sm font-medium text-text-muted transition-colors cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* 2. ตัวเลือกการจัดส่ง */}
            <section className="rounded-2xl border border-neutral-border bg-white p-4 sm:p-6 shadow-2xs w-full min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 pb-3 border-b border-zinc-100">
                <span className="grid size-6 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-text-heading shrink-0">2</span>
                <h2 className="text-sm sm:text-base font-bold text-text-heading">รูปแบบการจัดส่งและบริการ</h2>
              </div>

              <div className="mt-3.5 space-y-2.5 w-full min-w-0">
                <label className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3.5 sm:p-4 transition-all w-full min-w-0 ${
                  shippingMethod === "standard"
                    ? "border-primary bg-primary-tint/30 ring-1 ring-primary"
                    : "border-neutral-border bg-white hover:border-zinc-300"
                }`}>
                  <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="mt-0.5 size-4 text-primary focus:ring-primary accent-[#622576] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-text-heading leading-snug">จัดส่งพร้อมทีมช่างประกอบติดตั้งถึงบ้าน</p>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-text-muted leading-relaxed">ทีมช่างนัดหมายล่วงหน้า พร้อมสาธิตการใช้งานและตรวจเช็กระบบ</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 shrink-0 self-center sm:self-start">ฟรี</span>
                </label>

                <label className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3.5 sm:p-4 transition-all w-full min-w-0 ${
                  shippingMethod === "express"
                    ? "border-primary bg-primary-tint/30 ring-1 ring-primary"
                    : "border-neutral-border bg-white hover:border-zinc-300"
                }`}>
                  <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="mt-0.5 size-4 text-primary focus:ring-primary accent-[#622576] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-text-heading leading-snug">บริการยกขึ้นชั้นบน / นัดหมายเวลาพิเศษ</p>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-text-muted leading-relaxed">ทีมช่าง 2 ท่านสำหรับยกขึ้นชั้น 2 หรือกำหนดช่วงเวลาเฉพาะ</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-text-heading shrink-0 self-center sm:self-start">+฿300</span>
                </label>
              </div>
            </section>

            {/* 3. วิธีการชำระเงิน */}
            <section className="rounded-2xl border border-neutral-border bg-white p-4 sm:p-6 shadow-2xs w-full min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="grid size-6 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-text-heading shrink-0">3</span>
                  <h2 className="text-sm sm:text-base font-bold text-text-heading">วิธีการชำระเงิน</h2>
                </div>
                <span className="text-xs text-text-muted hidden sm:inline">เลือกวิธีที่คุณสะดวก</span>
              </div>

              <div className="mt-3.5 space-y-2.5 w-full min-w-0">
                {/* 1. พร้อมเพย์ PromptPay QR */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-xl border p-3.5 sm:p-4 transition-all w-full min-w-0 ${
                  paymentMethod === "promptpay"
                    ? "border-primary bg-primary-tint/30 ring-1 ring-primary"
                    : "border-neutral-border bg-white hover:border-zinc-300"
                }`}>
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="payment"
                      value="promptpay"
                      checked={paymentMethod === "promptpay"}
                      onChange={() => setPaymentMethod("promptpay")}
                      className="mt-0.5 sm:mt-0 size-4 text-primary focus:ring-primary accent-[#622576] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs sm:text-sm font-bold text-text-heading">พร้อมเพย์ (PromptPay QR)</p>
                        <span className="rounded-full bg-emerald-50 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-700 border border-emerald-200">แนะนำ</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">สแกนจ่ายผ่านแอปธนาคาร ฟรีค่าธรรมเนียม</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-6.5 sm:pl-0 shrink-0">
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1">
                      <Image src="/payments/thaiqr-logo.png" alt="Thai QR" width={20} height={20} className="h-3.5 sm:h-4 w-auto object-contain" />
                    </div>
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5">
                      <Image src="/payments/promptpay-white130x70.png" alt="PromptPay" width={44} height={24} className="h-3.5 sm:h-4 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 2. บัตรเครดิต / บัตรเดบิต */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-xl border p-3.5 sm:p-4 transition-all w-full min-w-0 ${
                  paymentMethod === "creditcard"
                    ? "border-primary bg-primary-tint/30 ring-1 ring-primary"
                    : "border-neutral-border bg-white hover:border-zinc-300"
                }`}>
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="payment"
                      value="creditcard"
                      checked={paymentMethod === "creditcard"}
                      onChange={() => setPaymentMethod("creditcard")}
                      className="mt-0.5 sm:mt-0 size-4 text-primary focus:ring-primary accent-[#622576] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-text-heading">บัตรเครดิต / บัตรเดบิต</p>
                      <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">Visa, Mastercard ปลอดภัยด้วย 3D Secure</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-6.5 sm:pl-0 shrink-0">
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5">
                      <Image src="/payments/visa-white130x70.png" alt="Visa" width={38} height={20} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5">
                      <Image src="/payments/mastercard-white130x70.png" alt="Mastercard" width={38} height={20} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 3. โมบายแบงก์กิ้ง */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-xl border p-3.5 sm:p-4 transition-all w-full min-w-0 ${
                  paymentMethod === "mobilebanking"
                    ? "border-primary bg-primary-tint/30 ring-1 ring-primary"
                    : "border-neutral-border bg-white hover:border-zinc-300"
                }`}>
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="payment"
                      value="mobilebanking"
                      checked={paymentMethod === "mobilebanking"}
                      onChange={() => setPaymentMethod("mobilebanking")}
                      className="mt-0.5 sm:mt-0 size-4 text-primary focus:ring-primary accent-[#622576] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-text-heading">โมบายแบงก์กิ้ง (Mobile Banking)</p>
                      <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">สแกนหรือเชื่อมต่อแอปพลิเคชันธนาคาร</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pl-6.5 sm:pl-0 shrink-0 flex-wrap max-w-full">
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1" title="KBank">
                      <Image src="/payments/kbank-white130x70.png" alt="KBank" width={36} height={18} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1" title="Bangkok Bank">
                      <Image src="/payments/bangkokbank-white130x70.png" alt="Bangkok Bank" width={36} height={18} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1" title="Krungthai Bank">
                      <Image src="/payments/krungthaibank-130x70.png" alt="Krungthai Bank" width={36} height={18} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1" title="Krungsri">
                      <Image src="/payments/ayudhya-white130x70.png" alt="Krungsri Bank" width={36} height={18} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 4. กระเป๋าเงินออนไลน์ E-Wallet */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-xl border p-3.5 sm:p-4 transition-all w-full min-w-0 ${
                  paymentMethod === "ewallet"
                    ? "border-primary bg-primary-tint/30 ring-1 ring-primary"
                    : "border-neutral-border bg-white hover:border-zinc-300"
                }`}>
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="payment"
                      value="ewallet"
                      checked={paymentMethod === "ewallet"}
                      onChange={() => setPaymentMethod("ewallet")}
                      className="mt-0.5 sm:mt-0 size-4 text-primary focus:ring-primary accent-[#622576] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-text-heading">กระเป๋าเงินออนไลน์ (ShopeePay / PayPal)</p>
                      <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">ชำระสะดวกผ่านบัญชีออนไลน์</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pl-6.5 sm:pl-0 shrink-0">
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5">
                      <Image src="/payments/shopeepay-white130x70.png" alt="ShopeePay" width={38} height={20} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                    <div className="flex h-5.5 sm:h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5">
                      <Image src="/payments/paypal-white130x70.png" alt="PayPal" width={38} height={20} className="h-3 sm:h-3.5 w-auto object-contain" />
                    </div>
                  </div>
                </label>

                {/* 5. ชำระเงินปลายทาง COD */}
                <label className={`flex cursor-pointer flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-xl border p-3.5 sm:p-4 transition-all w-full min-w-0 ${
                  paymentMethod === "cod"
                    ? "border-primary bg-primary-tint/30 ring-1 ring-primary"
                    : "border-neutral-border bg-white hover:border-zinc-300"
                }`}>
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-0.5 sm:mt-0 size-4 text-primary focus:ring-primary accent-[#622576] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-text-heading">ชำระเงินปลายทาง (COD)</p>
                      <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">ชำระเงินสดกับเจ้าหน้าที่เมื่อสินค้าส่งถึงบ้าน</p>
                    </div>
                  </div>
                  <div className="pl-6.5 sm:pl-0 shrink-0">
                    <span className="inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-text-muted">
                      เงินสดปลายทาง
                    </span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* ฝั่งขวา: สรุปคำสั่งซื้อ */}
          <aside className="w-full min-w-0 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-neutral-border bg-white p-4 sm:p-6 shadow-2xs w-full min-w-0">
              <div className="flex items-baseline justify-between pb-3 border-b border-zinc-100">
                <h2 className="text-sm sm:text-base font-bold text-text-heading">สรุปคำสั่งซื้อ</h2>
                <span className="text-xs text-text-muted">{cartProducts.length} รายการ</span>
              </div>

              {/* รายการสินค้า */}
              <div className="mt-3 divide-y divide-zinc-100 max-h-64 overflow-y-auto pr-1">
                {cartProducts.length === 0 ? (
                  <p className="py-4 text-center text-sm text-text-muted">ไม่มีสินค้าที่เลือก</p>
                ) : (
                  cartProducts.map((p) => (
                    <div key={p.id} className="py-3 flex items-center gap-2.5 sm:gap-3 first:pt-1 min-w-0">
                      <div className="relative size-11 sm:size-12 shrink-0 rounded-lg border border-neutral-border bg-neutral-surface overflow-hidden">
                        <Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs sm:text-sm font-semibold text-text-heading">{p.name}</p>
                        <p className="text-[11px] sm:text-xs text-text-muted">จำนวน {p.quantity} ชิ้น</p>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-text-heading shrink-0 pl-1">
                        {formatPrice(p.price * p.quantity)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* คูปองส่วนลด */}
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <div className="flex gap-2 w-full min-w-0">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="โค้ดส่วนลด (ลอง: DISCOUNT100)"
                    className="flex-1 min-w-0 rounded-xl border border-neutral-border bg-neutral-surface px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    disabled={isApplying || !discountCode.trim()}
                    className="shrink-0 rounded-xl bg-zinc-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-zinc-900 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    {isApplying ? "กำลังใช้..." : "ใช้โค้ด"}
                  </button>
                </div>
              </div>

              {/* สรุปราคา */}
              <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>ยอดรวมสินค้า</span>
                  <span className="text-text-heading font-medium tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>ค่าจัดส่งและติดตั้ง</span>
                  <span className={shippingCost === 0 ? "text-emerald-600 font-semibold" : "text-text-heading font-medium tabular-nums"}>
                    {shippingCost === 0 ? "ฟรี" : formatPrice(shippingCost)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>ส่วนลด</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-zinc-100 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-text-heading">ยอดชำระสุทธิ</span>
                  <span className="text-lg sm:text-xl font-bold text-primary tabular-nums">
                    {formatPrice(total > 0 ? total : 0)}
                  </span>
                </div>
              </div>

              {/* ปุ่มชำระเงิน */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing || cartProducts.length === 0}
                className="mt-5 w-full rounded-full bg-primary py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-primary-hover disabled:bg-zinc-200 disabled:text-zinc-400 transition-all shadow-xs active:scale-[0.99] cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>กำลังดำเนินการ...</span>
                  </span>
                ) : paymentMethod === "promptpay" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span>สแกน QR Code ชำระเงิน</span>
                  </span>
                ) : (
                  "ยืนยันการสั่งซื้อ"
                )}
              </button>

              <p className="mt-3 text-center text-[11px] text-text-muted">
                คลิกยืนยันเพื่อยอมรับข้อตกลงและเงื่อนไขการให้บริการ
              </p>
            </div>
          </aside>
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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs animate-[toast-in_0.2s_ease-out]">
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-xl border border-neutral-border">
            <div className="size-9 animate-spin rounded-full border-3 border-zinc-200 border-t-primary" />
            <p className="mt-4 text-sm font-bold text-text-heading">กำลังบันทึกคำสั่งซื้อ...</p>
            <p className="mt-1 text-xs text-text-muted">กรุณารอสักครู่ ระบบกำลังจัดทำรายการ</p>
          </div>
        </div>
      )}
    </>
  );
}
