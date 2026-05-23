import Link from "next/link"

export default function Footer() {
  return (
    <footer role="contentinfo" className="py-8 px-6 border-t border-border">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dhruv Chora &middot; Helping Small Businesses Grow Online
        </p>
        <span className="hidden sm:inline text-border" aria-hidden="true">|</span>
        <Link
          href="/privacy"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}
