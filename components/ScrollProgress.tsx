'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// Premium cubic-bezier easing
const PREMIUM_EASE = [0.77, 0, 0.175, 1] as const

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar when user scrolls past 100px
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A94867] via-[#F6E3E8] to-[#A94867] z-[10000] origin-left"
      style={{
        scaleX,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        opacity: { duration: 0.3, ease: PREMIUM_EASE },
      }}
    />
  )
}

