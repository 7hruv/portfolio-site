import Link from "next/link"
import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "404 — Page Not Found | Dhruv Chora",
  description: "This page doesn't exist. Let's get you back home.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Simplified Header */}
      <header className="h-20 w-full flex items-center justify-between px-6 lg:px-12 border-b border-border/40">
        <Link href="/" className="text-xl font-bold font-serif tracking-tight text-foreground">
          DC
        </Link>
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Return Home
        </Link>
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative select-none">
          <p
            aria-hidden="true"
            className="text-[clamp(6rem,20vw,14rem)] font-serif font-bold leading-none text-foreground/[0.04] pointer-events-none"
          >
            404
          </p>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-3xl mb-1 animate-bounce" aria-hidden="true">
              🧭
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
              Looks like this page drifted offline. Let&apos;s get you back home.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium min-h-[44px] btn-primary hover:opacity-90 transition-opacity"
        >
          ← Back to Homepage
        </Link>
      </main>

      {/* Simplified Footer */}
      <footer className="py-8 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Dhruv Chora. All rights reserved.</p>
      </footer>
    </div>
  )
}
