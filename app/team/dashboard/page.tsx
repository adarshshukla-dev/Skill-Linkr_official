"use client"

import { useState, useEffect } from "react"
import { useTeamAuth } from "../auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, LogOut, CheckCircle, XCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

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

export default function TeamDashboardPage() {
  const { logout, teamMember } = useTeamAuth()
  const { toast } = useToast()

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const [taskNotes, setTaskNotes] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState(false)

  // Load tasks
  const loadTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/team/tasks")
      const data = await response.json()

      if (response.ok) {
        setTasks(data.tasks)
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
      setIsLoading(false)
    }
  }

  // Load tasks on initial render
  useEffect(() => {
    loadTasks()
  }, [])

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    // Search filter
    const matchesSearch = searchTerm
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    // Status filter
    const matchesStatus = statusFilter ? task.status === statusFilter : true

    // Priority filter
    const matchesPriority = priorityFilter ? task.priority === priorityFilter : true

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Handle update task status
  const handleUpdateTaskStatus = async (taskId: string, newStatus: "pending" | "process" | "complete" | "rejected") => {
    setUpdatingStatus(true)
    try {
      const response = await fetch(`/api/team/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          notes: taskNotes,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Task status updated",
          description: "The task status has been updated successfully.",
        })
        loadTasks()
        setShowTaskDialog(false)
        setSelectedTask(null)
        setTaskNotes("")
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
    } finally {
      setUpdatingStatus(false)
    }
  }

  // Open task dialog
  const openTaskDialog = (task: Task) => {
    setSelectedTask(task)
    setTaskNotes(task.notes || "")
    setShowTaskDialog(true)
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">E-Cell Team Dashboard</h1>
            {teamMember && (
              <p className="text-sm text-muted-foreground">
                Welcome, {teamMember.name} ({teamMember.role})
              </p>
            )}
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>View and manage your assigned tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0 mb-6">
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="process">In Progress</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/4">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("")
                    setPriorityFilter("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      </TableCell>
                    </TableRow>
                  ) : filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No tasks found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => openTaskDialog(task)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">Total tasks: {filteredTasks.length}</div>
          </CardFooter>
        </Card>
      </main>

      {/* Task Details Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="max-w-md">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTask.title}</DialogTitle>
                <DialogDescription>Task details and status update</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Status</h4>
                    <div>{getStatusBadge(selectedTask.status)}</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Priority</h4>
                    <div>{getPriorityBadge(selectedTask.priority)}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Due Date</h4>
                  <p className="text-sm text-muted-foreground">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Notes</h4>
                  <Textarea
                    placeholder="Add notes about this task..."
                    value={taskNotes}
                    onChange={(e) => setTaskNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Update Status</h4>
                  <Select
                    value={selectedTask.status}
                    onValueChange={(value: "pending" | "process" | "complete" | "rejected") =>
                      handleUpdateTaskStatus(selectedTask._id, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="process">In Progress</SelectItem>
                      <SelectItem value="complete">Complete</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => handleUpdateTaskStatus(selectedTask._id, selectedTask.status)}
                  disabled={updatingStatus}
                >
                  {updatingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Notes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
