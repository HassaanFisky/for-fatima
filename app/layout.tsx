import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "for fatima 💜",
  description: "A private digital universe crafted with care.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF8FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} antialiased selection:bg-purple-100 selection:text-purple-900`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#FAF8FF] text-[#1E162B] font-sans">
        {children}
      </body>
    </html>
  );
}
