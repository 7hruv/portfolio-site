"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Instagram, Download, Menu, X, Sun, Moon } from "lucide-react"

// ── Dark mode hook — reads localStorage + system preference ──────────────────
function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  // Debounce ref prevents rapid toggling from causing stuck/flash states
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = useCallback(() => {
    // Ignore rapid clicks within 300ms to prevent stuck states
    if (debounceRef.current) return
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null
    }, 300)

    // Add transitioning class to prevent universal wildcard transitions from breaking 60fps
    document.documentElement.classList.add("theme-transitioning")
    
    // Force a reflow so the browser registers the transition rules before changing classes
    void document.documentElement.offsetHeight

    const next = !isDark
    setIsDark(next)

    try {
      if (next) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    } catch {
      // localStorage unavailable (private browsing) — class still toggled, just won't persist
    }

    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning")
    }, 400)
  }, [isDark])

  return { isDark, toggle }
}

// ── Active section hook using IntersectionObserver ───────────────────────────
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    )

    const observer = observerRef.current
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return activeId
}

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Client Work", id: "client-work" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" }
]
const SECTION_IDS = NAV_ITEMS.map((i) => i.id)

/**
 * Navbar Component
 * Renders the main navigation header with dark mode toggle, scroll-spy functionality,
 * and a mobile menu. It animates from a full-width header to a floating pill on scroll.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)
  const { isDark, toggle } = useDarkMode()
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  // 'top' = State 1, 'pill' = State 2 — mutated directly, never causes re-render
  const navStateRef = useRef<'top' | 'pill'>('top')
  const willChangeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Floating-pill scroll-driven animation ─────────────────────────────────
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // Transition to pill: morph smoothly into pill
    const gotoPill = () => {
      navStateRef.current = 'pill'
      header.classList.add('header-floating') // directly add the pill styles to morph smoothly
      if (willChangeTimerRef.current) clearTimeout(willChangeTimerRef.current)
      willChangeTimerRef.current = setTimeout(() => { header.style.willChange = '' }, 850)
    }

    // Transition to top: morph pill back to original full width header
    const gotoTop = () => {
      header.classList.remove('header-floating', 'is-scrolled')
      if (willChangeTimerRef.current) clearTimeout(willChangeTimerRef.current)
      willChangeTimerRef.current = setTimeout(() => {
        header.style.willChange = ''
        navStateRef.current = 'top'
      }, 650) // Matches the normal 650ms return transition
    }

    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const state = navStateRef.current

        // Set will-change during scroll; remove after 200ms of inactivity
        header.classList.add('is-scrolling')
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
        scrollTimerRef.current = setTimeout(() => {
          header.classList.remove('is-scrolling')
        }, 200)

        // Determine threshold based on the about section position
        const aboutElement = document.getElementById('about')
        const threshold = aboutElement ? aboutElement.offsetTop - 100 : (header.offsetHeight || 72)

        // State transitions
        if (y <= 300 && state === 'pill') {
          gotoTop()
        } else if (y > threshold && state === 'top') {
          gotoPill()
        }

        // Background opacity while in pill state
        if (state === 'pill') {
          header.classList.toggle('is-scrolled', y > 30)
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (willChangeTimerRef.current) clearTimeout(willChangeTimerRef.current)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [])

  // Lock body scroll when mobile menu is open; keep header opaque while open
  useEffect(() => {
    const header = headerRef.current
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
      header?.classList.add('is-scrolled')
    } else {
      document.body.style.overflow = ""
      // Only remove is-scrolled if genuinely at the top of the page
      if (window.scrollY <= 10 && navStateRef.current === 'top') {
        header?.classList.remove('is-scrolled')
      }
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Close mobile menu on outside tap
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick, { passive: true })
    document.addEventListener("touchstart", handleOutsideClick, { passive: true })
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("touchstart", handleOutsideClick)
    }
  }, [mobileMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [mobileMenuOpen])

  return (
    <header ref={headerRef} className="ios-header">
      <nav aria-label="Main navigation" className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/#top"
            className="text-xl font-semibold text-foreground transition-opacity hover:opacity-70 min-h-[44px] min-w-[44px] flex items-center relative z-50"
            aria-label="Dhruv Chora — home"
          >
            DC
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative text-sm transition-colors duration-200 min-h-[44px] px-1 inline-flex items-center ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-2 left-1 right-1 h-px bg-accent transition duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              )
            })}
            <Link
              href="/dhruv_resume.docx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume (opens PDF)"
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-primary text-primary-foreground rounded-md font-medium min-h-[44px] btn-primary"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Resume
            </Link>
          </div>

          {/* Right cluster: socials + dark mode toggle (desktop) */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <Link
              href="https://github.com/7hruv"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground social-icon"
              aria-label="GitHub profile (opens in new tab)"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/dhruv-chora-948220404/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground social-icon"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </Link>
            <button
              onClick={toggle}
              className="theme-toggle ml-1"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
            >
              {isDark
                ? <Sun className="w-4 h-4" aria-hidden="true" />
                : <Moon className="w-4 h-4" aria-hidden="true" />
              }
            </button>
          </div>

          {/* Mobile: dark mode toggle + hamburger button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
            >
              {isDark
                ? <Sun className="w-4 h-4" aria-hidden="true" />
                : <Moon className="w-4 h-4" aria-hidden="true" />
              }
            </button>
            <button
              ref={menuButtonRef}
              className="p-2 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hamburger-btn"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen
                ? <X className="w-6 h-6" aria-hidden="true" />
                : <Menu className="w-6 h-6" aria-hidden="true" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation — slides down with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              ref={mobileMenuRef}
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    role="menuitem"
                    aria-current={isActive ? "location" : undefined}
                    className={`text-sm py-2 min-h-[44px] flex items-center transition-colors duration-200 ${
                      isActive
                        ? "text-foreground font-medium border-l-2 border-accent pl-3"
                        : "text-muted-foreground hover:text-foreground pl-3"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="flex items-center gap-3 pt-2 pb-1 pl-3">
                <Link
                  href="/dhruv_resume.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download resume (opens PDF)"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm bg-primary text-primary-foreground rounded-md font-medium min-h-[44px] btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Resume
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </header>
  )
}
