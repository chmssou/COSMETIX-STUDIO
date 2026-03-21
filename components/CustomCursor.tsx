'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

// Premium cubic-bezier easing
const PREMIUM_EASE = [0.77, 0, 0.175, 1] as const

interface CursorState {
  variant: 'default' | 'view' | 'play'
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({ variant: 'default' })
  const cursorRef = useRef<HTMLDivElement>(null)
  
  // Motion values for smooth following
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animation for premium feel
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 })
  
  // Scale transform based on state
  const scale = useTransform(
    useMotionValue(0),
    [0, 1],
    cursorState.variant === 'default' ? [1, 1] : [1, 2.5]
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Detect hover over project cards for 'VIEW' cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for project cards
      const projectCard = target.closest('[data-cursor="project"]')
      const videoCard = target.closest('[data-cursor="video"]')
      
      if (projectCard) {
        setCursorState({ variant: 'view' })
      } else if (videoCard) {
        setCursorState({ variant: 'play' })
      } else {
        setCursorState({ variant: 'default' })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  // Hide default cursor on the entire page
  useEffect(() => {
    document.body.style.cursor = 'none'
    
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="relative"
          animate={{
            scale: cursorState.variant === 'default' ? 1 : 1.8,
          }}
          transition={{
            duration: 0.3,
            ease: PREMIUM_EASE,
          }}
        >
          {/* Main circle */}
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-white"
            animate={{
              backgroundColor: cursorState.variant === 'default' ? 'transparent' : 'rgba(169, 72, 103, 0.8)',
              scale: cursorState.variant === 'default' ? 1 : 1,
            }}
            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
          />
          
          {/* Context text */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: cursorState.variant === 'default' ? 0 : 1,
              scale: cursorState.variant === 'default' ? 0.5 : 1,
            }}
            transition={{ duration: 0.2, ease: PREMIUM_EASE }}
          >
            <span className="text-white text-[10px] font-bold tracking-widest">
              {cursorState.variant === 'view' && 'VIEW'}
              {cursorState.variant === 'play' && 'PLAY'}
            </span>
          </motion.div>
        </motion.div>
        
        {/* Small dot in center - only when default */}
        {cursorState.variant === 'default' && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: PREMIUM_EASE }}
          />
        )}
      </motion.div>
    </>
  )
}

