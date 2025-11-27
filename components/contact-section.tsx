"use client"

import { motion } from "framer-motion"
import { Mail, Phone, InstagramIcon as TelegramIcon } from "lucide-react"

interface ContactSectionProps {
  index: number
}

export function ContactSection({ index }: ContactSectionProps) {
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
          ارتباط با ما
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 text-balance text-4xl font-light leading-tight tracking-tight md:text-6xl lg:text-7xl"
        >
          بیایید صحبت کنیم
        </motion.h2>

        <div className="flex flex-col items-center gap-8">
          {/* Telegram */}
          <motion.a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group flex items-center gap-4 text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground/50 group-hover:bg-foreground/5">
              <TelegramIcon className="h-5 w-5" />
            </div>
            <span className="text-lg">@yourusername</span>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+989123456789"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group flex items-center gap-4 text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground/50 group-hover:bg-foreground/5">
              <Phone className="h-5 w-5" />
            </div>
            <span dir="ltr" className="text-lg">
              +98 912 345 6789
            </span>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:your@email.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group flex items-center gap-4 text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground/50 group-hover:bg-foreground/5">
              <Mail className="h-5 w-5" />
            </div>
            <span className="text-lg">your@email.com</span>
          </motion.a>
        </div>

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
