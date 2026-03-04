import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://ecell.mitmuf.com/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://ecell.mitmuf.com/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://ecell.mitmuf.com/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://ecell.mitmuf.com/gallery",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://ecell.mitmuf.com/team",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://ecell.mitmuf.com/contact",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },

    // 👇 SEO-focused additional URLs (you can make landing pages for these)
    {
      url: "https://ecell.mitmuf.com/ecellmit",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://ecell.mitmuf.com/startup-ideas",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://ecell.mitmuf.com/mitmeerut",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://ecell.mitmuf.com/entrepreneurship",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: "https://ecell.mitmuf.com/business-club",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
