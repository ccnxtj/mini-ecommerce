"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice, products } from "@/data/products";
import ProductCard from "@/components/product-card";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/contexts/toast-context";
import { useRouter } from "next/navigation";

export default function CartGrid() {
  const {
    cart,
    isLoaded,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleSelectItem,
    selectAllItems,
    selectedTotalItems,
    selectedTotalPrice,
    isAllSelected,
  } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleDecrease = (item: { id: string; name: string; quantity: number }) => {
    if (item.quantity <= 1) {
      setItemToDelete({ id: item.id, name: item.name });
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    removeFromCart(itemToDelete.id);
    setItemToDelete(null);
  };

  // สินค้าที่คุณอาจจะชอบ: เลือกสินค้าที่ยังไม่อยู่ในตะกร้า 4 รายการ
  const recommendedProducts = useMemo(() => {
    const unadded = products.filter((p) => !cart.some((item) => item.id === p.id));
    return (unadded.length >= 4 ? unadded : products).slice(0, 4);
  }, [cart]);

  const recommendedSection = (
    <section className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-border pb-28 lg:pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base sm:text-xl font-bold text-text-heading">
            สินค้าแนะนำสำหรับคุณ
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-text-muted">
            เตียงผู้ป่วยไฟฟ้าและอุปกรณ์ดูแลสุขภาพยอดนิยม
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          <span>ดูสินค้าทั้งหมด</span>
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );

  if (!isLoaded) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-xs text-text-muted">กำลังโหลดตะกร้าสินค้า...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <div className="rounded-2xl sm:rounded-3xl bg-neutral-surface border border-neutral-border py-10 sm:py-14 px-4 sm:px-6 text-center shadow-xs">
          <div className="mx-auto flex size-14 sm:size-16 items-center justify-center rounded-full bg-white text-primary mb-3.5 shadow-2xs ring-4 ring-primary/5">
            <svg className="size-7 sm:size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.669 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="text-base sm:text-xl font-bold text-text-heading tracking-tight">ตะกร้าของคุณยังว่างอยู่</h2>
          <p className="mt-1 text-xs sm:text-sm text-text-muted max-w-xs sm:max-w-sm mx-auto leading-relaxed">
            เลือกดูเตียงผู้ป่วยไฟฟ้าและอุปกรณ์เพื่อสุขภาพมาตรฐานสากล แล้วเพิ่มลงในตะกร้าเพื่อเริ่มสั่งซื้อได้เลย
          </p>
          <div className="mt-5">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-hover hover:shadow-sm active:scale-95 transition-all"
            >
              <span>เลือกดูสินค้าทั้งหมด</span>
              <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
        {recommendedSection}
      </>
    );
  }

  const handleCheckout = () => {
    if (selectedTotalItems === 0) {
      toast("กรุณาเลือกสินค้าที่ต้องการชำระเงินอย่างน้อย 1 ชิ้น", "info");
      return;
    }
    if (!user) {
      toast("กรุณาเข้าสู่ระบบก่อนสั่งสินค้า", "info");
      router.push("/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <>
      <div className="mt-4 sm:mt-6 grid gap-6 lg:gap-8 lg:grid-cols-[1fr_360px] items-start pb-6 lg:pb-0">
        {/* ฝั่งซ้าย: รายการสินค้าพร้อม Checkbox เลือกรายการ */}
        <div className="space-y-3">
          {/* แถบเลือกสินค้าทั้งหมด (Select All) */}
          <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-2xs">
            <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => selectAllItems(e.target.checked)}
                className="size-4.5 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer accent-primary"
              />
              <span className="text-xs sm:text-sm font-semibold text-zinc-800">
                เลือกสินค้าทั้งหมด ({cart.length})
              </span>
            </label>

            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              ล้างตะกร้า
            </button>
          </div>

          {/* รายการสินค้าแต่ละชิ้น: ออกแบบให้กดง่าย สบายตา ชัดเจนบนจอมือถือ */}
          {cart.map((item) => {
            const isSelected = Boolean(item.selected);
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 sm:gap-4.5 rounded-2xl border p-3.5 sm:p-5 transition-all duration-200 ${
                  isSelected
                    ? "border-primary/25 bg-white shadow-2xs ring-1 ring-primary/10"
                    : "border-neutral-border bg-white shadow-2xs hover:border-zinc-300"
                }`}
              >
                {/* Checkbox เลือกสินค้านี้ */}
                <div className="shrink-0 pt-2 sm:pt-1">
                  <label className="flex items-center cursor-pointer p-0.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="size-4.5 rounded-md border-neutral-border text-primary focus:ring-0 cursor-pointer accent-primary"
                    />
                    <span className="sr-only">เลือก {item.name}</span>
                  </label>
                </div>

                {/* รูปสินค้า */}
                <Link href={`/products/${item.id}`} className="shrink-0 relative group">
                  <div className="size-18 sm:size-24 rounded-xl overflow-hidden border border-neutral-border/70 bg-neutral-surface/60 flex items-center justify-center p-1">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* ข้อมูลสินค้า */}
                <div className="flex flex-1 flex-col justify-between min-w-0 sm:flex-row sm:items-center gap-2.5 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    {/* ชื่อสินค้า & ปุ่มลบบนมือถือ */}
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.id}`}
                        className="block text-xs sm:text-sm font-semibold text-text-heading hover:text-primary transition-colors leading-snug line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setItemToDelete({ id: item.id, name: item.name })}
                        className="flex size-8 shrink-0 items-center justify-center text-zinc-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer sm:hidden -mr-1 -mt-1"
                        title="ลบออกจากตะกร้า"
                        aria-label="ลบออกจากตะกร้า"
                      >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* ราคาต่อชิ้น */}
                    <p className="mt-1 text-xs text-text-muted">
                      {formatPrice(item.price)}
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-zinc-400 ml-1">/ ชิ้น</span>
                      )}
                    </p>
                  </div>

                  {/* แถวล่าง: ปุ่มปรับจำนวนและราคารวม */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-1 sm:pt-0">
                    {/* ปุ่มปรับจำนวน Stepper ขนาดสัมผัสสบายมือ */}
                    <div className="flex items-center rounded-lg border border-neutral-border bg-white shadow-2xs">
                      <button
                        type="button"
                        aria-label="ลดจำนวน"
                        onClick={() => handleDecrease(item)}
                        className="flex size-7.5 sm:size-8 items-center justify-center text-zinc-500 hover:text-text-heading hover:bg-neutral-surface rounded-l-lg transition-colors cursor-pointer active:scale-95"
                      >
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="min-w-[1.75rem] text-center text-xs font-semibold text-text-heading select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="เพิ่มจำนวน"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-7.5 sm:size-8 items-center justify-center text-zinc-500 hover:text-text-heading hover:bg-neutral-surface rounded-r-lg transition-colors cursor-pointer active:scale-95"
                      >
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                        </svg>
                      </button>
                    </div>

                    {/* ราคารวมของแถวนี้ */}
                    <div className="text-right min-w-[5rem] sm:min-w-[5.5rem]">
                      <span className="text-sm sm:text-base font-bold text-text-heading block leading-tight">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* ปุ่มนำออกบน Desktop */}
                    <button
                      type="button"
                      onClick={() => setItemToDelete({ id: item.id, name: item.name })}
                      className="hidden sm:flex size-8 items-center justify-center text-zinc-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="ลบออกจากตะกร้า"
                      aria-label="ลบออกจากตะกร้า"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Micro Trust Reassurance บนมือถือ (กะทัดรัด ไม่เกะกะ) */}
          <div className="mt-4 rounded-xl border border-neutral-border/70 bg-white p-3 space-y-1.5 text-xs text-text-muted lg:hidden">
            <div className="flex items-center gap-2">
              <svg className="size-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[11px]">สินค้ามาตรฐานเครื่องมือแพทย์ของแท้ 100% ประกันศูนย์</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="size-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[11px]">บริการจัดส่งและยกประกอบติดตั้งฟรีถึงห้องนอน</span>
            </div>
          </div>
        </div>

        {/* ฝั่งขวา: สรุปคำสั่งซื้อ (Sticky Sidebar บน Desktop เท่านั้น ไม่แสดงซ้ำบนมือถือ) */}
        <div className="hidden lg:block lg:sticky lg:top-8">
          <div className="rounded-2xl border border-neutral-border bg-white p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-text-heading pb-3.5 border-b border-neutral-border/60">
              สรุปคำสั่งซื้อ
            </h2>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-text-muted">
              <div className="flex justify-between">
                <span>สินค้าที่เลือก ({selectedTotalItems} ชิ้น)</span>
                <span className="font-semibold text-text-heading">{formatPrice(selectedTotalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่งและติดตั้ง</span>
                <span className="font-semibold text-emerald-600">ฟรี</span>
              </div>
            </div>

            <div className="mt-4 border-t border-neutral-border/60 pt-4 flex items-baseline justify-between">
              <span className="text-xs sm:text-sm font-semibold text-text-heading">ยอดชำระสุทธิ</span>
              <span className="text-xl sm:text-2xl font-bold text-text-heading">
                {formatPrice(selectedTotalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={selectedTotalItems === 0}
              className={`mt-5 w-full rounded-full py-3 text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedTotalItems > 0
                  ? "bg-primary text-white hover:bg-primary-hover active:scale-[0.99]"
                  : "bg-neutral-surface text-text-muted border border-neutral-border cursor-not-allowed opacity-60"
              }`}
            >
              <span>ดำเนินการสั่งซื้อ ({selectedTotalItems})</span>
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {selectedTotalItems === 0 && (
              <p className="mt-2.5 text-center text-[11px] text-text-muted">
                กรุณาเลือกสินค้าในตะกร้าก่อนสั่งซื้อ
              </p>
            )}

            <Link
              href="/products"
              className="mt-4 block text-center text-xs font-medium text-text-muted hover:text-primary transition-colors"
            >
              ← เลือกดูสินค้าอื่นเพิ่มเติม
            </Link>

            {/* Trust Reassurance บน Desktop */}
            <div className="mt-5 pt-4 border-t border-neutral-border/60 space-y-2 text-[11px] text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="size-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>สินค้ามาตรฐานเครื่องมือแพทย์ของแท้ 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="size-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>บริการจัดส่งและยกประกอบติดตั้งฟรีถึงบ้าน</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนสินค้าแนะนำสำหรับคุณ */}
      {recommendedSection}

      {/* Mobile Sticky Checkout Bar: สี Primary สอดคล้องกับแบรนด์ พร้อมป้ายส่งฟรีและ Safe-area Padding */}
      <div className="fixed bottom-0 inset-x-0 z-40 block lg:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200/90 px-4 py-2.5 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <label className="flex items-center gap-1.5 cursor-pointer select-none shrink-0 py-1">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => selectAllItems(e.target.checked)}
              className="size-4.5 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer accent-primary"
            />
            <span className="text-xs font-semibold text-zinc-700">ทั้งหมด</span>
          </label>

          <div className="min-w-0 text-right">
            <div className="flex items-center justify-end gap-1 text-[11px] font-medium text-emerald-600 leading-none">
              <svg className="size-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>ส่งฟรีถึงบ้าน</span>
            </div>
            <div className="flex items-baseline justify-end gap-1 mt-0.5">
              <span className="text-[11px] text-zinc-500">ยอดสุทธิ:</span>
              <span className="text-base font-bold text-primary truncate">
                {formatPrice(selectedTotalPrice)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={selectedTotalItems === 0}
            className={`h-11 rounded-full px-5 text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 ${
              selectedTotalItems > 0
                ? "bg-primary hover:bg-primary-hover active:scale-95 cursor-pointer shadow-primary/20"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            <span>สั่งสินค้า ({selectedTotalItems})</span>
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirmation Modal: บนมือถือเป็น Bottom Sheet เต็มความกว้างปิดบังด้านล่าง/จอเพื่อโฟกัสการตัดสินใจ ไม่รกสายตา, บน Desktop เป็น Modal กลางจอ */}
      {itemToDelete && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setItemToDelete(null)}
        >
          <div 
            className="w-full sm:max-w-[400px] rounded-t-3xl sm:rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-neutral-border animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            {/* Grab Handle bar บนมือถือ */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200 sm:hidden" />

            {/* Header สุภาพ ชัดเจน ไม่รกตา */}
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-4 ring-rose-50/50">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <div>
                <h3 id="delete-dialog-title" className="text-base sm:text-lg font-bold text-text-heading leading-tight">
                  นำสินค้าออกจากตะกร้า?
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  รายการนี้จะถูกนำออกจากคำสั่งซื้อปัจจุบัน
                </p>
              </div>
            </div>

            {/* กล่องแสดงชื่อสินค้าที่เลือก เรียบง่าย ชัดเจน */}
            <div className="my-4 rounded-2xl bg-neutral-surface border border-neutral-border/70 p-3.5">
              <p className="text-xs sm:text-sm font-semibold text-text-body line-clamp-2 leading-relaxed">
                {itemToDelete.name}
              </p>
            </div>

            {/* ปุ่มกด Action ชัดเจน เต็มความกว้างบนมือถือกดง่าย */}
            <div className="mt-5 grid grid-cols-2 gap-3 pb-2 sm:pb-0">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="w-full rounded-full border border-neutral-border bg-white py-3 text-center text-xs sm:text-sm font-semibold text-text-body hover:bg-neutral-surface active:scale-95 transition-all cursor-pointer"
              >
                เก็บไว้ก่อน
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full rounded-full bg-rose-600 py-3 text-center text-xs sm:text-sm font-semibold text-white hover:bg-rose-700 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                ยืนยันการนำออก
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
