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
  metadataBase: new URL("https://allwellhealthcare.com"),
  title: {
    default: "ALLWELL Healthcare | เตียงผู้ป่วยไฟฟ้าและอุปกรณ์ดูแลผู้สูงอายุ",
    template: "%s | ALLWELL Healthcare",
  },
  description:
    "ศูนย์รวมเตียงผู้ป่วยไฟฟ้า ที่นอนป้องกันแผลกดทับ และอุปกรณ์ดูแลผู้สูงอายุมาตรฐานสากล บริการจัดส่งและติดตั้งฟรีโดยทีมช่างผู้เชี่ยวชาญ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={prompt.className}>
      <body className="flex min-h-screen flex-col bg-neutral-bg text-text-body">
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <WishlistProvider>
                <ToastProvider>
                  <div className="flex-1">{children}</div>
                  <ShopFooter />
                </ToastProvider>
              </WishlistProvider>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
