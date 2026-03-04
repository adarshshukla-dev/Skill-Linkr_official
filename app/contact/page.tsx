"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone, CheckCircle, Youtube } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"; // this is the new X icon

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
  
      if (!res.ok) {
        throw new Error("Failed to send message")
      }
  
      toast({
        title: "Message Sent!",
        description: "Thanks for contacting us. We'll get back to you soon.",
      })
  
      setFormData({ name: "", email: "", subject: "", message: "" })
      setFormSuccess(true)
      setTimeout(() => setFormSuccess(false), 5000)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  


  return (
    <div className="space-y-8 py-12">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full">
  {/* Image visible on md and up (laptop/tablet) */}
  <div className="hidden md:block">
    <Image
      src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1746115153/contact_final_banner_n9xdrc.jpg"
      alt="Contact Banner"
      fill
      className="object-cover brightness-50 dark:brightness-100"
    />
  </div>

  {/* Text visible on all screens, but with responsive positioning */}
  {/* Enhanced Contact Us Text for Mobile Only */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-8 bg-gradient-to-b from-black/80 to-black/50 text-white md:hidden">
  <h1 className="text-4xl font-extrabold drop-shadow-md tracking-wide mb-3">
    Contact Us
  </h1>
  <p className="text-lg text-gray-200 max-w-md leading-relaxed drop-shadow-sm">
    Have questions about E-Cell or need help with your startup? We'd love to hear from you.
  </p>
</div>

</section>


      {/* Contact Information and Form */}
      <section className="container">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Get In Touch</h2>
            <p className="text-muted-foreground">
              Feel free to reach out to us with any questions, ideas, or feedback. We're here to help and support your
              entrepreneurial journey.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    Meerut Institute of Technology, NH-58, Delhi-Roorkee Highway, Meerut, Uttar Pradesh - 250103
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="mt-1 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:contact@ecellmit.com" className="hover:underline">
                    ecell@mitmeerut.ac.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="mt-1 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+911234567890" className="hover:underline">
                    +91-9412103645
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/ecell_mitmeerut"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
                >
                  <Instagram className="h-5 w-5 text-blue-600" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ecell-mitmeerut/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
                >
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://x.com/ecell_mitmeerut"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5 text-blue-600" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://www.youtube.com/@ecell_mitmeerut"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
                >
                  <Youtube className="h-5 w-5 text-blue-600" />
                  <span className="sr-only">Youtube</span>
                </a>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Hours of Operation</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-bold">Send us a Message</h2>

              {formSuccess ? (
                <div className="flex flex-col items-center space-y-4 py-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                  <h3 className="text-xl font-medium">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@gmail.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map Section */}
     {/* Map Section */}
<section className="container">
  <div className="rounded-lg overflow-hidden border shadow-sm">
    <div className="h-[400px] w-full bg-muted relative">
    <div className="relative w-full h-[500px]">
    <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.223534120678!2d77.63693667530055!3d28.927900775504806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c667d06790903%3A0x97f5768dc81d63d5!2sMeerut%20Udyami%20Foundation!5e1!3m2!1sen!2sin!4v1745562496898!5m2!1sen!2sin"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="absolute inset-0 w-full h-full border-0"
></iframe>

</div>

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 text-white">
        <p className="text-lg font-medium">Interactive Map</p>
      </div>
    </div>
  </div>
</section>


      {/* FAQ Section */}
      <section className="container py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-2 text-muted-foreground">Find answers to common questions about E-Cell MIT</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">How can I join E-Cell?</h3>
            <p className="mt-2 text-muted-foreground">
              You can join E-Cell by filling out the membership application form on our website or by visiting our
              office during operating hours.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">What resources does E-Cell provide for startups?</h3>
            <p className="mt-2 text-muted-foreground">
              E-Cell provides mentorship, networking opportunities, workspace, seed funding, and access to industry
              experts and investors.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">How can I get funding for my startup?</h3>
            <p className="mt-2 text-muted-foreground">
              E-Cell organizes pitch competitions and investor connect events. You can also apply for our seed funding
              program or get guidance on approaching external investors.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">Do I need to have a business idea to join E-Cell?</h3>
            <p className="mt-2 text-muted-foreground">
              No, you don't need to have a business idea to join. E-Cell welcomes all students interested in
              entrepreneurship, whether you have an idea or want to learn and contribute.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
