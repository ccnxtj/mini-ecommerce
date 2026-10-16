"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ShopHeader from "@/components/shop-header";
import { useAuth } from "@/contexts/auth-context";
import { useOrders, type Order } from "@/contexts/order-context";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { products, formatPrice } from "@/data/products";

export default function OrdersPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  const handleReorder = async (order: Order) => {
    if (loadingOrderId) return;
    setLoadingOrderId(order.id);

    try {
      for (const item of order.items) {
        const prod = products.find((p) => p.id === item.id);
        addToCart(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: prod?.category || "สินค้าเพื่อสุขภาพ",
          },
          1
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 600));

      toast("เพิ่มสินค้าลงในตะกร้าเรียบร้อยแล้ว", "success");
      router.push("/cart");
    } catch {
      toast("เกิดข้อผิดพลาดในการสั่งซื้ออีกครั้ง", "error");
      setLoadingOrderId(null);
    }
  };

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login?redirect=/orders");
    }
  }, [user, isInitialized, router]);

  if (!isInitialized || !user) return null;

  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-12 sm:px-8 lg:px-10 bg-zinc-50/60">
        <Link href="/" className="text-sm font-semibold text-[#622576] hover:underline">← กลับไปหน้าแรก</Link>
        <h1 className="mt-5 text-3xl font-bold text-zinc-900">ประวัติการสั่งซื้อ</h1>

        <div className="mt-8 space-y-6">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-xs">
              <p className="text-lg text-zinc-500">คุณยังไม่มีประวัติการสั่งซื้อ</p>
              <Link href="/products" className="mt-6 inline-block rounded-lg bg-[#622576] px-6 py-3 font-semibold text-white hover:bg-[#58206c]">
                เริ่มช้อปเลย
              </Link>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 bg-zinc-50/80 px-6 py-4">
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div>
                      <p className="text-zinc-500">หมายเลขคำสั่งซื้อ</p>
                      <p className="font-bold text-zinc-900">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">วันที่สั่งซื้อ</p>
                      <p className="font-bold text-zinc-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">ยอดสุทธิ</p>
                      <p className="font-bold text-[#622576]">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold border ${order.status === "ชำระเงินแล้ว" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : order.status === "รอชำระเงินปลายทาง" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4">
                        <Link href={`/products/${item.id}`} className="shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                          <Image src={item.image} alt={item.name} width={80} height={80} className="h-16 w-16 object-cover sm:h-20 sm:w-20" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.id}`} className="block truncate font-bold text-[#40184f] hover:underline">
                            {item.name}
                          </Link>
                          <p className="text-sm text-[#69576e]">จำนวน: 1</p>
                        </div>
                        <p className="font-bold text-[#622576]">{formatPrice(item.price)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg border border-[#ebdfee] px-4 py-2 text-sm font-semibold text-[#40184f] hover:bg-[#f7f0f8] transition-colors"
                    >
                      ดูรายละเอียด
                    </button>
                    <button
                      type="button"
                      disabled={loadingOrderId === order.id}
                      onClick={() => handleReorder(order)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#622576] px-4 py-2 text-sm font-semibold text-white hover:bg-[#58206c] disabled:opacity-75 transition-all shadow-xs"
                    >
                      {loadingOrderId === order.id ? (
                        <>
                          <svg className="size-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          <span>กำลังโหลด...</span>
                        </>
                      ) : (
                        <>
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>สั่งซื้ออีกครั้ง</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal รายละเอียดคำสั่งซื้อ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-6 py-4">
              <h2 className="text-lg font-bold text-zinc-900">รายละเอียดคำสั่งซื้อ</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-black/5 hover:text-zinc-700"
              >
                ✕
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
              <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 text-sm">
                <p className="text-zinc-500">หมายเลขคำสั่งซื้อ: <span className="font-bold text-zinc-900">{selectedOrder.id}</span></p>
                <p className="text-zinc-500">วันที่สั่งซื้อ: <span className="font-bold text-zinc-900">{selectedOrder.date}</span></p>
                
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-zinc-500">สถานะการจัดส่ง:</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${selectedOrder.status === "ชำระเงินแล้ว" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : selectedOrder.status === "รอชำระเงินปลายทาง" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                {/* จำลอง Tracking */}
                <div className="mt-4 border-t border-zinc-200 pt-3 text-xs text-zinc-500">
                  <p className="font-bold text-zinc-900 mb-2">เส้นทางการจัดส่ง (Tracking)</p>
                  <ul className="relative border-l-2 border-emerald-500 pl-4 space-y-3 ml-2">
                    <li className="relative">
                      <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-emerald-500" />
                      <p className="font-semibold text-zinc-900">ผู้ส่งกำลังเตรียมพัสดุ</p>
                      <p>{selectedOrder.date} 10:30 น.</p>
                    </li>
                    <li className="relative opacity-50">
                      <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-gray-300" />
                      <p className="font-semibold text-zinc-900">บริษัทขนส่งเข้ารับพัสดุ</p>
                      <p>รอการอัปเดต</p>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="mb-3 font-bold text-zinc-900">รายการสินค้า ({selectedOrder.items.length} ชิ้น)</h3>
              <div className="space-y-3">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="h-12 w-12 rounded-lg border border-zinc-200 object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-bold text-zinc-900">{item.name}</p>
                      <p className="text-xs text-zinc-500">1 ชิ้น</p>
                    </div>
                    <p className="font-bold text-[#622576]">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-zinc-200 pt-4">
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm text-zinc-500">
                  <span>ค่าจัดส่ง</span>
                  <span>ฟรี</span>
                </div>
                <div className="mt-3 flex justify-between text-lg font-bold text-[#622576]">
                  <span>ยอดสุทธิ</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 rounded-xl border border-zinc-200 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    ปิด
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReorder(selectedOrder)}
                    disabled={loadingOrderId === selectedOrder.id}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#622576] py-2.5 text-sm font-semibold text-white hover:bg-[#58206c] disabled:opacity-75 transition-all shadow-xs"
                  >
                    {loadingOrderId === selectedOrder.id ? (
                      <>
                        <svg className="size-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>กำลังโหลด...</span>
                      </>
                    ) : (
                      <>
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>สั่งซื้ออีกครั้ง</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
