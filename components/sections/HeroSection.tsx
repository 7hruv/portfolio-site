"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"

/**
 * HeroSection Component
 * Displays the main introductory section of the portfolio with a profile image,
 * headline, value proposition, and primary call-to-action buttons.
 */
export default function HeroSection() {
  const [imgError, setImgError] = useState(false)

  return (
    <section
      aria-label="Introduction"
      className="relative pt-32 pb-28 md:pt-36 md:pb-32 px-6 lg:px-8 overflow-hidden"
    >
      {/* Light mode gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background transition-opacity duration-500 dark:opacity-0"
      />
      {/* Dark mode gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 bg-gradient-to-b from-secondary/20 via-background to-background transition-opacity duration-500 dark:opacity-100"
      />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="relative flex-shrink-0 hero-img-enter">
            <div className="hero-float w-[min(288px,75vw)] h-[min(288px,75vw)] lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl shadow-black/10">
              {!imgError ? (
                <Image
                  src="/hero_image_compressed.webp"
                  alt="Dhruv Chora — Web Builder for Small Businesses"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover object-top"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 288px, 384px"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-accent/20 to-secondary flex items-center justify-center text-muted-foreground/50">
                  <span className="sr-only">Image placeholder</span>
                </div>
              )}
            </div>
          </div>

          {/* Hero Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 hero-text-1">
              Web Builder for Small Businesses
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance hero-text-2">
              Hi, I&apos;m Dhruv Chora
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed hero-text-3">
              Your customers are searching for you right now. I build high-performance, mobile-first websites that load in under 2 seconds, rank on Google, and turn visitors into real paying customers — while you focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 hero-text-4">
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume (opens PDF)"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium min-h-[44px] w-full sm:w-auto justify-center btn-primary"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Resume
              </Link>
              <Link
                href="#contact"
                className="px-6 py-3 border border-border text-foreground rounded-md font-medium min-h-[44px] w-full sm:w-auto text-center btn-secondary"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
