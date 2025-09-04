'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Camera, MapPin, Users, Waves, Heart, Eye, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { GalleryImage } from '@/components/ui/OptimizedImage'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useDebounce } from '@/hooks/useDebounce'

interface GalleryImageData {
  id: number
  src: string
  alt: string
  category: string
  title: string
  description: string
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Debounce para evitar cambios muy rápidos
  const debouncedCategory = useDebounce(selectedCategory, 100)

  const categories = [
    { id: 'all', name: 'All Photos', icon: Camera },
    { id: 'hotel', name: 'Hotel & Rooms', icon: MapPin },
    { id: 'surf', name: 'Surf Lessons', icon: Waves },
    { id: 'activities', name: 'Activities', icon: Users },
    { id: 'nature', name: 'Nature & Beach', icon: Heart }
  ]

  const galleryImages: GalleryImageData[] = [
    // Hotel & Rooms
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Hotel exterior with ocean view',
      category: 'hotel',
      title: 'Oceanfront Hotel',
      description: 'Our beautiful beachfront property with stunning ocean views'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Luxury hotel room',
      category: 'hotel',
      title: 'Deluxe Ocean View Room',
      description: 'Spacious rooms with private balconies overlooking the Pacific'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Hotel pool area',
      category: 'hotel',
      title: 'Infinity Pool',
      description: 'Relax by our infinity pool with panoramic ocean views'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Hotel restaurant',
      category: 'hotel',
      title: 'Ocean View Restaurant',
      description: 'Fresh local cuisine with breathtaking ocean views'
    },
    // Surf Lessons
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Surf lesson in progress',
      category: 'surf',
      title: 'Professional Surf Instruction',
      description: 'Learn to surf with our certified ISA instructors'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Surfer catching a wave',
      category: 'surf',
      title: 'Perfect Wave Conditions',
      description: 'Consistent waves perfect for all skill levels'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Surfboard rental',
      category: 'surf',
      title: 'Premium Equipment',
      description: 'High-quality surfboards and wetsuits available for rent'
    },
    // Activities
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Yoga on the beach',
      category: 'activities',
      title: 'Beach Yoga',
      description: 'Start your day with sunrise yoga on the beach'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Snorkeling adventure',
      category: 'activities',
      title: 'Snorkeling Tours',
      description: 'Explore the underwater world of Costa Rica'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Sunset cruise',
      category: 'activities',
      title: 'Sunset Cruises',
      description: 'Relax and enjoy the beautiful Costa Rican sunsets'
    },
    // Nature & Beach
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Beautiful beach sunset',
      category: 'nature',
      title: 'Stunning Sunsets',
      description: 'Witness breathtaking sunsets over the Pacific Ocean'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Tropical rainforest',
      category: 'nature',
      title: 'Tropical Paradise',
      description: 'Surrounded by lush tropical rainforest'
    }
  ]

  // Memoizar imágenes filtradas para optimizar rendimiento
  const filteredImages = useMemo(() => {
    if (debouncedCategory === 'all') return galleryImages
    return galleryImages.filter(img => img.category === debouncedCategory)
  }, [debouncedCategory])

  // Memoizar imágenes visibles para el slideshow
  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, 6) // Mostrar solo las primeras 6 para mejor rendimiento
  }, [filteredImages])

  // Auto-play slideshow
  useEffect(() => {
    if (isPlaying && selectedImage !== null) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % visibleImages.length)
        setSelectedImage(visibleImages[currentSlide]?.id || null)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, selectedImage, visibleImages, currentSlide])

  const openLightbox = useCallback((imageId: number) => {
    setSelectedImage(imageId)
    setIsPlaying(false)
    const imageIndex = visibleImages.findIndex(img => img.id === imageId)
    setCurrentSlide(imageIndex >= 0 ? imageIndex : 0)
  }, [visibleImages])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    setIsPlaying(false)
  }, [])

  const nextImage = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % visibleImages.length)
    setSelectedImage(visibleImages[currentSlide]?.id || null)
  }, [visibleImages, currentSlide])

  const prevImage = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + visibleImages.length) % visibleImages.length)
    setSelectedImage(visibleImages[currentSlide]?.id || null)
  }, [visibleImages, currentSlide])

  const toggleSlideshow = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleCategoryChange = useCallback((category: string) => {
    setIsLoading(true)
    setSelectedCategory(category)
    setTimeout(() => setIsLoading(false), 300) // Simular carga
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
        case ' ':
          e.preventDefault()
          toggleSlideshow()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, closeLightbox, prevImage, nextImage, toggleSlideshow])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-surf-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-surf-navy mb-4">
            Gallery
          </h2>
          <p className="text-xl text-surf-blue max-w-3xl mx-auto">
            Discover the beauty of Maikekai Surf through our photo gallery
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                onClick={() => handleCategoryChange(category.id)}
                className="flex items-center gap-2"
                motionProps={{
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 }
                }}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            )
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo-teal-500"></div>
              </div>
            ) : (
              filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <Card
                    variant="surf"
                    className="group cursor-pointer overflow-hidden"
                    onClick={() => openLightbox(image.id)}
                    motionProps={{
                      whileHover: { y: -5 },
                      transition: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <GalleryImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-surf-navy mb-1">{image.title}</h3>
                      <p className="text-sm text-surf-blue">{image.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-6xl w-full h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Image */}
                <div className="flex-1 min-h-0 relative">
                  <GalleryImage
                    src={visibleImages[currentSlide]?.src || ''}
                    alt={visibleImages[currentSlide]?.alt || ''}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between p-4 bg-black/50 text-white">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevImage}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSlideshow}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <span className="text-sm">
                      {currentSlide + 1} / {visibleImages.length}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextImage}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 p-4 bg-black/50">
                  {visibleImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index)
                        setSelectedImage(visibleImages[index]?.id || null)
                      }}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery