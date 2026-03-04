import type { Metadata } from "next"
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

// --- SEO Metadata (Server Side) ---
export const metadata: Metadata = {
  title: "Client Portal | Hire Student Talent | E-Cell MIT Meerut",
  description: "Post projects, browse student freelancers, and manage your hires at MIT Meerut's E-Cell Client Dashboard.",
  keywords: "hire students, freelance projects, MIT Meerut, E-Cell client, student startups",
}

export const viewport = {
  themeColor: "#004aad",
};

// --- Main Page Component ---
export default function ClientDashboardPage() {
  return <ClientContent />
}

// --- Client Logic & UI (Client Component) ---
function ClientContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  // --- 1. Login/Register View ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <Card className="w-full max-w-md shadow-2xl border-t-8 border-t-blue-600">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {authMode === "login" ? "Client Login" : "Client Join"}
            </CardTitle>
            <CardDescription>
              {authMode === "login" 
                ? "Enter your credentials to access your dashboard" 
                : "Create an account to start hiring student talent"}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {authMode === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="org">Organization/Name</Label>
                <Input id="org" placeholder="Acme Corp" />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 mt-2" 
              onClick={() => setIsLoggedIn(true)}
            >
              {authMode === "login" ? <><LogIn className="mr-2 h-4 w-4" /> Sign In</> : <><UserPlus className="mr-2 h-4 w-4" /> Create Account</>}
            </Button>
            <div className="relative mt-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">Or</span></div>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
            >
              {authMode === "login" ? "Need an account? Register" : "Already have an account? Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- 2. Dashboard View (After Login) ---
  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600">Client <span className="text-slate-900 dark:text-white">Portal</span></h1>
            <p className="text-muted-foreground font-medium">Welcome back, MIT Partner</p>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </header>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto md:mx-0 bg-blue-50 dark:bg-slate-900 p-1 rounded-xl border">
            <TabsTrigger value="dashboard" className="rounded-lg"><LayoutDashboard className="mr-2 h-4 w-4" /> Dash</TabsTrigger>
            <TabsTrigger value="post" className="rounded-lg"><PlusCircle className="mr-2 h-4 w-4" /> Post</TabsTrigger>
            <TabsTrigger value="browse" className="rounded-lg"><Users className="mr-2 h-4 w-4" /> Hire</TabsTrigger>
          </TabsList>

          {/* Tab 1: Client Dashboard Stats */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none shadow-lg">
                <CardHeader>
                  <CardDescription className="text-blue-100">Live Projects</CardDescription>
                  <CardTitle className="text-4xl font-black italic">03</CardTitle>
                </CardHeader>
              </Card>
              <Card className="shadow-md">
                <CardHeader>
                  <CardDescription>Bids Received</CardDescription>
                  <CardTitle className="text-4xl font-bold">18</CardTitle>
                </CardHeader>
              </Card>
              <Card className="shadow-md">
                <CardHeader>
                  <CardDescription>Total Payouts</CardDescription>
                  <CardTitle className="text-4xl font-bold text-green-600">₹12,400</CardTitle>
                </CardHeader>
              </Card>
            </div>
            
            <h3 className="text-xl font-bold mt-8">Recent Project Activity</h3>
            <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm divide-y">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex gap-4 items-center">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Briefcase className="h-5 w-5" /></div>
                    <div>
                      <p className="font-semibold">Logo Design for MUF 2026</p>
                      <p className="text-xs text-muted-foreground">5 Applicants • Posted 2 days ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Active</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 2: Post New Project Form */}
          <TabsContent value="post">
            <Card className="max-w-2xl mx-auto shadow-xl border-none">
              <CardHeader className="bg-slate-900 text-white rounded-t-xl">
                <CardTitle className="text-2xl">Create New Project Listing</CardTitle>
                <CardDescription className="text-slate-400">Describe what you need and set your budget.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input placeholder="e.g., Build a Portfolio Website using Next.js" className="h-12 border-slate-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Estimated Budget (₹)</Label>
                    <Input type="number" placeholder="2000" className="h-12 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input type="date" className="h-12 border-slate-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Project Requirements</Label>
                  <Textarea placeholder="List specific skills or tasks..." className="min-h-[150px] border-slate-200" />
                </div>
                <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 shadow-md">
                  <Send className="mr-2 h-4 w-4" /> Publish to Marketplace
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Browse Student Freelancers */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students (React, Figma, Python...)" className="pl-10" />
              </div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Badge variant="secondary" className="cursor-pointer bg-blue-100 text-blue-700">Top Rated</Badge>
                <Badge variant="outline" className="cursor-pointer">Developers</Badge>
                <Badge variant="outline" className="cursor-pointer">Designers</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Ananya Dixit", role: "UI Designer", rate: "₹500/hr", rating: "4.9" },
                { name: "Rohit Kumar", role: "React Expert", rate: "₹800/hr", rating: "4.8" },
                { name: "Simran Kaur", role: "Video Editor", rate: "₹600/hr", rating: "5.0" },
              ].map((student, i) => (
                <Card key={i} className="group hover:shadow-xl transition-all border-none shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center font-bold text-white text-xl">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{student.name}</h4>
                        <p className="text-sm text-blue-600 font-medium">{student.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-lg mb-4">
                      <span className="text-sm font-semibold">{student.rate}</span>
                      <span className="flex items-center gap-1 text-sm font-bold text-yellow-600">
                        <Star className="h-3 w-3 fill-yellow-600" /> {student.rating}
                      </span>
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Contact Student
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
