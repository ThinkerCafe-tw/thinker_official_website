import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import Footer from './Footer.js';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Thinker Cafe | 思考者咖啡 - AI 時代的實戰課程",
  description: "AI 時代來臨，讓 Thinker Cafe 的課程帶您贏在起跑點！提供 ChatGPT、Midjourney 等 AI 工具實戰課程，適合行銷人員、產品經理、創業者。",
  keywords: ["AI 課程", "ChatGPT 教學", "AI 實戰", "台灣 AI 課程", "人工智慧課程", "AI 工具", "Midjourney"],
  authors: [{ name: "Thinker Cafe" }],
  openGraph: {
    title: "Thinker Cafe | AI 時代的實戰課程",
    description: "AI 時代來臨，讓 Thinker Cafe 的課程帶您贏在起跑點！",
    url: "https://thinkcafe.tw",
    siteName: "Thinker Cafe",
    images: [
      {
        url: "https://thinkcafe.tw/logo.png", // 暫時使用 logo，之後需要準備 1200x630 的 OG 圖片
        width: 1200,
        height: 630,
        alt: "Thinker Cafe - AI 實戰課程"
      }
    ],
    locale: "zh_TW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Thinker Cafe | AI 時代的實戰課程",
    description: "AI 時代來臨，讓 Thinker Cafe 的課程帶您贏在起跑點！",
    images: ["https://thinkcafe.tw/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
            <Navigation />
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
