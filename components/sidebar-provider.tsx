"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

type SidebarContextType = {
  isOpen: boolean
  toggleSidebar: () => void
  isMobile: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)

      // Auto-close sidebar on smaller screens, always open on large screens
      if (mobile) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Set initial value
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = useCallback(() => {
    // Only allow toggling on mobile screens
    if (isMobile) {
      setIsOpen((prev) => !prev)
    }
  }, [isMobile])

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar, isMobile }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

