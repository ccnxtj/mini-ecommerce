import "./globals.css";
import ShopFooter from "@/components/shop-footer";
import { Prompt } from "next/font/google";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { OrderProvider } from "@/contexts/order-context";
import { ToastProvider } from "@/contexts/toast-context";

import type { Metadata } from "next";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://healthybed.co.th"),
  title: {
    default: "mini-ecommerce",
    template: "%s | mini-ecommerce",
  },
  description: "ศูนย์รวมเตียงผู้ป่วยไฟฟ้า ที่นอนป้องกันแผลกดทับ และอุปกรณ์ดูแลผู้สูงอายุมาตรฐานสากล",
};

import MobileBottomNav from "@/components/mobile-bottom-nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={prompt.className}>
      <body className="flex min-h-screen flex-col bg-white text-zinc-900">
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <WishlistProvider>
                <ToastProvider>
                  <div className="flex-1 pb-16 md:pb-0">{children}</div>
                  <ShopFooter />
                  <MobileBottomNav />
                </ToastProvider>
              </WishlistProvider>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
