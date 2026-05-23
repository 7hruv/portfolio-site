'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function TopProgressBar() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show progress on initial load or route change
    setVisible(true)
    setProgress(20)
    
    const timeouts: NodeJS.Timeout[] = []
    
    timeouts.push(setTimeout(() => setProgress(60), 100))
    timeouts.push(setTimeout(() => setProgress(80), 300))
    
    const complete = () => {
      setProgress(100)
      timeouts.push(setTimeout(() => setVisible(false), 300))
    }

    if (document.readyState === 'complete') {
      complete()
    } else {
      window.addEventListener('load', complete)
    }

    // Intercept clicks on links for smooth visual (hash links or page transitions)
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (target && target.href) {
        setVisible(true)
        setProgress(20)
        setTimeout(() => setProgress(60), 50)
        
        try {
          const hrefAttr = target.getAttribute('href') || ''
          const targetUrl = new URL(target.href)
          const currentUrl = new URL(window.location.href)
          
          // If it's a hash link OR pointing to the exact same page (e.g. clicking logo to scroll up)
          const isQuickJump = hrefAttr.startsWith('#') || targetUrl.pathname === currentUrl.pathname
          
          if (isQuickJump) {
            // Finish immediately after a short fake delay
            setTimeout(() => {
              setProgress(100)
              setTimeout(() => setVisible(false), 200)
            }, 400)
          } else if (target.target !== '_blank') {
            // Stay at 80% until new page actually loads
            setTimeout(() => setProgress(80), 200)
          }
        } catch (err) {
          // Fallback if URL parsing fails
          setTimeout(() => {
            setProgress(100)
            setTimeout(() => setVisible(false), 200)
          }, 400)
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('load', complete)
      document.removeEventListener('click', handleClick)
      timeouts.forEach(clearTimeout)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-accent z-[9999] transition-all duration-200 ease-out pointer-events-none"
      style={{ width: `${progress}%` }}
    />
  )
}
