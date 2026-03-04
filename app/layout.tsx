// src/app/layout.tsx (ya jis file me hai)

import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import ClientRootLayout from "./client";
import { GA_TRACKING_ID } from "../lib/gtag";

// Metadata for SEO and Social Sharing
export const metadata: Metadata = {
  title: "E-Cell MIT Meerut – Empowering Entrepreneurship",
  description:
    "Official website of E-Cell at Meerut Institute of Technology. Discover student-led innovations, startups, blogs, events, and our dynamic team.",
  generator: "E-Cell MIT Meerut",
  icons: {
    icon: "https://res.cloudinary.com/dp2olwtzp/image/upload/v1745257881/logo_ou2mgs.png",
  },
  openGraph: {
    title: "E-Cell MIT Meerut – Empowering Entrepreneurship",
    description:
      "Join the Entrepreneurship Cell at Meerut Institute of Technology and be part of a vibrant startup ecosystem. Explore our events, gallery, blogs, and team.",
    url: "https://ecell.mitmuf.com",
    siteName: "E-Cell MITMU",
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
    title: "E-Cell MIT Meerut – Student Startup Hub",
    description: "Explore startup culture and innovation at E-Cell, MIT Meerut. Dive into events, blogs, and more.",
    images: ["https://res.cloudinary.com/dp2olwtzp/image/upload/v1745257881/logo_ou2mgs.png"],
  },
  keywords: [
    "E-Cell MIT Meerut",
    "Entrepreneurship Cell MIT Meerut",
    "E-Cell MIT",
    "MIT Meerut",
    "MITMUF",
    "E-Cell",
    "MIT",
    "startup ideas",
    "how to start a startup",
    "entrepreneurship",
    "business ideas",
    "startup funding",
    "pitch deck",
    "angel investors",
    "venture capital",
    "startup incubator",
    "startup accelerator",
    "business plan template",
    "startup India",
    "how to pitch a startup",
    "startup events",
    "startup ecosystem",
    "startup mentorship",
    "startup competition",
    "startup weekend",
    "startup funding rounds",
    "startup valuation",
    "startup marketing strategies",
    "startup growth hacks",
    "startup legal advice",
    "startup co-founder",
    "startup networking",
    "startup pitch competition",
    "startup grants",
    "startup success stories",
    "startup failure reasons",
    "startup hiring strategies",
    "startup culture",
    "startup innovation",
    "startup scalability",
    "startup bootcamp",
    "startup MVP (Minimum Viable Product)",
    "startup revenue models",
    "startup exit strategies",
    "startup equity distribution",
    "startup crowdfunding",
    "startup product-market fit",
    "startup lean methodology",
    "startup customer acquisition",
    "startup user retention",
    "startup burn rate",
    "startup runway calculation",
    "startup cap table",
    "startup term sheet",
    "startup due diligence",
    "startup IPO process",
    "startup unicorns",
  ],
};

// Root Layout Component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics Scripts */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <ClientRootLayout>
          {children}
        </ClientRootLayout>
      </body>
    </html>
  );
}
