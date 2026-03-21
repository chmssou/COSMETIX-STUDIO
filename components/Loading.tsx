'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const

function MagneticContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }
    setPosition({ x: (e.clientX - (left + width / 2)) * 0.15, y: (e.clientY - (top + height / 2)) * 0.15 })
  }
  const reset = () => setPosition({ x: 0, y: 0 })
  const x = useSpring(position.x, { stiffness: 300, damping: 20 })
  const y = useSpring(position.y, { stiffness: 300, damping: 20 })
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x, y }} className="cursor-default">
      {children}
    </motion.div>
  )
}

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: POWER3_OUT }}
          className="fixed inset-0 z-[9999] bg-[#1A1A1A] h-screen w-screen flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          <div className="absolute w-40 h-40 rounded-full bg-[#A94867]/20 blur-3xl" />
          <div className="absolute w-32 h-32 rounded-full bg-[#EC4899]/15 blur-3xl -translate-x-8 translate-y-4" />

          <MagneticContainer>
            <div className="relative flex items-center justify-center">
              <motion.svg
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                width="120" height="120" viewBox="0 0 24 24" fill="none"
                className="relative z-10"
              >
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <motion.path d="M7 12L10 15L17 8" stroke="#A94867" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: POWER3_OUT }} />
                <motion.path d="M7 12L10 15L17 8" stroke="#A94867" strokeWidth="8"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: POWER3_OUT }}
                  style={{ filter: 'blur(6px)' }} />
              </motion.svg>
            </div>
          </MagneticContainer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}