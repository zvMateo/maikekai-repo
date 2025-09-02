import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BookingButtons from '@/components/BookingButtons'
import Features from '@/components/Features'
import SurfPackages from '@/components/SurfPackages'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'
import FixedBottomBar from '@/components/FixedBottomBar'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-surf-light via-white to-surf-light">
      <Header />
      <Hero />
      <BookingButtons />
      <Features />
      <SurfPackages />
      <Reviews />
      <Footer />
      <FixedBottomBar />
    </main>
  )
}
