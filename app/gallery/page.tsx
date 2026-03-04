"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Enhanced gallery items with additional images
const galleryItems = [
  {
    id: 6,
    title: "Lean Start-up & Minimum Viable Product Session",
    date: "2025-08-26",
    event: "Lean Start-up Session",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756213570/1756198703845_zeez6e.jpg",
    description: "It was a session on Lean Start-up and Minimum Viable Product (MVP), focusing on cost-effective start-up building, validating ideas through MVP, and strategies for early-stage entrepreneurship.",
    relatedImages: [
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756213564/1756198516783_nydelh.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756213567/1756198603080_r8ftqw.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756213566/1756198549087_b7gbni.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756213567/1756198603080_r8ftqw.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756213571/1756198635625_csljwi.jpg",
    ],
  },
  {
    id: 5,
    title: "Road to Eureka : Idea Pitching Competition",
    date: "2025-08-14",
    event: "Idea Pitching Competition",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756202727/img4_xokilw.jpg",
    description: "The event featured innovative startup ideas where students from B.Tech, BCA, and B.Sc Agriculture pitched their business models to a panel of judges, showcasing creativity, problem-solving skills, and entrepreneurial spirit. Participants competed for a chance to qualify for the national stage of Eureka! 🚀",
    relatedImages: [
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756202728/img7_zlnwg5.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756202726/img10_o0nmgc.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756202727/img16_apayvt.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756202727/img13_zwnjvm.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1756202726/img19_wjzure.jpg",
    ],
  },
   {
    id: 4,
    title: "IGNITE - 2025",
    date: "2025-05-05",
    event: "IGNITE",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1749490237/1_g_sruu1z.jpg",
    description: "IGNITE 2025 marked the grand public launch of MITMeerut E-Cell’s official website, celebrating innovation, entrepreneurship, and youth-driven ideas with energy and inspiration.",
    relatedImages: [
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1749490237/2g_aqaxj4.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1749490236/3g_achpo0.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1749490236/4g_jmrrrv.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1749490236/5g_qvbfly.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1749490236/6g_wiqjfp.jpg",
    ],
  },
   {
    id: 3,
    title: "Entrepreneurship Awareness Programme",
    date: "2025-03-12",
    event: "Yuva Udyami",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745426708/DSC_3363_kwjvhd.jpg",
    description: "Empowering young entrepreneurs at MUF on 12th March, Yuva Udyami.",
    relatedImages: [
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745424475/DSC_3346_ucvvyo.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745424475/DSC_3356_l9p8nu.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745424475/DSC_3353_sfbv2m.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745424475/DSC_3357_izxaaz.jpg",
    ],
  },
  {
    id: 2,
    title: "National Startup Day 2025",
    date: "2025-01-16",
    event: "National Startup Day",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423795/DSC_0592_modpfg.jpg",
    description: "Celebrate innovation and entrepreneurship with inspiring startup moments in our National Startup Day 2025 gallery!",
    relatedImages: [
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423794/DSC_0603_fjfoua.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423798/DSC_0606_gzjswa.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423799/DSC_0605_zkhnfl.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423800/DSC_0604_wiwgnn.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423805/DSC_0571_tkbkiv.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423793/DSC_0572_zk8jml.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745423794/DSC_0611_lswtuz.jpg",
    ],
  },
 
  {
    id: 1,
    title: "Uttar Pradesh Agro Pradarshini 2024",
    date: "2024-12-18",
    event: "UPAP",
    image: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745427198/B612_20241223_121855_814_khih6y.jpg",
    description: "Final round of our annual pitch competition with cash prizes and mentorship opportunities.",
    relatedImages: [
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745427190/B612_20241221_134919_978_ajmc9w.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745427190/B612_20241222_070639_593_pkerjg.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745427192/B612_20241223_123112_940_r5ion8.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745427191/B612_20241223_121955_284_vgz7fx.jpg",
      "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745427192/B612_20241223_122234_059_tpaw2f.jpg",
    ],
  },
 
  
]

