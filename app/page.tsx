import Navbar from "../components/layout/Navbar"
import ReadingProgressBar from "../components/ui/ReadingProgressBar"
import BackToTop from "../components/ui/BackToTop"
import ExitIntentPopup from "../components/ui/ExitIntentPopup"
import Footer from "../components/layout/Footer"

import HeroSection from "../components/sections/HeroSection"
import AboutSection from "../components/sections/AboutSection"
import ClientWorkSection from "../components/sections/ClientWorkSection"
import ProjectsSection from "../components/sections/ProjectsSection"
import SkillsSection from "../components/sections/SkillsSection"
import ContactSection from "../components/sections/ContactSection"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Task 11 — Reading progress bar */}
      <ReadingProgressBar />

      {/* Navigation */}
      <Navbar />

      {/* ── Main Content ── */}
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ClientWorkSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Task 4 — Floating Back to Top button */}
      <BackToTop />
      {/* Task 7 — Exit intent popup */}
      <ExitIntentPopup />
    </div>
  )
}
