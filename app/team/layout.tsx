import type React from "react";
import { TeamAuthProvider } from "./auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

// Note: Metadata yahan reh sakti hai, Next.js ise merge kar dega
export const metadata = {
  title: "E-Cell Team Dashboard",
  description: "Team dashboard for E-Cell MIT",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Sirf Providers aur logic rakhein, <html> aur <body> nahi
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TeamAuthProvider>
        <div className="team-layout-wrapper">
          {children}
        </div>
      </TeamAuthProvider>
    </ThemeProvider>
  );
}
