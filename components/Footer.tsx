'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const

export default function Footer() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/cosmetixstudio/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/the_cosmetixstudio/',
      icon: <Instagram size={24} />,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/Thecosmetixstudio',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="py-12 relative" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#A94867] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-12">
          <motion.a
            href="mailto:cosmetixstudio@outlook.com"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#A94867] text-white font-medium text-lg tracking-wide cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[#A94867] hover:shadow-[0_10px_30px_rgba(169,72,103,0.4)] hover:scale-[1.02]"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            cosmetixstudio@outlook.com
          </motion.a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: POWER3_OUT }}
            className="text-sm tracking-wide text-center md:text-left"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            © {new Date().getFullYear()} COSMETIX STUDIO. ALL RIGHTS RESERVED.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: POWER3_OUT }}
                className="group flex items-center gap-2 hover:text-[#A94867] transition-all duration-300"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                whileHover={{ y: -2 }}
              >
                <div className="p-1 rounded-lg group-hover:bg-[#A94867]/10 transition-colors duration-300">
                  {link.icon}
                </div>
                <span className="text-sm uppercase tracking-[0.1em] font-medium">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}