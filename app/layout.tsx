import type { Metadata } from 'next'
import { Inter, Playfair_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ServiceWorkerRegister from '../components/ui/ServiceWorkerRegister'
import TopProgressBar from '../components/ui/TopProgressBar'
import GoogleAnalytics from '../components/utils/GoogleAnalytics'
import SmoothScroller from '../components/utils/SmoothScroller'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dhruvchora.com'),
  title: 'Dhruv Chora – Web Developer for Small Businesses | Portfolio',
  description: 'I build fast, mobile-friendly websites that help small businesses get more customers. Check my work and let’s talk.',
  keywords: ['web developer', 'freelance', 'Next.js', 'React', 'Tailwind CSS', 'Gurugram', 'India'],
  authors: [{ name: 'Dhruv Chora' }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Dhruv Chora – Web Developer for Small Businesses | Portfolio',
    description: 'I build fast, mobile-friendly websites that help small businesses get more customers. Check my work and let’s talk.',
    url: 'https://dhruvchora.com',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/hero_image_compressed.webp',
        width: 800,
        height: 800,
        alt: 'Dhruv Chora — Web Developer for Small Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhruv Chora – Web Developer for Small Businesses | Portfolio',
    description: 'I build fast, mobile-friendly websites that help small businesses get more customers. Check my work and let’s talk.',
    images: ['/hero_image_compressed.webp'],
  },
}

export const viewport: import('next').Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${geistMono.variable} bg-background`} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dhruv Chora",
              "jobTitle": "Web Developer",
              "url": "https://dhruvchora.com",
              "image": "https://dhruvchora.com/hero_image_compressed.webp",
              "description": "I build fast, mobile-friendly websites that help small businesses get more customers. Check my work and let's talk.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gurugram",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://github.com/7hruv",
                "https://www.linkedin.com/in/dhruv-chora-948220404/",
                "https://www.instagram.com/loplo.ae/"
              ]
            })
          }}
        />
        {/* Preload hero image — fetchpriority="high" for LCP */}
        <link
          rel="preload"
          as="image"
          href="/hero_image_compressed.webp"
          fetchPriority="high"
        />
        {/* Favicon — SVG scales perfectly at all sizes */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        {/* Apple home screen icon (180×180 PNG) */}
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* Task 9 — PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Inline above-the-fold critical CSS — nav + hero layout + colour tokens.
            Prevents render-blocking flash before the main stylesheet arrives. */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --background: oklch(0.985 0 0);
            --foreground: oklch(0.145 0 0);
            --primary: oklch(0.205 0 0);
            --primary-foreground: oklch(0.985 0 0);
            --secondary: oklch(0.97 0 0);
            --muted-foreground: oklch(0.45 0 0);
            --accent: oklch(0.55 0.05 250);
            --border: oklch(0.90 0 0);
            --radius: 0.625rem;
          }
          .dark {
            --background: oklch(0.12 0 0);
            --foreground: oklch(0.95 0 0);
            --primary: oklch(0.95 0 0);
            --primary-foreground: oklch(0.12 0 0);
            --secondary: oklch(0.22 0 0);
            --muted-foreground: oklch(0.65 0 0);
            --accent: oklch(0.65 0.05 250);
            --border: oklch(0.25 0 0);
          }
          html { background-color: var(--background); overflow-x: hidden; max-width: 100vw; -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; }
          body { background-color: var(--background); color: var(--foreground); margin: 0; font-size: 1rem; font-family: Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; max-width: 100vw; -webkit-overflow-scrolling: touch; }
          /* Hero section min-height so layout doesn't shift */
          section[aria-label="Introduction"] { min-height: 100vh; min-height: 100svh; }
        ` }} />

        {/* Inline script runs before React hydration — eliminates flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body id="top" className="font-sans antialiased" suppressHydrationWarning>
        <SmoothScroller />
        <TopProgressBar />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
