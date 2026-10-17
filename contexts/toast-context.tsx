"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastVariant, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const STYLES: Record<ToastVariant, string> = {
  success: "bg-zinc-900 text-white border border-zinc-800",
  error: "bg-rose-600 text-white",
  info: "bg-zinc-900 text-white border border-zinc-800",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = nextId.current++;
    // แสดงเฉพาะ Toast ล่าสุด 1 อันเสมอ ป้องกันการซ้อนกันล้นจอ
    setToasts([{ id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const dismiss = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container: บนมือถือแสดงด้านบนกลางจอ (Dynamic Island style) ไม่ทับปุ่มล่าง, บนเดสก์ท็อปอยู่ขวาล่าง */}
      <div
        aria-live="polite"
        aria-label="การแจ้งเตือน"
        className="pointer-events-none fixed top-4 inset-x-4 z-[9999] flex flex-col gap-2 items-center sm:inset-x-auto sm:top-auto sm:bottom-6 sm:right-6 sm:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex max-w-xs items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-lg animate-[toast-in_0.2s_ease-out] sm:max-w-sm ${STYLES[t.variant]}`}
          >
            {t.variant === "success" ? (
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                ✓
              </span>
            ) : (
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/20 text-[10px] font-bold text-white">
                {ICONS[t.variant]}
              </span>
            )}
            <p className="flex-1 text-xs sm:text-sm font-medium leading-snug">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="ปิดการแจ้งเตือน"
              className="shrink-0 text-white/50 hover:text-white ml-1 cursor-pointer"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