const itemsPerPage = 6

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredItems, setFilteredItems] = useState(galleryItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [eventFilter, setEventFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  // State for image popup
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get unique event types for filter dropdown
  const eventTypes = Array.from(new Set(galleryItems.map((item) => item.event)))

  // Apply filters
  useEffect(() => {
    let results = galleryItems

    if (searchTerm) {
      results = results.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (eventFilter && eventFilter !== "all") {
      results = results.filter((item) => item.event === eventFilter)
    }

    if (dateFilter) {
      results = results.filter((item) => {
        const itemDate = new Date(item.date)
        const filterDate = new Date(dateFilter)
        return itemDate.getFullYear() === filterDate.getFullYear() && itemDate.getMonth() === filterDate.getMonth()
      })
    }

    setFilteredItems(results)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, eventFilter, dateFilter])

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle image click
  const handleImageClick = (item: (typeof galleryItems)[0]) => {
    setSelectedItem(item)
    setCurrentImageIndex(0)
    setIsDialogOpen(true)
  }

  // Navigate through related images
  const goToNextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev === selectedItem.relatedImages.length ? 0 : prev + 1))
    }
  }

  const goToPrevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedItem.relatedImages.length : prev - 1))
    }
  }

  // Get current image source
  const getCurrentImageSrc = () => {
    if (!selectedItem) return ""

    // If index is 0, show the main image, otherwise show related images
    return currentImageIndex === 0 ? selectedItem.image : selectedItem.relatedImages[currentImageIndex - 1]
  }

  return (
    <div className="space-y-8 py-12">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full">
  {/* Image visible only on md and up */}
  <div className="hidden md:block h-full w-full relative">
    <Image
      src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1746115153/gallery_final_banner_rwij40.jpg"
      alt="Gallery Banner"
      fill
      className="object-cover brightness-50 dark:brightness-100"
    />
  </div>

  {/* Text visible only on mobile */}
  {/* Styled E-Cell Gallery Text for Mobile Only */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-8 bg-gradient-to-b from-black/80 to-black/40 text-white md:hidden">
  <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-md mb-3">
    E-Cell Gallery
  </h1>
  <p className="text-lg text-gray-200 max-w-md leading-relaxed drop-shadow-sm">
    Explore memories from our past events, workshops, and activities
  </p>
</div>

</section>


      {/* Filters */}
      <section className="container">
        <div className="flex flex-col space-y-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <Label htmlFor="search" className="mb-2 block">
              Search by Title
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <Label htmlFor="event-filter" className="mb-2 block">
              Filter by Event
            </Label>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger id="event-filter">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {eventTypes.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/4">
            <Label htmlFor="date-filter" className="mb-2 block">
              Filter by Date
            </Label>
            <Input id="date-filter" type="month" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>
          <div className="flex w-full justify-end md:w-auto">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setEventFilter("")
                setDateFilter("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container">
        {currentItems.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-48 w-full cursor-pointer" onClick={() => handleImageClick(item)}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/50">
                        {item.event}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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
            <Filter className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No Results Found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setEventFilter("")
                setDateFilter("")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </section>

      {/* Image Popup Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-4xl p-0 overflow-hidden bg-transparent border-0"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative bg-black rounded-lg overflow-hidden">
            {/* Main Image */}
            <div className="relative h-[60vh] w-full">
              {selectedItem && (
                <Image
                  src={getCurrentImageSrc() || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              )}

              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={goToPrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={goToNextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Close button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Related Images Thumbnails */}
            {selectedItem && (
              <div className="bg-black/90 p-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {/* Main image thumbnail */}
                  <div
                    className={`relative h-20 w-20 flex-shrink-0 cursor-pointer rounded border-2 ${currentImageIndex === 0 ? "border-blue-500" : "border-transparent"}`}
                    onClick={() => setCurrentImageIndex(0)}
                  >
                    <Image
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Related images thumbnails */}
                  {selectedItem.relatedImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative h-20 w-20 flex-shrink-0 cursor-pointer rounded border-2 ${currentImageIndex === idx + 1 ? "border-blue-500" : "border-transparent"}`}
                      onClick={() => setCurrentImageIndex(idx + 1)}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Related image ${idx + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Image title and description */}
                <div className="mt-2 text-white">
                  <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-gray-300">{selectedItem.description}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
