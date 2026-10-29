import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "for fatima 💜",
  description: "A private digital universe crafted with care, patience, and respect.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#17131b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} antialiased selection:bg-[#362c3d] selection:text-[#f0eaf0]`}
    >
      <body className="min-h-screen bg-[#17131b] text-[#f0eaf0] font-sans">
        {children}
      </body>
    </html>
  );
}
