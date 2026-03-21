import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  other: {
    "google": "notranslate",
  },
  title: 'Cosmetix Studio | Beauty Visuals That Captivate and Convert',
  description: 'Elegant beauty visuals and cosmetic animations that captivate audiences and drive conversions.',
  keywords: ['Cosmetic Animation', 'Beauty Visuals', '3D Product Film', 'Luxury Brand Video', 'Portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" translate="no" dir="ltr">
      <body className="antialiased">
        {/* Global Custom Cursor */}
        <CustomCursor />
        
        {/* Scroll Progress Indicator */}
        <ScrollProgress />
        
        {/* Global Animated Background */}
        <div className="global-bg">
          <div className="global-bg-blob global-bg-blob-1" />
          <div className="global-bg-blob global-bg-blob-2" />
          <div className="global-bg-blob global-bg-blob-3" />
        </div>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}

