"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ShopHeader from "@/components/shop-header";
import { useAuth } from "@/contexts/auth-context";
import { useOrders, type Order } from "@/contexts/order-context";
import { formatPrice } from "@/data/products";

export default function OrdersPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login?redirect=/orders");
    }
  }, [user, isInitialized, router]);

  if (!isInitialized || !user) return null;

  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-12 sm:px-8 lg:px-10 bg-[#fcf9fc]">
        <Link href="/" className="text-sm font-semibold text-[#622576] hover:underline">← กลับไปหน้าแรก</Link>
        <h1 className="mt-5 text-3xl font-bold text-[#40184f]">ประวัติการสั่งซื้อ</h1>

        <div className="mt-8 space-y-6">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-[#ebdfee] bg-white p-12 text-center shadow-sm">
              <p className="text-lg text-[#69576e]">คุณยังไม่มีประวัติการสั่งซื้อ</p>
              <Link href="/products" className="mt-6 inline-block rounded-lg bg-[#622576] px-6 py-3 font-semibold text-white hover:bg-[#58206c]">
                เริ่มช้อปเลย
              </Link>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="overflow-hidden rounded-2xl border border-[#ebdfee] bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ebdfee] bg-[#fdfafb] px-6 py-4">
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div>
                      <p className="text-[#69576e]">หมายเลขคำสั่งซื้อ</p>
                      <p className="font-bold text-[#40184f]">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[#69576e]">วันที่สั่งซื้อ</p>
                      <p className="font-bold text-[#40184f]">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[#69576e]">ยอดสุทธิ</p>
                      <p className="font-bold text-[#622576]">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-200">
                    {order.status}
                  </span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4">
                        <Link href={`/products/${item.id}`} className="shrink-0 overflow-hidden rounded-xl border border-[#ebdfee] bg-[#f7f0f8]">
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
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg border border-[#ebdfee] px-4 py-2 text-sm font-semibold text-[#40184f] hover:bg-[#f7f0f8]"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="ml-3 rounded-lg bg-[#622576] px-4 py-2 text-sm font-semibold text-white hover:bg-[#58206c]">
                      สั่งซื้ออีกครั้ง
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
            <div className="flex items-center justify-between border-b border-[#ebdfee] bg-[#fcf9fc] px-6 py-4">
              <h2 className="text-lg font-bold text-[#40184f]">รายละเอียดคำสั่งซื้อ</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="grid size-8 place-items-center rounded-full text-[#69576e] hover:bg-black/5 hover:text-[#40184f]"
              >
                ✕
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
              <div className="mb-6 rounded-xl border border-[#ebdfee] bg-[#f7f0f8] p-4 text-sm">
                <p className="text-[#69576e]">หมายเลขคำสั่งซื้อ: <span className="font-bold text-[#40184f]">{selectedOrder.id}</span></p>
                <p className="text-[#69576e]">วันที่สั่งซื้อ: <span className="font-bold text-[#40184f]">{selectedOrder.date}</span></p>
                
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[#69576e]">สถานะการจัดส่ง:</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 border border-blue-200">
                    {selectedOrder.status}
                  </span>
                </div>
                {/* จำลอง Tracking */}
                <div className="mt-4 border-t border-[#ebdfee] pt-3 text-xs text-[#69576e]">
                  <p className="font-bold text-[#40184f] mb-2">เส้นทางการจัดส่ง (Tracking)</p>
                  <ul className="relative border-l-2 border-[#622576] pl-4 space-y-3 ml-2">
                    <li className="relative">
                      <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-[#622576]" />
                      <p className="font-semibold text-[#40184f]">ผู้ส่งกำลังเตรียมพัสดุ</p>
                      <p>{selectedOrder.date} 10:30 น.</p>
                    </li>
                    <li className="relative opacity-50">
                      <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-gray-300" />
                      <p className="font-semibold text-[#40184f]">บริษัทขนส่งเข้ารับพัสดุ</p>
                      <p>รอการอัปเดต</p>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="mb-3 font-bold text-[#40184f]">รายการสินค้า ({selectedOrder.items.length} ชิ้น)</h3>
              <div className="space-y-3">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border-b border-[#ebdfee] pb-3 last:border-0 last:pb-0">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="h-12 w-12 rounded-lg border border-[#ebdfee] object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-bold text-[#40184f]">{item.name}</p>
                      <p className="text-xs text-[#69576e]">1 ชิ้น</p>
                    </div>
                    <p className="font-bold text-[#622576]">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[#ebdfee] pt-4">
                <div className="flex justify-between text-sm text-[#69576e]">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm text-[#69576e]">
                  <span>ค่าจัดส่ง</span>
                  <span>ฟรี</span>
                </div>
                <div className="mt-3 flex justify-between text-lg font-bold text-[#622576]">
                  <span>ยอดสุทธิ</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
