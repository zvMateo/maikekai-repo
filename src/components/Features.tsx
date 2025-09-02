'use client'

import { motion } from 'framer-motion'
import { Waves, Users, Utensils, Wifi, Car, Shield, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'

const Features = () => {
  const features = [
    {
      icon: Waves,
      title: 'Professional Surf Lessons',
      description: 'Learn from certified instructors with 15+ years of experience in the best surf spots of Costa Rica.',
      color: 'text-surf-blue'
    },
    {
      icon: Users,
      title: 'Small Group Classes',
      description: 'Maximum 4 students per instructor for personalized attention and faster learning progress.',
      color: 'text-surf-blue'
    },
    {
      icon: Utensils,
      title: 'Fresh Local Cuisine',
      description: 'Enjoy delicious meals prepared with fresh local ingredients, including traditional Costa Rican dishes.',
      color: 'text-surf-blue'
    },
    {
      icon: Wifi,
      title: 'Free High-Speed WiFi',
      description: 'Stay connected with complimentary high-speed internet throughout the property.',
      color: 'text-surf-blue'
    },
    {
      icon: Car,
      title: 'Airport Transfers',
      description: 'Convenient pickup and drop-off service from Liberia International Airport.',
      color: 'text-surf-blue'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All equipment is regularly inspected and maintained to ensure your safety during lessons.',
      color: 'text-surf-blue'
    }
  ]

  const highlights = [
    {
      icon: MapPin,
      title: 'Prime Location',
      value: 'Beachfront',
      description: 'Direct access to Playa Hermosa'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      value: '365 Days',
      description: 'Year-round surf lessons'
    },
    {
      icon: Users,
      title: 'Expert Team',
      value: '15+ Years',
      description: 'Professional experience'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
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
            Why Choose Maikekai Surf?
          </h2>
          <p className="text-lg text-surf-blue max-w-3xl mx-auto">
            Experience the perfect blend of adventure, comfort, and authentic Costa Rican hospitality 
            in our beachfront surf resort.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center group"
            >
              <div className="w-16 h-16 bg-surf-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-surf-blue/20 transition-colors duration-300">
                <feature.icon size={32} className={feature.color} />
              </div>
              <h3 className="text-xl font-serif font-bold text-surf-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-surf-blue leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-surf-light to-surf-blue/10 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <highlight.icon size={32} className="text-surf-blue" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-surf-navy mb-2">
                  {highlight.value}
                </h3>
                <h4 className="text-lg font-semibold text-surf-blue mb-2">
                  {highlight.title}
                </h4>
                <p className="text-surf-navy/80">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          ].map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-64 rounded-xl overflow-hidden group"
            >
              <Image
                src={image}
                alt={`Maikekai Surf ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
