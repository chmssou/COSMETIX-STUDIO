'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion'

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const
const PREMIUM_EASE = [0.77, 0, 0.175, 1] as const

// Animated counter component
function AnimatedCounter({ value, isInView }: { value: string; isInView: boolean }) {
  const [hasAnimated, setHasAnimated] = useState(false)
  
  return (
    <motion.span
      initial={{ opacity: 0.2 }}
      animate={isInView && !hasAnimated ? { opacity: 1 } : {}}
      onAnimationComplete={() => setHasAnimated(true)}
      className="text-6xl sm:text-7xl font-bold text-[#A94867]"
    >
      {value}
    </motion.span>
  )
}

// Process step component with hover effects
function ProcessStep({ 
  step, 
  index, 
  isInView,
  isActive 
}: { 
  step: { number: string; title: string; description: string }
  index: number
  isInView: boolean
  isActive: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: POWER3_OUT }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-default"
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)',
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-4 rounded-lg bg-gradient-to-r from-[#A94867]/20 via-[#F6E3E8]/10 to-[#A94867]/20 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: PREMIUM_EASE }}
        style={{
          boxShadow: isHovered ? '0 0 30px rgba(169, 72, 103, 0.3), 0 0 60px rgba(169, 72, 103, 0.1)' : 'none',
        }}
      />
      
      <div className="relative mb-6">
        <AnimatedCounter value={step.number} isInView={isInView} />
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A] relative inline-block">
        {step.title}
        {/* Animated underline */}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#A94867] to-[#F6E3E8]"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.4, ease: PREMIUM_EASE }}
        />
      </h3>
      
      <p className="text-sm leading-relaxed text-[#1A1A1A]/60">
        {step.description}
      </p>
    </motion.div>
  )
}

const steps = [
  { number: '01', title: 'Discovery', description: 'Understanding your vision, goals, and target audience through detailed consultation.' },
  { number: '02', title: 'Concept', description: 'Developing storyboards, style frames, and technical approaches for approval.' },
  { number: '03', title: 'Production', description: 'Creating 3D models, animations, and visual effects with iterative refinement.' },
  { number: '04', title: 'Delivery', description: 'Final rendering, post-production, and optimization for all platforms.' },
]

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const activeIndex = Math.min(Math.floor(smoothProgress.get() * steps.length), steps.length - 1)

  return (
    <section id="process" className="py-16 md:py-20 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F6E3E8]/20 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A94867]/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: POWER3_OUT }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A]">PROCESS</h2>
          <p className="max-w-xl text-[#1A1A1A]/60">A systematic approach to delivering exceptional visual experiences.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Interactive connecting line */}
          <div className="hidden md:block absolute top-16 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-[2px] origin-left">
            <div className="absolute inset-0 bg-[#1A1A1A]/10 rounded-full" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#A94867]/50 via-[#A94867] to-[#A94867]/50 rounded-full"
              style={{ scaleX: smoothProgress, opacity: smoothProgress }}
            />
          </div>

          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              step={step}
              index={index}
              isInView={isInView}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
