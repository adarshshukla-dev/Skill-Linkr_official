"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface TeamMember {
  _id: string
  email: string
  name: string
  role: string
  addedAt: string
  lastLogin: string | null
  active: boolean
}

interface TeamAuthContextType {
  isAuthenticated: boolean
  teamMember: TeamMember | null
  logout: () => void
}

const TeamAuthContext = createContext<TeamAuthContextType>({
  isAuthenticated: false,
  teamMember: null,
  logout: () => {},
})

export function TeamAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
  
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/team/check-auth")
        const data = await response.json()
  
        setIsAuthenticated(data.authenticated)
        setTeamMember(data.teamMember || null)
  
        if (data.authenticated) {
          if (pathname === "/team/login") {
            router.replace("/team/dashboard")
          }
        } else {
          // Public pages inside /team that don't need auth
          const isPublicTeamPage = pathname === "/team" || pathname === "/team/login"
          
          if (!isPublicTeamPage && pathname.startsWith("/team")) {
            router.replace("/team/login")
          }
        }
      } catch (error) {
        setIsAuthenticated(false)
        setTeamMember(null)
      }
    }
  
    checkAuth()
  }, [pathname, router, mounted])

  const logout = async () => {
    try {
      await fetch("/api/team/logout", { method: "POST" })
      setIsAuthenticated(false)
      setTeamMember(null)
      router.push("/team/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // --- HYDRATION & LAYOUT FIX ---
  // Agar mounted nahi hai ya auth check chal raha hai, 
  // toh hum loader ko layout ke andar hi dikhayenge.
  if (!mounted || isAuthenticated === null) {
    return (
      <TeamAuthContext.Provider value={{ isAuthenticated: false, teamMember: null, logout }}>
        <div className="flex min-h-[70vh] w-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-sm text-muted-foreground animate-pulse">Verifying Access...</p>
          </div>
        </div>
      </TeamAuthContext.Provider>
    )
  }

  return (
    <TeamAuthContext.Provider value={{ 
      isAuthenticated: !!isAuthenticated, 
      teamMember, 
      logout 
    }}>
      {children}
    </TeamAuthContext.Provider>
  )
}

export const useTeamAuth = () => useContext(TeamAuthContext)
