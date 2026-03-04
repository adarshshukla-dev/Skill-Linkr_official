"use client"

import { useState,useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Mail, Linkedin, ChevronLeft, ChevronRight } from "lucide-react"



// Sample team members data
const teamMembers = [
     {
    id: 1,
    name: "Megha Raj",
    position: "President",
    year: "2023",
    bio: "Leading with purpose and strategic vision. Focused on driving impactful change, building strong communities, and achieving collective goals.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745432979/Profile_picture_megha_iy7out.png",
    email: "megha.raj.bba.2023@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/megha-raj-7aa9b9296",

  },
   {
    id: 2,
    name: "Adarsh Shukla",
    position: "Vice President",
    year: "2024",
    bio: "Dedicated to operational excellence and empowering teams. Focused on bridging the gap between vision and reality through proactive leadership.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770745005/Untitled_ydosf4.png",
    email: "adarsh.shukla.cs.2024@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/adarsh-shukla-677b16302",

  },
     
      {
    id: 3,
    name: "Om Kumar",
    position: "Technical Head",
    year: "2024",
    bio: "Bridging innovation with execution. Focused on scalable development, technical leadership, and building future-ready tech.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770447885/om_yshjzy.jpg",
    email: "om.kumar.cs.2024@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/om-kumar-942a5633b/",
  },
     
       {
    id: 4,
    name: "Jyoti Raj Singh",
    position: "Content & Research Head",
    year: "2025",
    bio: "Bridging the gap between thorough research and creative execution. Leading content strategy with a focus on authenticity and accuracy.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770448237/jyoti_mcbgcc.jpg",
    email: "jyoti.rajsingh.aiml.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/jyoti-raj-singh-50b15a37a/",

  },

          {
    id: 5,
    name: "Ishwar Sharan Jaiswal",
    position: "PR Head",
    year: "2024",
    bio: "Architecting brand identity and strategic outreach. Connecting people, ideas, and opportunities through the power of effective communication.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770448215/ishwar_nghw2c.jpg",
    email: "ishwar.sharan.aiml.2024@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/ishwar-sharan-jaiswal-555aa1331/",
           
      },

      {
    id: 6,
    name: "Prince Kumar",
    position: "Outreach & Collaboration Head",
    year: "2023",
    bio: "Architecting strategic partnerships and community outreach. Bridging gaps and creating opportunities through the power of collaboration.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770447752/Untitled_2048_x_2048_px_zycmp3.jpg",
    email: "prince.kumar2.cs.2023@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/prince-kumar-45a058288/",
           
      },
     
      {
    id: 7,
    name: "Md Faiyaz Sheikh",
    position: "Events Head",
    year: "2024",
    bio: "Leading end-to-end event strategy and logistics. Focused on delivering excellence through meticulous planning and collaborative team management.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770448222/faiyaz_cy5ljv.jpg",
    email: "md.faiyaz.bca.2024@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/md-faiyaz-sheikh-tech/",

  },
     
           {
    id: 8,
    name: "Uditya Raj",
    position: "Creative Head",
    year: "2025",
    bio: "Crafting compelling aesthetics and high-impact designs. Focused on pushing creative boundaries to deliver visually stunning and meaningful experiences.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770448226/uditya_tv5emi.jpg",
    email: "uditya.raj.cs.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/uditya-raj-249695364/",

  },
      {
    id: 9,
    name: "Vedant Nagar",
    position: "Social Media Head",
    year: "2025",
    bio: "Driving digital presence through strategic storytelling and trend-driven content. Focused on building community engagement and amplifying brand voice across social platforms.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770448233/vedant_ykdv9d.jpg",
    email: "vedant.nagar.cs.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/vedant-nagar-527709382/",

  },

       {
    id: 10,
    name: "Saurabh Kumar Patel",
    position: "Technical Coordinator",
    year: "2024",
    bio: "Empowering technical excellence through efficient coordination. Committed to bringing complex tech concepts to life with precision and collaborative execution.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770484558/Saurabh_j1b4av.jpg",
    email: "saurabh.patel.cs.2024@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/saurabh-kumar-patel-699427336/",
  },
     
        {
    id: 11,
    name: "Mukesh Kumar",
    position: "Outreach & Collaboration Coordinator",
    year: "2024",
    bio: "Supporting global networks through organized outreach. Committed to driving impactful partnerships and seamless team collaboration.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770485867/Mukesh_sd1ez7.jpg",
    email: "mukesh.kumar.ag.2024@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/mukesh-kumar-a72494399?",
           
      },

        {
    id: 12,
    name: "Prince Kumar",
    position: "Outreach & Collaboration Coordinator",
    year: "2025",
    bio: "Supporting global networks through organized outreach. Committed to driving impactful partnerships and seamless team collaboration.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770485897/Prince1_pwzckv.jpg",
    email: "prince.kumar.aiml.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/prince-kumar-a13838377/",
           
      },

        {
    id: 13,
    name: "Anushka Singh",
    position: "Outreach & Collaboration Coordinator",
    year: "2025",
    bio: "Supporting global networks through organized outreach. Committed to driving impactful partnerships and seamless team collaboration.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770485889/Anushka_xqfwvo.jpg",
    email: "anushka.singh.bca.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/anushka-singh-a83076391?",
           
      },

      {
    id: 14,
    name: "Nisha Kumari",
    position: "Event Coordinator",
    year: "2025",
    bio: "Supporting end-to-end event planning and operational excellence. Dedicated to managing resources and coordinating teams to deliver impactful experiences.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770485888/Nisha_jrjori.png",
    email: "nisha.kumari.cs.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/nisha-kumari-56195b37b?",

  },

     
          {
    id: 15,
    name: "Muskan Kumari",
    position: "PR Coordinator",
    year: "2025",
    bio: "Supporting organizational reach through effective communication. Committed to driving brand visibility and seamless collaboration within the PR team.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770485912/Muskan_htzsce.jpg",
    email: "muskan2.kumari.bca.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/muskan-yadav-940516393",
           
      },
     
      {
    id: 16,
    name: "Krishna Awasthi",
    position: "Content & Research Coordinator",
    year: "2025",
    bio: "Supporting content strategy through rigorous research and tactical execution. Dedicated to managing information flow and ensuring accuracy across all creative projects.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770543756/Krishna_y88nyy.png",
    email: "Krishna.awasthi.aiml.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/krishna-awasthi-481323372?",

  },

       {
    id: 17,
    name: "Navya Sharma",
    position: "Outreach & Collaboration Coordinator",
    year: "2025",
    bio: "Supporting global networks through organized outreach. Committed to driving impactful partnerships and seamless team collaboration.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/",
    email: "navya.sharma.bca.2025@mitmeerut.ac.in ",
    linkedin: "https://www.linkedin.com/in/navya-sharma-857706381?",
           
      },

     
  {
    id: 18,
    name: "Dilkhush Kumar",
    position: "Creative Coordinator",
    year: "2025",
    bio: "Supporting creative strategy through organized execution. Committed to bringing artistic visions to life through coordination, precision, and design support.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770472183/dilkhush_pvtruz.png",
    email: "dilkhush.kumar.cs.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/dilkhush-sharma-a66497384/",

  },

      {
    id: 19,
    name: "Ayush Kumar",
    position: "Member",
    year: "2025",
    bio: "Passionate about storytelling and public relations. Working collaboratively to manage organizational reputation and drive impactful communication strategies.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770544597/Ayush_itcjdx.jpg",
    email: "ayush.kumar.cs.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/ayush-kumar-115766309/",

  },

        {
    id: 20,
    name: "Sparsh Dhiman",
    position: "Member",
    year: "2025",
    bio: "Focused on creating modern designs and engaging graphics. Passionate about detail-oriented execution and pushing creative boundaries through visual excellence.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770545432/sparsh_pr1xxf.jpg",
    email: "sparsh.aiml.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/",

  },

      {
    id: 21,
    name: "Priyanshu Kumari",
    position: "Member",
    year: "2025",
    bio: "Driving impact through insightful research and creative storytelling. Dedicated to intellectual growth and delivering high-quality, research-backed content.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770544602/priyanshu_vuheb2.jpg",
    email: "priyanshu.kumari.bca.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/priyanshu-kumari-2224323aa?",

  },

      {
    id: 22,
    name: "Sanjana Kumari",
    position: "Member",
    year: "2025",
    bio: "Driving impact through insightful research and creative storytelling. Dedicated to intellectual growth and delivering high-quality, research-backed content.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1770544607/sanjana_bvqb4f.jpg",
    email: "sanjana.kumari.bca.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/",

  },

     
      {
    id: 23,
    name: "Pooja Kumari",
    position: "Member",
    year: "2025",
    bio: "Passionate about storytelling and public relations. Working collaboratively to manage organizational reputation and drive impactful communication strategies.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1771520217/pooja_3_nzuzur.png",
    email: "pooja.kumari.bca.2025@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/",

  },

     {
    id: 24,
    name: "Sujit Singh Pundir",
    position: "Member",
    year: "2025",
    bio: "Dedicated to seamless event execution and high-energy coordination. Passionate about bringing events to life and ensuring every detail contributes to a great experience.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/",
    email: "sujit.singhpundir.bca.2025@mitmeerut.ac.in ",
    linkedin: "https://www.linkedin.com/in/",

  },
     
  {
    id: 27,
    name: "Vanshika Saxena",
    position: "Former President",
    year: "2022",
    bio: "Passionate about fostering entrepreneurship among students and creating opportunities for growth.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745434385/Profile_picture_vanshika_sg3k7q.png",
    email: "vanshika.saxena.cs.2022@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/vanshika-saxena-5v?",
  },
     
  {
    id: 28,
    name: "Rahul Kumar Singh",
    position: "Former PR Head",
    year: "2022",
    bio: "Dedicated to building a supportive ecosystem for student entrepreneurs and innovators.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745409638/Profile_picture_rahul_f4zbp1.png",
    email: "rahul.singh.ds.2022@mitmeerut.ac.in",
    linkedin: "https://linkedin.com/in/rrrahulsingh",
  },
  {
    id: 29,
    name: "Md Tabish Manzer",
    position: "Former Vice President",
    year: "2022",
    bio: "Leads digital presence with creativity, strategy, and social media expertise.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745434606/Profile_picture_tabish_di7l0n.png",
    email: "mdtabish.manzer.cs.2022@mitmeerut.ac.in",
    linkedin: "https://linkedin.com/in/md-tabish-manzer-18aa7b241",

  },
  {
    id: 30,
    name: "Abhishek Kumar",
    position: "Former Web Developer",
    year: "2022",
    bio: "Passionate and ambitious tech enthusiast with a strong foundation in software development,driven to innovate and build impactful solutions.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756409925/honey_yd2r5m.png",
    email: "abhishek.kumar1.ds.2022@mitmeerut.ac.in",
    linkedin: "https://www.linkedin.com/in/honeynbt",
  },
  {
    id: 31,
    name: "Anubhav Raj",
    position: "Former Co-Operative Head",
    year: "2022",
    bio:  "Creative strategist with a passion for brand building and digital marketing.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745432776/Profile_picture_anubhav_s8yews.png",
    email: "anubhav.raj.aiml.2022@mitmeerut.ac.in",
    linkedin: "https://linkedin.com/in/anubhav-raj-537915258",
  },
  {
    id: 32,
    name: "Ayush Raj",
    position: "Former Event Manager",
    year: "2022",
    bio: "Skilled in financial planning and helping startups navigate funding challenges.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745476648/Profile_picture_ayush_vmcs2m.png",
    email: "ayush.raj.bpharma.2022@mitmeerut.ac.in",
    linkedin: "https://linkedin.com/in/ayush-raj-0453a3264",

  },
  {
    id: 33,
    name:  "Reshu Sharma",
    position:  "Former Event Manager",
    year: "2022",
    bio:  "Organizes successful events with creativity, attention, and time management skills.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745430830/Profile_picture_reshu_q2uqsz.png",
    email: "reshu.sharma.cs.2022@mitmeerut.ac.in",
    linkedin: "https://linkedin.com/in/reshu-sharma-1bb377259",
  },
  {
    id: 34,
    name: "Nancy",
    position: "Former Event Manager",
    year: "2022",
    bio: "Event planner focused on innovation, efficiency, and team collaboration.",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745476300/Profile_picture_nancy_hcgyzz.png",
    email: "nancy.aiml.2022@mitmeerut.ac.in",
    linkedin: "https://linkedin.com/in/nancy-singh-83069b258",

  },

 

 
]

