"use client";
import { useState } from "react";

import Link from "next/link";
import ShopHeader from "@/components/shop-header";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // จำลองการโหลดแบบสมจริง (1.5 วินาที)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    login({ name: "User", email: "user@example.com", picture: "" });
    const redirectUrl = new URLSearchParams(window.location.search).get("redirect") || "/";
    router.push(redirectUrl);
  };

  return (
    <>
      <ShopHeader />
      <main className="flex min-h-[70vh] items-center justify-center bg-[#fcf9fc] px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-[#ebdfee] bg-white p-8 shadow-sm sm:p-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#40184f]">เข้าสู่ระบบ</h1>
            <p className="mt-2 text-sm text-[#69576e]">เข้าสู่ระบบเพื่อจัดการคำสั่งซื้อและบัญชีของคุณ</p>
          </div>
          
          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#40184f]">อีเมล</label>
              <input 
                type="email" 
                id="email" 
                className="mt-2 w-full rounded-xl border border-[#ebdfee] bg-[#f7f0f8] px-4 py-3 text-sm outline-none focus:border-[#622576] focus:bg-white focus:ring-1 focus:ring-[#622576]" 
                placeholder="your@email.com" 
                required 
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-[#40184f]">รหัสผ่าน</label>
                <a href="#" className="text-xs font-semibold text-[#622576] hover:underline" onClick={(e) => e.preventDefault()}>ลืมรหัสผ่าน?</a>
              </div>
              <input 
                type="password" 
                id="password" 
                className="mt-2 w-full rounded-xl border border-[#ebdfee] bg-[#f7f0f8] px-4 py-3 text-sm outline-none focus:border-[#622576] focus:bg-white focus:ring-1 focus:ring-[#622576]" 
                placeholder="••••••••" 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="mt-6 w-full rounded-full bg-[#622576] py-3.5 font-bold text-white transition-colors hover:bg-[#58206c]"
            >
              เข้าสู่ระบบ
            </button>
          </form>
          
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#ebdfee]" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-4 text-[#69576e]">หรือ</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleOAuthProvider clientId="6177964784-k3pbpfku7umu4mlfpvqef4r4jdor2j2l.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    setIsLoading(true);
                    
                    // จำลองการประมวลผล (1 วินาที) ให้ดูสมจริง
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const decoded = jwtDecode<{ name: string; email: string; picture: string }>(
                      credentialResponse.credential
                    );
                    login({
                      name: decoded.name,
                      email: decoded.email,
                      picture: decoded.picture,
                    });
                    const redirectUrl = new URLSearchParams(window.location.search).get("redirect") || "/";
                    router.push(redirectUrl);
                  }
                }}
                onError={() => {
                  console.log("Google Sign-In Failed");
                  alert("การเข้าสู่ระบบด้วย Google ล้มเหลว กรุณาลองใหม่อีกครั้ง");
                }}
                theme="outline"
                shape="pill"
              />
            </GoogleOAuthProvider>
          </div>
          
          <div className="mt-8 text-center text-sm text-[#69576e]">
            ยังไม่มีบัญชีผู้ใช้? <a href="#" className="font-bold text-[#622576] hover:underline" onClick={(e) => e.preventDefault()}>สมัครสมาชิกเลย</a>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-semibold text-[#80508f] hover:underline">
              ← กลับไปหน้าแรก
            </Link>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-2xl">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ebdfee] border-t-[#622576]" />
            <p className="mt-4 font-bold text-[#40184f]">กำลังเข้าสู่ระบบ...</p>
            <p className="mt-1 text-xs text-[#69576e]">กรุณารอสักครู่</p>
          </div>
        </div>
      )}
    </>
  );
}
