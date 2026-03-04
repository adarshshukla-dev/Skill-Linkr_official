"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Linkedin, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

// Sample blog posts (in a real implementation, these would be fetched from LinkedIn API)
const blogPosts = [
   {
    id: 54,
    title: "When Technology Walks with the Farmer; Not Ahead of Them",
    excerpt:
      "In a state as expansive and agriculturally diverse as Uttar Pradesh, improving support systems for farmers is a constant balancing act between scale and specificity. With over 75 districts and thousands of gram panchayats, even the best policies can falter without the right tools for delivery.",
    date: "2025-07-14",
    category: "AgriTech",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1752476946/54_1_1_1_jzc2yt.jpg",
    url: "https://www.linkedin.com/pulse/when-technology-walks-farmer-ahead-them-muf-udyami-olkbc/",
  },
  {
    id: 53,
    title: "What Artificial Rain Can (and Can’t) DoP",
    excerpt:
      "Every few months, the idea of “artificial rain” makes its way back into the news — sometimes as a solution to smog-choked cities, other times as a drought relief strategy for struggling farms. Lately, places like Delhi and Maharashtra have shown renewed interest, testing if science can do what monsoons sometimes don’t: make it rain when it’s needed most.",
    date: "2025-07-07",
    category: "AgriTech",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1751918113/53_nty1mz.jpg",
    url: "https://www.linkedin.com/pulse/what-artificial-rain-can-cant-do-muf-udyami-uskkc/",
  },
  {
    id: 52,
    title: "How to Apply for Agricultural Equipment Subsidy in UP",
    excerpt:
      "Farming has never been easy, and in recent years, it has only become more demanding. From rising input costs to shrinking labour availability, farmers are often expected to do more with less. While innovation in agriculture is talked about often, it rarely reaches the people working closest to the soil.",
    date: "2025-06-30",
    category: "Rural Development",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1751264788/52_v0ffk6.jpg",
    url: "https://www.linkedin.com/pulse/how-apply-agricultural-equipment-subsidy-up-muf-udyami-zx7jc/?trackingId=HNfgX1PhTxaI1Rx2kDFCTg%3D%3D",
  },
   {
    id: 51,
    title: "Agri Stack and the Shape of Support to Come",
    excerpt:
      "If you’ve ever watched a farmer leaf through a tattered folder of land documents, waiting hours at a bank counter, you’ll understand why digitisation in agriculture isn’t just a policy buzzword — it’s a necessity. ",
    date: "2025-06-23",
    category: "Funding",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1750661234/51_tnmfhc.jpg",
    url: "https://www.linkedin.com/pulse/agri-stack-shape-support-come-muf-udyami-tqunc/",
  },
  {
    id: 50,
    title: "A Year in Updates, Give or Take",
    excerpt:
      "Fifty weeks. I almost didn’t realise we had reached this number until someone pointed it out last week. That’s nearly a year of sitting down, week after week, and writing. Some weeks, the words came easily. Some weeks, they didn’t. But here we are.",
    date: "2025-06-16",
    category: "StartupInsights",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1750054389/50_alhdur.jpg",
    url: "https://www.linkedin.com/pulse/year-updates-give-take-muf-udyami-nptdc/?trackingId=6Uxdo7bxQfC8VgM0J6l9kg%3D%3D",
  },
  {
    id: 49,
    title: "Knowing Tomorrow by Your Panchayat | Bharat Forecasting System",
    excerpt:
      "For years, Indian farmers have worked with weather that was more guesswork than guidance. A forecast might say 'rain in eastern Uttar Pradesh,' but what does that mean for someone in a small village in Ballia or Deoria?",
    date: "2025-06-09",
    category: "AgriTech",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1749487683/49_lptqj1.jpg",
    url: "https://www.linkedin.com/pulse/knowing-tomorrow-your-panchayat-bharat-forecasting-system-jhg0c/?trackingId=y390H2egTpCbqDwuZcAqHQ%3D%3D",
  },
  {
    id: 48,
    title: "225 Teams Reaching 10,125 Villages for Technology-Driven Farming",
    excerpt:
      "India’s agricultural future stands at a critical inflection point. With increasing environmental volatility, declining land productivity, and the pressing urgency to feed a growing population, the role of systemic.",
    date: "2025-06-02",
    category: "AgriNews",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1748873495/48_flgic3.jpg",
    url: "https://www.linkedin.com/pulse/225-teams-reaching-10-125-villages-technology-driven-farming-yqmcc/?trackingId=3G2jM%2B8zR%2FK%2Bx1SKNlgEEQ%3D%3D",
  },
   {
    id: 47,
    title: "Science Is Catching Up with the Soil",
    excerpt:
      "Agriculture, one of humanity’s oldest practices, is at a turning point. For centuries, farmers have relied on traditional knowledge, trial and error, and generational wisdom to cultivate crops.",
    date: "2025-05-26",
    category: "Data & Technology in Farming",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1748276835/47_vhee0c.jpg",
    url: "https://www.linkedin.com/pulse/science-catching-up-soil-muf-udyami-jl8bc/",
  },
  {
    id: 46,
    title: "Beyond Ploughs and Phones; UP’s AI Pragya Movement",
    excerpt:
      "On May 9, 2025, a new chapter in Uttar Pradesh’s development story unfolded when Chief Minister Yogi Adityanath stood alongside World Bank President Ajay Banga to launch two transformative initiatives—UP AGREES and AI Pragya.",
    date: "2025-05-19",
    category: "Startup",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1747661388/46_ek0o8f.jpg",
    url: "https://www.linkedin.com/pulse/beyond-ploughs-phones-ups-ai-pragya-movement-muf-udyami-3kjdc/?trackingId=KjMLCrAHTzSZQRjNZyD2%2Bg%3D%3D",
  },
  {
    id: 45,
    title: "India Wants to Feed the World and This is the Plan",
    excerpt:
      "India stands at a pivotal moment in its agricultural journey. For decades, the country has held its place as one of the world’s largest producers of key crops—rice, wheat, sugarcane, pulses, and spices.",
    date: "2025-05-12",
    category: "Startup",
    image: "https://res.cloudinary.com/ddtcj9ks5/image/upload/v1747035461/45_tcgp5f.jpg",
    url: "https://www.linkedin.com/pulse/india-wants-feed-world-plan-muf-udyami-fov1e/",
  },
  {
    id: 44,
    title: "What the ₹550 Cr Krishonnati Allocation Means for UP Farmers and Agri Startups",
    excerpt:
      "In a state where nearly 65% of the population still depends on agriculture, a meaningful push toward profitable and sustainable farming can be a true game-changer.",
    date: "2025-05-05",
    category: "AgriNews",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1746430466/blog_44_cs4je9.jpg",
    url: "https://www.linkedin.com/pulse/what-550-cr-krishonnati-allocation-means-up-farmers-agri-startups-z4puc/?trackingId=c8C3u%2BxbQoOwOFfo4ap2YA%3D%3D",
  },
  {
    id: 43,
    title: "Inside Uttar Pradesh’s Largest Push for Cow-Based Natural Farming",
    excerpt:
      "Bundelkhand, a region that often finds its name in headlines for droughts, distressed farmers, and depleted soil, is beginning to tell a different story. For decades, its parched lands have been a symbol of agricultural vulnerability in India",
    date: "2025-04-28",
    category: "Agriculture",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745815040/1745651240375_q71enx.png",
    url: "https://www.linkedin.com/pulse/inside-uttar-pradeshs-largest-push-cow-based-natural-farming-ppzkc/",
  },
  {
    id: 42,
    title: "The Data Farmers Didn't Know They Were Growing",
    excerpt:
      "Walk through any farming village in western Uttar Pradesh today, and you'll likely hear a common thread in conversations—something is changing.",
    date: "2025-04-21",
    category: "Data & Technology in Farming",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745414585/blog_1_elms0l.png",
    url: "https://www.linkedin.com/pulse/data-farmers-didnt-know-were-growing-muf-udyami-nstqc/?trackingId=0sGFPXZ5QC2Ymg0o%2Bkgprw%3D%3D",
  },
  {
    id: 41,
    title: "How Raheja Solar is Changing the Way India Preserves and Profits from Produce",
    excerpt:
      "When an marketing executive at Raheja Solar Food Processing Pvt. Ltd., reached out to us over email, his message wasn't about flashy promotions—",
    date: "2025-04-14",
    category: "Startup",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745414733/blog_2_tmm36r.png",
    url: "https://www.linkedin.com/pulse/how-raheja-solar-changing-way-india-preserves-profits-from-fyg1c/?trackingId=PAsCsFQoRz2y1HYKGTBmKA%3D%3D",
  },
  {
    id: 40,
    title: "How Carbon Farming Can Transform Uttar Pradesh's Agriculture",
    excerpt:
      "When Ramveer Singh, a third-generation farmer in Western Uttar Pradesh, looked at his fields last summer, something didn't feel right. ",
    date: "2025-04-07",
    category: "Carbon Farming",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745415499/blog_40_mmfzj9.jpg",
    url: "https://www.linkedin.com/pulse/how-carbon-farming-can-transform-uttar-pradeshs-agriculture-hcd4c/?trackingId=Dk%2BGa1QpSyKLMWBll86t4g%3D%3D",
  },
  {
    id: 39,
    title: "Agrivoltaics is Here—And Some States Are Moving Faster Than Others",
    excerpt:
      "Agrivoltaics is emerging as a transformative solution that seamlessly integrates solar energy generation with agricultural productivity, addressing two of the most pressing challenges of our time—",
    date: "2025-03-31",
    category: "Agrivoltaics",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745415824/blog_39_dicvjr.png",
    url: "https://www.linkedin.com/pulse/agrivoltaics-hereand-some-states-moving-faster-than-others-v152c/?trackingId=vf%2F%2FSvXiQDm1dz%2FOV%2BTJPw%3D%3D",
  },
  {
    id: 38,
    title: "The Hidden Carbon Cost of Agriculture's Fertilizer Dependency",
    excerpt:
      "Fertilizers have long been the backbone of modern agriculture, enabling farmers to enhance crop productivity and meet the growing demands of an expanding population. ",
    date: "2025-03-24",
    category: "Agriculture",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745416102/blog_38_gxla8y.png",
    url: "https://www.linkedin.com/pulse/hidden-carbon-cost-agricultures-fertilizer-dependency-muf-udyami-gfjec/?trackingId=2o0x8tpnQUSsoezZOCG%2BnQ%3D%3D",
  },
  {
    id: 37,
    title: "Natural Healing, Real Impact: The Bikalp Herbals Approach",
    excerpt:
      "Women's health has often been overlooked, with issues like hormonal imbalances, menstrual irregularities, and PCOS affecting millions, yet receiving limited attention. ",
    date: "2025-03-17",
    category: "Startup",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745417045/blog_37_smvc8o.png",
    url: "https://www.linkedin.com/pulse/natural-healing-real-impact-bikalp-herbals-approach-muf-udyami-hrcyc/?trackingId=NxOb7wf2S%2BSI8eN0izjahw%3D%3D",
  },
  {
    id: 36,
    title: "From Cow Shelters to Natural Farming Centers: A New Chapter in UP Agriculture",
    excerpt:
      "Uttar Pradesh is taking a significant step toward reshaping its agricultural landscape by transforming traditional cow shelters into self-sustaining hubs for natural farming.",
    date: "2025-03-10",
    category: "Agriculture",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745417396/blog_36_jafgbw.png",
    url: "https://www.linkedin.com/pulse/from-cow-shelters-natural-farming-centers-new-chapter-up-agriculture-a416c/?trackingId=QG5gCAb4TD6gMt7ze4tdhQ%3D%3D",
  },
  {
    id: 35,
    title: "How Incubators Drive Growth and Innovation in Agribusiness Startups",
    excerpt:
      "The agribusiness sector is experiencing a surge in entrepreneurial activity, with a growing demand for organic, sustainable, and value-added agricultural products.",
    date: "2025-03-03",
    category: "Startup",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745417507/blog_35_bjpqc4.jpg",
    url: "https://www.linkedin.com/pulse/how-incubators-drive-growth-innovation-agribusiness-startups-kqkie/?trackingId=a67kchaHSMetQc3CzlfnUg%3D%3D",
  },
  {
    id: 34,
    title: "Sustaining Agriculture in the Face of Climate Change",
    excerpt:
      "In the Indian Himalayan Region, where rugged terrains and fragile ecosystems are the norm, agriculture remains not only a source of livelihood but also a critical pillar for regional stability.",
    date: "2025-02-24",
    category: "Climate Change",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745417693/blog_34_geswmo.jpg",
    url: "https://www.linkedin.com/pulse/sustaining-agriculture-face-climate-change-muf-udyami-rzitc/?trackingId=1x7CpjzUQraUDNmkTTMi8g%3D%3D",
  },
  {
    id: 33,
    title:
      "When Traditional Loans Fall Short, New Funding Empowers Rural Dreams – Paving the Way for Tomorrow's Agripreneurs",
    excerpt:
      "In today's rapidly evolving economic landscape, rural entrepreneurs are increasingly recognized as catalysts for local and national growth. However, traditional banking methods—",
    date: "2025-02-17",
    category: "Funding",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745417871/blog_33_mdjd06.jpg",
    url: "https://www.linkedin.com/pulse/when-traditional-loans-fall-short-new-funding-empowers-rural-ywktc/?trackingId=A3uY1egxREusWqpBOOIXWQ%3D%3D",
  },
  {
    id: 32,
    title: "Digital Innovation Keeps Every Harvest Fresh and Minimizes Waste",
    excerpt:
      "In the heart of rural communities, where family farms are the lifeblood of local economies, food loss is not merely a statistic—it is a deeply personal challenge that affects the well-being of entire households.",
    date: "2025-02-10",
    category: "Digital Innovation",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745417978/blog_32_m2exfk.jpg",
    url: "https://www.linkedin.com/pulse/digital-innovation-keeps-every-harvest-fresh-minimizes-waste-xsnnc/?trackingId=RcQWyDVdQAO%2Bb8YywR4v%2Bg%3D%3D",
  },
  {
    id: 31,
    title: "UP-AGREES Driving Agricultural Growth and Rural Prosperity in Uttar Pradesh - A Detailed Outlook",
    excerpt:
      "Uttar Pradesh has long been the food basket of India, leading in the production of wheat, potatoes, mangoes, guavas, peas, and more. With 75% of the state's land cultivable,",
    date: "2025-02-03",
    category: "Agriculture",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745418144/blog_31_iqtrqk.jpg",
    url: "https://www.linkedin.com/pulse/up-agrees-driving-agricultural-growth-rural-prosperity-i6vac/?trackingId=l%2FrT%2BvTTQ7%2BgMspWcN7rUA%3D%3D",
  },
  {
    id: 30,
    title: "Building Stronger Communities Through Cooperative Entrepreneurship",
    excerpt:
      "Cooperative entrepreneurship is more than just an idea—it's about building stronger communities, fostering collaboration, and creating shared opportunities for growth. ",
    date: "2025-01-27",
    category: "Entrepreneurship",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745418286/blog_30_aap3gb.png",
    url: "https://www.linkedin.com/pulse/building-stronger-communities-through-cooperative-vtpbc/?trackingId=GmD%2BbbISQJ%2Bj0A8wm8Rvfw%3D%3D",
  },
]

