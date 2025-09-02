'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, Users, Calendar, Waves, Shield, Clock, MapPin, Heart, Zap, Award, Camera, Utensils, Car, Wifi, Gift } from 'lucide-react'
import Image from 'next/image'
import { SurfPlan } from '@/types'

const SurfPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [filterLevel, setFilterLevel] = useState<string>('all')

  const packages: SurfPlan[] = [
    {
      id: '1',
      name: 'Pura Vida Beginner',
      description: 'Perfect for first-time surfers. Learn the basics in a safe, supportive environment with our certified instructors.',
      level: 'beginner',
      duration_days: 3,
      duration_nights: 2,
      price: 450,
      original_price: 550,
      max_participants: 4,
      features: [
        '3 days of surf lessons (2 hours each)',
        'ISA certified instructor',
        'Premium surfboard & wetsuit rental',
        'Beachfront accommodation',
        'Daily breakfast & lunch',
        'Transport to Playa Hermosa',
        'Safety briefing & ocean awareness',
        'Surf theory basics',
        'Free WiFi & equipment storage'
      ],
      image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Costa Rica Intermediate',
      description: 'Take your surfing to the next level with advanced techniques, video analysis, and challenging waves.',
      level: 'intermediate',
      duration_days: 5,
      duration_nights: 4,
      price: 750,
      original_price: 900,
      max_participants: 3,
      features: [
        '5 days of surf lessons (3 hours each)',
        'Advanced technique training',
        'Video analysis sessions',
        'Premium surfboard selection',
        'Oceanfront accommodation',
        'All meals included',
        'Transport to multiple surf spots',
        'Professional surf photography',
        'Surf fitness training',
        'Wave reading techniques'
      ],
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Elite Advanced Pro',
      description: 'For experienced surfers looking to master big waves, perfect their style, and explore exclusive breaks.',
      level: 'advanced',
      duration_days: 7,
      duration_nights: 6,
      price: 1200,
      original_price: 1500,
      max_participants: 2,
      features: [
        '7 days of advanced coaching (4 hours each)',
        'Big wave training & safety',
        'Personal video analysis',
        'Professional surfboard collection',
        'Luxury beachfront accommodation',
        'Gourmet meals & local cuisine',
        'Exclusive surf spot access',
        'Professional photography package',
        'Surf theory & oceanography',
        'Competition preparation',
        'Personalized training plan'
      ],
      image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Weekend Warrior',
      description: 'Perfect for busy professionals. Intensive weekend surf experience with maximum learning in minimal time.',
      level: 'beginner',
      duration_days: 2,
      duration_nights: 1,
      price: 280,
      original_price: 350,
      max_participants: 6,
      features: [
        '2 days of intensive surf lessons',
        'Quick start program',
        'Basic equipment included',
        'Shared accommodation',
        'Breakfast included',
        'Transport to beach',
        'Safety essentials',
        'Take-home surf guide'
      ],
      image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]

  const filteredPackages = packages.filter(pkg => 
    filterLevel === 'all' || pkg.level === filterLevel
  )

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Beginner'
      case 'intermediate':
        return 'Intermediate'
      case 'advanced':
        return 'Advanced'
      default:
        return 'All Levels'
    }
  }

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Waves size={16} />
      case 'intermediate':
        return <Zap size={16} />
      case 'advanced':
        return <Award size={16} />
      default:
        return <Waves size={16} />
    }
  }

  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('instructor') || feature.toLowerCase().includes('coaching')) {
      return <Award size={16} />
    } else if (feature.toLowerCase().includes('accommodation') || feature.toLowerCase().includes('hotel')) {
      return <MapPin size={16} />
    } else if (feature.toLowerCase().includes('meal') || feature.toLowerCase().includes('breakfast') || feature.toLowerCase().includes('lunch') || feature.toLowerCase().includes('dinner')) {
      return <Utensils size={16} />
    } else if (feature.toLowerCase().includes('transport') || feature.toLowerCase().includes('pickup')) {
      return <Car size={16} />
    } else if (feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('internet')) {
      return <Wifi size={16} />
    } else if (feature.toLowerCase().includes('photo') || feature.toLowerCase().includes('video')) {
      return <Camera size={16} />
    } else if (feature.toLowerCase().includes('equipment') || feature.toLowerCase().includes('surfboard') || feature.toLowerCase().includes('wetsuit')) {
      return <Shield size={16} />
    } else {
      return <Check size={16} />
    }
  }

  const handleBookPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    setShowBookingModal(true)
  }

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-surf-light to-white">
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
            Surf Packages & Pricing
          </h2>
          <p className="text-lg text-surf-blue max-w-3xl mx-auto mb-8">
            Choose the perfect surf package for your skill level and experience the best waves 
            Costa Rica has to offer with our expert instructors.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filterLevel === level
                    ? 'bg-logo-teal-500 text-white shadow-lg'
                    : 'bg-white text-surf-navy border border-surf-blue/20 hover:border-logo-teal-500 hover:text-logo-teal-500'
                }`}
              >
                {level === 'all' ? 'All Packages' : getDifficultyLabel(level)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <AnimatePresence mode="wait">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card p-6 relative group hover:shadow-2xl transition-all duration-300 ${
                  selectedPackage === pkg.id ? 'ring-2 ring-logo-teal-500' : ''
                }`}
              >
                {/* Discount Badge */}
                {pkg.original_price && pkg.original_price > pkg.price && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      -{calculateDiscount(pkg.price, pkg.original_price)}%
                    </div>
                  </div>
                )}

                {/* Package Image */}
                <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={pkg.image_url || ''}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(pkg.level)} flex items-center gap-1`}>
                      {getDifficultyIcon(pkg.level)}
                      {getDifficultyLabel(pkg.level)}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="text-center">
                      <div className="text-sm font-bold text-surf-navy">${pkg.price}</div>
                      {pkg.original_price && pkg.original_price > pkg.price && (
                        <div className="text-xs text-gray-500 line-through">${pkg.original_price}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Package Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-surf-navy mb-2 group-hover:text-logo-teal-500 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-surf-blue text-sm leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Package Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm text-surf-navy">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-logo-teal-500" />
                      <span>{pkg.duration_days} days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-logo-teal-500" />
                      <span>Max {pkg.max_participants}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-logo-teal-500" />
                      <span>{pkg.duration_nights} nights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart size={16} className="text-logo-teal-500" />
                      <span>Popular</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center py-4 border-t border-surf-blue/10">
                    <div className="text-3xl font-bold text-surf-navy">
                      ${pkg.price}
                    </div>
                    <div className="text-sm text-surf-blue">
                      per person
                    </div>
                    {pkg.original_price && pkg.original_price > pkg.price && (
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        Save ${pkg.original_price - pkg.price}
                      </div>
                    )}
                  </div>

                  {/* Includes */}
                  <div>
                    <h4 className="font-semibold text-surf-navy mb-3">What's Included:</h4>
                    <ul className="space-y-2 max-h-32 overflow-y-auto">
                      {pkg.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="text-logo-teal-500 mt-0.5 flex-shrink-0">
                            {getFeatureIcon(feature)}
                          </div>
                          <span className="text-sm text-surf-blue">{feature}</span>
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-xs text-logo-teal-500 font-semibold">
                          +{pkg.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleBookPackage(pkg.id)}
                    className="w-full btn-primary mt-6 group-hover:bg-logo-teal-600 transition-colors"
                  >
                    Book This Package
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-surf-blue/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award size={24} className="text-logo-teal-500" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">ISA Certified</h4>
              <p className="text-sm text-surf-blue">Professional instructors</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield size={24} className="text-logo-teal-500" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">Safety First</h4>
              <p className="text-sm text-surf-blue">Certified equipment</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar size={24} className="text-logo-teal-500" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">Flexible Booking</h4>
              <p className="text-sm text-surf-blue">Free cancellation</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-logo-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-logo-teal-500" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">Small Groups</h4>
              <p className="text-sm text-surf-blue">Personal attention</p>
            </div>
          </div>
        </motion.div>

        {/* Booking Modal */}
        <AnimatePresence>
          {showBookingModal && selectedPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowBookingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-serif font-bold text-surf-navy mb-2">
                    Book Your Surf Package
                  </h3>
                  <p className="text-surf-blue">
                    {packages.find(p => p.id === selectedPackage)?.name}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-surf-navy mb-2">
                      Select Dates
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-surf-blue/20 rounded-lg focus:ring-2 focus:ring-logo-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-surf-navy mb-2">
                      Number of Participants
                    </label>
                    <select className="w-full px-4 py-3 border border-surf-blue/20 rounded-lg focus:ring-2 focus:ring-logo-teal-500 focus:border-transparent">
                      {Array.from({ length: packages.find(p => p.id === selectedPackage)?.max_participants || 4 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-surf-navy mb-2">
                      Special Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special requirements or requests..."
                      className="w-full px-4 py-3 border border-surf-blue/20 rounded-lg focus:ring-2 focus:ring-logo-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-surf-light rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-surf-navy font-semibold">Total Price:</span>
                      <span className="text-2xl font-bold text-logo-teal-500">
                        ${packages.find(p => p.id === selectedPackage)?.price}
                      </span>
                    </div>
                    <p className="text-sm text-surf-blue">
                      per person • {packages.find(p => p.id === selectedPackage)?.duration_days} days
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 px-6 py-3 border border-surf-blue/20 text-surf-navy rounded-lg hover:bg-surf-light transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Here you would integrate with your booking system
                        alert('Booking functionality will be implemented with your backend!')
                        setShowBookingModal(false)
                      }}
                      className="flex-1 btn-primary"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SurfPackages
