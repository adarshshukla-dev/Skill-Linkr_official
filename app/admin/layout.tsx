// app/admin/layout.tsx
import type React from "react";
import { Inter } from "next/font/google";
import { AdminAuthProvider } from "./auth-provider";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </div>
  );
}
