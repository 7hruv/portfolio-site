import FadeInUp from "../ui/FadeInUp"
import ClientCard from "../cards/ClientCard"
import { CLIENT_WORK } from "../../lib/data"

/**
 * ClientWorkSection Component
 * Showcases past projects completed for clients using the ClientCard component.
 * Maps over the CLIENT_WORK data array.
 */
export default function ClientWorkSection() {
  return (
    <section id="client-work" aria-labelledby="client-work-heading" className="py-28 md:py-32 px-6 lg:px-8 scroll-section">
      <div className="max-w-[1200px] mx-auto">
        <FadeInUp>
          <div className="relative inline-block mb-12">
            <h2 id="client-work-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground relative z-10">
              Businesses I&apos;ve Helped Grow Online
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/60 rounded-full" aria-hidden="true" />
          </div>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CLIENT_WORK.map((project, index) => (
            <FadeInUp key={project.title} delay={index * 0.12} className="h-full">
              <ClientCard {...project} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
