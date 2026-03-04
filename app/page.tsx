"use client"
import Mission from "@/components/page/Mission"
import Supporters from "@/components/page/Supporters"
import Social from "@/components/page/Social"
// import CTA from "@/components/page/CTA"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "@/lib/fontawesome"


// Carousel data
const carouselItems = [
  {
    id: 1,
    title: "IDEATHON 2026",
    description: "",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1771043658/ideathon_desktop_banner_stasdp.jpg",
    image_mobile: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1771043670/WhatsApp_Image_2026-02-13_at_16.23.38_ss4obp.jpg",
    primaryButton: { text: "Register Now", href: "https://forms.gle/UiEGryAppZxkr2Us7" },
    secondaryButton: { text: "Get in Touch", href: "/contact" },
  },
  {
    id: 2,
    title: "Empowering Innovation at MIT",
    description: "Transforming ideas into successful startups through mentorship, resources, and community",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745744041/home_banner_gi1cd7.png",
    image_mobile: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1746114306/home_banner_mobile_final_kaolmy.jpg",
    primaryButton: { text: "Learn More", href: "/about" },
    secondaryButton: { text: "Get in Touch", href: "/contact" },
  },
  {
    id: 3,
    title: "",
    description: "Join  MUF-MIT and get the support you need to launch your startup",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1746115152/Muf_laptop_final_banner_wor1sh.jpg",
    image_mobile: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1746114304/MUF_mobile_final_banner_fl6bus.jpg",
    primaryButton: { text: "Our Programs", href: "https://www.mitmuf.com/" },
    secondaryButton: { text: "Join Now", href: "https://forms.gle/2C38Gj36ux6xkK5NA" },
  },
  {
    id: 4,
    title: "Meerut Institute of Technology",
    description: "A hub for aspiring entrepreneurs and innovators",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1746115153/mit_banner_final_laptop_chbsmh.jpg",
    image_mobile:"https://res.cloudinary.com/dp2olwtzp/image/upload/v1746114305/mit_mobile_final_banner_lhcgwp.jpg",
    primaryButton: { text: "Visit", href: "https://mitmeerut.net.in/" },
    secondaryButton: { text: "More Info", href: "https://www.linkedin.com/in/meerut-institute-of-technology-meerut/" },
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Carousel */}
      <div className="relative w-full">
  <div className="relative h-[100vh] w-full overflow-hidden">
    {carouselItems.map((item, index) => {
      const imageSrc = isMobile && item.image_mobile ? item.image_mobile : item.image || "/placeholder.svg";

      return (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={imageSrc}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{item.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl">{item.description}</p>
            <div className="mt-8 flex space-x-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href={item.primaryButton.href}>{item.primaryButton.text}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-blue-600 hover:bg-blue-500 hover:text-white"
              >
                <Link href={item.secondaryButton.href}>{item.secondaryButton.text}</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* Navigation buttons */}
  <Button
    variant="outline"
    size="icon"
    className="absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/40"
    onClick={goToPrev}
  >
    <ChevronLeft className="h-6 w-6" />
  </Button>
  <Button
    variant="outline"
    size="icon"
    className="absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/40"
    onClick={goToNext}
  >
    <ChevronRight className="h-6 w-6" />
  </Button>

  {/* Dots indicator */}
  <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
    {carouselItems.map((_, index) => (
      <button
        key={index}
        className={`h-2 w-2 rounded-full transition-all ${
          index === currentSlide ? "bg-white w-4" : "bg-white/50"
        }`}
        onClick={() => goToSlide(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</div>


      {/* Mission and Innovation */}
      <Mission />

      {/* Social Impact */}
      <Social />

      {/* Our Supporters */}
      <Supporters />


  {/* Goals and Objectives of E-cell */}
  <section className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-background py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Goals and Objectives of E-Cell
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Our mission to foster entrepreneurship and innovation among students
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="mb-6 text-2xl font-semibold text-blue-600 flex items-center">
                  <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 2v4M3 6l3 3M2 12h4M3 18l3-3M12 22v-4M21 6l-3 3M22 12h-4M21 18l-3-3"></path>
                    </svg>
                  </div>
                  Goals of an Entrepreneurship Cell
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Spark Innovation</p>
                      <p className="text-muted-foreground">
                        Inspire students to think outside the box and take bold steps.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Nurture Startup Spirit</p>
                      <p className="text-muted-foreground">
                        Encourage young minds to explore and chase their business ideas.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Build a Strong Support System</p>
                      <p className="text-muted-foreground">
                        Create a community where mentors, peers, and resources come together.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Grow Real-World Skills</p>
                      <p className="text-muted-foreground">
                        Help students develop leadership, problem-solving, and practical know-how.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="mb-6 text-2xl font-semibold text-blue-600 flex items-center">
                  <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  Objectives of an Entrepreneurship Cell
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Host Exciting Events</p>
                      <p className="text-muted-foreground">
                        From workshops to hackathons, create hands-on learning experiences.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Provide Mentorship</p>
                      <p className="text-muted-foreground">Guide early-stage ideas with expert advice and support.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Connect with Industry</p>
                      <p className="text-muted-foreground">
                        Open doors to alumni and professionals for valuable insights and networking.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 shadow-sm">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">Share the Right Tools</p>
                      <p className="text-muted-foreground">
                        Give access to funding sources, information and growth opportunities.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
     
      {/* Impact of our E-cell on college students */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Impact of our E-Cell on College Students
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            How our entrepreneurship initiatives transform student experiences and career trajectories
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-blue-600">
            <CardContent className="p-6">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 mx-auto shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-center">Skill Development</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Critical Thinking & Problem Solving</span>
                  <span>Students learn to approach challenges creatively.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Leadership & Teamwork</span>
                  <span>E-Cell activities require coordination, delegation, and team management.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Communication Skills</span>
                  <span>Pitching ideas, presenting plans, and networking enhances confidence.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-blue-600">
            <CardContent className="p-6">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 mx-auto shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-center">Real-World Exposure</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Startup & Business Insights</span>
                  <span>Exposure to how startups work, from ideation to execution.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Interaction with Experts</span>
                  <span>Learning from real entrepreneurs, investors, and mentors.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Understanding Risk & Failure</span>
                  <span>Builds resilience by experiencing setbacks and learning from them.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-blue-600">
            <CardContent className="p-6">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 mx-auto shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-center">Career Enhancement</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Entrepreneurial Opportunities</span>
                  <span>Motivates students to launch their own ventures.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Better Employability</span>
                  <span>E-Cell experience stands out in resumes and job interviews.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Internships & Live Projects</span>
                  <span>Opens doors to work in startups and innovative firms.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-blue-600">
            <CardContent className="p-6">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 mx-auto shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-center">Personal Growth & Confidence</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Self-Motivation</span>
                  <span>Encourages initiative-taking and independent thinking.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Networking & Collaboration</span>
                  <span>Builds strong professional and peer networks.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-blue-600">Ownership Mentality</span>
                  <span>Develops accountability and decision-making skills.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact on Community
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Impact on the Community</h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Our initiatives have created positive change in the student and startup ecosystem.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 text-3xl font-bold text-blue-600">50+</div>
              <h3 className="mb-2 text-lg font-medium">Startups Incubated</h3>
              <p className="text-sm text-muted-foreground">
                We've helped over 50 student startups turn their ideas into successful businesses.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 text-3xl font-bold text-blue-600">100+</div>
              <h3 className="mb-2 text-lg font-medium">Events Organized</h3>
              <p className="text-sm text-muted-foreground">
                We've organized over 100 events, workshops, and bootcamps to foster entrepreneurship.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 text-3xl font-bold text-blue-600">₹10M+</div>
              <h3 className="mb-2 text-lg font-medium">Funding Raised</h3>
              <p className="text-sm text-muted-foreground">
                Our startups have collectively raised over ₹10 million in funding.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 text-3xl font-bold text-blue-600">5000+</div>
              <h3 className="mb-2 text-lg font-medium">Students Reached</h3>
              <p className="text-sm text-muted-foreground">
                We've impacted over 5000 students through our programs and initiatives.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      
      

      {/* CTA */}
      {/* <CTA /> */}
    </div>
  )
}
