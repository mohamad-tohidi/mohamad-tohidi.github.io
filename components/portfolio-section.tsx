"use client"

import { motion } from "framer-motion"
import { ArrowUpLeft } from "lucide-react"

interface PortfolioSectionProps {
  index: number
}

export function PortfolioSection({ index }: PortfolioSectionProps) {
  return (
    <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/20 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-block text-sm font-medium tracking-[0.2em] text-muted-foreground"
        >
          نمونه کار
        </motion.span>

        <motion.a
          href="https://parsaqa.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group flex flex-col items-center gap-6"
        >
          <h2 className="text-balance text-5xl font-light leading-tight tracking-tight transition-colors duration-300 group-hover:text-muted-foreground md:text-7xl lg:text-8xl">
            پروژه‌های قبلی
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
          >
            <span className="text-lg">parsaqa.com</span>
            <ArrowUpLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-[-4px]" />
          </motion.div>
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-lg text-muted-foreground/70"
        >
          مشاهده نمونه‌کارها
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-sm font-medium text-muted-foreground/50"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>
      </div>
    </section>
  )
}
