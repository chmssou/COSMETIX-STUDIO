'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

// CINEMATIC ANIMATION MANIFESTO CONSTANTS
const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const
const EXPO_OUT = [0.19, 1, 0.22, 1] as const

export default function Showreel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 1.02 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: EXPO_OUT }
    },
  }

  return (
<section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden bg-[#1A1A1A]">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0"
      >
        {/* Video Container */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/showreel-poster.jpg"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: POWER3_OUT }}
              className="text-white/60 text-sm uppercase tracking-[0.3em] mb-4"
            >
              Showreel 2024
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8, ease: POWER3_OUT }}
              className="text-2xl sm:text-4xl font-bold text-white"
            >
              30 Seconds of Magic
            </motion.h3>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

