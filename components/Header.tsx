'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="relative text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#A94867] group-hover:w-full transition-all duration-300 rounded-full" />
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const navLinks = [
    { name: 'Work', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ]

  if (isLoading) return null

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: POWER3_OUT }}
      className={scrolled ? 'fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#1A1A1A]/10 py-3 transition-all duration-500' : 'fixed top-0 left-0 right-0 z-50 bg-transparent py-5 transition-all duration-500'}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={scrolled ? 'flex items-center justify-between h-14 transition-all duration-500' : 'flex items-center justify-between h-20 transition-all duration-500'}>
          <div className="flex items-center gap-3">
            <a href="#" className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#A94867]/50">
                <Image src="/profile2.jpg" alt="Cosmetix Studio" width={40} height={40} className="w-full h-full object-cover" />
              </div>
            </a>
            <a href="https://www.linkedin.com/company/cosmetixstudio/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group hover:bg-[#A94867] transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 group-hover:text-white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/the_cosmetixstudio/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group hover:bg-[#A94867] transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 group-hover:text-white"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.facebook.com/Thecosmetixstudio" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group hover:bg-[#A94867] transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 group-hover:text-white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (<NavLink key={link.name} href={link.href}>{link.name}</NavLink>))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white/60 hover:text-white transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden bg-black/90 backdrop-blur-md overflow-hidden">
              <div className="flex flex-col items-center py-8 gap-6">
                {navLinks.map((link) => (<a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-medium hover:text-[#A94867] transition-colors duration-200">{link.name}</a>))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}