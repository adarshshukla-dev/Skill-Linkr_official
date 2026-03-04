"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  const router = useRouter()
  const [reason, setReason] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Get parameters from URL after component mounts
    const searchParams = new URLSearchParams(window.location.search)
    const reasonParam = searchParams.get("reason")
    const emailParam = searchParams.get("email")

    setReason(reasonParam)
    setEmail(emailParam)
  }, [])

  const getReasonText = (reasonCode: string | null) => {
    switch (reasonCode) {
      case "too_frequent":
        return "Emails were too frequent"
      case "not_relevant":
        return "Content wasn't relevant to me"
      case "didnt_signup":
        return "I didn't sign up for this"
      case "other":
        return "Other reason"
      default:
        return "Unspecified reason"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this feedback to your server
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Feedback</CardTitle>
          <CardDescription>E-Cell Meerut Institute of Technology</CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Thank You for Your Feedback</h3>
              <p className="text-muted-foreground">We appreciate your input. It will help us improve our newsletter.</p>
              <p className="text-sm text-muted-foreground mt-4">Redirecting you to the homepage...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Reason for Unsubscribing</Label>
                <p className="text-muted-foreground">{getReasonText(reason)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Additional Feedback (Optional)</Label>
                <Textarea
                  id="feedback"
                  placeholder="Please share any additional feedback that could help us improve..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
