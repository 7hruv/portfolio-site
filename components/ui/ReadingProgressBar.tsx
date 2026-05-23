"use client"

import { useState, useEffect } from "react"

/**
 * Top reading progress bar that fills up as the user scrolls down the page.
 * Uses a requestAnimationFrame-throttled scroll listener for 60fps performance.
 * The animation uses CSS transform: scaleX, which avoids main-thread repaints.
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      setProgress(scrollable > 0 ? el.scrollTop / scrollable : 0)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    // Initial update
    updateProgress()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="reading-progress-bar"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
