"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, User, Folder-kanban, Search, PlusCircle, ExternalLink } from "lucide-react"

// Mock Data for Projects
const availableProjects = [
  { id: 1, title: "E-commerce Website", budget: "₹5000", duration: "2 Weeks", category: "Web Dev" },
  { id: 2, title: "Logo Design for Startup", budget: "₹1500", duration: "3 Days", category: "Design" },
  { id: 3, title: "Python Data Analysis", budget: "₹3000", duration: "1 Week", category: "Data Science" },
]

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Freelance Hub</h1>
          <p className="text-muted-foreground">Manage your projects, browse opportunities, and build your brand.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Post a Project
        </Button>
      </div>

      <Tabs defaultValue="browse" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        {/* --- 1. BROWSE PROJECTS --- */}
        <TabsContent value="browse" className="space-y-6">
          <div className="flex items-center gap-4 max-w-sm mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-8" />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">{project.category}</Badge>
                    <span className="text-green-600 font-bold">{project.budget}</span>
                  </div>
                  <CardTitle className="mt-2">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Duration: {project.duration}</p>
                  <Button className="w-full" variant="outline">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* --- 2. REGISTER AS FREELANCER --- */}
        <TabsContent value="register">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Freelancer Registration</CardTitle>
              <CardDescription>Setup your profile to start receiving project offers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Primary Skill</Label>
                  <Input id="skills" placeholder="React, UI/UX, Python" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <Textarea id="bio" placeholder="Tell clients why they should hire you..." />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Submit Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- 3. PORTFOLIO & MY PROJECTS --- */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Stats Sidebar */}
            <Card className="md:col-span-1 h-fit">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle>My Profile</CardTitle>
                <p className="text-sm text-muted-foreground">Completed 12 Projects</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm border-b py-2">
                  <span>Rating</span>
                  <span className="font-bold text-yellow-500">⭐ 4.9</span>
                </div>
                <div className="flex justify-between text-sm border-b py-2">
                  <span>Earnings</span>
                  <span className="font-bold">₹12,400</span>
                </div>
              </CardContent>
            </Card>

            {/* Past Work Display */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold flex items-center">
                <Folder-kanban className="mr-2 h-5 w-5" /> Recent Work
              </h3>
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Portfolio Website V{i}</h4>
                      <p className="text-xs text-muted-foreground italic">Tech: Next.js, Tailwind</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
