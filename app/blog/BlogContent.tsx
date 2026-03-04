"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  LayoutDashboard, LogOut, PlusCircle, Users, 
  Clock, MessageSquare, ExternalLink, Send 
} from "lucide-react"

export function BlogContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Client Login</CardTitle>
            <CardDescription>Enter your details to manage projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="client@mit.edu" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" />
            </div>
            <Button className="w-full bg-blue-600" onClick={() => setIsLoggedIn(true)}>Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Dashboard Screen
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl space-y-8">
      <header className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">Client Portal</h1>
        <Button variant="ghost" onClick={() => setIsLoggedIn(false)} className="text-red-500">
          <LogOut className="mr-2 h-4" /> Logout
        </Button>
      </header>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="post">Post Project</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card><CardContent className="pt-6"><p className="text-sm">Active Gigs</p><h3 className="text-3xl font-bold">04</h3></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm">Total Bids</p><h3 className="text-3xl font-bold text-blue-600">12</h3></CardContent></Card>
            <Card><CardContent className="pt-6"><p className="text-sm">Completed</p><h3 className="text-3xl font-bold text-green-600">07</h3></CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Aryan Raj</TableCell>
                  <TableCell>Web Dev</TableCell>
                  <TableCell><Badge>Pending</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">View</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="post">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input placeholder="e.g. Logo Design" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="What do you need?" />
            </div>
            <Button className="w-full bg-blue-600">Post Now</Button>
          </TabsContent>
        </TabsContent>
      </Tabs>
    </div>
  )
}
