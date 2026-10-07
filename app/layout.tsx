import "./globals.css";
import ShopFooter from "@/components/shop-footer";
import { Noto_Sans_Thai_Looped } from "next/font/google";

const notoSansThai = Noto_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={notoSansThai.className}>
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <ShopFooter />
      </body>
    </html>
  );
}
