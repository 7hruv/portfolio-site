import FadeInUp from "../ui/FadeInUp"
import { SKILL_CATEGORIES } from "../../lib/data"

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-28 md:py-32 px-6 lg:px-8 scroll-section">
      <div className="max-w-[1200px] mx-auto">
        <FadeInUp>
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12">The Tools Behind Every Result</h2>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <FadeInUp key={category.title} delay={index * 0.1}>
              <div className="bg-card rounded-xl p-6 border border-border h-full skill-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <ul className="space-y-2" aria-label={`${category.title} skills`}>
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-sm text-muted-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
