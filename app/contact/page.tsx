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
import { Instagram, Linkedin, Mail, MapPin, Phone, CheckCircle, Youtube, MessageSquare, GraduationCap } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

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
  
      if (!res.ok) throw new Error("Failed to send message")
  
      toast({
        title: "Inquiry Received!",
        description: "Our career counselor will reach out to you within 24 hours.",
      })
  
      setFormData({ name: "", email: "", subject: "", message: "" })
      setFormSuccess(true)
      setTimeout(() => setFormSuccess(false), 5000)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Submission Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section - Skill Linkr Styled */}
      <section className="relative h-[350px] w-full bg-indigo-900">
        <div className="hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" 
            alt="Skill Linkr Support"
            fill
            className="object-cover opacity-40"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Let’s Build Your Career <span className="text-indigo-400">Together</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light">
            Have questions about our certification programs or placement support? Our team is here to guide you.
          </p>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
              <div className="h-1 w-20 bg-indigo-600 mt-2" />
              <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you are a student looking to upskill or a company looking for industry-ready talent, 
                Skill Linkr is your bridge to excellence.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Email Us</h3>
                  <a href="mailto:support@skilllinkr.com" className="text-lg font-medium hover:text-indigo-600">hello@skilllinkr.com</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Call Support</h3>
                  <a href="tel:+919876543210" className="text-lg font-medium hover:text-emerald-600">+91 94121 03645</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Our HQ</h3>
                  <p className="text-slate-700 dark:text-slate-300">Skill Linkr Hub, NH-58, Meerut, UP</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-bold mb-4">Follow Our Community</h3>
              <div className="flex space-x-3">
                {[
                  { icon: <Linkedin className="h-5 w-5" />, href: "#" },
                  { icon: <Instagram className="h-5 w-5" />, href: "#" },
                  { icon: <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />, href: "#" },
                  { icon: <Youtube className="h-5 w-5" />, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="p-3 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-none shadow-2xl shadow-indigo-100 dark:shadow-none bg-white dark:bg-slate-900">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center space-x-2 text-indigo-600">
                <MessageSquare size={20} />
                <span className="font-semibold tracking-wide uppercase text-sm">Send a message</span>
              </div>

              {formSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Inquiry Sent!</h3>
                  <p className="text-slate-500 mt-2">One of our career experts will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} className="bg-slate-50 border-none focus-visible:ring-indigo-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work/Personal Email</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} className="bg-slate-50 border-none focus-visible:ring-indigo-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">I'm interested in...</Label>
                    <Input id="subject" name="subject" placeholder="Full Stack Web Dev / Data Science..." required value={formData.subject} onChange={handleChange} className="bg-slate-50 border-none focus-visible:ring-indigo-500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell us about your career goals..." rows={4} required value={formData.message} onChange={handleChange} className="bg-slate-50 border-none focus-visible:ring-indigo-500" />
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg font-semibold shadow-lg shadow-indigo-200" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Get Free Career Counseling"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skill Linkr Specific FAQ Section */}
      <section className="container max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { 
              q: "How does Skill Linkr help in placements?", 
              a: "We have 200+ hiring partners. Once you complete your project-based training, we organize mock interviews and share your profile directly with recruiters." 
            },
            { 
              q: "Is there a certificate provided?", 
              a: "Yes, you receive an industry-recognized certificate from Skill Linkr along with a verified project portfolio." 
            },
            { 
              q: "Can working professionals join?", 
              a: "Absolutely! Our courses are designed with flexible timings and weekend sessions specifically for career switchers." 
            },
            { 
              q: "Do I get 1:1 mentorship?", 
              a: "Yes, every learner is assigned a mentor from the industry to guide them through projects and technical doubts." 
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-indigo-600 mb-2 flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" /> {item.q}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
