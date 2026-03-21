'use client'

import { useRef, useState } from 'react'
import { motion, useInView, Variants, useSpring } from 'framer-motion'

// CINEMATIC ANIMATION MANIFESTO CONSTANTS
const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const

// Magnetic Button Component with micro-interactions
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }
  
  const reset = () => setPosition({ x: 0, y: 0 })
  
  const x = useSpring(position.x, { stiffness: 300, damping: 20 })
  const y = useSpring(position.y, { stiffness: 300, damping: 20 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      // Hover: y: -2px, subtle glow, stronger shadow
      whileHover={{ y: -2 }}
      // Click/Tap: scale: 0.97
      whileTap={{ scale: 0.97 }}
      className="relative px-10 py-4 font-semibold text-white overflow-hidden rounded-lg group"
    >
      {/* Gradient Background with purple accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#A94867] via-[#F6E3E8] to-[#A94867] transition-all duration-500 group-hover:opacity-90" />
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#F6E3E8] via-[#A94867] to-[#F6E3E8] opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.5 }}
      />
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ boxShadow: '0 4px 15px rgba(169, 72, 103, 0.3)' }}
        whileHover={{ boxShadow: '0 8px 30px rgba(169, 72, 103, 0.5)' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: POWER3_OUT }
    },
  }

  return (
    <section id="contact" className="py-16 md:py-20 bg-[#1A1A1A] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#F6E3E8] opacity-50" />
      
      {/* Subtle blue glow behind key sections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A94867]/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Animated blur circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-[#A94867]/10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-[#A94867]/10 blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: '20%', right: '10%' }}
        />
      </div>

      <div ref={sectionRef} className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Blockquote */}
          <blockquote className="mb-8">
            <p className="text-xl sm:text-2xl font-light text-white/80 italic leading-relaxed mb-4">
              "Cinematic quality that doesn't just tell a story â€” it converts complex data into absolute clarity."
            </p>
            <cite className="text-sm text-[#A94867] not-italic tracking-wide">
              â€” Marketing Director, TechCorp
            </cite>
          </blockquote>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Let's Build Something
            <span className="text-[#A94867]"> Meaningful</span>
          </h2>
          
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Ready to transform your vision into stunning visual experiences? 
            Let's discuss your project.
          </p>

          {/* Magnetic Gradient Shift Button with micro-interactions */}
          <MagneticButton>
            Get In Touch
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

