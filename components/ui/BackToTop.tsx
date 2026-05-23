"use client"

import { useState, useEffect } from "react"

/**
 * Floating button that appears after scrolling down, allowing the user to return to the top.
 * Throttles scroll/resize events via requestAnimationFrame to ensure smooth page performance.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const SCROLL_THRESHOLD = 300
    let ticking = false

    function checkVisibility() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const pageHeight = document.documentElement.scrollHeight
          const viewportHeight = window.innerHeight
          // Hide permanently on pages too short to warrant the button
          if (pageHeight <= viewportHeight + SCROLL_THRESHOLD) {
            setVisible(false)
          } else {
            setVisible(window.scrollY > SCROLL_THRESHOLD)
          }
          ticking = false
        })
        ticking = true
      }
    }

    checkVisibility()
    window.addEventListener("scroll", checkVisibility, { passive: true })
    window.addEventListener("resize", checkVisibility, { passive: true })
    return () => {
      window.removeEventListener("scroll", checkVisibility)
      window.removeEventListener("resize", checkVisibility)
    }
  }, [])


  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`back-to-top${visible ? " is-visible" : ""}`}
    >
      {/* Chevron / arrow icon — inline SVG so no extra import needed */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </a>
  )
}
