import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BookingButtons from '@/components/BookingButtons'
import Features from '@/components/Features'
import SurfPackages from '@/components/SurfPackages'
import Reviews from '@/components/Reviews'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import FixedBottomBar from '@/components/FixedBottomBar'
import DebugInfo from '@/components/DebugInfo'
import { SurfServiceStructuredData, ReviewsStructuredData, FAQStructuredData } from '@/components/seo/StructuredData'
import { useReviews } from '@/hooks/useReviews'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-surf-light via-white to-surf-light">
      <DebugInfo />
      <Header />
      <Hero />
      <BookingButtons />
      <Features />
      <SurfPackages />
      <Reviews />
      <Gallery />
      <Footer />
      <FixedBottomBar />
      
      {/* Structured Data for SEO */}
      <SurfServiceStructuredData />
      <FAQStructuredData />
    </main>
  )
}
