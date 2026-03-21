'use client'
import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }
    setPosition({ x: (e.clientX - (left + width / 2)) * 0.4, y: (e.clientY - (top + height / 2)) * 0.4 })
  }
  const reset = () => setPosition({ x: 0, y: 0 })
  const x = useSpring(position.x, { stiffness: 300, damping: 20 })
  const y = useSpring(position.y, { stiffness: 300, damping: 20 })
  return (
    <motion.a ref={ref} href={href} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x, y }} className="relative inline-block">
      {children}
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="min-h-[90vh] flex flex-col justify-center items-center bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse at center bottom, rgba(169, 72, 103, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A94867]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[90vw]">
<div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              className="overflow-hidden text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-black text-white tracking-tighter leading-[0.85] text-[14vw] md:text-[8vw] block">Beauty.</span>
            </motion.div>
            <motion.div 
              className="overflow-hidden text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-black text-[#A94867] tracking-tighter leading-[0.85] text-[14vw] md:text-[8vw] block">Motion.</span>
            </motion.div>
            <motion.div 
              className="overflow-hidden text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-black text-white tracking-tighter leading-[0.85] text-[14vw] md:text-[8vw] block">Impact.</span>
            </motion.div>
          </div>

        </div>

        </div>
    </section>
  )
}