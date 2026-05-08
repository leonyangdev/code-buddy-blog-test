"use client"

import { Header } from "./header"
import { Footer } from "./footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { usePathname } from "next/navigation"

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  sidebar?: React.ReactNode
  className?: string
}

export function MainLayout({
  children,
  showSidebar = false,
  sidebar,
  className = "",
}: MainLayoutProps) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {isHome ? (
          children
        ) : (
          <div className="container mx-auto px-4 md:px-6 py-8">
            {showSidebar && sidebar ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                <div className={className}>{children}</div>
                <aside className="lg:col-start-2">{sidebar}</aside>
              </div>
            ) : (
              <div className={`max-w-5xl mx-auto ${className}`}>{children}</div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
