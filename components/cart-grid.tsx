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
    toast(`นำ "${itemToDelete.name}" ออกจากตะกร้าแล้ว`, "info");
    setItemToDelete(null);
  };

  // สินค้าที่คุณอาจจะชอบ: เลือกสินค้าที่ยังไม่อยู่ในตะกร้า 4 รายการ
  const recommendedProducts = useMemo(() => {
    const unadded = products.filter((p) => !cart.some((item) => item.id === p.id));
    return (unadded.length >= 4 ? unadded : products).slice(0, 4);
  }, [cart]);

  const recommendedSection = (
    <section className="mt-6 sm:mt-12 pt-6 sm:pt-8 border-t border-[#622576]/10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base sm:text-xl font-bold text-[#40184f]">
            สินค้าที่คุณอาจจะชอบ
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500">
            เตียงผู้ป่วยไฟฟ้าและอุปกรณ์ดูแลสุขภาพยอดนิยม
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#622576] hover:text-[#521e64] transition-colors"
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

  if (cart.length === 0) {
    return (
      <>
        <div className="mt-3 sm:mt-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#fbf7fc] via-[#fdfbfe] to-white border border-[#622576]/10 py-6 sm:py-9 px-4 sm:px-6 text-center shadow-xs">
          <div className="mx-auto flex size-12 sm:size-14 items-center justify-center rounded-full bg-white text-[#622576] mb-3 shadow-2xs ring-4 ring-[#622576]/5">
            <svg className="size-6 sm:size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.669 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="text-base sm:text-lg font-bold text-[#40184f] tracking-tight">ตะกร้าของคุณยังว่างอยู่</p>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
            เลือกดูสินค้าที่คุณสนใจ แล้วเพิ่มลงในตะกร้าเพื่อเริ่มสั่งซื้อได้เลย
          </p>
          <Link
            href="/products"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#622576] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#521e64] hover:shadow-sm active:scale-95 transition-all"
          >
            <span>เลือกซื้อสินค้า</span>
            <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] items-start pb-24 lg:pb-0">
        {/* ฝั่งซ้าย: รายการสินค้าพร้อม Checkbox เลือกรายการ */}
        <div className="space-y-3">
          {/* แถบเลือกสินค้าทั้งหมด (Select All) */}
          <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-2xs">
            <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => selectAllItems(e.target.checked)}
                className="size-4.5 rounded border-zinc-300 text-[#622576] focus:ring-[#622576] cursor-pointer accent-[#622576]"
              />
              <span className="text-xs sm:text-sm font-semibold text-zinc-800">
                เลือกสินค้าทั้งหมด ({cart.length})
              </span>
            </label>

            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-zinc-400 hover:text-rose-600 transition-colors"
            >
              ล้างตะกร้า
            </button>
          </div>

          {/* รายการสินค้าแต่ละชิ้น (จัดระเบียบ layout ให้ไม่เบียดกันบนมือถือ) */}
          {cart.map((item) => {
            const isSelected = Boolean(item.selected);
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 sm:gap-4 rounded-xl border p-3.5 sm:p-5 transition-all ${
                  isSelected
                    ? "border-[#622576]/30 bg-[#fbf6fc]/30 shadow-2xs"
                    : "border-zinc-200/80 bg-white shadow-2xs hover:border-zinc-300"
                }`}
              >
                {/* Checkbox เลือกสินค้านี้ */}
                <div className="shrink-0 pt-0.5 sm:pt-1">
                  <label className="flex items-center cursor-pointer p-0.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="size-4.5 rounded border-zinc-300 text-[#622576] focus:ring-[#622576] cursor-pointer accent-[#622576]"
                    />
                    <span className="sr-only">เลือก {item.name}</span>
                  </label>
                </div>

                {/* รูปสินค้า */}
                <Link href={`/products/${item.id}`} className="shrink-0 relative group">
                  <div className="size-20 sm:size-24 rounded-lg overflow-hidden border border-zinc-150 bg-zinc-50 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* ข้อมูลสินค้า */}
                <div className="flex flex-1 flex-col justify-between min-w-0 sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="min-w-0 flex-1">
                    {/* บนมือถือ: ชื่อสินค้าอยู่ซ้าย ปุ่มลบอยู่ขวา (ไม่เบียดปุ่มจำนวนด้านล่าง) */}
                    <div className="flex items-start justify-between gap-1.5 sm:block">
                      <Link
                        href={`/products/${item.id}`}
                        className="block text-xs sm:text-base font-semibold text-zinc-800 hover:text-[#622576] transition-colors leading-snug line-clamp-2 sm:truncate"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setItemToDelete({ id: item.id, name: item.name })}
                        className="p-1 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors sm:hidden shrink-0"
                        title="ลบออกจากตะกร้า"
                        aria-label="ลบออกจากตะกร้า"
                      >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-1 text-sm font-bold text-zinc-900 hidden sm:block">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* ปุ่มจำนวนและราคา: บนมือถือจัดเรียงฝั่งซ้าย-ขวา ชัดเจน ไม่ชนกัน */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-1 sm:pt-0">
                    {/* ราคารวมบนมือถือ (อยู่ฝั่งซ้าย) */}
                    <div className="sm:hidden min-w-0">
                      <span className="text-sm font-bold text-[#622576] block leading-tight">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-zinc-400 block mt-0.5">
                          ({formatPrice(item.price)}/ชิ้น)
                        </span>
                      )}
                    </div>

                    {/* ปุ่มปรับจำนวน */}
                    <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 shadow-2xs">
                      <button
                        type="button"
                        aria-label="ลดจำนวน"
                        onClick={() => handleDecrease(item)}
                        className="flex size-7 items-center justify-center rounded-md bg-white text-zinc-600 shadow-2xs hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 transition-all"
                      >
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="min-w-[1.75rem] sm:min-w-[2rem] text-center text-xs sm:text-sm font-semibold text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="เพิ่มจำนวน"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-7 items-center justify-center rounded-md bg-white text-zinc-600 shadow-2xs hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 transition-all"
                      >
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                        </svg>
                      </button>
                    </div>

                    {/* ราคารวมบน Desktop */}
                    <div className="hidden sm:block text-right min-w-[5rem]">
                      <span className="text-sm sm:text-base font-bold text-[#622576]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* ปุ่มนำออกบน Desktop */}
                    <button
                      type="button"
                      onClick={() => setItemToDelete({ id: item.id, name: item.name })}
                      className="hidden sm:block p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
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
        </div>

        {/* ฝั่งขวา: สรุปคำสั่งซื้อ (Sticky Sidebar) */}
        <div className="lg:sticky lg:top-8">
          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs">
            <h2 className="text-base font-bold text-zinc-900 pb-3 border-b border-zinc-100">
              สรุปคำสั่งซื้อ
            </h2>

            <div className="mt-4 space-y-2.5 text-sm text-zinc-600">
              <div className="flex justify-between">
                <span>สินค้าที่เลือก ({selectedTotalItems} ชิ้น)</span>
                <span className="font-semibold text-zinc-900">{formatPrice(selectedTotalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง</span>
                <span className="font-semibold text-emerald-600">ฟรี</span>
              </div>
            </div>

            <div className="mt-4 border-t border-zinc-100 pt-4 flex items-baseline justify-between">
              <span className="text-sm font-semibold text-zinc-900">ยอดชำระสุทธิ</span>
              <span className="text-xl font-bold text-[#622576]">
                {formatPrice(selectedTotalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={selectedTotalItems === 0}
              className={`mt-5 w-full rounded-full py-3 text-sm font-bold text-white shadow-xs transition-all flex items-center justify-center gap-2 ${
                selectedTotalItems > 0
                  ? "bg-[#622576] hover:bg-[#521e64] active:scale-[0.99]"
                  : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
              }`}
            >
              <span>ดำเนินการสั่งซื้อ ({selectedTotalItems})</span>
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {selectedTotalItems === 0 && (
              <p className="mt-2.5 text-center text-xs text-zinc-400">
                กรุณาเลือกสินค้าในตะกร้าก่อนสั่งซื้อ
              </p>
            )}

            <Link
              href="/products"
              className="mt-4 block text-center text-xs font-medium text-zinc-400 hover:text-[#622576] transition-colors"
            >
              ← เลือกดูสินค้าอื่นเพิ่มเติม
            </Link>

            {/* Trust Guarantees */}
            <div className="mt-5 pt-4 border-t border-zinc-100 space-y-1.5 text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <svg className="size-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>สินค้าของแท้ 100% พร้อมใบรับประกัน</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="size-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>บริการติดตั้งและดูแลหลังการขาย</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {recommendedSection}

      {/* Mobile Sticky Checkout Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 block lg:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200/90 px-4 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <label className="flex items-center gap-1.5 cursor-pointer select-none shrink-0">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => selectAllItems(e.target.checked)}
              className="size-4 rounded border-zinc-300 text-[#622576] focus:ring-[#622576] cursor-pointer accent-[#622576]"
            />
            <span className="text-xs font-semibold text-zinc-700">ทั้งหมด</span>
          </label>

          <div className="min-w-0 text-right">
            <span className="text-[10px] text-zinc-400 block leading-none">ยอดชำระสุทธิ</span>
            <span className="text-base font-bold text-[#622576] block leading-tight mt-0.5 truncate">
              {formatPrice(selectedTotalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={selectedTotalItems === 0}
            className={`h-10 rounded-full px-5 text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 ${
              selectedTotalItems > 0
                ? "bg-[#622576] hover:bg-[#521e64] active:scale-95"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            <span>สั่งสินค้า ({selectedTotalItems})</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal สไตล์ Shopee โทนสีม่วง */}
      {itemToDelete && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs"
          onClick={() => setItemToDelete(null)}
        >
          <div 
            className="w-full max-w-[420px] rounded-lg bg-white p-6 sm:p-7 shadow-2xl border border-zinc-200/80"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <h3 id="delete-dialog-title" className="text-lg sm:text-xl font-semibold text-[#622576]">
              คุณแน่ใจว่าต้องการลบหรือไม่?
            </h3>
            <p className="mt-4 text-sm text-zinc-700 leading-relaxed line-clamp-3">
              {itemToDelete.name}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full rounded bg-[#622576] py-2.5 text-center text-sm font-medium text-white hover:bg-[#521e64] transition-colors shadow-2xs"
              >
                ใช่
              </button>
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="w-full rounded border border-zinc-200 bg-white py-2.5 text-center text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                ไม่
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
