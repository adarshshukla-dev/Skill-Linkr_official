import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

function Mission() {
  return (
    <>
      <section className="container">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Mission and Innovation</h2>
                <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
                  E-Cell at Meerut Institute of Technology is dedicated to fostering the entrepreneurial spirit and innovation
                  among students.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 pt-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M12 2v4M3 6l3 3M2 12h4M3 18l3-3M12 22v-4M21 6l-3 3M22 12h-4M21 18l-3-3"></path>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Innovate</h3>
                    <p className="text-muted-foreground">
                      We believe in the power of innovative ideas to solve real-world problems and create impact.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 pt-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"></path>
                        <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"></path>
                        <path d="M15 2v5h5"></path>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Incubate</h3>
                    <p className="text-muted-foreground">
                      We provide resources, mentorship, and infrastructure to nurture and develop promising startups.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 pt-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Inspire</h3>
                    <p className="text-muted-foreground">
                      We inspire the next generation of entrepreneurs through events, workshops, and success stories.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
    </>
  )
}

export default Mission
