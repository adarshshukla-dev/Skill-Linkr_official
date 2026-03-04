"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Quote, 
  Target, 
  Rocket, 
  Users, 
  Briefcase, 
  GraduationCap, 
  TrendingUp,
  Linkedin,
  Instagram,
  Mail
} from "lucide-react"

// Stats Data
const stats = [
  { id: 1, label: "Happy Clients", value: "10+", icon: <Users className="h-6 w-6" /> },
  { id: 2, label: "Paid to Students", value: "₹10K+", icon: <Briefcase className="h-6 w-6" /> },
  { id: 3, label: "Success Rate", value: "90%", icon: <TrendingUp className="h-6 w-6" /> },
  { id: 4, label: "Top Colleges", value: "10+", icon: <GraduationCap className="h-6 w-6" /> },
]

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-blue-600 blur-[100px]"></div>
          <div className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-indigo-600 blur-[100px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-blue-400 border border-blue-500/20">
            <Heart size={16} />
            <span className="text-sm font-medium uppercase tracking-wider">Our Story</span>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">
            About <span className="text-blue-500">Skill Linkr</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl">
            Empowering students to earn, learn & grow while connecting businesses 
            with affordable, quality talent from India's top colleges.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container mx-auto -mt-20 px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.id} className="border-none shadow-xl dark:bg-slate-800">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 text-blue-600">{stat.icon}</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Our Journey</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Founded with a simple yet powerful idea: <strong className="text-blue-600">talented students deserve real opportunities</strong>, 
              and businesses deserve <strong className="text-blue-600">affordable quality talent</strong>.
            </p>
            
            <div className="space-y-4">
              {[
                "Student Freelancers struggle to find work despite high-level skills",
                "Small businesses can't afford expensive agencies",
                "Skill Linkr bridges this gap with transparent pricing"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    0{idx + 1}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{point}</p>
                </div>
              ))}
            </div>

            <Card className="bg-slate-50 dark:bg-slate-900 border-l-4 border-l-blue-600">
              <CardContent className="p-6">
                <Quote className="mb-2 h-8 w-8 text-blue-200" />
                <p className="text-lg italic text-slate-700 dark:text-slate-300">
                  "Learning by doing is the best education. Skill Linkr makes it possible."
                </p>
                <div className="mt-4 font-bold text-slate-900 dark:text-white">— Adarsh Shukla, Founder</div>
              </CardContent>
            </Card>
          </div>

          <div className="relative flex justify-center">
            <div className="h-64 w-64 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-2xl animate-pulse">
               <GraduationCap size={100} />
            </div>
            {/* Background decorative elements */}
            <div className="absolute -z-10 h-72 w-72 rounded-full border-2 border-dashed border-blue-200 animate-[spin_10s_linear_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Purpose</h2>
            <p className="mt-2 text-slate-500">Guided by clear values & ambitious goals</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="group hover:border-blue-500 transition-colors">
              <CardContent className="p-8">
                <div className="mb-4 inline-block rounded-lg bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Target size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Create opportunities for every talented student to <strong className="text-slate-900 dark:text-white">earn while learning</strong>, 
                  gain real-world experience & build their professional portfolio through meaningful projects.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:border-indigo-500 transition-colors">
              <CardContent className="p-8">
                <div className="mb-4 inline-block rounded-lg bg-indigo-100 p-3 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Rocket size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Become <strong className="text-slate-900 dark:text-white">India's #1 student freelance platform</strong> — where 
                  education meets entrepreneurship at scale, making quality talent accessible to everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center rounded-3xl bg-blue-600 p-8 text-white md:flex-row md:p-16">
          <div className="mb-8 shrink-0 md:mb-0 md:mr-12">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-2xl transition-transform hover:scale-105">
              <Image 
                src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1770745005/Untitled_ydosf4.png" // Adarsh Shukla Image
                alt="Adarsh Shukla"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold md:text-4xl">Adarsh Shukla</h2>
            <p className="text-xl font-medium text-blue-100 italic">Founder & Visionary</p>
            <p className="max-w-xl text-blue-50 leading-relaxed">
              Adarsh is on a mission to revolutionize how students approach their careers. 
              By bridging the gap between classroom theory and industry practice, he's 
              helping thousands of students build their financial independence.
            </p>
            <div className="flex justify-center space-x-4 md:justify-start">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Linkedin size={20} />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Instagram size={20} />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Mail size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
