"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Mail, X } from "lucide-react"

const COOKIE_NAME = "exit-intent-dismissed"

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const triggeredRef = useRef(false)

  useEffect(() => {
    // Don't show if already dismissed within 7 days
    if (document.cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=`))) return

    let maxScroll = 0

    // Desktop: mouse leaves viewport from the top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggeredRef.current) {
        triggeredRef.current = true
        setShow(true)
      }
    }

    // Mobile: user scrolls back near top after having scrolled past 500px
    const onScroll = () => {
      if (window.scrollY > maxScroll) maxScroll = window.scrollY
      if (maxScroll > 500 && window.scrollY < 60 && !triggeredRef.current) {
        triggeredRef.current = true
        setShow(true)
      }
    }

    document.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const dismiss = () => {
    setShow(false)
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `${COOKIE_NAME}=1; expires=${expires}; path=/; SameSite=Lax`
  }

  if (!show) return null

  return (
    <div
      className="exit-intent-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div className="exit-intent-card">
        <button
          onClick={dismiss}
          aria-label="Close popup"
          className="exit-intent-close"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
        <div className="text-3xl mb-3" aria-hidden="true">👋</div>
        <h2 id="exit-intent-title" className="text-xl font-serif font-bold text-foreground mb-2">
          Let&apos;s work together
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Have a project in mind? Drop me a message — I&apos;d love to hear about it.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            onClick={dismiss}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium min-h-[44px] btn-primary"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Get in Touch
          </Link>
          <button
            onClick={dismiss}
            className="px-4 py-2.5 text-sm text-muted-foreground border border-border rounded-md min-h-[44px] btn-secondary"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
