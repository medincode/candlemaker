import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Bespoke Candle Studio",
  description: "Design your perfect candle. Handcrafted with intention, infused with soul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FDF8F3]">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="border-t border-[#E8DDD4] py-8 text-center text-sm text-[#9B8E84] font-light tracking-widest uppercase">
          <p>Lumière Candle Studio &mdash; Crafted with Love</p>
        </footer>
      </body>
    </html>
  );
}
