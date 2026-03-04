"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Authorized admin emails
const ADMIN_EMAILS = ["ecell@mitmeerut.ac.in"]

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState<"send" | "verify" | "none">("none")
  const [otpSent, setOtpSent] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
      toast({
        title: "Invalid Email",
        description: "Please use an authorized admin email address.",
        variant: "destructive",
      })
      return
    }

    setLoading("send")

    try {
      const response = await fetch("/api/admin/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "Please check your email for the OTP.",
        })
        setOtpSent(true)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send OTP. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Network Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading("none")
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      })
      return
    }

    setLoading("verify")

    try {
      const response = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "Redirecting to admin dashboard...",
        })
        router.push("/admin/dashboard")
      } else {
        toast({
          title: "Error",
          description: data.message || "Invalid OTP. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Network Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading("none")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745257881/logo_ou2mgs.png"
              alt="E-Cell Logo"
              width={80}
              height={80}
            />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            {otpSent
              ? "Enter the 6-digit OTP sent to your email"
              : "Login with your admin email to access the dashboard"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4" autoComplete="off">
              <Input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading !== "none"}>
                {loading === "send" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading === "send" ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4" autoComplete="off">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="text-center text-lg tracking-widest"
              />
              <Button type="submit" className="w-full" disabled={loading !== "none"}>
                {loading === "verify" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading === "verify" ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          {otpSent && (
            <Button
              variant="link"
              onClick={() => {
                setOtpSent(false)
                setOtp("")
              }}
              disabled={loading !== "none"}
            >
              Resend OTP
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
