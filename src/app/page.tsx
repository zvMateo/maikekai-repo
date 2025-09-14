import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedPackages from "@/components/FeaturedPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import PhotoGallery from "@/components/PhotoGallery";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import {
  SurfServiceStructuredData,
  ReviewsStructuredData,
  FAQStructuredData,
} from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <PhotoGallery />
      <FinalCTA />
      <Footer />

      {/* Structured Data for SEO */}
      <SurfServiceStructuredData />
      <FAQStructuredData />
    </main>
  );
}
