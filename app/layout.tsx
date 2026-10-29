import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "for fatima 💜",
  description: "A private digital universe crafted with care, patience, and respect.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#09060f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} antialiased selection:bg-purple-900/60 selection:text-purple-200`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#09060f] text-[#f5f3f9] font-sans">
        {children}
      </body>
    </html>
  );
}
