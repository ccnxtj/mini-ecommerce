/* Hallmark · genre: modern-minimal · macrostructure: workbench · design-system: design.md · designed-as-app
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 * mobile: pass (34, 49, 50, 51, 52, 53)
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/contexts/toast-context";

export default function AddressPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const { toast } = useToast();

  const [recipientName, setRecipientName] = useState("");
  const [address, setAddress] = useState("123/45 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110");
  const [phone, setPhone] = useState("081-234-5678");
  const [isSaving, setIsSaving] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setRedirectUrl(params.get("redirect"));
    }
  }, []);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login?redirect=/address");
    }
  }, [user, isInitialized, router]);

  useEffect(() => {
    if (user) {
      const savedName = localStorage.getItem(`recipient_name_${user.email}`) || user.name || "";
      const savedAddress = localStorage.getItem(`address_${user.email}`);
      const savedPhone = localStorage.getItem(`phone_${user.email}`);
      setRecipientName(savedName);
      if (savedAddress) setAddress(savedAddress);
      if (savedPhone) setPhone(savedPhone);
    }
  }, [user]);

  if (!isInitialized || !user) {
    return (
      <>
        <ShopHeader />
        <main className="min-h-[70vh] bg-neutral-bg flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-zinc-500 font-medium">กำลังโหลดข้อมูลผู้ใช้...</p>
          </div>
        </main>
      </>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // จำลองการบันทึกข้อมูล
    await new Promise((resolve) => setTimeout(resolve, 600));

    localStorage.setItem(`recipient_name_${user.email}`, recipientName);
    localStorage.setItem(`address_${user.email}`, address);
    localStorage.setItem(`phone_${user.email}`, phone);

    setIsSaving(false);
    toast("บันทึกที่อยู่จัดส่งเรียบร้อยแล้ว", "success");

    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };

  return (
    <>
      <ShopHeader />

      <main className="min-h-[80vh] bg-neutral-bg text-zinc-900 pb-20 pt-6 sm:pt-10 overflow-x-clip selection:bg-primary/20 selection:text-primary">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
            <Link
              href={redirectUrl || "/"}
              className="inline-flex items-center gap-1.5 font-medium text-zinc-600 hover:text-primary transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            >
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>{redirectUrl ? "กลับไปขั้นตอนก่อนหน้า" : "กลับไปหน้าหลัก"}</span>
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 font-medium truncate">จัดการที่อยู่จัดส่ง</span>
          </nav>

          {/* Page Heading */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                  จัดการที่อยู่จัดส่ง
                </h1>
                <p className="mt-0.5 text-xs sm:text-sm text-zinc-500">
                  ข้อมูลนี้จะถูกใช้เป็นที่อยู่เริ่มต้นสำหรับการจัดส่งคำสั่งซื้อของคุณ
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-8 shadow-xs ring-1 ring-zinc-200/70">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Receiver Profile Block / Recipient Full Name */}
              <div>
                <label htmlFor="recipientName" className="block text-xs sm:text-sm font-semibold text-zinc-900">
                  ชื่อ-นามสกุล ผู้รับพัสดุ <span className="text-rose-500">*</span>
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                    <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="recipientName"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    placeholder="เช่น สมชาย ใจดี"
                    className="w-full min-h-[46px] rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">
                  ระบุชื่อและนามสกุลของผู้รับสินค้า เพื่อความถูกต้องในการจัดส่งและออกเอกสาร
                </p>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-zinc-900">
                  เบอร์โทรศัพท์สำหรับติดต่อ <span className="text-rose-500">*</span>
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                    <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="เช่น 081-234-5678"
                    className="w-full min-h-[46px] rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">
                  เจ้าหน้าที่จัดส่งจะติดต่อเบอร์นี้ก่อนนำส่งสินค้า
                </p>
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-zinc-900">
                  ที่อยู่จัดส่งโดยละเอียด <span className="text-rose-500">*</span>
                </label>
                <div className="relative mt-2">
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={4}
                    placeholder="บ้านเลขที่, อาคาร/หมู่บ้าน, ซอย, ถนน, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, รหัสไปรษณีย์"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                  />
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">
                  กรณีเป็นเตียงผู้ป่วยหรือสินค้าขนาดใหญ่ แนะนำระบุชั้น หรือรายละเอียดจุดสังเกตเพิ่มเติม
                </p>
              </div>

              {/* Trust & Guarantee Banner */}
              <div className="flex items-start gap-3 rounded-xl bg-primary/5 p-3.5 ring-1 ring-primary/10">
                <svg className="size-5 shrink-0 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div className="text-xs leading-relaxed text-zinc-600">
                  <span className="font-semibold text-zinc-900">ความปลอดภัยของข้อมูล:</span> ข้อมูลที่อยู่ของคุณได้รับการปกป้องและใช้สำหรับการจัดส่งสินค้าและบริการดูแลหลังการขายของ ALLWELL เท่านั้น
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-hover active:scale-[0.99] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {isSaving ? (
                    <>
                      <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>กำลังบันทึกข้อมูล...</span>
                    </>
                  ) : (
                    <>
                      <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>บันทึกที่อยู่จัดส่ง</span>
                    </>
                  )}
                </button>

                {redirectUrl && (
                  <button
                    type="button"
                    onClick={() => router.push(redirectUrl)}
                    className="mt-3 flex w-full min-h-[44px] items-center justify-center rounded-xl bg-transparent py-2.5 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                  >
                    ยกเลิกและย้อนกลับ
                  </button>
                )}
              </div>
            </form>
          </div>

        </div>
      </main>
    </>
  );
}
