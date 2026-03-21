'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

// CINEMATIC ANIMATION MANIFESTO CONSTANTS
const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const

// ============================================
interface StatItem {
  value: number
  suffix: string
  label: string
}

interface SkillItem {
  name: string
  percentage: number
}
// ============================================

const stats: StatItem[] = [
  { value: 120, suffix: '+', label: 'Projects Delivered' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
]

const skills: SkillItem[] = [
  { name: '3D Modeling', percentage: 95 },
  { name: 'Cinematic Lighting', percentage: 90 },
  { name: 'Motion Graphics', percentage: 85 },
]

// Line-by-line reveal component with y:30 slide up
function AnimatedLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: POWER3_OUT }}
    >
      {children}
    </motion.div>
  )
}

// Counter with smooth count-up animation - 800ms duration
function StatCounter({ value, suffix, label, isInView }: { value: number; suffix: string; label: string; isInView: boolean }) {
  const springValue = useSpring(0, { duration: 800 })
  const displayValue = useTransform(springValue, (val) => Math.floor(val).toString())
  
  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-bold mb-1 text-white">
        <motion.span>{displayValue}</motion.span>
        <span className="text-[#A94867]">{suffix}</span>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">{label}</p>
    </div>
  )
}

// Animated skill bar with glowing tip
function SkillBar({ name, percentage, delay = 0 }: { name: string; percentage: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium tracking-wide text-white/80">{name}</span>
        <span className="text-sm font-semibold text-[#A94867]">{percentage}%</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden relative bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: POWER3_OUT }}
          className="h-full rounded-full relative bg-gradient-to-r from-[#A94867] to-[#F6E3E8]"
        >
          {/* Glowing tip */}
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + 0.6 }}
            style={{ 
              backgroundColor: '#fff',
              boxShadow: '0 0 10px 2px rgba(169, 72, 103, 0.8)',
              filter: 'blur(0.5px)'
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
<section id="about" className="py-16 md:py-20 relative overflow-hidden bg-[#1A1A1A]">
      {/* Purple orb background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none z-0 bg-[#A94867]" />

      {/* Subtle blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#A94867]/5 rounded-full blur-[80px] pointer-events-none" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: The Story */}
          <div className="space-y-6">
            <AnimatedLine delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
                BEHIND THE<br />
                <span className="text-[#A94867]">PIXELS</span>
              </h2>
            </AnimatedLine>
            
            <AnimatedLine delay={0.2}>
              <p className="text-lg leading-relaxed max-w-xl text-white/70">
                With over 8 years of mastery in 3D visualization and motion design, 
                I transform complex concepts into immersive visual experiences that 
                captivate audiences and drive results.
              </p>
            </AnimatedLine>
            
            <AnimatedLine delay={0.3}>
              <p className="text-base leading-relaxed max-w-xl text-white/50">
                From product reveals to cinematic brand films, every project is an 
                opportunity to push creative boundaries and deliver work that 
                exceeds expectations.
              </p>
            </AnimatedLine>
          </div>

          {/* RIGHT COLUMN: The Data - Glassmorphism Panel */}
          <div className="relative">
            <div className="rounded-2xl p-8 relative overflow-hidden bg-[#0B0D10]/50 backdrop-blur-md border border-white/10">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#A94867]/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="grid grid-cols-3 gap-6 mb-10">
                  {stats.map((stat, index) => (
                    <StatCounter
                      key={index}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      isInView={isInView}
                    />
                  ))}
                </div>

                <div className="h-[1px] mb-8 bg-white/10" />

                <div>
                  <motion.h4 
                    className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: POWER3_OUT }}
                    style={{ color: 'white', opacity: 0.4 }}
                  >
                    Core Expertise
                  </motion.h4>
                  
                  <div className="space-y-1">
                    {skills.map((skill, index) => (
                      <SkillBar
                        key={index}
                        name={skill.name}
                        percentage={skill.percentage}
                        delay={0.1 * index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

