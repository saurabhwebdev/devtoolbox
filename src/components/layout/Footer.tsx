"use client"

import Link from "next/link"
import { FeedbackForm } from "@/components/FeedbackForm"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevToolBox. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <FeedbackForm />
          <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
            <Link href="https://github.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
            <Link href="https://twitter.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
} 