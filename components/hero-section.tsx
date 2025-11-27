"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full snap-start flex flex-col items-center justify-center bg-background">
      {/* Pulsing chat bubble icon */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-foreground/10"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.4, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
          style={{ width: 80, height: 80 }}
        />

        {/* Second pulse ring (delayed) */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-foreground/10"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.3, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: 0.8,
          }}
          style={{ width: 80, height: 80 }}
        />

        {/* Chat bubble icon */}
        <div className="relative w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-background">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated dots inside bubble */}
            <motion.circle
              cx="8"
              cy="12"
              r="1.5"
              fill="currentColor"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
            />
            <motion.circle
              cx="12"
              cy="12"
              r="1.5"
              fill="currentColor"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
            />
            <motion.circle
              cx="16"
              cy="12"
              r="1.5"
              fill="currentColor"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
            />
          </svg>
        </div>
      </motion.div>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        استانداردی جدید.
      </motion.p>

      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">اسکرول کنید</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/60">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
