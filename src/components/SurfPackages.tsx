'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Users, Calendar, Waves, Shield } from 'lucide-react'
import Image from 'next/image'
import { SurfPackage } from '@/types'

const SurfPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages = [
    {
      id: '1',
      name: 'Beginner Surf Package',
      description: 'Perfect for first-time surfers. Learn the basics in a safe, supportive environment.',
      duration: 3,
      price: 299,
      currency: 'USD',
      includes: [
        '3 days of surf lessons',
        'Professional instructor',
        'Surfboard & equipment',
        'Beachfront accommodation',
        'Daily breakfast',
        'Transport to surf spots',
        'Safety briefing'
      ],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      difficulty: 'beginner',
      maxStudents: 4,
      equipment: true,
      accommodation: true,
      meals: true,
      transport: true
    },
    {
      id: '2',
      name: 'Intermediate Surf Package',
      description: 'Take your surfing to the next level with advanced techniques and challenging waves.',
      duration: 5,
      price: 499,
      currency: 'USD',
      includes: [
        '5 days of surf lessons',
        'Advanced technique training',
        'Video analysis sessions',
        'Premium surfboard rental',
        'Oceanfront accommodation',
        'All meals included',
        'Transport to multiple spots',
        'Surf photography'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      difficulty: 'intermediate',
      maxStudents: 3,
      equipment: true,
      accommodation: true,
      meals: true,
      transport: true
    },
    {
      id: '3',
      name: 'Advanced Surf Package',
      description: 'For experienced surfers looking to master big waves and perfect their style.',
      duration: 7,
      price: 799,
      currency: 'USD',
      includes: [
        '7 days of advanced coaching',
        'Big wave training',
        'Personal video analysis',
        'Professional surfboard',
        'Luxury accommodation',
        'Gourmet meals',
        'Exclusive surf spots',
        'Professional photography',
        'Surf theory classes'
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      difficulty: 'advanced',
      maxStudents: 2,
      equipment: true,
      accommodation: true,
      meals: true,
      transport: true
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
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

  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-surf-light to-white">
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
            Surf Packages & Pricing
          </h2>
          <p className="text-lg text-surf-blue max-w-3xl mx-auto">
            Choose the perfect surf package for your skill level and experience the best waves 
            Costa Rica has to offer with our expert instructors.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`card p-6 relative ${
                selectedPackage === pkg.id ? 'ring-2 ring-surf-blue' : ''
              }`}
            >
              {/* Package Image */}
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(pkg.difficulty)}`}>
                    {getDifficultyLabel(pkg.difficulty)}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-bold text-surf-navy">${pkg.price}</span>
                </div>
              </div>

              {/* Package Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-surf-navy mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-surf-blue text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Package Details */}
                <div className="flex items-center justify-between text-sm text-surf-navy">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{pkg.duration} days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>Max {pkg.maxStudents}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Waves size={16} />
                    <span>{pkg.difficulty}</span>
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
                </div>

                {/* Includes */}
                <div>
                  <h4 className="font-semibold text-surf-navy mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check size={16} className="text-surf-blue mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-surf-blue">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPackage(pkg.id)}
                  className="w-full btn-primary mt-6"
                >
                  Book This Package
                </button>
              </div>
            </motion.div>
          ))}
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
              <div className="w-12 h-12 bg-surf-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star size={24} className="text-surf-blue" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">Certified Instructors</h4>
              <p className="text-sm text-surf-blue">ISA certified professionals</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-surf-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield size={24} className="text-surf-blue" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">Safety First</h4>
              <p className="text-sm text-surf-blue">All equipment certified</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-surf-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar size={24} className="text-surf-blue" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">Flexible Booking</h4>
              <p className="text-sm text-surf-blue">Free cancellation</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-surf-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-surf-blue" />
              </div>
              <h4 className="font-semibold text-surf-navy mb-1">Small Groups</h4>
              <p className="text-sm text-surf-blue">Personal attention</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SurfPackages
