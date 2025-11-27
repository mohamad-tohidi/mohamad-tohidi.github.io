"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ScrollIndicatorProps {
  totalSections: number
}

export function ScrollIndicator({ totalSections }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    const handleScroll = () => {
      const scrollHeight = mainElement.scrollHeight - mainElement.clientHeight
      const scrollTop = mainElement.scrollTop
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScrollProgress(progress)

      const sectionHeight = 1 / totalSections
      const currentSection = Math.min(Math.floor(progress / sectionHeight), totalSections - 1)
      setActiveSection(currentSection)
    }

    mainElement.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => mainElement.removeEventListener("scroll", handleScroll)
  }, [totalSections])

  const scrollToSection = (index: number) => {
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    const sections = mainElement.querySelectorAll("section")
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
      <div className="flex flex-col items-center gap-3">
        {Array.from({ length: totalSections }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToSection(index)}
            className="group relative flex h-3 w-3 items-center justify-center"
            aria-label={`Go to section ${index + 1}`}
          >
            <span
              className={`absolute h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? "h-3 w-3 bg-foreground"
                  : "bg-muted-foreground/40 group-hover:bg-muted-foreground"
              }`}
            />
          </motion.button>
        ))}
      </div>

      {/* Progress line */}
      <div className="absolute -left-4 top-0 h-full w-px bg-border">
        <motion.div className="w-full bg-foreground" style={{ height: `${scrollProgress * 100}%` }} />
      </div>
    </div>
  )
}
