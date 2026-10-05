export default function WishlistButton({ productName, compact = false }: { productName: string; compact?: boolean }) {
  return (
    <button
      type="button"
      aria-label={`เพิ่ม ${productName} ในรายการโปรด (ตัวอย่าง)`}
      title="ตัวอย่างปุ่มรายการโปรด ยังไม่เชื่อมระบบ"
      className={compact
        ? "grid size-11 place-items-center rounded-full border border-[#e9e2f3] bg-white text-[#7652ae] shadow-sm transition-colors hover:bg-[#f5f0fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7652ae]"
        : "inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d8c8ee] px-5 font-semibold text-[#6a4bbf] transition-colors hover:bg-[#f5f0fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7652ae]"}
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 8.4c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" />
      </svg>
      {!compact && <span>เพิ่มในรายการโปรด</span>}
    </button>
  );
}
