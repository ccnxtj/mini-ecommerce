/* Hallmark · component: cart-feedback-modal · genre: modern-minimal · theme: allwell-medical
 * states: checkmark (add) · cross (remove)
 * animation: stroke-draw checkmark & cross with bounce pop
 */
"use client";

import { useEffect, useRef } from "react";

export type FeedbackModalState = {
  isOpen: boolean;
  type: "add" | "remove";
  status?: "loading" | "complete";
  item?: {
    id?: string;
    name?: string;
    price?: number;
    image?: string;
    quantity?: number;
  };
};

interface CartFeedbackModalProps {
  feedback: FeedbackModalState;
  onClose: () => void;
}

export default function CartFeedbackModal({ feedback, onClose }: CartFeedbackModalProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ปิดอัตโนมัติหลังจากแสดงผลเสร็จ (~1.3 วินาที)
  useEffect(() => {
    if (feedback.isOpen) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 1300);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [feedback.isOpen, onClose]);

  // ปิดด้วยปุ่ม Escape
  useEffect(() => {
    if (!feedback.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback.isOpen, onClose]);

  if (!feedback.isOpen) return null;

  const isAdd = feedback.type === "add";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 p-4 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center justify-center rounded-3xl border border-neutral-border/80 bg-white/98 px-8 py-7 shadow-2xl backdrop-blur-md animate-modal-pop text-center min-w-[200px]"
        onClick={(e) => e.stopPropagation()}
      >
        {isAdd ? (
          /* ติ๊กถูก และ ข้อความ เพิ่มลงตะกร้าแล้ว */
          <>
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-6 ring-emerald-500/15 animate-icon-pop">
              <svg
                className="size-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path className="animate-stroke-draw" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-3.5 text-base font-bold text-text-heading tracking-tight select-none">
              เพิ่มลงตะกร้าแล้ว
            </p>
          </>
        ) : (
          /* กากบาท และ ข้อความ ลบออกจากตะกร้าแล้ว */
          <>
            <div className="flex size-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-6 ring-rose-500/15 animate-icon-pop">
              <svg
                className="size-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path className="animate-stroke-draw" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="mt-3.5 text-base font-bold text-text-heading tracking-tight select-none">
              ลบออกจากตะกร้าแล้ว
            </p>
          </>
        )}
      </div>
    </div>
  );
}

