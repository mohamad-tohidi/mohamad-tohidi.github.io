"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StorySectionProps {
  label: string
  title: string
  subtitle: string
  index: number
}

export function StorySection({ label, title, subtitle, index }: StorySectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })

  return (
    <section ref={ref} className="relative flex h-screen snap-start items-center justify-center overflow-hidden px-6">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/20 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-block text-sm font-medium tracking-[0.2em] text-muted-foreground"
        >
          {label}
        </motion.span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-2 text-balance text-5xl font-light leading-tight tracking-tight text-muted-foreground md:text-7xl lg:text-8xl"
        >
          {subtitle}
        </motion.p>

        {/* Slide number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-sm font-medium text-muted-foreground/50"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>
      </div>
    </section>
  )
}
