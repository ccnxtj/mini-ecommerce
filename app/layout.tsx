import "./globals.css";
import ShopFooter from "@/components/shop-footer";
import { IBM_Plex_Sans_Thai } from "next/font/google";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
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
    <html lang="th" className={ibmPlexSansThai.className}>
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <ShopFooter />
      </body>
    </html>
  );
}
