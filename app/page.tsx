"use client"
import Mission from "@/components/page/Mission"
import Supporters from "@/components/page/Supporters"
import Social from "@/components/page/Social"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, GraduationCap, Briefcase, Users, Rocket, Target, Lightbulb, Zap, Globe } from "lucide-react"

// Skill Linkr Carousel Data
const carouselItems = [
  {
    id: 1,
    title: "Master Tech Skills with Skill Linkr",
    description: "Bridging the gap between academic learning and industry demands with hands-on projects.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070", // Replace with Skill Linkr banners
    image_mobile: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000",
    primaryButton: { text: "Explore Courses", href: "/courses" },
    secondaryButton: { text: "Free Counseling", href: "/contact" },
  },
  {
    id: 2,
    title: "Guaranteed Placement Support",
    description: "Our dedicated cell works 24/7 to connect our certified learners with top-tier tech companies.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974",
    image_mobile: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000",
    primaryButton: { text: "Success Stories", href: "/placements" },
    secondaryButton: { text: "Join Community", href: "https://discord.gg/skilllinkr" },
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length)

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={isMobile ? item.image_mobile : item.image}
              alt={item.title}
              fill
              priority={index === 0}
              className="brightness-[0.4] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl animate-in fade-in slide-in-from-top-4 duration-1000">
                {item.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-gray-200">
                {item.description}
              </p>
              <div className="mt-10 flex space-x-4">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link href={item.primaryButton.href}>{item.primaryButton.text}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-900">
                  <Link href={item.secondaryButton.href}>{item.secondaryButton.text}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation */}
        <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 z-20 text-white hover:bg-white/20" onClick={goToPrev}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 z-20 text-white hover:bg-white/20" onClick={goToNext}>
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      <Mission />

      {/* Goals Section for Skill Linkr */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl text-indigo-900 dark:text-indigo-400">
              Why Choose Skill Linkr?
            </h2>
            <p className="mt-4 text-muted-foreground">Empowering the next generation of digital professionals</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Core Values */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
                  <Target className="mr-3 h-6 w-6" /> Our Core Goals
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg h-fit text-indigo-600"><Zap size={20}/></div>
                    <div>
                      <h4 className="font-bold">Industry Relevance</h4>
                      <p className="text-sm text-muted-foreground">Curriculum designed by industry experts to match current market trends.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg h-fit text-indigo-600"><Briefcase size={20}/></div>
                    <div>
                      <h4 className="font-bold">Career Readiness</h4>
                      <p className="text-sm text-muted-foreground">Focus on soft skills, resume building, and mock interviews.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Strategy */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
                  <Lightbulb className="mr-3 h-6 w-6" /> Learning Methodology
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg h-fit text-indigo-600"><Rocket size={20}/></div>
                    <div>
                      <h4 className="font-bold">Project-Based Learning</h4>
                      <p className="text-sm text-muted-foreground">Don't just watch videos. Build real-world applications and portfolios.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg h-fit text-indigo-600"><Globe size={20}/></div>
                    <div>
                      <h4 className="font-bold">Global Networking</h4>
                      <p className="text-sm text-muted-foreground">Access to a worldwide community of mentors and alumni.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="container px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-4xl">The Skill Linkr Impact</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4" />
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <GraduationCap />, title: "Certified Learners", count: "10,000+", desc: "Students transformed across various domains." },
            { icon: <Briefcase />, title: "Hiring Partners", count: "200+", desc: "Top companies recruiting from our talent pool." },
            { icon: <Users />, title: "Expert Mentors", count: "150+", desc: "Learn directly from senior industry leads." },
            { icon: <Rocket />, title: "Avg. Salary Hike", count: "70%", desc: "Significant career growth for working professionals." }
          ].map((stat, i) => (
            <Card key={i} className="text-center hover:border-indigo-500 transition-colors cursor-default">
              <CardContent className="pt-8">
                <div className="text-indigo-600 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.count}</div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200">{stat.title}</h4>
                <p className="text-xs text-muted-foreground mt-2">{stat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Social />
      <Supporters />
    </div>
  )
}