const itemsPerPage = 6

export function BlogContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  // Subscription popup state
  const [showSubscribePopup, setShowSubscribePopup] = useState(false)

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  // Apply filters
  useEffect(() => {
    let results = blogPosts

    if (searchTerm) {
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter && categoryFilter !== "all") {
      results = results.filter((post) => post.category === categoryFilter)
    }

    if (dateFilter) {
      // Extract year and month from the date filter (format: YYYY-MM)
      const [filterYear, filterMonth] = dateFilter.split("-").map(Number)

      results = results.filter((post) => {
        const postDate = new Date(post.date)
        return postDate.getFullYear() === filterYear && postDate.getMonth() + 1 === filterMonth
      })
    }

    setFilteredPosts(results)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, categoryFilter, dateFilter])

  // Show subscription popup on first visit
  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem("ecell-linkedin-popup-seen")

    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowSubscribePopup(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  // Function to handle popup close
  const handleClosePopup = () => {
    setShowSubscribePopup(false)
    // Save that user has seen the popup
    localStorage.setItem("ecell-linkedin-popup-seen", "true")
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const currentPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-8 py-12">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full">
        {/* Show image only on medium (md) and larger screens */}
        <div className="hidden md:block h-full w-full relative">
          <Image
            src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745595767/blog_section_banner_gbh06e.jpg"
            alt="E-Cell Blog - Entrepreneurship Insights and Stories from MIT Meerut"
            fill
            className="object-cover brightness-75 dark:brightness-90 "
            priority
          />
        </div>

       {/* Stylish Text Section for Mobile Screens Only */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-8 bg-gradient-to-b from-black/70 to-black/40 md:hidden">
  <h1 className="text-4xl font-extrabold text-white drop-shadow-md tracking-wide mb-3">
    E-Cell Blog
  </h1>
  <p className="text-lg text-gray-200 max-w-md leading-relaxed drop-shadow-sm">
    Insights, advice, and stories from the entrepreneurial journey
  </p>
</div>

      </section>

      {/* LinkedIn Subscribe Button */}
      <section className="container py-6">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 text-center">
            <h3 className="text-xl font-semibold">Stay Updated with Our Newsletter</h3>
            <p className="text-muted-foreground">
              Subscribe to our LinkedIn newsletter for the latest entrepreneurship insights
            </p>
          </div>
          <a
            href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7215949327922253825"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-full bg-[#0A66C2] px-6 py-2 text-white hover:bg-[#0A66C2]/90 transition-colors"
            aria-label="Subscribe to E-Cell MIT Meerut LinkedIn Newsletter"
          >
            <Linkedin className="mr-2 h-5 w-5" />
            Subscribe on LinkedIn
          </a>
        </div>
      </section>

      {/* Filters */}
      <section className="container">
        <div className="flex flex-col space-y-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <Label htmlFor="search" className="mb-2 block">
              Search Posts
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by title or content..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search blog posts"
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <Label htmlFor="category-filter" className="mb-2 block">
              Filter by Category
            </Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/4">
            <Label htmlFor="date-filter" className="mb-2 block">
              Filter by Date
            </Label>
            <Input
              id="date-filter"
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
              aria-label="Filter by month and year"
            />
          </div>
          <div className="flex w-full justify-end md:w-auto">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("")
                setDateFilter("")
              }}
              aria-label="Clear all filters"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container">
        <h2 className="sr-only">Blog Posts</h2>
        {currentPosts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={`Featured image for ${post.title}`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/50">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <Button asChild variant="outline" size="sm" className="flex items-center">
                      <a href={post.url} target="_blank" rel="noreferrer" aria-label={`Read ${post.title} on LinkedIn`}>
                        <Linkedin className="mr-2 h-4 w-4" />
                        Read on LinkedIn
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className="mt-8">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                      aria-label={`Page ${index + 1}`}
                      aria-current={currentPage === index + 1 ? "page" : undefined}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </nav>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No Blog Posts Found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("")
                setDateFilter("")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </section>

      {/* LinkedIn Subscription Popup */}
      <Dialog open={showSubscribePopup} onOpenChange={setShowSubscribePopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Stay Updated with E-Cell</DialogTitle>
            <DialogDescription className="text-center">
              Subscribe to our LinkedIn newsletter for the latest entrepreneurship insights and updates
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-4">
            <Image
              src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745257881/logo_ou2mgs.png"
              alt="E-Cell Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-center text-sm text-muted-foreground mb-4">
              Get exclusive content, event announcements, and entrepreneurship resources directly in your LinkedIn feed.
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <Button
              className="w-full sm:w-auto flex items-center justify-center bg-[#0A66C2] hover:bg-[#0A66C2]/90"
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7215949327922253825",
                  "_blank",
                )
                handleClosePopup()
              }}
            >
              <Linkedin className="mr-2 h-5 w-5" />
              Subscribe on LinkedIn
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleClosePopup}>
              Maybe Later
            </Button>
          </DialogFooter>

          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={handleClosePopup}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
