import FadeInUp from "../ui/FadeInUp"
import ProjectCard from "../cards/ProjectCard"
import { PROJECTS } from "../../lib/data"

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-28 md:py-32 px-6 lg:px-8 scroll-section">
      <div className="max-w-[1200px] mx-auto">
        <FadeInUp>
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12">What I Build</h2>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <FadeInUp key={project.title} delay={index * 0.12} className="h-full">
              <ProjectCard {...project} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
