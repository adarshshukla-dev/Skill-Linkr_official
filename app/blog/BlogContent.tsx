"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LayoutDashboard, LogOut, PlusCircle, Users, Briefcase, Send } from "lucide-react"

export function BlogContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Login View ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
        <Card className="w-full max-w-md shadow-lg border-t-4 border-t-blue-600">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Client Portal</CardTitle>
            <CardDescription>Login to manage student hires</CardDescription>
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
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsLoggedIn(true)}>
              Login to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Dashboard View ---
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl space-y-8">
      <header className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">E-Cell Client Hub</h1>
        <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-800 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="apps">Applications</TabsTrigger>
          <TabsTrigger value="new">Post Job</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-600 text-white border-none">
              <CardContent className="pt-6">
                <p className="text-sm opacity-80">Active Gigs</p>
                <h3 className="text-4xl font-bold">04</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Applicants</p>
                <h3 className="text-4xl font-bold text-blue-600">12</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Budget Spent</p>
                <h3 className="text-4xl font-bold">₹8.5k</h3>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="apps">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Aryan Raj</TableCell>
                  <TableCell>Web Dev</TableCell>
                  <TableCell><Badge variant="secondary">Reviewing</Badge></TableCell>
                  <TableCell className="text-right"><Button size="sm" variant="ghost">View</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Post a Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Project Title" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Details..." />
              </div>
              <Button className="w-full bg-blue-600">Publish</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
