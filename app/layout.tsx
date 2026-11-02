import type { Metadata, Viewport } from "next";
import { Zen_Maru_Gothic, Nunito, Klee_One } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const kleeOne = Klee_One({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "for fatima 💜 — A little paper sky",
  description:
    "Konpeitō Night — A little paper sky, handmade for one person.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#171233",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${zenMaru.variable} ${nunito.variable} ${kleeOne.variable} antialiased`}
    >
      <body className="h-[100dvh] w-full overflow-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
