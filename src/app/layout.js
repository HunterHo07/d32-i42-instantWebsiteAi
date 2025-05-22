import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WebsiteProvider } from "@/hooks/useWebsiteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "instantWebsiteAi - From name to website in 30 seconds",
  description: "Launch a professional website instantly. Just enter your business name, upload a logo, and see your site live in seconds. No builders, no code, no drag-and-drop.",
  keywords: "website builder, instant website, AI website, no-code website, business website",
  authors: [{ name: "instantWebsiteAi Team" }],
  openGraph: {
    title: "instantWebsiteAi - From name to website in 30 seconds",
    description: "Launch a professional website instantly. Just enter your business name, upload a logo, and see your site live in seconds.",
    url: "https://instantwebsite.ai",
    siteName: "instantWebsiteAi",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "instantWebsiteAi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <WebsiteProvider>
          {children}
        </WebsiteProvider>
      </body>
    </html>
  );
}
