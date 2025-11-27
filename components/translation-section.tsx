"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TranslationSectionProps {
  index: number
}

const words = [
  { japanese: "すべての", persian: "برای" },
  { japanese: "文化と", persian: "تمام" },
  { japanese: "国々の", persian: "فرهنگ‌ها" },
  { japanese: "ために。", persian: "و ملل." },
]

export function TranslationSection({ index }: TranslationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [translatedCount, setTranslatedCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(0)
  const scrollThreshold = 100

  const isComplete = translatedCount >= words.length
  const isAtStart = translatedCount <= 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.8
        setIsInView(inView)

        if (inView) {
          scrollAccumulator.current = 0
          // Lock scroll when entering if animation not complete
          if (translatedCount < words.length && translatedCount > 0) {
            setIsLocked(true)
          }
        } else {
          setIsLocked(false)
        }
      },
      { threshold: [0.8, 1] },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [translatedCount])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isInView) return

      const now = Date.now()
      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      // Allow natural scrolling when animation is at boundaries
      if (isComplete && isScrollingDown) {
        setIsLocked(false)
        return
      }
      if (isAtStart && isScrollingUp) {
        setIsLocked(false)
        return
      }

      // Prevent default scroll behavior during animation
      e.preventDefault()
      e.stopPropagation()
      setIsLocked(true)

      // Debounce rapid scroll events
      if (now - lastScrollTime.current < 50) {
        return
      }

      const delta = Math.abs(e.deltaY)
      scrollAccumulator.current += delta

      if (scrollAccumulator.current >= scrollThreshold) {
        lastScrollTime.current = now
        scrollAccumulator.current = 0

        if (isScrollingDown) {
          setTranslatedCount((prev) => Math.min(prev + 1, words.length))
        } else {
          setTranslatedCount((prev) => Math.max(prev - 1, 0))
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
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-block text-sm font-medium tracking-[0.2em] text-muted-foreground"
        >
          پشتیبانی از چندین زبان
        </motion.span>

        {/* Title line - first two words */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance text-5xl font-light leading-tight tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="inline-flex flex-wrap justify-center gap-x-4" dir="rtl">
            {words.slice(0, 2).map((word, i) => (
              <span key={i} className="relative inline-block min-w-[1ch]">
                {/* Japanese text */}
                <AnimatePresence mode="wait">
                  {i >= translatedCount && (
                    <motion.span
                      key={`jp-${i}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-foreground"
                    >
                      {word.japanese}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Persian text */}
                <AnimatePresence mode="wait">
                  {i < translatedCount && (
                    <motion.span
                      key={`fa-${i}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-foreground"
                    >
                      {word.persian}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Cursor */}
                {i === translatedCount && translatedCount < 2 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute -right-3 top-0 h-full w-1 rounded-full bg-foreground"
                  />
                )}
              </span>
            ))}
          </span>
        </motion.div>

        {/* Subtitle line - last two words */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-2 text-balance text-5xl font-light leading-tight tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="inline-flex flex-wrap justify-center gap-x-4" dir="rtl">
            {words.slice(2).map((word, i) => {
              const actualIndex = i + 2
              return (
                <span key={i} className="relative inline-block min-w-[1ch]">
                  {/* Japanese text */}
                  <AnimatePresence mode="wait">
                    {actualIndex >= translatedCount && (
                      <motion.span
                        key={`jp-${actualIndex}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-muted-foreground"
                      >
                        {word.japanese}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Persian text */}
                  <AnimatePresence mode="wait">
                    {actualIndex < translatedCount && (
                      <motion.span
                        key={`fa-${actualIndex}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-muted-foreground"
                      >
                        {word.persian}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Cursor */}
                  {actualIndex === translatedCount && translatedCount >= 2 && translatedCount < words.length && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="absolute -right-3 top-0 h-full w-1 rounded-full bg-muted-foreground"
                    />
                  )}
                </span>
              )
            })}
          </span>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          {/* Progress dots */}
          <div className="flex gap-2">
            {words.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i < translatedCount ? "bg-foreground" : "bg-muted-foreground/30"
                }`}
                animate={{ scale: i === translatedCount ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.5, repeat: i === translatedCount ? Number.POSITIVE_INFINITY : 0 }}
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
