'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const
const EXPO_OUT = [0.19, 1, 0.22, 1] as const

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.03,
      duration: 0.4,
      ease: POWER3_OUT,
    },
  }),
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -50])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const titleLines = ['COSMETIX', 'STUDIO']

  const renderAnimatedText = (text: string) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="inline-block">
        <motion.span
          custom={index}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={letterVariants}
          className={letter === ' ' ? 'w-[0.3em]' : ''}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      </span>
    ))
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      
      {/* Socials moved to Header/Navbar - no duplicate here */}
      
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: POWER3_OUT }}
        className="absolute inset-0 z-[100] bg-black pointer-events-none"
      />

      <motion.div 
        style={{ y: y1 }}
        initial={{ scale: 1.1, filter: 'blur(10px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ 
          duration: 10, 
          ease: [0.77, 0, 0.175, 1] 
        }}
        className="absolute inset-0 z-0"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-poster.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/30 via-transparent to-[#A94867]/10" />
      </motion.div>

      {/* Subtle text readability overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]/20" />

        <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div 
        style={{ y: y2 }}
        className="relative z-20 max-w-7xl mx-auto pt-20 md:pt-0 px-6 text-center"
      >

        <motion.h1
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide"
        >

          {titleLines.map((line, lineIndex) => (
            <div key={lineIndex} className="overflow-hidden">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: POWER3_OUT }}
                className="flex justify-center"
              >
                <span className="flex flex-wrap justify-center">
                  {renderAnimatedText(line)}
                </span>
              </motion.div>
            </div>
          ))}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: POWER3_OUT }}
          className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
        >
          BEAUTY VISUALS THAT CAPTIVATE AND CONVERT
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: POWER3_OUT }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="#portfolio">
            <motion.span 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-8 py-4 bg-[#A94867] text-white font-semibold rounded transition-all duration-300 hover:scale-[1.03] relative shadow-[0_0_20px_rgba(169,72,103,0.3)] hover:shadow-[0_0_30px_rgba(169,72,103,0.5)]"
            >
              <span className="absolute inset-0 rounded blur-lg bg-[#A94867]/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">View Work</span>
            </motion.span>
          </MagneticButton>
          
          <MagneticButton href="#contact">
            <motion.span 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-8 py-4 border border-[#1A1A1A]/30 text-white font-semibold rounded transition-all duration-300 relative hover:border-[#A94867] hover:text-[#A94867] shadow-[0_0_15px_rgba(169,72,103,0.1)] hover:shadow-[0_0_25px_rgba(169,72,103,0.3)]"
            >
              <span className="absolute inset-0 rounded blur-lg bg-[#A94867]/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Contact</span>
            </motion.span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative flex flex-col items-center">
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-2 bg-white/60 rounded-full"
            />
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 w-1 h-1 bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

