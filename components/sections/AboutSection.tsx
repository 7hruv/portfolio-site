import FadeInUp from "../ui/FadeInUp"

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-28 md:py-32 px-6 lg:px-8 scroll-section">
      <div className="max-w-3xl mx-auto">
        <FadeInUp>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">Why Small Businesses Trust Me</h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            I&apos;ve built sites that hit 95+ on Lighthouse and load in under two seconds — but honestly, the number that matters most is whether visitors stick around and become customers. That&apos;s what I&apos;m actually building toward.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-4">
            My stack is React, Tailwind CSS, and Node.js. I use AI to speed through the repetitive groundwork, which means more of my time goes toward the parts that actually need thinking. Every project is built and reviewed by me personally — you&apos;ll always know who to call.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-4">
            I stay current on performance, accessibility, and how the web is evolving, so your site doesn&apos;t age out in two years. Hand me the tech side. Go run your business.
          </p>
        </FadeInUp>
      </div>
    </section>
  )
}
