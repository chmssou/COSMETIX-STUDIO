'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

// CINEMATIC ANIMATION MANIFESTO CONSTANTS
const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const

const services = [
  {
    id: 1,
    metric: '+32% Engagement',
    title: 'Cinematic 3D Product Films',
    description: 'Transform your products into compelling visual narratives that captivate audiences and drive engagement.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    metric: '+45% Conversion',
    title: 'Interactive Web3D Experiences',
    description: 'Immersive 3D web experiences that let customers explore products in unprecedented detail.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    id: 3,
    metric: '+58% ROI',
    title: 'Visual Effects',
    description: 'Cutting-edge VFX solutions that elevate your content and create unforgettable visual impact.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: POWER3_OUT }
  },
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
<section id="services" className="py-24 bg-[#1A1A1A] relative">
      {/* Subtle blue glow behind key section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A94867]/5 rounded-full blur-[100px] pointer-events-none" />
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            SERVICES
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/60 max-w-xl">
            Premium 3D visualization and motion design services that elevate brands.
          </motion.p>
        </motion.div>

        {/* Services Grid - 3 Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group bg-white/5 border border-white/10 rounded-xl p-8 hover:border-[#A94867]/50 transition-all duration-300"
            >
              {/* Result Metric */}
              <div className="text-left mb-6">
                <span className="text-[#A94867] text-sm font-semibold tracking-wide">
                  {service.metric}
                </span>
              </div>

              {/* Icon */}
              <div className="text-white mb-6 group-hover:text-[#A94867] transition-colors duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white text-left mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed text-left">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

