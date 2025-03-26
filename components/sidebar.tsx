"use client"

import { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Bell, BookOpen, Calendar, Home, Menu, MessageSquare, Settings, Users } from "lucide-react"
import { useSidebar } from "./sidebar-provider"
import { useState } from "react"

// Extract navigation items to avoid re-creating on each render
const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

// Memoize the NavLink component to prevent unnecessary re-renders
const NavLink = memo(
  ({
    href,
    icon: Icon,
    title,
    isActive,
    onClick,
  }: {
    href: string
    icon: any
    title: string
    isActive: boolean
    onClick?: () => void
  }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
      onClick={onClick}
      prefetch={false} // Only prefetch when needed
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Link>
  ),
)
NavLink.displayName = "NavLink"

// Memoize the desktop sidebar for better performance
const DesktopSidebar = memo(({ pathname }: { pathname: string }) => (
  <div className="fixed top-0 left-0 h-screen border-r lg:flex z-40 w-64">
    <div className="flex h-full w-full flex-col">
      <div className="flex h-14 items-center border-b px-4 bg-background justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          Parent-Teacher Portal
        </Link>
      </div>
      <ScrollArea className="flex-1 pt-4 bg-background">
        <nav className="grid gap-1 px-2">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </ScrollArea>
    </div>
  </div>
))
DesktopSidebar.displayName = "DesktopSidebar"

// Memoize the mobile sidebar trigger for better performance
const MobileSidebarTrigger = memo(({ onClick }: { onClick: () => void }) => (
  <Button variant="outline" size="icon" className="fixed left-4 top-3 z-50 lg:hidden" onClick={onClick}>
    <Menu className="h-5 w-5" />
    <span className="sr-only">Toggle menu</span>
  </Button>
))
MobileSidebarTrigger.displayName = "MobileSidebarTrigger"

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggleSidebar, isMobile } = useSidebar()
  const [sheetOpen, setSheetOpen] = useState(false)

  // Desktop sidebar
  if (!isMobile) {
    return <DesktopSidebar pathname={pathname} />
  }

  // Mobile sidebar (using Sheet)
  return (
    <>
      <MobileSidebarTrigger onClick={() => setSheetOpen(true)} />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="w-64 p-0" onCloseAutoFocus={(e) => e.preventDefault()}>
          <div className="flex h-full w-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <SheetTitle className="text-left">Parent-Teacher Portal</SheetTitle>
            </div>
            <ScrollArea className="flex-1 pt-4">
              <nav className="grid gap-1 px-2">
                {items.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    title={item.title}
                    isActive={pathname === item.href}
                    onClick={() => setSheetOpen(false)}
                  />
                ))}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

