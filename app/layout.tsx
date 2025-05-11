import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rohith Dachepally",
  description: "Portfolio of Rohith Dachepally - Data Science Student",
  icons: {
    icon: [
      { url: "/ai-avatar.png", sizes: "32x32", type: "image/png" },
      { url: "/ai-avatar.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/ai-avatar.png", sizes: "180x180", type: "image/png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ai-avatar.png" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

