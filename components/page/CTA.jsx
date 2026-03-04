import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

function CTA() {
  return (
    <>
        <section className="container">
        <div className="rounded-2xl bg-blue-600 px-6 py-12 text-center text-white md:px-12 md:py-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Begin Your Startup Journey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Join E-Cell MIT today and get access to resources, mentorship, and a community of like-minded entrepreneurs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">Join Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white light:bg-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default CTA
