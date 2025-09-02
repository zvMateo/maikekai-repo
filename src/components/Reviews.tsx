'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Filter, Award, Shield, Heart, Zap, MapPin, Calendar, Users, ThumbsUp, MessageCircle, ExternalLink } from 'lucide-react'
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
      user_id: 'user1',
      rating: 5,
      title: 'Life-changing surf experience!',
      comment: 'Absolutely incredible experience! The instructors were professional and patient. I went from never surfing to catching my first wave in just 3 days. The accommodation was perfect and the food was delicious. Highly recommend!',
      date: '2024-01-15',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'United States',
      package: 'Pura Vida Beginner',
      helpful: 12
    },
    {
      id: '2',
      user_id: 'user2',
      rating: 5,
      title: 'Best surf vacation ever!',
      comment: 'Best surf vacation ever! The waves were perfect, the instructors knew exactly where to take us each day based on conditions. The package included everything we needed. Will definitely be back!',
      date: '2024-01-10',
      source: 'booking',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'Canada',
      package: 'Costa Rica Intermediate',
      helpful: 8
    },
    {
      id: '3',
      user_id: 'user3',
      rating: 5,
      title: 'Perfect for beginners!',
      comment: 'As a beginner, I was nervous about learning to surf, but the team at Maikekai made me feel so comfortable. The small group size meant I got lots of personal attention. The beachfront location is stunning!',
      date: '2024-01-08',
      source: 'airbnb',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'United Kingdom',
      package: 'Pura Vida Beginner',
      helpful: 15
    },
    {
      id: '4',
      user_id: 'user4',
      rating: 5,
      title: 'Professional and safe operation',
      comment: 'Professional operation from start to finish. The instructors are ISA certified and really know their stuff. The equipment was top quality and the safety briefing was thorough. Perfect for intermediate surfers!',
      date: '2024-01-05',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'Australia',
      package: 'Costa Rica Intermediate',
      helpful: 22
    },
    {
      id: '5',
      user_id: 'user5',
      rating: 5,
      title: 'Advanced coaching at its finest',
      comment: 'The advanced package was exactly what I was looking for. Big wave training, video analysis, and coaching on technique. The instructors really helped me improve my surfing. Amazing experience!',
      date: '2024-01-03',
      source: 'hostelworld',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'Germany',
      package: 'Elite Advanced Pro',
      helpful: 18
    },
    {
      id: '6',
      user_id: 'user6',
      rating: 5,
      title: 'Excellent value for money',
      comment: 'Great value for money! The package included accommodation, meals, transport, and equipment. The instructors were friendly and knowledgeable. The location is perfect for surfing year-round.',
      date: '2024-01-01',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'France',
      package: 'Weekend Warrior',
      helpful: 7
    },
    {
      id: '7',
      user_id: 'user7',
      rating: 5,
      title: 'Solo traveler friendly',
      comment: 'I came alone and felt so welcome! The other guests were friendly and the instructors made sure everyone had a great time. The food was amazing and the rooms were clean and comfortable.',
      date: '2023-12-28',
      source: 'booking',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'Netherlands',
      package: 'Pura Vida Beginner',
      helpful: 11
    },
    {
      id: '8',
      user_id: 'user8',
      rating: 5,
      title: '¡Perfecto para hispanohablantes!',
      comment: 'Perfecto! Los instructores hablan español e inglés. Las olas estaban increíbles y el hotel está en una ubicación perfecta. Definitivamente volveré el próximo año.',
      date: '2023-12-25',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'Spain',
      package: 'Costa Rica Intermediate',
      helpful: 9
    },
    {
      id: '9',
      user_id: 'user9',
      rating: 5,
      title: 'Amazing photography service',
      comment: 'The photography service was amazing! I got beautiful shots of me surfing that I can treasure forever. The instructors really know how to capture the perfect moment.',
      date: '2023-12-22',
      source: 'airbnb',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'Japan',
      package: 'Elite Advanced Pro',
      helpful: 14
    },
    {
      id: '10',
      user_id: 'user10',
      rating: 5,
      title: 'Video analysis was game-changing',
      comment: 'Excellent surf conditions and professional instruction. The video analysis sessions really helped me understand what I was doing wrong and how to improve. Highly recommend for all skill levels!',
      date: '2023-12-20',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'Brazil',
      package: 'Costa Rica Intermediate',
      helpful: 16
    },
    {
      id: '11',
      user_id: 'user11',
      rating: 5,
      title: 'Family-friendly surf experience',
      comment: 'Brought my teenage kids and they absolutely loved it! The instructors were patient with beginners and the whole family learned to surf together. Great memories made!',
      date: '2023-12-18',
      source: 'booking',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'United States',
      package: 'Pura Vida Beginner',
      helpful: 13
    },
    {
      id: '12',
      user_id: 'user12',
      rating: 5,
      title: 'Perfect waves every day',
      comment: 'The instructors know the best spots and timing. We had perfect waves every single day of our stay. The local knowledge really makes a difference!',
      date: '2023-12-15',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      country: 'South Africa',
      package: 'Elite Advanced Pro',
      helpful: 20
    }
  ]

  // Filter reviews based on source and rating
  const filteredReviews = reviews.filter(review => {
    const sourceMatch = filterSource === 'all' || review.source === filterSource
    const ratingMatch = filterRating === 0 || review.rating >= filterRating
    return sourceMatch && ratingMatch
  })

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % filteredReviews.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoPlay, filteredReviews.length])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % filteredReviews.length)
    setAutoPlay(false) // Stop auto-play when user manually navigates
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length)
    setAutoPlay(false) // Stop auto-play when user manually navigates
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google':
        return <ExternalLink size={16} className="text-blue-500" />
      case 'booking':
        return <Calendar size={16} className="text-blue-600" />
      case 'airbnb':
        return <Heart size={16} className="text-red-500" />
      case 'hostelworld':
        return <MapPin size={16} className="text-green-500" />
      default:
        return <Star size={16} className="text-yellow-500" />
    }
  }

  const getSourceName = (source: string) => {
    switch (source) {
      case 'google':
        return 'Google Reviews'
      case 'booking':
        return 'Booking.com'
      case 'airbnb':
        return 'Airbnb'
      case 'hostelworld':
        return 'Hostelworld'
      default:
        return 'Review'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPackageIcon = (packageName: string) => {
    if (packageName.includes('Beginner')) return <Zap size={16} className="text-green-500" />
    if (packageName.includes('Intermediate')) return <Award size={16} className="text-yellow-500" />
    if (packageName.includes('Advanced')) return <Shield size={16} className="text-red-500" />
    if (packageName.includes('Weekend')) return <Calendar size={16} className="text-blue-500" />
    return <Star size={16} className="text-logo-teal-500" />
  }

  // Calculate statistics
  const totalReviews = reviews.length
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
  const fiveStarReviews = reviews.filter(r => r.rating === 5).length
  const verifiedReviews = reviews.filter(r => r.verified).length

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-surf-navy mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-surf-blue max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here are the latest reviews from our happy surfers 
            across all booking platforms.
          </p>
          
          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {/* Source Filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-surf-blue" />
              <select
                value={filterSource}
                onChange={(e) => {
                  setFilterSource(e.target.value)
                  setCurrentReview(0)
                }}
                className="px-4 py-2 border border-surf-blue/20 rounded-lg text-sm focus:ring-2 focus:ring-logo-teal-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="google">Google Reviews</option>
                <option value="booking">Booking.com</option>
                <option value="airbnb">Airbnb</option>
                <option value="hostelworld">Hostelworld</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-2">
              <Star size={16} className="text-surf-blue" />
              <select
                value={filterRating}
                onChange={(e) => {
                  setFilterRating(Number(e.target.value))
                  setCurrentReview(0)
                }}
                className="px-4 py-2 border border-surf-blue/20 rounded-lg text-sm focus:ring-2 focus:ring-logo-teal-500 focus:border-transparent"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars Only</option>
                <option value={4}>4+ Stars</option>
                <option value={3}>3+ Stars</option>
              </select>
            </div>

            {/* Auto-play Toggle */}
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                autoPlay 
                  ? 'bg-logo-teal-500 text-white' 
                  : 'bg-white text-surf-navy border border-surf-blue/20 hover:border-logo-teal-500'
              }`}
            >
              {autoPlay ? 'Auto-play ON' : 'Auto-play OFF'}
            </button>
          </div>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-surf-light to-white rounded-full px-8 py-4 shadow-lg border border-surf-blue/10">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-surf-sand fill-current" />
              ))}
            </div>
            <div className="text-3xl font-bold text-surf-navy">{averageRating.toFixed(1)}</div>
            <div className="text-surf-blue">
              from {totalReviews} reviews
            </div>
            <div className="text-sm text-green-600 font-semibold">
              {verifiedReviews} verified
            </div>
          </div>
        </motion.div>

        {/* Featured Review */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <AnimatePresence>
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-surf-light to-white rounded-2xl p-8 md:p-12 shadow-xl border border-surf-blue/10"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-logo-teal-200">
                <Quote size={48} />
              </div>

              {/* Review Content */}
              <div className="relative z-10">
                {/* Header with rating and source */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(filteredReviews[currentReview]?.rating || 5)].map((_, i) => (
                        <Star key={i} size={20} className="text-surf-sand fill-current" />
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSourceIcon(filteredReviews[currentReview]?.source || 'google')}
                      <span className="text-sm text-surf-blue font-medium">
                        {getSourceName(filteredReviews[currentReview]?.source || 'google')}
                      </span>
                    </div>
                    {filteredReviews[currentReview]?.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  
                  {/* Helpful count */}
                  <div className="flex items-center space-x-1 text-sm text-surf-blue">
                    <ThumbsUp size={14} />
                    <span>{filteredReviews[currentReview]?.helpful || 0} helpful</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-surf-navy mb-4">
                  {filteredReviews[currentReview]?.title || 'Amazing Experience!'}
                </h3>

                {/* Comment */}
                <blockquote className="text-lg text-surf-navy leading-relaxed mb-6">
                  "{filteredReviews[currentReview]?.comment || 'Great experience!'}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={filteredReviews[currentReview]?.avatar || ''}
                        alt={filteredReviews[currentReview]?.author || 'Guest'}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      {filteredReviews[currentReview]?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-surf-navy text-lg">
                        {filteredReviews[currentReview]?.author || 'Guest'}
                      </div>
                      <div className="text-sm text-surf-blue">
                        {filteredReviews[currentReview]?.country || 'International Guest'}
                      </div>
                      <div className="text-xs text-surf-blue">
                        {formatDate(filteredReviews[currentReview]?.date || new Date().toISOString())}
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-sm text-surf-blue mb-1">
                      {getPackageIcon(filteredReviews[currentReview]?.package || '')}
                      <span>Package:</span>
                    </div>
                    <div className="text-sm font-semibold text-surf-navy">
                      {filteredReviews[currentReview]?.package || 'Surf Package'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
                <button
                  onClick={prevReview}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-surf-navy hover:text-logo-teal-500 hover:bg-logo-teal-50 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
                <button
                  onClick={nextReview}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-surf-navy hover:text-logo-teal-500 hover:bg-logo-teal-50 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Review Counter and Progress */}
          <div className="text-center mt-6">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <span className="text-sm text-surf-blue">
                {currentReview + 1} of {filteredReviews.length} reviews
              </span>
              <div className="flex space-x-1">
                {filteredReviews.slice(0, 5).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentReview ? 'bg-logo-teal-500' : 'bg-surf-blue/30'
                    }`}
                  />
                ))}
                {filteredReviews.length > 5 && (
                  <span className="text-xs text-surf-blue ml-1">+{filteredReviews.length - 5}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-surf-blue/10">
            <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-logo-teal-500" />
            </div>
            <div className="text-3xl font-bold text-surf-navy mb-2">{totalReviews}+</div>
            <div className="text-surf-blue font-medium">Happy Surfers</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-surf-blue/10">
            <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star size={24} className="text-logo-teal-500" />
            </div>
            <div className="text-3xl font-bold text-surf-navy mb-2">{averageRating.toFixed(1)}/5</div>
            <div className="text-surf-blue font-medium">Average Rating</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-surf-blue/10">
            <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart size={24} className="text-logo-teal-500" />
            </div>
            <div className="text-3xl font-bold text-surf-navy mb-2">100%</div>
            <div className="text-surf-blue font-medium">Would Recommend</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-surf-blue/10">
            <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award size={24} className="text-logo-teal-500" />
            </div>
            <div className="text-3xl font-bold text-surf-navy mb-2">15+</div>
            <div className="text-surf-blue font-medium">Years Experience</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-logo-teal-500 to-surf-blue rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Ready to Create Your Own Amazing Review?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join hundreds of satisfied surfers who have experienced the magic of Maikekai Surf
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-logo-teal-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Book Your Surf Package
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-logo-teal-500 transition-colors">
                View All Reviews
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
