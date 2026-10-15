"use client";

import { useMemo } from "react";
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
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleSelectItem,
    selectAllItems,
    removeSelectedFromCart,
    selectedItems,
    selectedTotalItems,
    selectedTotalPrice,
    isAllSelected,
  } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // สินค้าที่คุณอาจจะชอบ: เลือกสินค้าที่ยังไม่อยู่ในตะกร้า 4 รายการ
  const recommendedProducts = useMemo(() => {
    const unadded = products.filter((p) => !cart.some((item) => item.id === p.id));
    return (unadded.length >= 4 ? unadded : products).slice(0, 4);
  }, [cart]);

  const recommendedSection = (
    <section className="mt-16 pt-12 border-t border-zinc-200">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold tracking-widest text-[#622576] uppercase">
            RECOMMENDED FOR YOU
          </p>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-900">
            สินค้าที่คุณอาจจะชอบ
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500">
            เตียงผู้ป่วยไฟฟ้าและอุปกรณ์ดูแลสุขภาพยอดนิยม คัดสรรเพื่อคุณโดยเฉพาะ
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#622576] px-5 py-2 text-sm font-semibold text-[#622576] transition-colors hover:bg-[#622576] hover:text-white"
        >
          <span>ดูสินค้าทั้งหมด</span>
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );

  if (cart.length === 0) {
    return (
      <>
        <div className="mt-12 rounded-3xl border border-dashed border-zinc-200 bg-white py-16 px-6 text-center shadow-xs">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#622576]/10 text-[#622576] mb-4">
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-xl font-bold text-zinc-900">ตะกร้าของคุณยังว่างอยู่</p>
          <p className="mt-2 text-sm text-zinc-500 max-w-md mx-auto">
            ยังไม่มีสินค้าในตะกร้า เลือกดูเตียงผู้ป่วยไฟฟ้าและอุปกรณ์ดูแลสุขภาพของเราเพื่อเริ่มสั่งซื้อ
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#622576] px-7 py-3 text-sm font-bold text-white shadow-xs hover:bg-[#521e64] transition-colors"
          >
            <span>เลือกชมสินค้า</span>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] items-start">
      {/* ฝั่งซ้าย: รายการสินค้าพร้อม Checkbox เลือกรายการ */}
      <div className="space-y-4">
        {/* แถบเลือกสินค้าทั้งหมด (Select All) */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white px-5 py-3.5 shadow-2xs">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => selectAllItems(e.target.checked)}
              className="size-5 rounded border-zinc-300 text-[#622576] focus:ring-[#622576] cursor-pointer accent-[#622576]"
            />
            <span className="text-sm font-bold text-zinc-900">
              เลือกสินค้าทั้งหมด ({cart.length} รายการ)
            </span>
          </label>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            {selectedItems.length > 0 && (
              <button
                type="button"
                onClick={removeSelectedFromCart}
                className="text-zinc-500 hover:text-rose-600 transition-colors font-medium"
              >
                ลบที่เลือก ({selectedItems.length})
              </button>
            )}
            <button
              type="button"
              onClick={clearCart}
              className="text-zinc-400 hover:text-rose-600 transition-colors"
            >
              ล้างตะกร้า
            </button>
          </div>
        </div>

        {/* รายการสินค้าแต่ละชิ้น */}
        {cart.map((item) => {
          const isSelected = Boolean(item.selected);
          return (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 rounded-2xl border p-5 sm:p-6 transition-all ${
                isSelected
                  ? "border-[#622576]/50 bg-[#fbf6fc]/40 shadow-xs ring-1 ring-[#622576]/15"
                  : "border-zinc-200/90 bg-white shadow-2xs hover:border-zinc-300"
              }`}
            >
              {/* Checkbox เลือกสินค้านี้ */}
              <div className="shrink-0 flex items-center pt-1 sm:pt-0">
                <label className="flex items-center cursor-pointer p-1" title="ติ๊กเลือกสินค้านี้">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectItem(item.id)}
                    className="size-5 rounded border-zinc-300 text-[#622576] focus:ring-[#622576] cursor-pointer accent-[#622576]"
                  />
                  <span className="sr-only">เลือก {item.name}</span>
                </label>
              </div>

              {/* รูปสินค้าขนาดใหญ่และชัดเจน */}
              <Link href={`/products/${item.id}`} className="shrink-0 relative group">
                <div className="h-28 w-32 sm:h-36 sm:w-44 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={240}
                    height={180}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* รายละเอียดข้อมูลสินค้า */}
              <div className="flex flex-1 flex-col justify-between w-full min-w-0 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="inline-block rounded-md bg-[#622576]/10 px-2.5 py-0.5 text-xs font-semibold text-[#622576]">
                      {item.category}
                    </span>
                    <Link
                      href={`/products/${item.id}`}
                      className="mt-1.5 block text-base sm:text-lg font-bold text-zinc-900 hover:text-[#622576] transition-colors leading-snug truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-500">
                      ราคาต่อหน่วย: <span className="font-semibold text-zinc-800">{formatPrice(item.price)}</span>
                    </p>
                  </div>

                  {/* ปุ่มนำออก */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    title="นำสินค้าออกจากตะกร้า"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline">นำออก</span>
                  </button>
                </div>

                {/* ส่วนควบคุมจำนวนและราคารวมรายชิ้น */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs sm:text-sm text-zinc-500 font-medium">จำนวน:</span>
                    <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1 shadow-2xs">
                      <button
                        type="button"
                        aria-label="ลดจำนวน"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-8 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-2xs hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 transition-all"
                      >
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="min-w-[2.5rem] text-center text-sm sm:text-base font-bold text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="เพิ่มจำนวน"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-8 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-2xs hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 transition-all"
                      >
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block text-xs text-zinc-400">ราคารวม</span>
                    <span className="text-lg sm:text-2xl font-bold text-[#622576]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ฝั่งขวา: สรุปคำสั่งซื้อ (Sticky Sidebar คำนวณเฉพาะสินค้าที่เลือก) */}
      <div className="lg:sticky lg:top-8">
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-900 pb-3 border-b border-zinc-100">
            สรุปคำสั่งซื้อ
          </h2>

          <div className="mt-4 space-y-3 text-sm text-zinc-600">
            <div className="flex justify-between">
              <span>เลือกสินค้าแล้ว</span>
              <span className="font-semibold text-zinc-900">{selectedTotalItems} ชิ้น</span>
            </div>
            <div className="flex justify-between">
              <span>ยอดรวมสินค้าที่เลือก</span>
              <span className="font-semibold text-zinc-900">{formatPrice(selectedTotalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>ค่าจัดส่ง</span>
              <span className="font-semibold text-emerald-600">ฟรีทั่วไทย</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>บริการยกขึ้นบ้านและติดตั้ง</span>
              <span className="text-emerald-600 font-medium">รวมในบริการ</span>
            </div>
          </div>

          <div className="mt-5 border-t border-zinc-200 pt-4 flex items-baseline justify-between font-bold text-zinc-900">
            <span className="text-base">ยอดชำระสุทธิ</span>
            <span className="text-2xl font-extrabold text-[#622576]">
              {formatPrice(selectedTotalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={selectedTotalItems === 0}
            className={`mt-6 w-full rounded-full py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all flex items-center justify-center gap-2 ${
              selectedTotalItems > 0
                ? "bg-[#622576] hover:bg-[#521e64] active:scale-[0.99]"
                : "bg-zinc-300 cursor-not-allowed"
            }`}
          >
            <span>ดำเนินการสั่งซื้อ ({selectedTotalItems} ชิ้น)</span>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {selectedTotalItems === 0 && (
            <p className="mt-2 text-center text-xs text-amber-600">
              * กรุณาติ๊กเลือกสินค้าที่ต้องการชำระเงินอย่างน้อย 1 ชิ้น
            </p>
          )}

          <Link
            href="/products"
            className="mt-4 block text-center text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            ← เลือกดูสินค้าอื่นเพิ่มเติม
          </Link>

          {/* Trust Guarantees */}
          <div className="mt-6 pt-5 border-t border-zinc-100 space-y-2 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <svg className="size-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>สินค้าของแท้ 100% มีใบรับประกันศูนย์</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="size-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>มีทีมช่างผู้เชี่ยวชาญบริการหลังการขาย</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {recommendedSection}
  </>
  );
}
