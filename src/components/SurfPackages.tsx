'use client'

import { useState, useEffect } from 'react'
import { Check, Star, Users, Calendar, Waves, Shield, Clock, MapPin, Heart, Zap, Award, Camera, Utensils, Car, Wifi, Gift, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { SurfPlan } from '@/types'
import { useSurfPlans } from '@/hooks/useSurfPlans'
import { useBusinessMetrics } from '@/hooks/useBusinessMetrics'

const SurfPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [filterLevel, setFilterLevel] = useState<string>('all')
  
  // Use Supabase data
  const { plans, loading, error } = useSurfPlans()
  
  // Business metrics tracking
  const { trackPackageView, trackPackageInterest, trackPackageBooking } = useBusinessMetrics()

  // Fallback data if Supabase is not configured
  const fallbackPackages: SurfPlan[] = [
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
      price: 250,
      original_price: 300,
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

  // Use fallback data if Supabase is not configured or there's an error
  const displayPackages = plans.length > 0 ? plans : fallbackPackages
  const displayLoading = loading && plans.length === 0
  const displayError = error && plans.length === 0

  const filteredPackages = displayPackages.filter(pkg => 
    filterLevel === 'all' || pkg.level === filterLevel
  )

  // Track package views
  useEffect(() => {
    filteredPackages.forEach(pkg => {
      trackPackageView(pkg.name, pkg.price)
    })
  }, [filteredPackages, trackPackageView])

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

  const handlePackageSelect = (pkg: SurfPlan) => {
    setSelectedPackage(pkg.id)
    setShowBookingModal(true)
    trackPackageInterest(pkg.name)
  }

  const handleBookingConfirm = (pkg: SurfPlan) => {
    trackPackageBooking(pkg.name, pkg.price)
    setShowBookingModal(false)
    setSelectedPackage(null)
  }

  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-surf-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
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
        </div>

        {/* Loading State */}
        {displayLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-logo-teal-500 mx-auto mb-4" />
              <p className="text-surf-blue">Loading surf packages...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {displayError && (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-semibold mb-2">Error loading packages</p>
              <p className="text-red-500 text-sm">{error}</p>
              <p className="text-gray-500 text-xs mt-2">Using fallback data for now</p>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        {!displayLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {filteredPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image_url || '/placeholder-surf.jpg'}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(pkg.level)}`}>
                      {getDifficultyIcon(pkg.level)}
                      <span className="ml-1">{getDifficultyLabel(pkg.level)}</span>
                    </span>
                  </div>

                  {/* Discount Badge */}
                  {pkg.original_price && pkg.original_price > pkg.price && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)}% OFF
                      </span>
                    </div>
                  )}

                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-surf-navy mb-2">{pkg.name}</h3>
                    <p className="text-surf-blue text-sm leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Duration & Participants */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{pkg.duration_days} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Max {pkg.max_participants}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-surf-navy mb-2">What's Included:</h4>
                    <ul className="space-y-1">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          {getFeatureIcon(feature)}
                          <span>{feature}</span>
                        </li>
                      ))}
                      {pkg.features.length > 3 && (
                        <li className="text-xs text-surf-blue font-medium">
                          +{pkg.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-surf-navy">${pkg.price}</span>
                      {pkg.original_price && pkg.original_price > pkg.price && (
                        <span className="text-lg text-gray-500 line-through">${pkg.original_price}</span>
                      )}
                      <span className="text-sm text-gray-600">per person</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className="w-full bg-gradient-to-r from-logo-teal-500 to-surf-blue text-white py-3 px-6 rounded-xl font-semibold hover:from-logo-teal-600 hover:to-surf-blue/90 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedPackage && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
              {(() => {
                const pkg = displayPackages.find(p => p.id === selectedPackage)
                if (!pkg) return null
                
                return (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-surf-navy">Book {pkg.name}</h3>
                      <button
                        onClick={() => setShowBookingModal(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Package Summary */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-4 mb-4">
                          <Image
                            src={pkg.image_url || '/placeholder-surf.jpg'}
                            alt={pkg.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-surf-navy">{pkg.name}</h4>
                            <p className="text-sm text-gray-600">{pkg.duration_days} days • Max {pkg.max_participants} participants</p>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-2xl font-bold text-surf-navy">${pkg.price}</span>
                              {pkg.original_price && pkg.original_price > pkg.price && (
                                <span className="text-lg text-gray-500 line-through">${pkg.original_price}</span>
                              )}
                              <span className="text-sm text-gray-600">per person</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-surf-navy mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              {getFeatureIcon(feature)}
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Booking Form */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-surf-navy">Booking Details:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Participants</label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-logo-teal-500 focus:border-transparent">
                              {Array.from({ length: pkg.max_participants }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                            <input
                              type="date"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-logo-teal-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => setShowBookingModal(false)}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleBookingConfirm(pkg)}
                          className="flex-1 btn-primary"
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SurfPackages