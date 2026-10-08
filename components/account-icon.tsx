"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

export default function AccountIcon() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        aria-label="Login"
        className="grid size-9 sm:size-10 place-items-center rounded-full hover:bg-white/10"
      >
        <svg
          className="size-5 sm:size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="7.5" r="3.5" />
          <path d="M4.5 20v-1.5a7.5 7.5 0 0 1 15 0V20" />
        </svg>
      </Link>
    );
  }

  const handleLogout = async () => {
    setIsOpen(false);
    setIsLoggingOut(true);
    
    // จำลองการประมวลผล (1 วินาที)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logout();
    setIsLoggingOut(false);
  };

  return (
    <>
      <div className="relative flex items-center" ref={ref}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Account Menu"
          className="grid size-9 sm:size-10 place-items-center rounded-full hover:bg-white/10"
        >
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              width={36}
              height={36}
              className="size-8 sm:size-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-white/20 text-white font-bold text-sm sm:text-base">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-60 origin-top-left rounded-xl bg-white py-2 text-zinc-800 shadow-xl ring-1 ring-black/5 z-50">
            <div className="border-b border-zinc-100 px-4 py-3">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
            </div>

            <div className="py-2 font-medium">
              <Link
                href="/orders"
                className="block px-4 py-2.5 text-sm hover:bg-zinc-50"
                onClick={() => setIsOpen(false)}
              >
                ประวัติการสั่งซื้อ
              </Link>
              <Link
                href="/address"
                className="block px-4 py-2.5 text-sm hover:bg-zinc-50"
                onClick={() => setIsOpen(false)}
              >
                ที่อยู่จัดส่ง
              </Link>
            </div>

            <div className="border-t border-zinc-100 py-1">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-2xl">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ebdfee] border-t-red-600" />
            <p className="mt-4 font-bold text-[#40184f]">กำลังออกจากระบบ...</p>
            <p className="mt-1 text-xs text-[#69576e]">กรุณารอสักครู่</p>
          </div>
        </div>
      )}
    </>
  );
}
