import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About E-Cell MIT Meerut – Empowering Entrepreneurship at MIT",
  description:
    "Learn about the mission and vision of E-Cell at Meerut Institute of Technology. Explore how we nurture innovative startups, offer mentorship, and organize events for aspiring entrepreneurs.",
  generator: "E-Cell MIT Meerut",
  icons: {
    icon: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745257881/logo_ou2mgs.png",
  },
  openGraph: {
    title: "About E-Cell MIT Meerut – Entrepreneurship Hub",
    description:
      "Discover the heart of innovation at E-Cell MIT Meerut. We foster entrepreneurship, support startups, and organize events to boost the startup ecosystem at MIT.",
    url: "https://ecell.mitmuf.com/about",
    siteName: "E-Cell MIT Meerut",
    images: [
      {
        url: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745257881/logo_ou2mgs.png",
        width: 800,
        height: 600,
        alt: "E-Cell MIT Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About E-Cell MIT Meerut – Fostering Innovation and Startups",
    description:
      "E-Cell at MIT Meerut supports entrepreneurship by connecting startups, mentors, and investors. Join us to transform ideas into reality.",
    images: [
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745257881/logo_ou2mgs.png",
    ],
  },
  keywords: [
    "E-Cell MIT Meerut",
    "Entrepreneurship Cell MIT",
    "MIT Meerut startups",
    "Entrepreneurship at MIT",
    "startup ecosystem MIT",
    "startup mentorship MIT",
    "MIT Meerut innovation",
    "startup ideas MIT Meerut",
    "student-led startups",
    "startup incubators MIT",
    "startup accelerators MIT",
    "business incubators",
    "business accelerators",
    "student entrepreneurs",
    "startup funding MIT",
    "startup pitch competition",
    "startup ecosystem India",
    "how to start a startup MIT",
    "startup networking MIT",
    "pitch deck",
    "startup grants MIT",
    "startup culture MIT",
    "startup success stories MIT",
    "startup community MIT",
    "startup collaboration MIT",
    "startup mentorship program",
    "startup innovation MIT",
    "entrepreneurship programs MIT",
    "MIT startup events",
    "entrepreneurship workshops MIT",
    "how to pitch a startup",
    "business ideas MIT Meerut",
    "startup incubation MIT",
    "startup accelerator programs",
    "startup funding opportunities",
    "angel investors MIT",
    "venture capital India",
    "startup competitions MIT",
    "startup pitching events MIT",
    "MIT startup hub",
    "E-Cell events MIT",
    "MIT startup mentor network",
    "MIT business school entrepreneurship",
    "entrepreneurship success stories",
    "startup advice MIT",
    "startup training MIT",
    "startup community building MIT",
    "startups and innovation MIT",
  ],
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-16">
      {/* Hero Section */}
      <section className="container">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">About E-Cell</h1>
            <p className="mt-4 text-muted-foreground">
              E-Cell at Meerut Institute of Technology is a student-run organization that aims to promote the spirit of
              entrepreneurship among students. We provide a platform for students to develop their ideas, connect with
              mentors, and launch their startups.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745568084/about_main_banner_hcq79z.jpg"
              alt="E-Cell Team"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* What is E-Cell Section */}
      <section className="bg-blue-50 dark:bg-blue-950/20 py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What is E-Cell?</h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Understanding the entrepreneurship cell and its mission at MIT
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-4">
                <p>
                  The Entrepreneurship Cell (E-Cell) at Meerut Institute of Technology is a student-run organization
                  dedicated to promoting the spirit of entrepreneurship among students. We believe that entrepreneurship
                  is a mindset that can be cultivated through proper guidance, resources, and opportunities.
                </p>
                <p>
                  Our mission is to create an ecosystem that encourages innovative thinking and helps students transform
                  their ideas into viable business ventures. We provide a platform for students to connect with industry
                  experts, mentors, and investors who can guide them on their entrepreneurial journey.
                </p>
                <p>
                  Through various events, workshops, and programs, we aim to equip students with the skills and
                  knowledge they need to succeed as entrepreneurs. We also provide resources such as co-working spaces,
                  seed funding, and mentorship to help startups grow and scale.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745309220/about_2_eec8g6.jpg"
                alt="E-Cell Workshop"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join E-Cell Section */}
      <section className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Join E-Cell?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Benefits and opportunities for students and aspiring entrepreneurs
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
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
                  className="h-6 w-6"
                >
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
                  <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
                  <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
                  <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
                  <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Networking Opportunities</h3>
              <p className="text-muted-foreground">
                Connect with like-minded individuals, industry experts, and successful entrepreneurs who can provide
                guidance and support.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
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
                  className="h-6 w-6"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Skill Development</h3>
              <p className="text-muted-foreground">
                Participate in workshops, training sessions, and competitions that will help you develop essential
                entrepreneurial skills.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
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
                  className="h-6 w-6"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M9 16a2 2 0 0 1 2-2h2a2 2 0 1 1 0 4h-2a2 2 0 0 1-2-2z"></path>
                  <path d="M12 20v-8"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Funding Opportunities</h3>
              <p className="text-muted-foreground">
                Get access to seed funding, pitch to investors, and learn how to secure funding for your startup.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
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
                  className="h-6 w-6"
                >
                  <path d="M2 4v16"></path>
                  <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                  <path d="M2 17h12"></path>
                  <path d="M8 22 2 17l6-5"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Mentorship</h3>
              <p className="text-muted-foreground">
                Receive guidance from experienced mentors who can help you navigate the challenges of entrepreneurship.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
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
                  className="h-6 w-6"
                >
                  <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"></path>
                  <path d="M8 15H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h1"></path>
                  <path d="M15 11h5a2 2 0 1 1 0 4h-5"></path>
                  <path d="M16 5h5a2 2 0 1 1 0 4h-5"></path>
                  <path d="M15 5v16"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Resources and Infrastructure</h3>
              <p className="text-muted-foreground">
                Use our co-working spaces, labs, and other resources to develop and test your ideas.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
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
                  className="h-6 w-6"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Recognition and Visibility</h3>
              <p className="text-muted-foreground">
                Get your startups and ideas recognized by the industry and gain visibility in the entrepreneurial
                ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Problems and Solutions */}
      <section className="bg-blue-50 dark:bg-blue-950/20 py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Common Problems & Solutions</h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Addressing the challenges faced by student entrepreneurs
            </p>
          </div>
          <Tabs defaultValue="problem1" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="problem1">Idea Validation</TabsTrigger>
              <TabsTrigger value="problem2">Funding</TabsTrigger>
              <TabsTrigger value="problem3">Time Management</TabsTrigger>
              <TabsTrigger value="problem4">Technical Skills</TabsTrigger>
              <TabsTrigger value="problem5">Market Access</TabsTrigger>
            </TabsList>
            <TabsContent value="problem1" className="mt-6 space-y-4">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Problem: Idea Validation</h3>
                <p className="mt-2 text-muted-foreground">
                  Students often struggle to determine if their startup ideas are viable and have market potential.
                </p>
                <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
                  <h4 className="font-medium text-blue-600">E-Cell's Solution:</h4>
                  <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                    <li>Idea validation workshops with industry experts</li>
                    <li>Customer discovery programs</li>
                    <li>Market research resources and guidance</li>
                    <li>Prototyping support and feedback sessions</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="problem2" className="mt-6 space-y-4">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Problem: Funding</h3>
                <p className="mt-2 text-muted-foreground">
                  Finding initial capital to start and grow a business is a significant challenge for student
                  entrepreneurs.
                </p>
                <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
                  <h4 className="font-medium text-blue-600">E-Cell's Solution:</h4>
                  <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                    <li>Seed funding programs for promising startups</li>
                    <li>Investor connect events and pitch competitions</li>
                    <li>Grant writing assistance and resources</li>
                    <li>Guidance on bootstrapping and financial planning</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="problem3" className="mt-6 space-y-4">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Problem: Time Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Balancing academic responsibilities with startup activities can be challenging for students.
                </p>
                <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
                  <h4 className="font-medium text-blue-600">E-Cell's Solution:</h4>
                  <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                    <li>Time management workshops and resources</li>
                    <li>Academic-entrepreneurship integration programs</li>
                    <li>Flexible engagement options with E-Cell activities</li>
                    <li>Support for academic credit for startup work</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="problem4" className="mt-6 space-y-4">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Problem: Technical Skills</h3>
                <p className="mt-2 text-muted-foreground">
                  Many students lack the technical skills needed to build their products or services.
                </p>
                <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
                  <h4 className="font-medium text-blue-600">E-Cell's Solution:</h4>
                  <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                    <li>Technical skill development workshops</li>
                    <li>Connection to technical co-founders and partners</li>
                    <li>Access to development resources and tools</li>
                    <li>Technical mentorship from industry professionals</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="problem5" className="mt-6 space-y-4">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Problem: Market Access</h3>
                <p className="mt-2 text-muted-foreground">
                  Students often struggle to reach potential customers and enter the market effectively.
                </p>
                <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
                  <h4 className="font-medium text-blue-600">E-Cell's Solution:</h4>
                  <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                    <li>Industry partnerships and connections</li>
                    <li>Market access strategies and guidance</li>
                    <li>Customer acquisition workshops</li>
                    <li>Demo days and showcase opportunities</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>


      {/* CTA */}
      {/* <section className="container">
        <div className="rounded-2xl bg-blue-600 px-6 py-12 text-center text-white md:px-12 md:py-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Join E-Cell MIT Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Be a part of a community that supports innovation and entrepreneurship. Transform your ideas into reality
            with E-Cell MIT.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">Apply for Membership</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-blue-500  hover:bg-white/10">
              <Link href="/gallery">See Our Past Events</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  )
}
