import React from "react";
import { Linkedin, Twitter, Youtube } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

function Social() {
  return (
    <>
      {/* Social Impact Section */}
      <section className="bg-blue-50 dark:bg-blue-950/20 py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Our Social Impact
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Follow us on social media to stay updated with our latest events,
              workshops, and success stories.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ecell_mitmeerut"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="instagram-gradient h-12 w-12">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#instagramGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12"
                >
                  <defs>
                    <linearGradient
                      id="instagramGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="50%" stopColor="#d62976" />
                      <stop offset="100%" stopColor="#4f5bd5" />
                    </linearGradient>
                  </defs>
                  <path d="M16 8a2 2 0 0 1 0-4 2 2 0 0 1 0 4z" />
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                </svg>
              </span>
              <span className="text-lg font-medium">Instagram</span>
              <span className="text-sm text-muted-foreground">ecell_mitmeerut</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ecell-mitmeerut/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <Linkedin className="h-12 w-12 text-blue-600" />
              <span className="text-lg font-medium">LinkedIn</span>
              <span className="text-sm text-muted-foreground">ecell-mitmeerut</span>
            </a>

            {/* X (Twitter) */}
            <a
  href="https://x.com/ecell_mitmeerut"
  target="_blank"
  rel="noreferrer"
  className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
>
<FontAwesomeIcon icon={faXTwitter} className="text-black dark:text-white" style={{ fontSize: '3rem' }} />

  <span className="text-lg font-medium">X</span>
  <span className="text-sm text-muted-foreground">ecell_mitmeerut</span>
</a>


            {/* YouTube */}
            <a
              href="https://www.youtube.com/@ecell_mitmeerut"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="h-12 w-12">
                <svg
                  viewBox="0 0 24 24"
                  fill="#FF0000"
                  className="h-12 w-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.8 8.001s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9-2.7-.2-6.8-.2-6.8-.2s-4.1 0-6.8.2c-.5.1-1.2.1-1.9.9-.6.6-.8 2-.8 2s-.2 1.7-.2 3.3v1.6c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.6.8 2 .9 1.5.1 6.6.2 6.6.2s4.1 0 6.8-.2c.5-.1 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3V11.3c.1-1.6-.1-3.3-.1-3.3zM9.75 14.25v-4.5l4.5 2.25-4.5 2.25z" />
                </svg>
              </span>
              <span className="text-lg font-medium">YouTube</span>
              <span className="text-sm text-muted-foreground">@ecell_mitmeerut</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Social;
