"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AdminAuthContextType {
  isAuthenticated: boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  logout: () => {},
})

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/check-auth")
        const data = await response.json()

        setIsAuthenticated(data.authenticated)

        // Redirect based on auth status
        if (data.authenticated) {
          if (pathname === "/admin/login") {
            router.replace("/admin/dashboard")
          }
        } else {
          if (pathname !== "/admin/login" && pathname.startsWith("/admin")) {
            router.replace("/admin/login")
          }
        }
      } catch (error) {
        setIsAuthenticated(false)
        if (pathname !== "/admin/login" && pathname.startsWith("/admin")) {
          router.replace("/admin/login")
        }
      }
    }

    checkAuth()
  }, [pathname, router])

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      setIsAuthenticated(false)
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return <AdminAuthContext.Provider value={{ isAuthenticated, logout }}>{children}</AdminAuthContext.Provider>
}

export const useAdminAuth = () => useContext(AdminAuthContext)