const itemsPerPage = 24

export default function TeamPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredMembers, setFilteredMembers] = useState(teamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [positionFilter, setPositionFilter] = useState("")

  // Get unique positions and years for filter dropdowns
  const positions = Array.from(new Set(teamMembers.map((member) => member.position)))
  const years = Array.from(new Set(teamMembers.map((member) => member.year)))

  // Apply filters
  const applyFilters = () => {
    let results = teamMembers
  
    if (searchTerm) {
      results = results.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  
    // if (yearFilter && yearFilter !== "all") {
    //   results = results.filter((member) => member.year === yearFilter)
    // }
  
    // if (positionFilter && positionFilter !== "all") {
    //   results = results.filter((member) => member.position === positionFilter)
    // }
  
    setFilteredMembers(results)
    setCurrentPage(1)
  }
  useEffect(() => {
    applyFilters()
  }, [searchTerm, yearFilter, positionFilter])
  

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setYearFilter("")
    setPositionFilter("")
    setFilteredMembers(teamMembers)
    setCurrentPage(1)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const currentMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-8 py-12">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full">
  {/* First Image - visible on large screens and above (laptop and up) */}
  <div className="hidden lg:block h-full w-full">
    <Image
      src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745601332/gallery_banner_new.jpg_uygoct.jpg"
      alt="Team Banner Laptop"
      fill
      className="object-cover brightness-75 dark:brightness-100"
    />
  </div>

  {/* Second Image - visible only on medium screens (tablet) */}
  <div className="hidden md:block lg:hidden h-full w-full">
    <Image
      src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745602582/gallery_tablet_ypdocw.jpg"
      alt="Team Banner Tablet"
      fill
      className="object-cover brightness-75 dark:brightness-100"
    />
  </div>

  {/* Text - visible only on mobile */}
  {/* Enhanced Meet Our Team Text for Mobile Only */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-8 bg-gradient-to-b from-black/80 to-black/40 text-white md:hidden">
  <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-md mb-3">
    Meet Our Team
  </h1>
  <p className="text-lg text-gray-200 max-w-xs leading-relaxed drop-shadow-sm">
    The passionate individuals behind E-Cell MIT
  </p>
</div>

</section>



      {/* Filters */}
      <section className="container">
        <div className="flex flex-col space-y-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <Label htmlFor="search" className="mb-2 block">
              Search by Name
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search team members..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  applyFilters()
                }}
              />
            </div>
          </div>
          {/* <div className="w-full md:w-1/4">
            <Label htmlFor="position-filter" className="mb-2 block">
              Filter by Position
            </Label>
            <Select
              value={positionFilter}
              onValueChange={(value) => {
                setPositionFilter(value)
                applyFilters()
              }}
            >
              <SelectTrigger id="position-filter">
                <SelectValue placeholder="All Positions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/4">
            <Label htmlFor="year-filter" className="mb-2 block">
              Filter by Year
            </Label>
            <Select
              value={yearFilter}
              onValueChange={(value) => {
                setYearFilter(value)
                applyFilters()
              }}
            >
              <SelectTrigger id="year-filter">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          <div className="flex w-full justify-end md:w-auto">
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="container">
        {currentMembers.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentMembers.map((member) => (
               <Card key={member.id} className="overflow-hidden">
               <div className="flex justify-center mt-4">
                 <div
                   className="
                     relative h-40 w-40 rounded-full overflow-hidden 
                     border-4 border-white dark:border-gray-800 
                     shadow-2xl 
                     transform-gpu hover:scale-105
                     transition duration-300
                   "
                 >
                   <Image
                     src={member.image || "/placeholder.svg"}
                     alt={member.name}
                     fill
                     className="object-cover"
                   />
                 </div>
               </div>
             
               <CardContent className="p-6">
    <div className="mb-2 flex items-center justify-between">
      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/50">
        {member.position}
      </span>
      <span className="text-sm text-muted-foreground">{member.year}</span>
    </div>
    <h3 className="mb-2 text-xl font-semibold text-center">{member.name}</h3>
    <p className="mb-4 text-sm text-muted-foreground text-center">{member.bio}</p>
    <div className="flex justify-center space-x-2">
      <Button variant="outline" size="sm" asChild>
        <a href={`mailto:${member.email}`}>
          <Mail className="mr-1 h-4 w-4" />
          Email
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={member.linkedin} target="_blank" rel="noreferrer">
          <Linkedin className="mr-1 h-4 w-4" />
          LinkedIn
        </a>
      </Button>
    </div>
          
               </CardContent>
             </Card>
             
              
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No Team Members Found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button className="mt-4" onClick={resetFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
