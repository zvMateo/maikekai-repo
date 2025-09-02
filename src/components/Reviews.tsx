'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Review } from '@/types'

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    {
      id: '1',
      author: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely incredible experience! The instructors were professional and patient. I went from never surfing to catching my first wave in just 3 days. The accommodation was perfect and the food was delicious. Highly recommend!',
      date: '2024-01-15',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '2',
      author: 'Mike Rodriguez',
      rating: 5,
      comment: 'Best surf vacation ever! The waves were perfect, the instructors knew exactly where to take us each day based on conditions. The package included everything we needed. Will definitely be back!',
      date: '2024-01-10',
      source: 'booking',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '3',
      author: 'Emma Thompson',
      rating: 5,
      comment: 'As a beginner, I was nervous about learning to surf, but the team at Maikekai made me feel so comfortable. The small group size meant I got lots of personal attention. The beachfront location is stunning!',
      date: '2024-01-08',
      source: 'airbnb',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '4',
      author: 'David Chen',
      rating: 5,
      comment: 'Professional operation from start to finish. The instructors are ISA certified and really know their stuff. The equipment was top quality and the safety briefing was thorough. Perfect for intermediate surfers!',
      date: '2024-01-05',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '5',
      author: 'Lisa Martinez',
      rating: 5,
      comment: 'The advanced package was exactly what I was looking for. Big wave training, video analysis, and coaching on technique. The instructors really helped me improve my surfing. Amazing experience!',
      date: '2024-01-03',
      source: 'hostelworld',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '6',
      author: 'Tom Wilson',
      rating: 5,
      comment: 'Great value for money! The package included accommodation, meals, transport, and equipment. The instructors were friendly and knowledgeable. The location is perfect for surfing year-round.',
      date: '2024-01-01',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '7',
      author: 'Anna Kowalski',
      rating: 5,
      comment: 'I came alone and felt so welcome! The other guests were friendly and the instructors made sure everyone had a great time. The food was amazing and the rooms were clean and comfortable.',
      date: '2023-12-28',
      source: 'booking',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '8',
      author: 'Carlos Silva',
      rating: 5,
      comment: 'Perfecto! Los instructores hablan español e inglés. Las olas estaban increíbles y el hotel está en una ubicación perfecta. Definitivamente volveré el próximo año.',
      date: '2023-12-25',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '9',
      author: 'Jennifer Park',
      rating: 5,
      comment: 'The photography service was amazing! I got beautiful shots of me surfing that I can treasure forever. The instructors really know how to capture the perfect moment.',
      date: '2023-12-22',
      source: 'airbnb',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '10',
      author: 'Robert Taylor',
      rating: 5,
      comment: 'Excellent surf conditions and professional instruction. The video analysis sessions really helped me understand what I was doing wrong and how to improve. Highly recommend for all skill levels!',
      date: '2023-12-20',
      source: 'google',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google':
        return '🔍'
      case 'booking':
        return '📅'
      case 'airbnb':
        return '🏠'
      case 'hostelworld':
        return '🌍'
      default:
        return '⭐'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-surf-navy mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-surf-blue max-w-3xl mx-auto">
            Don't just take our word for it. Here are the latest reviews from our happy surfers 
            across all booking platforms.
          </p>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-4 bg-surf-light rounded-full px-8 py-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-surf-sand fill-current" />
              ))}
            </div>
            <div className="text-2xl font-bold text-surf-navy">4.8</div>
            <div className="text-surf-blue">from 500+ reviews</div>
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
          <div className="bg-gradient-to-br from-surf-light to-white rounded-2xl p-8 md:p-12 shadow-lg border border-surf-blue/10">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-surf-blue/20">
              <Quote size={48} />
            </div>

            {/* Review Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-surf-sand fill-current" />
                  ))}
                </div>
                <span className="text-sm text-surf-blue">
                  {getSourceIcon(reviews[currentReview].source)} {reviews[currentReview].source}
                </span>
                {reviews[currentReview].verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>

              {/* Comment */}
              <blockquote className="text-lg md:text-xl text-surf-navy leading-relaxed mb-6 italic">
                "{reviews[currentReview].comment}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surf-blue/10">
                  <img
                    src={reviews[currentReview].avatar}
                    alt={reviews[currentReview].author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-surf-navy">
                    {reviews[currentReview].author}
                  </div>
                  <div className="text-sm text-surf-blue">
                    {formatDate(reviews[currentReview].date)}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
              <button
                onClick={prevReview}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-surf-navy hover:text-surf-blue transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
              <button
                onClick={nextReview}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-surf-navy hover:text-surf-blue transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Review Counter */}
          <div className="text-center mt-6">
            <span className="text-sm text-surf-blue">
              {currentReview + 1} of {reviews.length} reviews
            </span>
          </div>
        </motion.div>

        {/* Review Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-surf-navy mb-2">500+</div>
            <div className="text-surf-blue">Happy Surfers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-surf-navy mb-2">4.8/5</div>
            <div className="text-surf-blue">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-surf-navy mb-2">98%</div>
            <div className="text-surf-blue">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-surf-navy mb-2">15+</div>
            <div className="text-surf-blue">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
