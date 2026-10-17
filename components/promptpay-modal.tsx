"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/data/products";

interface PromptPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
  totalAmount: number;
  orderId: string;
}

export default function PromptPayModal({
  isOpen,
  onClose,
  onSuccess,
  totalAmount,
  orderId,
}: PromptPayModalProps) {
  const [step, setStep] = useState<"waiting" | "verifying" | "success">("waiting");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("waiting");
      setTimeLeft(600);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || step !== "waiting") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const handleSimulateScan = () => {
    setStep("verifying");

    // จำลองการตรวจสอบกับระบบธนาคาร 1.2 วินาที
    setTimeout(() => {
      setStep("success");

      // แสดงหน้าสำเร็จ 1.5 วินาที แล้วดำเนินการต่อ
      setTimeout(() => {
        onSuccess(orderId);
      }, 1500);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-zinc-950/60 backdrop-blur-xs animate-[toast-in_0.2s_ease-out] overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && step === "waiting") onClose();
      }}
    >
      <div className="relative w-full max-w-[390px] sm:max-w-md my-auto overflow-hidden rounded-3xl bg-white shadow-2xl border border-zinc-200/90 max-h-[94vh] overflow-y-auto">
        {/* Step 1: หน้าแสดง QR Code พร้อมชำระเงิน (Clean & Elegant) */}
        {step === "waiting" && (
          <div>
            {/* Header: เรียบหรู สะอาดตา */}
            <div className="flex items-center justify-between border-b border-zinc-150 px-5 py-3.5 sm:px-6 sm:py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50 border border-zinc-200/80 p-1">
                  <Image
                    src="/payments/thaiqr-logo.png"
                    alt="Thai QR"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 leading-tight">
                    สแกนชำระผ่าน PromptPay
                  </h3>
                  <p className="text-[11px] text-zinc-500">Thai QR Payment</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="ปิดหน้าต่าง"
                className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* เนื้อหาหลัก */}
            <div className="px-5 py-5 sm:px-6 sm:py-6 text-center">
              {/* ยอดเงินและเลขอ้างอิง */}
              <div className="mb-4">
                <span className="text-xs font-medium text-zinc-500">ยอดชำระเงินทั้งหมด</span>
                <div className="mt-0.5 text-2xl sm:text-3xl font-extrabold text-primary-dark tracking-tight">
                  {formatPrice(totalAmount)}
                </div>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                  <span>เลขอ้างอิง:</span>
                  <span className="font-mono font-medium text-zinc-700">{orderId}</span>
                </div>
              </div>

              {/* QR Code กล่องสีขาวมน สะอาดตา พร้อมกรอบบางเบา */}
              <div className="mx-auto max-w-[240px] sm:max-w-[260px] rounded-2xl border border-zinc-200 bg-white p-3 shadow-xs">
                <Image
                  src="/payments/promptpay-qr.png"
                  alt="PromptPay QR Code"
                  width={360}
                  height={360}
                  className="w-full h-auto object-contain rounded-xl"
                  priority
                />
              </div>

              {/* ข้อมูลบัญชีผู้รับเงิน */}
              <div className="mt-3 text-xs">
                <p className="font-semibold text-zinc-900">บริษัท ออลล์เวล ไลฟ์ จำกัด</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">PromptPay Biller ID: 0105557012345</p>
              </div>

              {/* ตัวนับเวลาถอยหลัง (Timer Pill) */}
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 border border-amber-200/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                <span>กรุณาสแกนภายใน</span>
                <span className="font-bold font-mono">{formattedTime} นาที</span>
              </div>

              {/* ธนาคารที่รองรับ */}
              <div className="mt-4 pt-3.5 border-t border-zinc-150">
                <p className="text-[11px] text-zinc-400 font-medium mb-2">
                  รองรับ Mobile Banking สแกนได้ทุกธนาคาร
                </p>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <div className="flex h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5 shadow-2xs" title="กสิกรไทย">
                    <Image src="/payments/kbank-white130x70.png" alt="KBank" width={38} height={20} className="h-3.5 w-auto object-contain" />
                  </div>
                  <div className="flex h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5 shadow-2xs" title="กรุงเทพ">
                    <Image src="/payments/bangkokbank-white130x70.png" alt="BBL" width={38} height={20} className="h-3.5 w-auto object-contain" />
                  </div>
                  <div className="flex h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5 shadow-2xs" title="กรุงไทย">
                    <Image src="/payments/krungthaibank-130x70.png" alt="KTB" width={38} height={20} className="h-3.5 w-auto object-contain" />
                  </div>
                  <div className="flex h-6 items-center justify-center rounded border border-zinc-200 bg-white px-1.5 shadow-2xs" title="กรุงศรีอยุธยา">
                    <Image src="/payments/ayudhya-white130x70.png" alt="BAY" width={38} height={20} className="h-3.5 w-auto object-contain" />
                  </div>
                </div>
              </div>

              {/* ปุ่มการทำงาน */}
              <div className="mt-5 space-y-2">
                {/* ปุ่มจำลองการสแกนจ่ายเงิน */}
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover py-3 px-5 font-bold text-white shadow-sm active:scale-[0.99] transition-all cursor-pointer text-sm"
                >
                  <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>จำลองการสแกนจ่ายเงิน (Simulate)</span>
                </button>

                {/* ปุ่มบันทึกรูป QR */}
                <a
                  href="/payments/promptpay-qr.png"
                  download={`PromptPay_${orderId}.png`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <svg className="size-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>บันทึกรูป QR ลงในเครื่อง</span>
                </a>

                {/* ปุ่มยกเลิก */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full pt-1 pb-0 text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  ยกเลิกและเลือกวิธีชำระเงินอื่น
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: กำลังตรวจสอบการโอนเงิน (Verifying State) */}
        {step === "verifying" && (
          <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[340px]">
            <div className="relative mb-5">
              <div className="size-14 animate-spin rounded-full border-3 border-zinc-150 border-t-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/payments/thaiqr-logo.png"
                  alt="Thai QR"
                  width={24}
                  height={24}
                  className="size-5 rounded object-contain"
                />
              </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-900">กำลังตรวจสอบยอดชำระเงิน</h3>
            <p className="mt-1.5 text-xs text-zinc-500 max-w-xs leading-relaxed">
              กำลังยืนยันยอดเงิน {formatPrice(totalAmount)} กับระบบธนาคาร กรุณารอสักครู่...
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-xs text-zinc-400">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-duration:1s]"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-duration:1s] [animation-delay:0.2s]"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-duration:1s] [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}

        {/* Step 3: สแกนจ่ายสำเร็จ (Success State) */}
        {step === "success" && (
          <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[340px] animate-[toast-in_0.25s_ease-out]">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              ชำระเงินสำเร็จ
            </span>
            <h3 className="mt-2 text-xl font-bold text-zinc-900">ได้รับยอดชำระเรียบร้อย</h3>
            <p className="mt-1 text-lg font-extrabold text-primary-dark">
              {formatPrice(totalAmount)}
            </p>
            <p className="mt-2 text-xs text-zinc-500 max-w-xs leading-relaxed">
              หมายเลขคำสั่งซื้อ <span className="font-mono font-semibold text-zinc-800">{orderId}</span> กำลังนำท่านไปที่หน้ารายการสั่งซื้อ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
