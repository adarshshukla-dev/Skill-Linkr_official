"use client"

import { useState, useEffect } from "react"
import { useAdminAuth } from "../auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, LogOut, Search, Send, X, Plus, Edit, Trash, CheckCircle, XCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SimpleTextEditor } from "@/components/simple-text-editor"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Subscriber {
  _id: string
  email: string
  subscribeDate: string
  active: boolean
}

interface Feedback {
  _id: string
  email: string
  reason: string
  additionalFeedback: string
  submittedAt: string
}

interface TeamMember {
  _id: string
  email: string
  name: string
  role: string
  position?: string
  addedAt: string
  lastLogin: string | null
  active: boolean
}

interface Task {
  _id: string
  title: string
  description: string
  assignedTo: string
  status: "pending" | "process" | "complete" | "rejected"
  priority: "low" | "medium" | "high"
  dueDate: string
  createdAt: string
  updatedAt: string
  notes: string
}

export default function AdminDashboardPage() {
  const { logout } = useAdminAuth()
  const { toast } = useToast()

  // Email form state
  const [imageUrl, setImageUrl] = useState("")
  const [subject, setSubject] = useState("")
  const [heading, setHeading] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)

  // Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })

  // Feedback state
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [feedbackSearchTerm, setFeedbackSearchTerm] = useState("")
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)
  const [feedbackPagination, setFeedbackPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [teamSearchTerm, setTeamSearchTerm] = useState("")
  const [isTeamLoading, setIsTeamLoading] = useState(false)
  const [teamPagination, setTeamPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })
  const [showAddTeamMemberDialog, setShowAddTeamMemberDialog] = useState(false)
  const [newTeamMemberEmail, setNewTeamMemberEmail] = useState("")
  const [newTeamMemberName, setNewTeamMemberName] = useState("")
  const [newTeamMemberRole, setNewTeamMemberRole] = useState("Member")
  const [newTeamMemberPosition, setNewTeamMemberPosition] = useState("")
  const [addingTeamMember, setAddingTeamMember] = useState(false)
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null)
  const [showDeleteTeamMemberDialog, setShowDeleteTeamMemberDialog] = useState(false)
  const [teamMemberToDelete, setTeamMemberToDelete] = useState<TeamMember | null>(null)
  const [deletingTeamMember, setDeletingTeamMember] = useState(false)

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskSearchTerm, setTaskSearchTerm] = useState("")
  const [isTasksLoading, setIsTasksLoading] = useState(false)
  const [taskPagination, setTaskPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskAssignedTo, setTaskAssignedTo] = useState("")
  const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">("medium")
  const [taskDueDate, setTaskDueDate] = useState("")
  const [taskNotes, setTaskNotes] = useState("")
  const [addingTask, setAddingTask] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Recipients selection
  const [recipientType, setRecipientType] = useState<"all" | "selected" | "single">("all")
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([])
  const [singleRecipient, setSingleRecipient] = useState("")
  const [showRecipientDialog, setShowRecipientDialog] = useState(false)

  // Load subscribers
  const loadSubscribers = async (page = 1, search = "") => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/subscribers?page=${page}&limit=${pagination.limit}&search=${search}`)
      const data = await response.json()

      if (response.ok) {
        setSubscribers(data.subscribers)
        setPagination(data.pagination)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load subscribers",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load feedback
  const loadFeedback = async (page = 1, search = "") => {
    setIsFeedbackLoading(true)
    try {
      const response = await fetch(
        `/api/admin/feedback?page=${page}&limit=${feedbackPagination.limit}&search=${search}`,
      )
      const data = await response.json()

      if (response.ok) {
        setFeedback(data.feedback)
        setFeedbackPagination(data.pagination)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load feedback",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsFeedbackLoading(false)
    }
  }

  // Load team members
  const loadTeamMembers = async (page = 1, search = "") => {
    setIsTeamLoading(true)
    try {
      const response = await fetch(
        `/api/admin/team-members?page=${page}&limit=${teamPagination.limit}&search=${search}`,
      )
      const data = await response.json()

      if (response.ok) {
        setTeamMembers(data.teamMembers || [])
        setTeamPagination(data.pagination)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load team members",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTeamLoading(false)
    }
  }

  // Load tasks
  const loadTasks = async (page = 1, search = "") => {
    setIsTasksLoading(true)
    try {
      const response = await fetch(`/api/admin/tasks?page=${page}&limit=${taskPagination.limit}&search=${search}`)
      const data = await response.json()

      if (response.ok) {
        setTasks(data.tasks || [])
        setTaskPagination(data.pagination)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load tasks",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTasksLoading(false)
    }
  }

  // Load data on initial render
  useEffect(() => {
    loadSubscribers()
    loadFeedback()
    loadTeamMembers()
    loadTasks()
  }, [])

  // Handle search
  const handleSearch = () => {
    loadSubscribers(1, searchTerm)
  }

  // Handle feedback search
  const handleFeedbackSearch = () => {
    loadFeedback(1, feedbackSearchTerm)
  }

  // Handle team search
  const handleTeamSearch = () => {
    loadTeamMembers(1, teamSearchTerm)
  }

  // Handle task search
  const handleTaskSearch = () => {
    loadTasks(1, taskSearchTerm)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    loadSubscribers(page, searchTerm)
  }

  // Handle feedback page change
  const handleFeedbackPageChange = (page: number) => {
    loadFeedback(page, feedbackSearchTerm)
  }

  // Handle team page change
  const handleTeamPageChange = (page: number) => {
    loadTeamMembers(page, teamSearchTerm)
  }

  // Handle task page change
  const handleTaskPageChange = (page: number) => {
    loadTasks(page, taskSearchTerm)
  }

  // Reset team member form
  const resetTeamMemberForm = () => {
    setNewTeamMemberEmail("")
    setNewTeamMemberName("")
    setNewTeamMemberRole("Member")
    setNewTeamMemberPosition("")
    setEditingTeamMember(null)
  }

  // Open edit team member dialog
  const openEditTeamMemberDialog = (member: TeamMember) => {
    setEditingTeamMember(member)
    setNewTeamMemberEmail(member.email)
    setNewTeamMemberName(member.name)
    setNewTeamMemberRole(member.role)
    setNewTeamMemberPosition(member.position || "")
    setShowAddTeamMemberDialog(true)
  }

  // Open delete team member dialog
  const openDeleteTeamMemberDialog = (member: TeamMember) => {
    setTeamMemberToDelete(member)
    setShowDeleteTeamMemberDialog(true)
  }

  // Handle add/edit team member
  const handleAddEditTeamMember = async () => {
    if (!newTeamMemberEmail || !newTeamMemberName) {
      toast({
        title: "Missing information",
        description: "Please provide both email and name for the team member.",
        variant: "destructive",
      })
      return
    }

    setAddingTeamMember(true)

    try {
      const endpoint = editingTeamMember
        ? `/api/admin/team-members/${editingTeamMember._id}`
        : "/api/admin/team-members"
      const method = editingTeamMember ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newTeamMemberEmail,
          name: newTeamMemberName,
          role: newTeamMemberRole,
          position: newTeamMemberPosition,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: editingTeamMember ? "Team member updated" : "Team member added",
          description: editingTeamMember
            ? "The team member has been updated successfully."
            : "The team member has been added successfully.",
        })
        setShowAddTeamMemberDialog(false)
        resetTeamMemberForm()
        loadTeamMembers()
      } else {
        toast({
          title: "Error",
          description: data.message || `Failed to ${editingTeamMember ? "update" : "add"} team member`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingTeamMember(false)
    }
  }

  // Handle delete team member
  const handleDeleteTeamMember = async () => {
    if (!teamMemberToDelete) return

    setDeletingTeamMember(true)

    try {
      const response = await fetch(`/api/admin/team-members/${teamMemberToDelete._id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Team member deleted",
          description: "The team member has been deleted successfully.",
        })
        setShowDeleteTeamMemberDialog(false)
        setTeamMemberToDelete(null)
        loadTeamMembers()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete team member",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeletingTeamMember(false)
    }
  }

  // Handle add/edit task
  const handleAddEditTask = async () => {
    if (!taskTitle || !taskDescription || !taskAssignedTo || !taskDueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setAddingTask(true)

    try {
      const endpoint = editingTask ? `/api/admin/tasks/${editingTask._id}` : "/api/admin/tasks"
      const method = editingTask ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          assignedTo: taskAssignedTo,
          priority: taskPriority,
          dueDate: taskDueDate,
          notes: taskNotes,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: editingTask ? "Task updated" : "Task added",
          description: editingTask
            ? "The task has been updated successfully."
            : "The task has been added successfully.",
        })
        setShowAddTaskDialog(false)
        resetTaskForm()
        loadTasks()
      } else {
        toast({
          title: "Error",
          description: data.message || `Failed to ${editingTask ? "update" : "add"} task`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingTask(false)
    }
  }

  // Reset task form
  const resetTaskForm = () => {
    setTaskTitle("")
    setTaskDescription("")
    setTaskAssignedTo("")
    setTaskPriority("medium")
    setTaskDueDate("")
    setTaskNotes("")
    setEditingTask(null)
  }

  // Open edit task dialog
  const openEditTaskDialog = (task: Task) => {
    setEditingTask(task)
    setTaskTitle(task.title)
    setTaskDescription(task.description)
    setTaskAssignedTo(task.assignedTo)
    setTaskPriority(task.priority)
    setTaskDueDate(new Date(task.dueDate).toISOString().split("T")[0])
    setTaskNotes(task.notes)
    setShowAddTaskDialog(true)
  }

  // Handle update task status
  const handleUpdateTaskStatus = async (taskId: string, newStatus: "pending" | "process" | "complete" | "rejected") => {
    try {
      const response = await fetch(`/api/admin/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Task status updated",
          description: "The task status has been updated successfully.",
        })
        loadTasks()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update task status",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle delete task
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/tasks/${taskId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Task deleted",
          description: "The task has been deleted successfully.",
        })
        loadTasks()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete task",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle send email
  const handleSendEmail = async () => {
    // All fields are now optional, so no validation needed
    setShowRecipientDialog(true)
  }

  // Handle confirm send email
  const handleConfirmSendEmail = async () => {
    setSendingEmail(true)

    let recipients

    if (recipientType === "all") {
      recipients = { type: "all" }
    } else if (recipientType === "selected") {
      recipients = {
        type: "selected",
        emails: selectedSubscribers,
      }
    } else {
      recipients = {
        type: "single",
        email: singleRecipient,
      }
    }

    try {
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          subject,
          heading,
          description,
          category,
          websiteUrl,
          recipients,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Email sent",
          description: data.message,
        })

        // Reset form
        setImageUrl("")
        setSubject("")
        setHeading("")
        setDescription("")
        setCategory("")
        setWebsiteUrl("")
        setShowRecipientDialog(false)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send email",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSendingEmail(false)
    }
  }

  // Toggle subscriber selection
  const toggleSubscriberSelection = (email: string) => {
    setSelectedSubscribers((prev) => (prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]))
  }

  // Select all subscribers
  const selectAllSubscribers = () => {
    if (selectedSubscribers.length === subscribers.length) {
      setSelectedSubscribers([])
    } else {
      setSelectedSubscribers(subscribers.map((sub) => sub.email))
    }
  }

  // Get reason text
  const getReasonText = (reason: string) => {
    switch (reason) {
      case "too_frequent":
        return "Emails are too frequent"
      case "not_relevant":
        return "Content isn't relevant"
      case "didnt_signup":
        return "Didn't sign up"
      case "other":
        return "Other reason"
      default:
        return reason
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        )
      case "process":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </span>
        )
      case "complete":
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-500">
            <CheckCircle className="mr-1 h-3 w-3" />
            Complete
          </span>
        )
      case "rejected":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-500">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </span>
        )
      default:
        return status
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            Low
          </span>
        )
      case "medium":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
            Medium
          </span>
        )
      case "high":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-500">
            High
          </span>
        )
      default:
        return priority
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">E-Cell Admin Dashboard</h1>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="compose">
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="compose">Compose Email</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="feedback">Unsubscribe Feedback</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          {/* Compose Email Tab */}
          <TabsContent value="compose">
            <Card>
              <CardHeader>
                <CardTitle>Compose Newsletter</CardTitle>
                <CardDescription>Create and send emails to your subscribers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Email subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heading">Heading</Label>
                  <Input
                    id="heading"
                    placeholder="Email heading"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input
                    id="category"
                    placeholder="E.g., Event, Announcement, Newsletter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Content</Label>
                  <SimpleTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Write your email content here..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website Button URL (Optional)</Label>
                  <Input
                    id="websiteUrl"
                    placeholder="https://ecellmit.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSendEmail} disabled={sendingEmail}>
                  {sendingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Send Email
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Subscribers</CardTitle>
                <CardDescription>Manage your newsletter subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Search by email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedSubscribers.length === subscribers.length && subscribers.length > 0}
                            onCheckedChange={selectAllSubscribers}
                          />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date Subscribed</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : subscribers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8">
                            No subscribers found
                          </TableCell>
                        </TableRow>
                      ) : (
                        subscribers.map((subscriber) => (
                          <TableRow key={subscriber._id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedSubscribers.includes(subscriber.email)}
                                onCheckedChange={() => toggleSubscriberSelection(subscriber.email)}
                              />
                            </TableCell>
                            <TableCell>{subscriber.email}</TableCell>
                            <TableCell>{new Date(subscriber.subscribeDate).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                      disabled={pagination.page === 1 || isLoading}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === pagination.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        disabled={isLoading}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))}
                      disabled={pagination.page === pagination.pages || isLoading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">Total subscribers: {pagination.total}</div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Unsubscribe Feedback</CardTitle>
                <CardDescription>View feedback from unsubscribed users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Search by email"
                    value={feedbackSearchTerm}
                    onChange={(e) => setFeedbackSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" onClick={handleFeedbackSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Additional Feedback</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isFeedbackLoading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : feedback.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            No feedback found
                          </TableCell>
                        </TableRow>
                      ) : (
                        feedback.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{getReasonText(item.reason)}</TableCell>
                            <TableCell>
                              {item.additionalFeedback ? (
                                item.additionalFeedback
                              ) : (
                                <span className="text-muted-foreground italic">No additional feedback</span>
                              )}
                            </TableCell>
                            <TableCell>{new Date(item.submittedAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {feedbackPagination.pages > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFeedbackPageChange(Math.max(1, feedbackPagination.page - 1))}
                      disabled={feedbackPagination.page === 1 || isFeedbackLoading}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: feedbackPagination.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === feedbackPagination.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFeedbackPageChange(page)}
                        disabled={isFeedbackLoading}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFeedbackPageChange(Math.min(feedbackPagination.pages, feedbackPagination.page + 1))
                      }
                      disabled={feedbackPagination.page === feedbackPagination.pages || isFeedbackLoading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">Total feedback entries: {feedbackPagination.total}</div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Team Members Tab */}
          <TabsContent value="team">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team members</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    resetTeamMemberForm()
                    setShowAddTeamMemberDialog(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Search by email or name"
                    value={teamSearchTerm}
                    onChange={(e) => setTeamSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" onClick={handleTeamSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Added On</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isTeamLoading ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : teamMembers && teamMembers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            No team members found
                          </TableCell>
                        </TableRow>
                      ) : (
                        teamMembers &&
                        teamMembers.map((member) => (
                          <TableRow key={member._id}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  member.role === "Admin"
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500"
                                    : member.role === "Manager"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                }`}
                              >
                                {member.role}
                              </span>
                            </TableCell>
                            <TableCell>{member.position || "-"}</TableCell>
                            <TableCell>{new Date(member.addedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell>
                              {member.active ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-500">
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-500">
                                  Inactive
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditTeamMemberDialog(member)}
                                  title="Edit Team Member"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openDeleteTeamMemberDialog(member)}
                                  title="Delete Team Member"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {teamPagination.pages > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTeamPageChange(Math.max(1, teamPagination.page - 1))}
                      disabled={teamPagination.page === 1 || isTeamLoading}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: teamPagination.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === teamPagination.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTeamPageChange(page)}
                        disabled={isTeamLoading}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTeamPageChange(Math.min(teamPagination.pages, teamPagination.page + 1))}
                      disabled={teamPagination.page === teamPagination.pages || isTeamLoading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">Total team members: {teamPagination.total}</div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>Manage tasks for your team</CardDescription>
                </div>
                <Button onClick={() => setShowAddTaskDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Search by title or assignee"
                    value={taskSearchTerm}
                    onChange={(e) => setTaskSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" onClick={handleTaskSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isTasksLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : tasks && tasks.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No tasks found
                          </TableCell>
                        </TableRow>
                      ) : (
                        tasks &&
                        tasks.map((task) => (
                          <TableRow key={task._id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.assignedTo}</TableCell>
                            <TableCell>{getStatusBadge(task.status)}</TableCell>
                            <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                            <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditTaskDialog(task)}
                                  title="Edit Task"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteTask(task._id)}
                                  title="Delete Task"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                                <Select
                                  value={task.status}
                                  onValueChange={(value: "pending" | "process" | "complete" | "rejected") =>
                                    handleUpdateTaskStatus(task._id, value)
                                  }
                                >
                                  <SelectTrigger className="h-8 w-[110px]">
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="process">In Progress</SelectItem>
                                    <SelectItem value="complete">Complete</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {taskPagination.pages > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTaskPageChange(Math.max(1, taskPagination.page - 1))}
                      disabled={taskPagination.page === 1 || isTasksLoading}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: taskPagination.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === taskPagination.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTaskPageChange(page)}
                        disabled={isTasksLoading}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTaskPageChange(Math.min(taskPagination.pages, taskPagination.page + 1))}
                      disabled={taskPagination.page === taskPagination.pages || isTasksLoading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">Total tasks: {taskPagination.total}</div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Team Member Dialog */}
      <Dialog
        open={showAddTeamMemberDialog}
        onOpenChange={(open) => {
          setShowAddTeamMemberDialog(open)
          if (!open) resetTeamMemberForm()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTeamMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            <DialogDescription>
              {editingTeamMember ? "Edit team member details" : "Add a new team member to your E-Cell team."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="team.member@example.com"
                value={newTeamMemberEmail}
                onChange={(e) => setNewTeamMemberEmail(e.target.value)}
                disabled={!!editingTeamMember}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={newTeamMemberName}
                onChange={(e) => setNewTeamMemberName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newTeamMemberRole} onValueChange={setNewTeamMemberRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                placeholder="e.g., Developer, Designer, Marketing"
                value={newTeamMemberPosition}
                onChange={(e) => setNewTeamMemberPosition(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddTeamMemberDialog(false)
                resetTeamMemberForm()
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddEditTeamMember} disabled={addingTeamMember}>
              {addingTeamMember ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {editingTeamMember ? "Update Team Member" : "Add Team Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Team Member Dialog */}
      <AlertDialog open={showDeleteTeamMemberDialog} onOpenChange={setShowDeleteTeamMemberDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the team member {teamMemberToDelete?.name} ({teamMemberToDelete?.email}).
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTeamMemberToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeamMember}
              disabled={deletingTeamMember}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deletingTeamMember ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add/Edit Task Dialog */}
      <Dialog
        open={showAddTaskDialog}
        onOpenChange={(open) => {
          setShowAddTaskDialog(open)
          if (!open) resetTaskForm()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogDescription>
              {editingTask ? "Edit task details" : "Add a new task for your team members."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select value={taskAssignedTo} onValueChange={setTaskAssignedTo}>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers &&
                    teamMembers.map((member) => (
                      <SelectItem key={member._id} value={member.email}>
                        {member.name} ({member.email})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={taskPriority} onValueChange={(value: "low" | "medium" | "high") => setTaskPriority(value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes"
                value={taskNotes}
                onChange={(e) => setTaskNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddTaskDialog(false)
                resetTaskForm()
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddEditTask} disabled={addingTask}>
              {addingTask ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recipient Selection Dialog */}
      <Dialog open={showRecipientDialog} onOpenChange={setShowRecipientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Recipients</DialogTitle>
            <DialogDescription>Choose who should receive this email</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Recipient Type</Label>
              <Select
                value={recipientType}
                onValueChange={(value: "all" | "selected" | "single") => setRecipientType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscribers</SelectItem>
                  <SelectItem value="selected">Selected Subscribers</SelectItem>
                  <SelectItem value="single">Single Recipient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {recipientType === "single" && (
              <div className="space-y-2">
                <Label htmlFor="singleEmail">Recipient Email</Label>
                <Input
                  id="singleEmail"
                  placeholder="Enter email address"
                  value={singleRecipient}
                  onChange={(e) => setSingleRecipient(e.target.value)}
                />
              </div>
            )}

            {recipientType === "selected" && (
              <div className="space-y-2">
                <Label>Selected Subscribers: {selectedSubscribers.length}</Label>
                {selectedSubscribers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No subscribers selected. Please go to the Subscribers tab to select recipients.
                  </p>
                ) : (
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                    {selectedSubscribers.map((email) => (
                      <div key={email} className="flex items-center justify-between py-1">
                        <span className="text-sm truncate">{email}</span>
                        <Button variant="ghost" size="sm" onClick={() => toggleSubscriberSelection(email)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecipientDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSendEmail}
              disabled={
                sendingEmail ||
                (recipientType === "selected" && selectedSubscribers.length === 0) ||
                (recipientType === "single" && !singleRecipient)
              }
            >
              {sendingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
