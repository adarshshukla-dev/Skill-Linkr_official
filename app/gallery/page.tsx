"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
// Fixed Icons Import
import { Briefcase, User, FolderKanban, Search, PlusCircle, ExternalLink, IndianRupee, Clock } from "lucide-react"

const availableProjects = [
  { id: 1, title: "E-commerce Website", budget: "₹5000", duration: "2 Weeks", category: "Web Dev" },
  { id: 2, title: "Logo Design for Startup", budget: "₹1500", duration: "3 Days", category: "Design" },
  { id: 3, title: "Python Data Analysis", budget: "₹3000", duration: "1 Week", category: "Data Science" },
]

export default function FreelancerDashboard() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-8 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-950 p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-600">Student Freelancer Hub</h1>
          <p className="text-muted-foreground mt-1">Monetize your skills while you study.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline">Messages</Button>
           <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Post Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 bg-blue-50 dark:bg-slate-900">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        {/* 1. BROWSE PROJECTS SECTION */}
        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search skills (React, Figma...)" className="pl-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
               <Badge className="cursor-pointer">All</Badge>
               <Badge variant="outline" className="cursor-pointer">Web Dev</Badge>
               <Badge variant="outline" className="cursor-pointer">UI/UX</Badge>
               <Badge variant="outline" className="cursor-pointer">Content</Badge>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableProjects.map((project) => (
              <Card key={project.id} className="hover:border-blue-400 transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {project.category}
                    </Badge>
                    <div className="flex items-center text-green-600 font-bold">
                      <IndianRupee className="h-4 w-4" />
                      {project.budget.replace('₹', '')}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4 gap-4">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {project.duration}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> Entry Level</span>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 2. REGISTER SECTION */}
        <TabsContent value="register">
          <Card className="max-w-2xl mx-auto border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle>Become a Student Freelancer</CardTitle>
              <CardDescription>Fill in your details to get verified and start bidding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Aman Kumar" />
                </div>
                <div className="space-y-2">
                  <Label>College ID Number</Label>
                  <Input placeholder="MIT-2024-XXX" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Skills (Comma separated)</Label>
                <Input placeholder="React, Graphic Design, Video Editing" />
              </div>
              <div className="space-y-2">
                <Label>Short Bio</Label>
                <Textarea placeholder="Describe your expertise..." className="min-h-[100px]" />
              </div>
              <Button className="w-full bg-blue-600">Complete Registration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. PORTFOLIO SECTION */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-1 border-none shadow-none bg-slate-50 dark:bg-slate-900">
              <CardHeader className="items-center text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                  AK
                </div>
                <CardTitle>Aman Kumar</CardTitle>
                <Badge className="mt-1">Top Rated</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border flex justify-between">
                    <span className="text-sm font-medium">Earnings</span>
                    <span className="text-sm font-bold text-green-600">₹15,200</span>
                 </div>
                 <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border flex justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-sm font-bold text-blue-600">98%</span>
                 </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-2">
                <FolderKanban className="text-blue-600" /> My Portfolio Projects
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden group">
                      <div className="h-32 bg-slate-200 dark:bg-slate-800 relative">
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Button size="sm" variant="secondary">View Project</Button>
                         </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm">Project Title #{i}</h4>
                        <p className="text-xs text-muted-foreground italic">Developed using Next.js</p>
                      </CardContent>
                    </Card>
                  ))}
               </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
