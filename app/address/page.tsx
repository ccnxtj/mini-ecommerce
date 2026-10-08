"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import { useAuth } from "@/contexts/auth-context";

export default function AddressPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  
  const [address, setAddress] = useState("123/45 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110");
  const [phone, setPhone] = useState("081-234-5678");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login?redirect=/address");
    }
  }, [user, isInitialized, router]);

  useEffect(() => {
    if (user) {
      const savedAddress = localStorage.getItem(`address_${user.email}`);
      const savedPhone = localStorage.getItem(`phone_${user.email}`);
      if (savedAddress) setAddress(savedAddress);
      if (savedPhone) setPhone(savedPhone);
    }
  }, [user]);

  if (!isInitialized || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // จำลองการโหลด
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.setItem(`address_${user.email}`, address);
    localStorage.setItem(`phone_${user.email}`, phone);
    
    setIsSaving(false);
    alert("บันทึกที่อยู่เรียบร้อยแล้ว");
    
    // หากกดมาจากหน้า checkout ก็สามารถเด้งกลับไปได้เลย (Optionally)
    // แต่เพื่อความง่าย เราจะให้ผู้ใช้กดกลับเอง หรือเปลี่ยนทางตามความเหมาะสม
    const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };

  return (
    <>
      <ShopHeader />
      <main className="mx-auto min-h-[60vh] max-w-2xl px-5 py-12 sm:px-8 lg:px-10 bg-[#fcf9fc]">
        <Link href="/" className="text-sm font-semibold text-[#622576] hover:underline">← กลับไปหน้าแรก</Link>
        <h1 className="mt-5 text-3xl font-bold text-[#40184f]">จัดการที่อยู่จัดส่ง</h1>

        <div className="mt-8 rounded-2xl border border-[#ebdfee] bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#40184f]">ชื่อผู้รับ</label>
              <input 
                type="text" 
                id="name" 
                value={user.name}
                disabled
                className="mt-2 w-full rounded-xl border border-[#ebdfee] bg-zinc-100 px-4 py-3 text-sm text-zinc-500 outline-none" 
              />
              <p className="mt-1 text-xs text-[#69576e]">ชื่อผู้รับจะใช้ชื่อบัญชีของคุณ</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-[#40184f]">เบอร์โทรศัพท์</label>
              <input 
                type="tel" 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-[#ebdfee] bg-[#f7f0f8] px-4 py-3 text-sm outline-none focus:border-[#622576] focus:bg-white focus:ring-1 focus:ring-[#622576]" 
                placeholder="เช่น 081-234-5678"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-[#40184f]">ที่อยู่จัดส่งโดยละเอียด</label>
              <textarea 
                id="address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={4}
                className="mt-2 w-full rounded-xl border border-[#ebdfee] bg-[#f7f0f8] px-4 py-3 text-sm outline-none focus:border-[#622576] focus:bg-white focus:ring-1 focus:ring-[#622576]" 
                placeholder="บ้านเลขที่ หมู่ ซอย ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSaving}
              className="mt-4 w-full rounded-full bg-[#622576] py-3.5 font-bold text-white transition-colors hover:bg-[#58206c] disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  กำลังบันทึก...
                </>
              ) : "บันทึกที่อยู่"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
