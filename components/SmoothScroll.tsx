'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Exact power3.out easing for Lenis
const power3Out = (t: number): number => {
  return 1 - Math.pow(1 - t, 3)
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Maximum 1s as per manifesto
      easing: power3Out,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
