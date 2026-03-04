import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ecell.mitmuf.com/sitemap.xml",
    host: "https://ecell.mitmuf.com", // important for SEO
  };
}
