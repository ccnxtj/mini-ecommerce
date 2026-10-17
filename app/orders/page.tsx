/* Hallmark · genre: modern-minimal · macrostructure: workbench · design-system: design.md · designed-as-app
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 * mobile: pass (34, 49, 50, 51, 52, 53)
 * layout: focused single-column orders list (clean, uncluttered)
 */
"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [statusFilter, setStatusFilter] = useState<string>("ทั้งหมด");

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login?redirect=/orders");
    }
  }, [user, isInitialized, router]);

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
          item.quantity || 1,
          true
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

  // กรองรายการคำสั่งซื้อตามสถานะ
  const filteredOrders = useMemo(() => {
    if (statusFilter === "ทั้งหมด") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  if (!isInitialized || !user) {
    return (
      <>
        <ShopHeader />
        <main className="min-h-[70vh] bg-neutral-bg flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-zinc-500 font-medium">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <ShopHeader />

      <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-5 sm:px-6 sm:py-8 overflow-x-clip selection:bg-primary/20 selection:text-primary">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800 transition-colors">
            หน้าแรก
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-zinc-900">ประวัติการสั่งซื้อ</span>
        </nav>

        {/* Page Heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-heading">
              ประวัติการสั่งซื้อ
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-text-muted">
              {orders.length > 0 ? `พบทั้งหมด ${orders.length} รายการคำสั่งซื้อ` : "รายการคำสั่งซื้อของคุณ"}
            </p>
          </div>

          {/* ฟิลเตอร์สถานะแบบเม็ดยาเรียบง่าย */}
          {orders.length > 0 && (
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto no-scrollbar rounded-full border border-neutral-border bg-white p-1 shadow-2xs">
              {["ทั้งหมด", "ชำระเงินแล้ว", "รอชำระเงินปลายทาง"].map((tab) => {
                const isActive = statusFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStatusFilter(tab)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-2xs"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-neutral-surface"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Area */}
        {orders.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl sm:rounded-3xl bg-neutral-surface border border-neutral-border py-12 px-4 sm:px-6 text-center shadow-xs">
            <div className="mx-auto flex size-14 sm:size-16 items-center justify-center rounded-full bg-white text-primary mb-3.5 shadow-2xs ring-4 ring-primary/5">
              <svg className="size-7 sm:size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-text-heading tracking-tight">คุณยังไม่มีประวัติการสั่งซื้อ</h2>
            <p className="mt-1 text-xs sm:text-sm text-text-muted max-w-xs sm:max-w-sm mx-auto leading-relaxed">
              เมื่อคุณทำการสั่งซื้อสินค้า รายการคำสั่งซื้อและสถานะการจัดส่งจะปรากฏที่หน้านี้
            </p>
            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-hover hover:shadow-sm active:scale-95 transition-all"
            >
              <span>เลือกซื้อสินค้า</span>
              <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-neutral-border bg-white p-8 text-center shadow-xs">
                <p className="text-sm text-text-muted">ไม่พบคำสั่งซื้อในสถานะ &quot;{statusFilter}&quot;</p>
                <button
                  type="button"
                  onClick={() => setStatusFilter("ทั้งหมด")}
                  className="mt-3 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  ดูคำสั่งซื้อทั้งหมด
                </button>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const totalQty = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-neutral-border bg-white shadow-2xs overflow-hidden transition-all duration-200 hover:border-zinc-300"
                  >
                    {/* Header ของแต่ละคำสั่งซื้อ */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-neutral-border/60 bg-neutral-surface/60 px-4 py-3 sm:px-5">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        <div>
                          <span className="text-text-muted">หมายเลข: </span>
                          <span className="font-bold text-text-heading">{order.id}</span>
                        </div>
                        <span className="text-zinc-300 hidden sm:inline">•</span>
                        <div className="text-text-muted">
                          {order.date}
                        </div>
                      </div>

                      {/* ป้ายสถานะ */}
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                          order.status === "ชำระเงินแล้ว"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/10"
                            : order.status === "รอชำระเงินปลายทาง"
                            ? "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/10"
                            : "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/10"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* รายการสินค้า */}
                    <div className="p-4 sm:p-5 divide-y divide-neutral-border/50">
                      {order.items.map((item) => (
                        <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3.5 sm:gap-4">
                          <Link href={`/products/${item.id}`} className="shrink-0 relative group">
                            <div className="size-16 sm:size-18 rounded-xl overflow-hidden border border-neutral-border/70 bg-neutral-surface/60 flex items-center justify-center p-1">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.id}`}
                              className="block text-xs sm:text-sm font-semibold text-text-heading hover:text-primary transition-colors line-clamp-2 leading-snug"
                            >
                              {item.name}
                            </Link>
                            <div className="mt-1 flex items-center justify-between text-xs text-text-muted">
                              <span>จำนวน: {item.quantity || 1} ชิ้น</span>
                              <span className="sm:hidden font-bold text-text-heading">
                                {formatPrice(item.price * (item.quantity || 1))}
                              </span>
                            </div>
                          </div>

                          <div className="hidden sm:block text-right shrink-0">
                            <span className="text-sm font-bold text-text-heading">
                              {formatPrice(item.price * (item.quantity || 1))}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ส่วนสรุปท้ายการ์ดคำสั่งซื้อ */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-border/60 bg-white px-4 py-3 sm:px-5">
                      <div className="text-xs sm:text-sm">
                        <span className="text-text-muted">รวม {totalQty} ชิ้น: </span>
                        <span className="text-sm sm:text-base font-bold text-text-heading">
                          {formatPrice(order.total)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-full border border-neutral-border bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-text-heading hover:bg-neutral-surface shadow-2xs transition-colors cursor-pointer"
                        >
                          ดูรายละเอียด
                        </button>

                        <button
                          type="button"
                          disabled={loadingOrderId === order.id}
                          onClick={() => handleReorder(order)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-hover active:scale-95 disabled:opacity-75 transition-all cursor-pointer"
                        >
                          {loadingOrderId === order.id ? (
                            <>
                              <div className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              <span>กำลังโหลด...</span>
                            </>
                          ) : (
                            <>
                              <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                              </svg>
                              <span>สั่งซื้ออีกครั้ง</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {/* Modal รายละเอียดคำสั่งซื้อ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl border border-neutral-border animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-border/60 bg-neutral-surface/60 px-5 sm:px-6 py-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-text-heading">รายละเอียดคำสั่งซื้อ</h2>
                <p className="text-xs text-text-muted">หมายเลข: {selectedOrder.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 transition-colors cursor-pointer"
                aria-label="ปิดหน้าต่าง"
              >
                <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[72vh] overflow-y-auto px-5 sm:px-6 py-4 space-y-5">
              {/* สรุปสถานะ */}
              <div className="rounded-xl border border-neutral-border/80 bg-neutral-surface/50 p-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">วันที่สั่งซื้อ:</span>
                  <span className="font-medium text-text-heading">{selectedOrder.date}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-text-muted">สถานะ:</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                      selectedOrder.status === "ชำระเงินแล้ว"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : selectedOrder.status === "รอชำระเงินปลายทาง"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>

                {/* ข้อมูลผู้รับพัสดุ */}
                {(selectedOrder.recipientName || selectedOrder.phone || selectedOrder.address) && (
                  <div className="mt-3 border-t border-neutral-border/60 pt-3 text-xs space-y-1">
                    <p className="font-bold text-text-heading">ข้อมูลผู้รับและที่อยู่จัดส่ง</p>
                    {selectedOrder.recipientName && (
                      <p className="text-text-body font-medium">{selectedOrder.recipientName} {selectedOrder.phone ? `(${selectedOrder.phone})` : ""}</p>
                    )}
                    {selectedOrder.address && (
                      <p className="text-text-muted leading-relaxed break-words">{selectedOrder.address}</p>
                    )}
                  </div>
                )}

                {/* Timeline การจัดส่ง */}
                <div className="mt-4 border-t border-neutral-border/60 pt-3 text-xs">
                  <p className="font-bold text-text-heading mb-2.5">สถานะการจัดส่ง (Tracking)</p>
                  <ul className="relative border-l-2 border-emerald-500 pl-4 space-y-3.5 ml-1.5">
                    <li className="relative">
                      <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                      <p className="font-semibold text-text-heading">ผู้ส่งกำลังเตรียมพัสดุ</p>
                      <p className="text-[11px] text-text-muted">{selectedOrder.date} • ระบบยืนยันคำสั่งซื้อเรียบร้อย</p>
                    </li>
                    <li className="relative opacity-60">
                      <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-zinc-300" />
                      <p className="font-semibold text-text-heading">บริษัทขนส่งเข้ารับพัสดุ</p>
                      <p className="text-[11px] text-text-muted">รอการเข้ารับพัสดุ</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* รายการสินค้า */}
              <div>
                <h3 className="mb-2.5 text-xs sm:text-sm font-bold text-text-heading">
                  รายการสินค้า ({selectedOrder.items.reduce((sum, item) => sum + (item.quantity || 1), 0)} ชิ้น)
                </h3>
                <div className="space-y-2.5">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl border border-neutral-border/70 p-2.5 bg-white"
                    >
                      <div className="size-12 rounded-lg overflow-hidden border border-neutral-border/70 bg-neutral-surface/60 shrink-0 p-0.5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs sm:text-sm font-semibold text-text-heading">{item.name}</p>
                        <p className="text-[11px] text-text-muted">{item.quantity || 1} ชิ้น × {formatPrice(item.price)}</p>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-text-heading shrink-0">
                        {formatPrice(item.price * (item.quantity || 1))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ยอดรวมสุทธิ */}
              <div className="border-t border-neutral-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>ค่าจัดส่งและติดตั้ง</span>
                  <span className="font-medium text-emerald-600">ฟรี</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-border/60 text-sm sm:text-base font-bold text-text-heading">
                  <span>ยอดสุทธิ</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-2.5 border-t border-neutral-border/60 bg-neutral-surface/40 p-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex-1 rounded-full border border-neutral-border py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-neutral-surface transition-colors cursor-pointer"
              >
                ปิด
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetOrder = selectedOrder;
                  setSelectedOrder(null);
                  handleReorder(targetOrder);
                }}
                disabled={loadingOrderId === selectedOrder.id}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-primary-hover active:scale-95 disabled:opacity-75 transition-all shadow-xs cursor-pointer"
              >
                {loadingOrderId === selectedOrder.id ? (
                  <>
                    <div className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>กำลังโหลด...</span>
                  </>
                ) : (
                  <>
                    <svg className="size-3.5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span>สั่งซื้ออีกครั้ง</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
