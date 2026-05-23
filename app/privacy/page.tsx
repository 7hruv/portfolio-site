import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Dhruv Chora",
  description:
    "Privacy policy for dhruvchora.com — how your data is handled and protected.",
  robots: { index: true, follow: true },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="h-20 w-full flex items-center justify-between px-6 lg:px-12 border-b border-border/40">
        <Link
          href="/#top"
          className="text-xl font-bold font-serif tracking-tight text-foreground"
          aria-label="Dhruv Chora — return to homepage"
        >
          DC
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-16 max-w-2xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: May 2025
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed text-base">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-lg font-semibold text-foreground mb-2">
              Overview
            </h2>
            <p>
              Hi there! I&apos;m Dhruv Chora, and this is my personal portfolio website (<strong className="text-foreground">dhruvchora.com</strong>). I believe in building trust through transparency, which is why I want you to know exactly how I handle your data. This policy outlines what information I collect, why I need it, and how I protect it. I promise to keep things clear and simple.
            </p>
          </section>

          <section aria-labelledby="data-collected-heading">
            <h2 id="data-collected-heading" className="text-lg font-semibold text-foreground mb-2">
              What Information I Collect & Why
            </h2>
            <p className="mb-2">I only collect what is absolutely necessary to run this site and communicate with you:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                <strong className="text-foreground">Contact Form Data:</strong> When you reach out, I collect your name, email address, and message. This allows me to reply to your enquiry. Under data protection laws (like GDPR and CCPA), this is processed based on your <strong className="text-foreground">consent</strong>.
              </li>
              <li>
                <strong className="text-foreground">Usage Analytics:</strong> I use privacy-friendly analytics to see how many people visit my site and which pages they like. This data is fully anonymised and aggregated. I process this under <strong className="text-foreground">legitimate interest</strong> to improve the site.
              </li>
              <li>
                <strong className="text-foreground">Cookies:</strong> A single local storage item is used to remember your light/dark mode preference. There are no tracking or advertising cookies here.
              </li>
            </ul>
          </section>

          <section aria-labelledby="retention-security-heading">
            <h2 id="retention-security-heading" className="text-lg font-semibold text-foreground mb-2">
              Data Retention & Security
            </h2>
            <p className="mb-2">
              Your privacy is respected, and I don&apos;t keep your data longer than needed:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Retention:</strong> Contact form messages and emails are kept for up to 12 months for reference, after which they are securely deleted unless we are actively working together. Anonymous analytics data is kept indefinitely to track long-term site trends.</li>
              <li><strong className="text-foreground">Security:</strong> This website uses SSL encryption (HTTPS) to ensure any data you submit is transmitted securely. The site is hosted on a secure infrastructure. However, please remember that no method of transmission over the internet is 100% secure.</li>
            </ul>
          </section>

          <section aria-labelledby="portfolio-heading">
            <h2 id="portfolio-heading" className="text-lg font-semibold text-foreground mb-2">
              Portfolio Display
            </h2>
            <p>
              If I design or develop a website for you, I may showcase a screenshot or link to that site in my portfolio as an example of my work. This does not grant me any ownership over your content. If you&apos;d prefer I didn&apos;t display your site, just email me and I will gladly remove it.
            </p>
          </section>

          <section aria-labelledby="third-party-heading">
            <h2 id="third-party-heading" className="text-lg font-semibold text-foreground mb-2">
              Third-Party Services & International Transfers
            </h2>
            <p className="mb-2">
              I rely on a few trusted services to keep this site running:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                <strong className="text-foreground">Hosting:</strong> This site is hosted on Vercel, which is based in the United States. Vercel may process basic request logs (like IP addresses) for infrastructure and security purposes.
              </li>
              <li>
                <strong className="text-foreground">External Links:</strong> My portfolio contains links to external websites (like clients&apos; sites or my social profiles). I am not responsible for the privacy practices or content of those external sites.
              </li>
            </ul>
            <p>
              By using this website, you consent to your data being processed in the United States and other regions where these services operate.
            </p>
          </section>

          <section aria-labelledby="rights-children-heading">
            <h2 id="rights-children-heading" className="text-lg font-semibold text-foreground mb-2">
              Your Rights & Children&apos;s Privacy
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Your Rights:</strong> You have the right to request access to, correction of, or deletion of your personal data at any time. Just email me, and I will respond to your request within 30 days.</li>
              <li><strong className="text-foreground">Children&apos;s Privacy:</strong> This website is aimed at professionals and businesses. It is not directed at children under the age of 13, and I do not knowingly collect personal data from them.</li>
            </ul>
          </section>

          <section aria-labelledby="changes-heading">
            <h2 id="changes-heading" className="text-lg font-semibold text-foreground mb-2">
              Changes to This Policy
            </h2>
            <p>
              I may update this Privacy Policy occasionally to reflect changes in my practices or legal requirements. Any updates will be posted on this page with a revised &quot;Last updated&quot; date. Material changes may be highlighted more prominently.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="text-lg font-semibold text-foreground mb-2">
              Contact Me
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding your privacy, please reach out to me at{" "}
              <a
                href="mailto:dhruvchora37@gmail.com"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                dhruvchora37@gmail.com
              </a>
              . I promise to reply to all privacy-related enquiries within <strong className="text-foreground">2 business days</strong>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Dhruv Chora.</p>
      </footer>
    </div>
  )
}
