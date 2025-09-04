'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, Waves, Play, Pause, SkipBack, SkipForward, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Review } from '@/types'
import Image from 'next/image'
import { useReviews } from '@/hooks/useReviews'

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0)
  const [filterSource, setFilterSource] = useState<string>('all')
  const [filterRating, setFilterRating] = useState<number>(0)
  const [autoPlay, setAutoPlay] = useState(true)
  
  // Use Supabase and Google Reviews data
  const { reviews, loading, error, averageRating, totalReviews } = useReviews()

  // Fallback reviews if Supabase is not configured
  const fallbackReviews = [
    {
      id: '1',
      name: 'Sarah',
      country: 'USA',
      comment: 'Pura vida! The instructors were incredible. I caught my first wave in 3 days. This place changed my life.',
      date: '2024-01-15',
      package: 'Beginner',
      rating: 5,
      avatar: 'S'
    },
    {
      id: '2',
      name: 'Mike',
      country: 'Canada',
      comment: 'Perfect waves, perfect instructors, perfect vibes. Will definitely be back next season!',
      date: '2024-01-10',
      package: 'Intermediate',
      rating: 5,
      avatar: 'M'
    },
    {
      id: '3',
      name: 'Emma',
      country: 'UK',
      comment: 'As a beginner, I was nervous but the team made me feel so comfortable. The beachfront location is stunning!',
      date: '2024-01-08',
      package: 'Beginner',
      rating: 5,
      avatar: 'E'
    },
    {
      id: '4',
      name: 'David',
      country: 'Australia',
      comment: 'Professional operation from start to finish. ISA certified instructors and top quality equipment.',
      date: '2024-01-05',
      package: 'Intermediate',
      rating: 5,
      avatar: 'D'
    },
    {
      id: '5',
      name: 'Lisa',
      country: 'Germany',
      comment: 'The advanced coaching was exactly what I needed. Big wave training and video analysis helped me improve so much.',
      date: '2024-01-03',
      package: 'Advanced',
      rating: 5,
      avatar: 'L'
    },
    {
      id: '6',
      name: 'Tom',
      country: 'France',
      comment: 'Great value! Everything included - accommodation, meals, transport, equipment. Perfect for year-round surfing.',
      date: '2024-01-01',
      package: 'Weekend',
      rating: 5,
      avatar: 'T'
    }
  ]

  // Use fallback data if Supabase is not configured or there's an error
  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews
  const displayLoading = loading && reviews.length === 0
  const displayError = error && reviews.length === 0
  const displayAverageRating = averageRating > 0 ? averageRating : 5.0
  const displayTotalReviews = totalReviews > 0 ? totalReviews : fallbackReviews.length

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || displayReviews.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % displayReviews.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [autoPlay, displayReviews.length])

  const nextReview = () => {
    if (displayReviews.length === 0) return
    setCurrentReview((prev) => (prev + 1) % displayReviews.length)
    setAutoPlay(false)
  }

  const prevReview = () => {
    if (displayReviews.length === 0) return
    setCurrentReview((prev) => (prev - 1 + displayReviews.length) % displayReviews.length)
    setAutoPlay(false)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const getPackageColor = (packageName: string) => {
    switch (packageName) {
      case 'Beginner': return 'text-green-500'
      case 'Intermediate': return 'text-yellow-500'
      case 'Advanced': return 'text-red-500'
      case 'Weekend': return 'text-blue-500'
      default: return 'text-logo-teal-500'
    }
  }

  return (
    <section id="reviews" className="py-24 bg-gradient-to-br from-surf-light/20 via-white to-surf-light/10 relative overflow-hidden">
      {/* Background Wave Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10">
          <Waves size={120} className="text-logo-teal-500" />
        </div>
        <div className="absolute bottom-20 right-10">
          <Waves size={80} className="text-surf-blue" />
        </div>
        <div className="absolute top-1/2 left-1/4">
          <Waves size={60} className="text-logo-teal-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-logo-teal-400 to-surf-blue rounded-full flex items-center justify-center mr-4">
              <Waves size={32} className="text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-surf-navy">
              Pura Vida Stories
            </h2>
            <div className="w-16 h-16 bg-gradient-to-br from-surf-blue to-logo-teal-400 rounded-full flex items-center justify-center ml-4">
              <Waves size={32} className="text-white" />
            </div>
          </div>
          <p className="text-xl text-surf-blue/80 max-w-3xl mx-auto leading-relaxed">
            Real experiences from our surf family around the world. 
            <span className="text-logo-teal-500 font-semibold"> Every wave tells a story.</span>
          </p>
        </motion.div>

        {/* Loading State */}
        {displayLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-logo-teal-500 mx-auto mb-4" />
              <p className="text-surf-blue">Loading reviews...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {displayError && (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-semibold mb-2">Error loading reviews</p>
              <p className="text-red-500 text-sm">{error}</p>
              <p className="text-gray-500 text-xs mt-2">Using fallback data for now</p>
            </div>
          </div>
        )}

        {/* Overall Rating */}
        {!displayLoading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-6 bg-white/90 backdrop-blur-xl rounded-2xl px-12 py-6 shadow-2xl border border-surf-blue/10">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={24} 
                    className={`${i < Math.floor(displayAverageRating) ? 'text-surf-sand fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="text-3xl font-bold text-surf-navy">{displayAverageRating.toFixed(1)}</div>
              <div className="text-surf-blue/70 text-lg font-medium">
                from {displayTotalReviews} surfers
              </div>
              <div className="w-2 h-2 bg-logo-teal-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        )}

        {/* Featured Review */}
        {!displayLoading && displayReviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                >
                {/* Main Review Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 md:p-16 shadow-2xl border border-surf-blue/10 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
                    <Waves size={160} className="text-logo-teal-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5">
                    <Waves size={128} className="text-surf-blue" />
                  </div>
                  
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-logo-teal-200">
                    <Quote size={40} />
                  </div>

                  {/* Review Content */}
                  <div className="relative z-10">
                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={`${i < (displayReviews[currentReview]?.rating || 0) ? 'text-surf-sand fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <blockquote className="text-3xl md:text-4xl font-serif text-surf-navy leading-relaxed mb-12 italic">
                      "{displayReviews[currentReview]?.comment || displayReviews[currentReview]?.text}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-logo-teal-400 to-surf-blue rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {displayReviews[currentReview]?.avatar || displayReviews[currentReview]?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                        <div>
                          <div className="font-bold text-surf-navy text-xl">
                            {displayReviews[currentReview]?.name || 'Anonymous'}
                          </div>
                          <div className="text-surf-blue/70 text-lg">
                            {displayReviews[currentReview]?.country || 'Unknown'} • {formatDate(displayReviews[currentReview]?.date || displayReviews[currentReview]?.created_at || '')}
                          </div>
                        </div>
                      </div>

                      {/* Google Review Badge */}
                      {displayReviews[currentReview]?.is_google_review && (
                        <div className="px-6 py-3 rounded-full text-sm font-semibold text-blue-500 bg-blue-100 shadow-lg">
                          Google Review
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

            {/* Elegant Navigation Controls */}
            <div className="flex items-center justify-center mt-12 space-x-8">
              {/* Previous Button */}
              <button
                onClick={prevReview}
                disabled={displayReviews.length === 0}
                className="group flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-surf-blue/20 hover:bg-logo-teal-500 hover:border-logo-teal-500 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipBack size={20} className="text-surf-navy group-hover:text-white transition-colors" />
                <span className="text-surf-navy group-hover:text-white font-medium transition-colors">Previous</span>
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                disabled={displayReviews.length === 0}
                className="w-14 h-14 bg-gradient-to-br from-logo-teal-400 to-surf-blue rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {autoPlay ? <Pause size={24} /> : <Play size={24} />}
              </button>

              {/* Next Button */}
              <button
                onClick={nextReview}
                disabled={displayReviews.length === 0}
                className="group flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-surf-blue/20 hover:bg-logo-teal-500 hover:border-logo-teal-500 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-surf-navy group-hover:text-white font-medium transition-colors">Next</span>
                <SkipForward size={20} className="text-surf-navy group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <span className="text-surf-blue/70 text-sm font-medium">
                {currentReview + 1} of {displayReviews.length}
              </span>
              <div className="flex space-x-3">
                {displayReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentReview 
                        ? 'bg-logo-teal-500 w-8 shadow-lg' 
                        : 'bg-surf-blue/30 hover:bg-surf-blue/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-br from-logo-teal-500 via-surf-blue to-logo-teal-600 rounded-3xl p-16 text-white relative overflow-hidden">
            {/* Animated Wave Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 animate-pulse">
                <Waves size={80} className="text-white" />
              </div>
              <div className="absolute bottom-8 right-8 animate-pulse" style={{ animationDelay: '1s' }}>
                <Waves size={60} className="text-white" />
              </div>
              <div className="absolute top-1/2 left-1/4 animate-pulse" style={{ animationDelay: '2s' }}>
                <Waves size={40} className="text-white" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Waves size={40} className="text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Ready to Ride the Wave?
              </h3>
              <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join our surf family and create your own 
                <span className="font-semibold"> Pura Vida story</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="bg-white text-logo-teal-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                  Start Your Surf Journey
                </button>
                <button className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-logo-teal-500 transition-all duration-300">
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
