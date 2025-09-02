'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Waves, MapPin, Calendar, Users, Heart, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Review } from '@/types'
import Image from 'next/image'

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0)
  const [filterSource, setFilterSource] = useState<string>('all')
  const [filterRating, setFilterRating] = useState<number>(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const reviews = [
    {
      id: '1',
      name: 'Sarah',
      country: 'USA',
      comment: 'Pura vida! The instructors were incredible. I caught my first wave in 3 days. This place changed my life.',
      date: '2024-01-15',
      package: 'Beginner'
    },
    {
      id: '2',
      name: 'Mike',
      country: 'Canada',
      comment: 'Perfect waves, perfect instructors, perfect vibes. Will definitely be back next season!',
      date: '2024-01-10',
      package: 'Intermediate'
    },
    {
      id: '3',
      name: 'Emma',
      country: 'UK',
      comment: 'As a beginner, I was nervous but the team made me feel so comfortable. The beachfront location is stunning!',
      date: '2024-01-08',
      package: 'Beginner'
    },
    {
      id: '4',
      name: 'David',
      country: 'Australia',
      comment: 'Professional operation from start to finish. ISA certified instructors and top quality equipment.',
      date: '2024-01-05',
      package: 'Intermediate'
    },
    {
      id: '5',
      name: 'Lisa',
      country: 'Germany',
      comment: 'The advanced coaching was exactly what I needed. Big wave training and video analysis helped me improve so much.',
      date: '2024-01-03',
      package: 'Advanced'
    },
    {
      id: '6',
      name: 'Tom',
      country: 'France',
      comment: 'Great value! Everything included - accommodation, meals, transport, equipment. Perfect for year-round surfing.',
      date: '2024-01-01',
      package: 'Weekend'
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [autoPlay, reviews.length])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
    setAutoPlay(false)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
    setAutoPlay(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
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
    <section id="reviews" className="py-24 bg-gradient-to-b from-white to-surf-light/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Waves size={32} className="text-logo-teal-500 mr-3" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-surf-navy">
              Pura Vida Stories
            </h2>
            <Waves size={32} className="text-logo-teal-500 ml-3" />
          </div>
          <p className="text-xl text-surf-blue/80 max-w-2xl mx-auto">
            Real experiences from our surf family around the world
          </p>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-surf-blue/10">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-surf-sand fill-current" />
              ))}
            </div>
            <div className="text-2xl font-bold text-surf-navy">5.0</div>
            <div className="text-surf-blue/70 text-sm">
              from {reviews.length} surfers
            </div>
          </div>
        </motion.div>

        {/* Featured Review */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <AnimatePresence>
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Review Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-surf-blue/10 relative overflow-hidden">
                {/* Wave Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <Waves size={128} className="text-logo-teal-500" />
                </div>
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-logo-teal-200">
                  <Quote size={32} />
                </div>

                {/* Review Content */}
                <div className="relative z-10">
                  {/* Comment */}
                  <blockquote className="text-2xl md:text-3xl font-serif text-surf-navy leading-relaxed mb-8 italic">
                    "{reviews[currentReview]?.comment}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-logo-teal-400 to-surf-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {reviews[currentReview]?.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-surf-navy text-lg">
                          {reviews[currentReview]?.name}
                        </div>
                        <div className="text-sm text-surf-blue/70">
                          {reviews[currentReview]?.country} • {formatDate(reviews[currentReview]?.date || '')}
                        </div>
                      </div>
                    </div>

                    {/* Package Badge */}
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${getPackageColor(reviews[currentReview]?.package || '')} bg-current/10`}>
                      {reviews[currentReview]?.package}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 transform -translate-y-1/2 -left-6">
                <button
                  onClick={prevReview}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-surf-navy hover:text-logo-teal-500 hover:bg-logo-teal-50 transition-all duration-300 border border-surf-blue/10"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -right-6">
                <button
                  onClick={nextReview}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-surf-navy hover:text-logo-teal-500 hover:bg-logo-teal-50 transition-all duration-300 border border-surf-blue/10"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Review Counter */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-sm text-surf-blue/70">
                {currentReview + 1} of {reviews.length}
              </span>
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentReview ? 'bg-logo-teal-500 w-6' : 'bg-surf-blue/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-logo-teal-500 to-surf-blue rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Wave Pattern Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4">
                <Waves size={64} className="text-white" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Waves size={48} className="text-white" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready to Ride the Wave?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join our surf family and create your own Pura Vida story
              </p>
              <button className="bg-white text-logo-teal-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Surf Journey
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
