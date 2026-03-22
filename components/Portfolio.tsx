'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { getProjects } from '@/lib/queries'
import { urlFor } from '@/sanity/lib/image'

type Project = {
  _id: string
  id?: string
  title: string
  category: string
  videoSrc?: string
  thumbnail?: string
  images?: string[]
  btsVideo?: string
  order?: number
}

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const
const PREMIUM_EASE = [0.77, 0, 0.175, 1] as const



function ImageLightbox({ imageSrc, onClose }: { imageSrc: string; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100000] bg-black flex items-center justify-center p-6" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 hover:bg-white flex items-center justify-center text-white hover:text-black transition-all duration-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <img src={imageSrc} alt="" className="max-w-full object-contain rounded-xl shadow-2xl max-h-[90vh]" />
    </motion.div>
  )
}

function GalleryModal({ projects, currentIndex, onClose }: { projects: Project[], currentIndex: number, onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [imageLightbox, setImageLightbox] = useState<string | null>(null)
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const currentProject = projects[activeIndex]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const preventScroll = (e: WheelEvent) => e.stopPropagation()
    document.addEventListener('wheel', preventScroll, { passive: false })
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('wheel', preventScroll)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { imageLightbox ? setImageLightbox(null) : onClose() }
      else if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + projects.length) % projects.length)
      else if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % projects.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [projects.length, onClose, imageLightbox])

  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.pause()
      mainVideoRef.current.load()
      mainVideoRef.current.play().catch(() => {})
    }
  }, [activeIndex])

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/95 overflow-y-auto cursor-auto"
        style={{ overscrollBehavior: 'contain' }} onWheel={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="fixed top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="flex items-center justify-center p-6 relative">
          <div className="relative w-full max-w-5xl">
            <video ref={mainVideoRef} src={currentProject.videoSrc} poster={currentProject.thumbnail}
              controls autoPlay key={currentProject._id}
              className="w-full max-h-[55vh] object-contain rounded-xl shadow-2xl" />
            <div className="absolute bottom-8 left-8 text-white bg-black/30 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="text-2xl font-bold">{currentProject.title}</h3>
              <p className="text-lg opacity-90">{currentProject.category}</p>
            </div>
            <button onClick={() => setActiveIndex(i => (i - 1 + projects.length) % projects.length)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 hover:bg-[#A94867] flex items-center justify-center text-white transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => setActiveIndex(i => (i + 1) % projects.length)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 hover:bg-[#A94867] flex items-center justify-center text-white transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        {currentProject.images && currentProject.images.length > 0 && (
          <div className="px-2 pb-6">
            <div className="grid grid-cols-3 gap-1 w-full">
              {currentProject.images.map((imageSrc, imageIndex) => (
                <motion.button key={`${currentProject._id}-${imageIndex}`}
                  className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#A94867] transition-all duration-300"
                  onClick={() => setImageLightbox(imageSrc)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <img src={imageSrc} alt={`${currentProject.title} ${imageIndex + 1}`}
                    style={{ filter: "blur(8px)", transition: "filter 0.7s ease" }} className="w-full h-full object-cover hover:brightness-110" onLoad={(e) => { e.currentTarget.style.filter = "blur(0px)" }} />
                </motion.button>
              ))}
            </div>
          </div>
        )}
        {currentProject.btsVideo && (
          <div className="px-6 pb-12 pt-8">
            <div className="w-full h-px bg-white/10 mb-8" />
            <div className="text-center mb-12">
              <h3 className="text-white/60 text-sm tracking-widest uppercase font-mono mb-2">BEHIND THE SCENES</h3>
              <p className="text-white/60 text-sm tracking-widest uppercase">Viewport Render Process</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <video src={currentProject.btsVideo} controls loop muted className="w-full max-h-[60vh] object-contain rounded-xl shadow-2xl" />
            </div>
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {imageLightbox && <ImageLightbox imageSrc={imageLightbox} onClose={() => setImageLightbox(null)} />}
      </AnimatePresence>
    </>
  )
}

function PortfolioCard({ project, index, onOpenModal }: { project: Project; index: number; onOpenModal: (index: number) => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8,
    })
  }

  return (
    <motion.div ref={cardRef} style={{ y, rotateX: mousePosition.x, rotateY: mousePosition.y }}
      onMouseEnter={() => { setIsHovered(true); videoRef.current?.play().catch(() => {}) }}
      onMouseLeave={() => { setIsHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }; setMousePosition({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove} onClick={() => onOpenModal(index)}
      className="group relative bg-white/40 backdrop-blur-md rounded-lg overflow-hidden cursor-pointer border border-[#A94867]/20 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(169,72,103,0.15)] hover:-translate-y-1 transition-all duration-300"
      data-cursor="project">
      <div className="relative aspect-video overflow-hidden">
        <img src={project.thumbnail} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          src={project.videoSrc} muted loop playsInline preload="none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-black/40 to-transparent pointer-events-none" />
        <motion.div className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }} transition={{ duration: 0.3 }}>
          <div className="w-16 h-16 rounded-full bg-[#A94867]/90 flex items-center justify-center backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        <h3 className="text-white font-bold drop-shadow-md text-lg">{project.title}</h3>
        <p className="text-white/80 text-sm drop-shadow-md">{project.category}</p>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)

  const displayedProjects = showAll ? projects : projects.slice(0, 4)

  useEffect(() => {
    getProjects().then((data) => {
      const mapped = data.map((p: any) => ({
        ...p,
        videoSrc: p.videoSrc || '',
        thumbnail: p.thumbnail || '',
        images: p.images || [],
        btsVideo: p.btsVideo || ''
      }))
        setProjects(mapped)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center py-20 text-gray-400">Loading...</div>
      </section>
    )
  }

  return (
    <>
      <section id="portfolio" className="py-20 bg-white">
        <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: POWER3_OUT }}>
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-12 uppercase tracking-tighter">Selected Works</h2>
          </motion.div>
          {projects.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No projects available</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {displayedProjects.map((project, i) => (
                <motion.div key={project._id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: POWER3_OUT }}>
                  <PortfolioCard project={project} index={i} onOpenModal={setSelectedProjectIndex} />
                </motion.div>
              ))}
              {projects.length > 4 && (
                <motion.button
                  key="show-more"
                  className="md:col-span-3 mx-auto px-8 py-4 border border-[#A94867] text-[#A94867] rounded-full font-medium tracking-wide hover:bg-[#A94867] hover:text-white transition-all duration-300 mt-8"
                  onClick={() => setShowAll(!showAll)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showAll ? 'Show Less' : 'Show More'}
                </motion.button>
              )}
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {typeof selectedProjectIndex === 'number' && (
          <GalleryModal projects={projects} currentIndex={selectedProjectIndex} onClose={() => setSelectedProjectIndex(null)} />
        )}
      </AnimatePresence>
    </>
  )
}