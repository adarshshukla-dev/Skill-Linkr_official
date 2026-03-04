"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function UnsubscribePage() {
  const { toast } = useToast()
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(true)
  const [reason, setReason] = useState<string>("")
  const [additionalFeedback, setAdditionalFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Get email from search params after component mounts
    const searchParams = new URLSearchParams(window.location.search)
    const emailParam = searchParams.get("email")
    setEmail(emailParam)

    if (!emailParam) {
      setIsLoading(false)
      setSuccess(false)
      setMessage("No email provided. Please check the link and try again.")
      setShowFeedbackForm(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason) {
      toast({
        title: "Please select a reason",
        description: "Please select a reason for unsubscribing to continue.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Submit feedback and unsubscribe
      const response = await fetch(`/api/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reason,
          additionalFeedback,
        }),
      })

      const data = await response.json()

      setSuccess(response.ok)
      setMessage(data.message)
      setShowFeedbackForm(false)
    } catch (error) {
      setSuccess(false)
      setMessage("An error occurred while processing your request. Please try again later.")
      setShowFeedbackForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Newsletter Unsubscribe</CardTitle>
          <CardDescription>E-Cell Meerut Institute of Technology</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : showFeedbackForm ? (
            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              <div>
                <p className="mb-4">
                  We're sorry to see you go. Before you unsubscribe, please let us know why you're leaving:
                </p>
                <RadioGroup value={reason} onValueChange={setReason} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="too_frequent" id="too_frequent" />
                    <Label htmlFor="too_frequent">Emails are too frequent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_relevant" id="not_relevant" />
                    <Label htmlFor="not_relevant">Content isn't relevant to me</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="didnt_signup" id="didnt_signup" />
                    <Label htmlFor="didnt_signup">I didn't sign up for this</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other reason</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalFeedback">Additional feedback (optional)</Label>
                <Textarea
                  id="additionalFeedback"
                  placeholder="How could we improve our newsletter?"
                  value={additionalFeedback}
                  onChange={(e) => setAdditionalFeedback(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Unsubscribe
              </Button>
            </form>
          ) : success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Unsubscribed Successfully</h3>
              <p className="text-center text-muted-foreground">{message}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <XCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Unsubscribe Failed</h3>
              <p className="text-center text-muted-foreground">{message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
