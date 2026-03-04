import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Skill Linkr – Empowering Student Freelancers & Startups",
  description:
    "Skill Linkr is a budget-friendly platform connecting student freelancers with local shops and startups. Earn while learning and build your professional portfolio.",
  generator: "Skill Linkr",
  icons: {
    icon: "/logo.png", // Update with your actual logo path
  },
  openGraph: {
    title: "Skill Linkr – The Ultimate Student Freelancing Hub",
    description:
      "Bridging the gap between talented students and local businesses. Get quality work at budget-friendly prices.",
    url: "https://skilllinkr.com/about",
    siteName: "Skill Linkr",
    type: "website",
  },
  keywords: [
    "Student Freelancing",
    "Skill Linkr",
    "Cheap Website for Startups",
    "Earn money as student",
    "Local business digital marketing",
    "Student portfolio builder",
    "Micro tasks for students",
  ],
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-16">
      {/* Hero Section */}
      <section className="container">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">About Skill Linkr</h1>
            <p className="mt-4 text-xl font-medium text-blue-600">Where Learning Meets Earning.</p>
            <p className="mt-4 text-muted-foreground">
              Skill Linkr ek aisa platform hai jo students ko real-world projects se jodta hai. Hum local shops aur 
              naye startups ko budget-friendly services dete hain, jabki students ko milta hai mauka apni skills 
              ko monetize karne ka.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild>
                <Link href="/projects">Browse Projects</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Join as Freelancer</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
              alt="Students collaborating"
              fill
              className="rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="bg-blue-50 dark:bg-blue-950/20 py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Concept</h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground text-lg">
              Empowering local businesses while building student careers.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <h3 className="font-bold text-lg">1. Student-Focused Freelancing</h3>
                    <p className="text-muted-foreground">Hum naye freelancers (students) ko platform dete hain jo Upwork/Fiverr ki bheed mein kho jaate hain.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <h3 className="font-bold text-lg">2. Budget-Friendly for Clients</h3>
                    <p className="text-muted-foreground">Local shops aur startups ko sasti aur quality web development & graphic services milti hain.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <h3 className="font-bold text-lg">3. Skill Development</h3>
                    <p className="text-muted-foreground">Students actual business problems solve karte hain, jisne unka portfolio majboot hota hai.</p>
                </div>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                alt="Business growth"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Skill Linkr? Section */}
      <section className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Skill Linkr?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                💰
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Earning Bar</h3>
              <p className="text-muted-foreground">
                Micro-tasks jaise surveys aur ad watching ke zariye turant kamayi shuru karein. Minimum cashout sirf $10.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                🚀
              </div>
              <h3 className="mb-2 text-xl font-semibold">Startup Upliftment</h3>
              <p className="text-muted-foreground">
                Hum local businesses ko unka pehla professional website aur branding material banane mein help karte hain.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                🤝
              </div>
              <h3 className="mb-2 text-xl font-semibold">Safe Agreements</h3>
              <p className="text-muted-foreground">
                Guru.com ki tarah SafePay aur work agreements taaki student aur client dono ka paisa aur kaam safe rahe.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ways to Earn Tabs */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ways to Earn & Grow</h2>
            <p className="mt-2 text-muted-foreground">Choose your path on Skill Linkr</p>
          </div>
          <Tabs defaultValue="freelancing" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="freelancing">Freelancing</TabsTrigger>
              <TabsTrigger value="microtasks">Micro Tasks</TabsTrigger>
              <TabsTrigger value="startup">Startups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="freelancing" className="mt-6">
              <div className="rounded-lg bg-background p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-blue-600">Professional Gigs</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>• Web & App Development for local shops</li>
                  <li>• Graphic Designing (Logos, Banners)</li>
                  <li>• Video Editing for Social Media</li>
                  <li>• Content Writing & Management</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="microtasks" className="mt-6">
              <div className="rounded-lg bg-background p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-green-600">Easy Tasks (Quick Money)</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>• Online Surveys & Market Research</li>
                  <li>• Social Media Tasks (Like/Follow/Share)</li>
                  <li>• AI Training Data Labeling</li>
                  <li>• Testing new products/apps</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="startup" className="mt-6">
              <div className="rounded-lg bg-background p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-purple-600">Business Support</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>• Direct hiring from startup founders</li>
                  <li>• Equity-based collaboration for co-founders</li>
                  <li>• Business expansion consultancy</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="rounded-2xl bg-blue-600 px-6 py-12 text-center text-white md:px-12 md:py-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Join the community of 500+ students and local businesses already growing together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/register">Create Your Profile</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/pricing">View Service Packages</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
