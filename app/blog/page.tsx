import type { Metadata } from "next"
import { BlogContent } from "./BlogContent" // Naam wahi rehne dete hain taaki error na aaye

export const metadata: Metadata = {
  title: "Client Portal | Skill Linkr",
  description: "Manage projects and hire student talent directly.",
}

export default function Page() {
  return <BlogContent />
}
