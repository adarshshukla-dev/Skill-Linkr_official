import type { Metadata } from "next"
import { BlogContent } from "./BlogContent"

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Startup Stories & Innovation Insights from E-Cell | MIT Meerut Blog",
  description:
    "Dive into real startup journeys, expert advice, and innovation tips from E-Cell MIT Meerut. Empower your entrepreneurial mindset with weekly stories, trends, and tools.",
  keywords:
    "entrepreneurship, startup, E-Cell, MIT Meerut, business, innovation, funding, agriculture, student entrepreneurs, success stories",
  openGraph: {
    title: "Startup Stories & Innovation Insights from E-Cell | MIT Meerut Blog",
    description:
      "Explore startup stories and trends from E-Cell at Meerut Institute of Technology. Get inspired and stay informed.",
    url: "https://ecell.mitmuf.com/blog",
    siteName: "E-Cell MIT Meerut",
    images: [
      {
        url: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745391788/blog_ecell_p4lctg.jpg",
        width: 1200,
        height: 630,
        alt: "E-Cell Blog Banner",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Stories & Innovation Insights from E-Cell",
    description:
      "Explore entrepreneurship tips, startup advice, and inspiring stories from student innovators at MIT Meerut.",
    images: ["https://res.cloudinary.com/dp2olwtzp/image/upload/v1745391788/blog_ecell_p4lctg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "#004aad",
  category: "Entrepreneurship",
  authors: [{ name: "E-Cell MIT Meerut", url: "https://ecell.mitmuf.com" }],
  publisher: "MIT Meerut E-Cell",
  alternates: {
    canonical: "https://ecell.mitmuf.com/blog",
  },
}


export default function BlogPage() {
  return <BlogContent />
}
