import type { MetadataRoute } from "next";

// Full blog posts data for SEO sitemap generation
const blogPosts = [
  {
    id: 50,
    title: "A Year in Updates, Give or Take",
    date: "2025-06-16",
    slug: "year-in-updates-give-or-take",
  },
  {
    id: 49,
    title: "Knowing Tomorrow by Your Panchayat | Bharat Forecasting System",
    date: "2025-06-09",
    slug: "bharat-forecasting-system-panchayat",
  },
  {
    id: 48,
    title: "225 Teams Reaching 10,125 Villages for Technology-Driven Farming",
    date: "2025-06-02",
    slug: "teams-technology-driven-farming",
  },
  {
    id: 47,
    title: "Science Is Catching Up with the Soil",
    date: "2025-05-26",
    slug: "science-catching-up-soil",
  },
  {
    id: 46,
    title: "Beyond Ploughs and Phones; UP’s AI Pragya Movement",
    date: "2025-05-19",
    slug: "ups-ai-pragya-movement",
  },
  {
    id: 45,
    title: "India Wants to Feed the World and This is the Plan",
    date: "2025-05-12",
    slug: "india-feed-world-plan",
  },
  {
    id: 44,
    title: "What the ₹550 Cr Krishonnati Allocation Means for UP Farmers and Agri Startups",
    date: "2025-05-05",
    slug: "krishonnati-up-farmers-agri-startups",
  },
  {
    id: 43,
    title: "Inside Uttar Pradesh’s Largest Push for Cow-Based Natural Farming",
    date: "2025-04-28",
    slug: "up-cow-based-natural-farming",
  },
  {
    id: 42,
    title: "The Data Farmers Didn't Know They Were Growing",
    date: "2025-04-21",
    slug: "data-farmers-growing",
  },
  {
    id: 41,
    title: "How Raheja Solar is Changing the Way India Preserves and Profits from Produce",
    date: "2025-04-14",
    slug: "raheja-solar-india-preserves-profits",
  },
  {
    id: 40,
    title: "How Carbon Farming Can Transform Uttar Pradesh's Agriculture",
    date: "2025-04-07",
    slug: "carbon-farming-transform-up-agriculture",
  },
  {
    id: 39,
    title: "Agrivoltaics is Here—And Some States Are Moving Faster Than Others",
    date: "2025-03-31",
    slug: "agrivoltaics-states-moving-faster",
  },
  {
    id: 38,
    title: "The Hidden Carbon Cost of Agriculture's Fertilizer Dependency",
    date: "2025-03-24",
    slug: "carbon-cost-fertilizer-dependency",
  },
  {
    id: 37,
    title: "Natural Healing, Real Impact: The Bikalp Herbals Approach",
    date: "2025-03-17",
    slug: "natural-healing-bikalp-herbals",
  },
  {
    id: 36,
    title: "From Cow Shelters to Natural Farming Centers: A New Chapter in UP Agriculture",
    date: "2025-03-10",
    slug: "cow-shelters-natural-farming-up",
  },
  {
    id: 35,
    title: "How Incubators Drive Growth and Innovation in Agribusiness Startups",
    date: "2025-03-03",
    slug: "incubators-growth-agribusiness",
  },
  {
    id: 34,
    title: "Sustaining Agriculture in the Face of Climate Change",
    date: "2025-02-24",
    slug: "sustaining-agriculture-climate-change",
  },
  {
    id: 33,
    title: "When Traditional Loans Fall Short, New Funding Empowers Rural Dreams – Paving the Way for Tomorrow's Agripreneurs",
    date: "2025-02-17",
    slug: "funding-rural-dreams-agripreneurs",
  },
  {
    id: 32,
    title: "Digital Innovation Keeps Every Harvest Fresh and Minimizes Waste",
    date: "2025-02-10",
    slug: "digital-innovation-harvest-fresh",
  },
  {
    id: 31,
    title: "UP-AGREES Driving Agricultural Growth and Rural Prosperity in Uttar Pradesh - A Detailed Outlook",
    date: "2025-02-03",
    slug: "up-agrees-agriculture-growth",
  },
  {
    id: 30,
    title: "Building Stronger Communities Through Cooperative Entrepreneurship",
    date: "2025-01-27",
    slug: "cooperative-entrepreneurship-communities",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ecell.mitmuf.com";

  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...blogEntries,
  ];
}
