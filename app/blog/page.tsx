import type { Metadata } from "next"

// --- 1. SEO Metadata (Server Side) ---
// Ye part build time par run hoga aur SEO handle karega
export const metadata: Metadata = {
  title: "Client Portal | Hire Student Talent | E-Cell MIT Meerut",
  description: "Post projects, browse student freelancers, and manage your hires at MIT Meerut's E-Cell Client Dashboard.",
  keywords: "hire students, freelance projects, MIT Meerut, E-Cell client, student startups",
}

export const viewport = {
  themeColor: "#004aad",
};

// --- 2. Main Page Component (Server Component) ---
export default function ClientDashboardPage() {
  return <ClientContent />
}

// --- 3. Client Side Wrapper ---
// Humne "use client" ko yahan encapsulate kar diya hai
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, Users, LayoutDashboard, LogIn, 
  UserPlus, Search, Star, Send, LogOut, Briefcase
} from "lucide-react"

function ClientContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  // --- Login View ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <Card className="w-full max-w-md shadow-2xl border-t-8 border-t-blue-600">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">{authMode === "login" ? "Client Login" : "Client Join"}</CardTitle>
            <CardDescription>Hire the best student talent from MIT Meerut</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {authMode === "register" && (
              <div className="grid gap-2">
                <Label>Organization Name</Label>
                <Input placeholder="Acme Corp" />
              </div>
            )}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="client@mit.edu" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input type="password" />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2" onClick={() => setIsLoggedIn(true)}>
              {authMode === "login" ? "Sign In" : "Create Account"}
            </Button>
            <Button variant="link" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
              {authMode === "login" ? "Don't have an account? Register" : "Already have an account? Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- Dashboard View ---
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <header className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">Client Portal</h1>
        <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>Logout</Button>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-8">
        <TabsList className="bg-blue-50 dark:bg-slate-900 border">
          <TabsTrigger value="dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dash</TabsTrigger>
          <TabsTrigger value="post"><PlusCircle className="mr-2 h-4 w-4" /> Post Project</TabsTrigger>
          <TabsTrigger value="browse"><Users className="mr-2 h-4 w-4" /> Browse Talent</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardHeader><CardDescription>Active Projects</CardDescription><CardTitle className="text-3xl">03</CardTitle></CardHeader></Card>
          <Card><CardHeader><CardDescription>Total Bids</CardDescription><CardTitle className="text-3xl font-bold text-blue-600">12</CardTitle></CardHeader></Card>
          <Card><CardHeader><CardDescription>Completed</CardDescription><CardTitle className="text-3xl text-green-600 font-bold">08</CardTitle></CardHeader></Card>
        </TabsContent>

        <TabsContent value="post">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader><CardTitle>Post a Project</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Project Title (e.g. Website Design)" />
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Budget (₹)" />
                <Input type="date" />
              </div>
              <Textarea placeholder="Explain your requirements..." className="min-h-[150px]" />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Post Now</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">S{i}</div>
                    <div><h4 className="font-bold">Student Name</h4><p className="text-xs text-blue-600">Developer</p></div>
                  </div>
                  <Button variant="outline" className="w-full">View Profile</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
