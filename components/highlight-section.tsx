"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface HighlightSectionProps {
  index: number
}

const words = ["زمان", "هوشمند", "سازی،", "امروز", "است."]

export function HighlightSection({ index }: HighlightSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [highlightedCount, setHighlightedCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(0)
  const scrollThreshold = 100

  const isComplete = highlightedCount >= words.length
  const isAtStart = highlightedCount <= 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.8
        setIsInView(inView)

        if (inView) {
          scrollAccumulator.current = 0
        }
      },
      { threshold: [0.8, 1] },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isInView) return

      const now = Date.now()
      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      if (isComplete && isScrollingDown) {
        return
      }
      if (isAtStart && isScrollingUp) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      if (now - lastScrollTime.current < 50) {
        return
      }

      const delta = Math.abs(e.deltaY)
      scrollAccumulator.current += delta

      if (scrollAccumulator.current >= scrollThreshold) {
        lastScrollTime.current = now
        scrollAccumulator.current = 0

        if (isScrollingDown) {
          setHighlightedCount((prev) => Math.min(prev + 1, words.length))
        } else {
          setHighlightedCount((prev) => Math.max(prev - 1, 0))
        }
      }
    },
    [isInView, isComplete, isAtStart],
  )

  useEffect(() => {
    if (!isInView) return

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [handleWheel, isInView])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen snap-start items-center justify-center overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/20 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-light leading-tight tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="inline-flex flex-wrap justify-center gap-x-4" dir="rtl">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="relative inline-block"
                animate={{
                  color: i < highlightedCount ? "hsl(var(--foreground))" : "hsl(0 0% 40%)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="flex gap-2">
            {words.map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                animate={{
                  backgroundColor: i < highlightedCount ? "hsl(var(--foreground))" : "hsl(0 0% 30%)",
                  scale: i === highlightedCount ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: i === highlightedCount ? Number.POSITIVE_INFINITY : 0 }}
              />
            ))}
          </div>

          <span className="text-sm font-medium text-muted-foreground/50">
            {isComplete ? "ادامه دهید" : "اسکرول کنید"}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
