import Loading from '@/components/Loading'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
<main className="min-h-screen">
      <Loading />
      <Header />
      <Hero />
      <Portfolio />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}

