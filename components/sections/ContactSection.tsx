import Link from "next/link"
import { Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react"

import FadeInUp from "../ui/FadeInUp"
import ContactForm from "../ui/ContactForm"
import CopyEmailButton from "../ui/CopyEmailButton"

/**
 * ContactSection Component
 * Renders the final call to action, including a contact form via Web3Forms,
 * direct email links, and social media links.
 */
export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 md:py-32 px-6 lg:px-8 scroll-section">
      <div className="max-w-2xl mx-auto">
        <FadeInUp>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-center">Ready to Get More Customers Online?</h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <p className="text-muted-foreground text-base md:text-lg mb-10 text-center">
            Tell me about your business and where you want to be. I&apos;ll respond within 24 hours with a clear plan — no confusing tech speak, no surprise fees. You&apos;ll see a working draft before final payment.
          </p>
        </FadeInUp>

        {/* Contact Form */}
        <FadeInUp delay={0.15}>
          <ContactForm />
        </FadeInUp>

        {/* Direct links */}
        <FadeInUp delay={0.25}>
          <div className="mt-10 pt-8 border-t border-border flex flex-col items-center gap-5">
            {/* Task 10 — Email + copy button */}
            <div className="flex items-center gap-2">
              <Link
                href="mailto:dhruvchora37@gmail.com"
                aria-label="Send email to dhruvchora37@gmail.com"
                className="inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-accent transition-colors duration-200 min-h-[44px]"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                dhruvchora37@gmail.com
              </Link>
              <CopyEmailButton email="dhruvchora37@gmail.com" />
            </div>
            <div className="flex items-center gap-4" role="list" aria-label="Social media links">
              <Link
                href="https://github.com/7hruv"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                className="p-3 rounded-full bg-secondary text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center social-icon"
                aria-label="GitHub profile (opens in new tab)"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/dhruv-chora-948220404/"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                className="p-3 rounded-full bg-secondary text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center social-icon"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.instagram.com/loplo.ae/"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                className="p-3 rounded-full bg-secondary text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center social-icon"
                aria-label="Instagram profile (opens in new tab)"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Gurugram, India</span>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
