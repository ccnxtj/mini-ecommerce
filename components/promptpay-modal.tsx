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

    // จำลองการตรวจสอบกับระบบธนาคาร 1.5 วินาที
    setTimeout(() => {
      setStep("success");

      // แสดงหน้าสำเร็จ 1.8 วินาที แล้วดำเนินการต่อ
      setTimeout(() => {
        onSuccess(orderId);
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[toast-in_0.2s_ease-out]">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        {/* Step 1: หน้าแสดง QR Code พร้อมชำระเงิน */}
        {step === "waiting" && (
          <div>
            {/* Header สไตล์ Thai QR Payment & PromptPay */}
            <div className="bg-[#1a3b5d] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/payments/thaiqr-logo.png"
                  alt="Thai QR Payment"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-lg bg-white p-0.5 object-contain shadow-sm"
                />
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-sky-200 uppercase">Thai QR Payment</p>
                  <p className="text-sm font-bold text-white">พร้อมเพย์ (PromptPay)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="ปิดหน้าต่าง"
                className="grid h-8 w-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* เนื้อหาด้านใน */}
            <div className="p-6 text-center">
              <p className="text-xs font-medium text-zinc-500">บัญชีผู้รับชำระ</p>
              <h3 className="mt-0.5 text-base font-bold text-zinc-900">บริษัท ออลล์เวล ไลฟ์ จำกัด</h3>
              <p className="text-xs text-zinc-400">เลขประจำตัวผู้เสียภาษี: 0105557012345</p>

              {/* ยอดเงินชำระ */}
              <div className="my-3 rounded-2xl bg-zinc-50 py-2.5 border border-zinc-100">
                <p className="text-xs text-zinc-500">ยอดชำระเงิน</p>
                <p className="mt-0.5 text-3xl font-extrabold text-[#622576]">
                  {formatPrice(totalAmount)}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400 font-mono">เลขอ้างอิง: {orderId}</p>
              </div>

              {/* QR Code ของจริงจาก promptpay-qr.png */}
              <div className="mx-auto flex flex-col items-center justify-center">
                <div className="relative rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm max-w-[260px] sm:max-w-[280px]">
                  <Image
                    src="/payments/promptpay-qr.png"
                    alt="PromptPay QR Code"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain rounded-xl"
                    priority
                  />
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>กรุณาสแกนภายใน</span>
                  <span className="font-bold text-amber-600 font-mono">{formattedTime}</span>
                </div>

                {/* ธนาคารที่รองรับ */}
                <div className="mt-3.5 pt-3 border-t border-zinc-100 w-full max-w-[280px]">
                  <p className="text-[11px] text-zinc-400 font-medium mb-1.5">รองรับ Mobile Banking สแกนได้ทุกธนาคาร</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="flex h-6 items-center justify-center rounded border border-zinc-200/80 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" title="กสิกรไทย (KBank)">
                      <Image src="/payments/kbank-white130x70.png" alt="KBank" width={40} height={22} className="h-4 w-auto object-contain" />
                    </div>
                    <div className="flex h-6 items-center justify-center rounded border border-zinc-200/80 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" title="กรุงเทพ (Bangkok Bank)">
                      <Image src="/payments/bangkokbank-white130x70.png" alt="Bangkok Bank" width={40} height={22} className="h-4 w-auto object-contain" />
                    </div>
                    <div className="flex h-6 items-center justify-center rounded border border-zinc-200/80 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" title="กรุงไทย (Krungthai Bank)">
                      <Image src="/payments/krungthaibank-130x70.png" alt="Krungthai Bank" width={40} height={22} className="h-4 w-auto object-contain" />
                    </div>
                    <div className="flex h-6 items-center justify-center rounded border border-zinc-200/80 bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" title="กรุงศรีอยุธยา (Krungsri)">
                      <Image src="/payments/ayudhya-white130x70.png" alt="Krungsri Bank" width={40} height={22} className="h-4 w-auto object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ปุ่มจำลองการสแกนจ่าย */}
              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1a3b5d] to-[#24507d] py-3.5 px-6 font-bold text-white shadow-md hover:from-[#15304c] hover:to-[#1c4064] active:scale-[0.99] transition-all"
                >
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>จำลองการสแกนจ่ายเงิน (Simulate)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-600"
                >
                  ยกเลิกและเปลี่ยนวิธีชำระเงิน
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: กำลังตรวจสอบการโอนเงิน (Verifying State) */}
        {step === "verifying" && (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[380px]">
            <div className="relative mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-200 border-t-[#1a3b5d]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/payments/thaiqr-logo.png"
                  alt="Thai QR"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-zinc-900">ตรวจพบการสแกนจ่ายเงิน!</h3>
            <p className="mt-2 text-sm text-zinc-500 max-w-xs">
              กำลังตรวจสอบยอดเงิน {formatPrice(totalAmount)} กับระบบ PromptPay กรุณารอสักครู่...
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs text-zinc-400">
              <div className="h-1.5 w-1.5 rounded-full bg-[#1a3b5d] animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-[#1a3b5d] animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-[#1a3b5d] animate-bounce"></div>
            </div>
          </div>
        )}

        {/* Step 3: สแกนจ่ายสำเร็จ (Success State) */}
        {step === "success" && (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[380px] animate-[toast-in_0.3s_ease-out]">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
              <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              ชำระเงินสำเร็จ
            </span>
            <h3 className="mt-3 text-2xl font-bold text-zinc-900">ได้รับยอดชำระเรียบร้อย!</h3>
            <p className="mt-1 text-lg font-extrabold text-[#622576]">
              {formatPrice(totalAmount)}
            </p>
            <p className="mt-3 text-xs text-zinc-500 max-w-xs">
              บันทึกคำสั่งซื้อ <span className="font-semibold text-zinc-800 font-mono">{orderId}</span> เรียบร้อยแล้ว กำลังนำท่านไปที่หน้ารายการสั่งซื้อ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
