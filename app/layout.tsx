import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Use font-display: swap for better performance
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Parent-Teacher Portal",
  description: "A comprehensive platform for parent-teacher interactions",
  // Add cache control headers
  other: {
    "cache-control": "public, max-age=3600, s-maxage=86400",
  },
    generator: 'v0.dev'
}

// Add viewport metadata for better mobile performance
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#111" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex flex-1 flex-col lg:ml-64">
                <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:h-[60px]">
                  <div className="w-8 h-8 lg:hidden"></div> {/* Spacer for mobile menu button */}
                  <div className="ml-auto flex items-center gap-4">
                    <ThemeToggle />
                    <UserNav />
                  </div>
                </header>
                <main className="flex-1 relative">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'