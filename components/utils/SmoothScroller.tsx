"use client"

import { useEffect } from 'react'

export default function SmoothScroller() {
  useEffect(() => {
    // Respect user preference for reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let cleanup: (() => void) | undefined

    const init = async () => {
      try {
        // Dynamic import — Lenis is NOT in the critical bundle
        const { default: Lenis } = await import('lenis')
        let lenis: any
        let rafId: number

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        })

        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        const handleHashClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement
          const link = target.closest('a')
          if (link && link.hash && link.href.split('#')[0] === window.location.href.split('#')[0]) {
            e.preventDefault()
            lenis.scrollTo(link.hash, { offset: 0, duration: 1.2 })
          }
        }
        document.addEventListener('click', handleHashClick)

        cleanup = () => {
          document.removeEventListener('click', handleHashClick)
          cancelAnimationFrame(rafId)
          lenis?.destroy()
        }
      } catch (error) {
        // Fallback silently
      }
    }

    // Defer until the browser is idle — does not block LCP or TBT
    let idleHandle: number | ReturnType<typeof setTimeout>
    if (typeof requestIdleCallback !== 'undefined') {
      idleHandle = requestIdleCallback(init, { timeout: 2000 })
    } else {
      idleHandle = setTimeout(init, 200)
    }

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(idleHandle as number)
      } else {
        clearTimeout(idleHandle as ReturnType<typeof setTimeout>)
      }
      cleanup?.()
    }
  }, [])

  return null
}
