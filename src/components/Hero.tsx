'use client'

import { motion } from 'framer-motion'
import { Play, MapPin, Star } from 'lucide-react'
import Image from 'next/image'

// Componente para efecto de ola en texto
const WaveText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  return (
    <span className="inline-block">
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 0, rotateX: 0 }}
          animate={{ 
            y: [0, -8, 0],
            rotateX: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: delay + index * 0.05,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Componente para efecto de refracción de agua en texto
const WaterRefractionText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  return (
    <span className="inline-block relative">
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block relative"
          initial={{ y: 0, rotateX: 0, skewX: 0 }}
          animate={{ 
            y: [0, -5, 0],
            rotateX: [0, 10, 0],
            skewX: [0, 2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: delay + index * 0.08,
            ease: "easeInOut"
          }}
          style={{ 
            transformOrigin: 'bottom',
            filter: 'blur(0.5px)'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Surf waves in Costa Rica"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
        {/* Dynamic Gradient Overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(14, 50, 68, 0.8) 0%, rgba(43, 150, 203, 0.6) 50%, rgba(85, 172, 216, 0.4) 100%)",
              "linear-gradient(135deg, rgba(43, 150, 203, 0.8) 0%, rgba(85, 172, 216, 0.6) 50%, rgba(14, 50, 68, 0.4) 100%)",
              "linear-gradient(135deg, rgba(85, 172, 216, 0.8) 0%, rgba(14, 50, 68, 0.6) 50%, rgba(43, 150, 203, 0.4) 100%)",
              "linear-gradient(135deg, rgba(14, 50, 68, 0.8) 0%, rgba(43, 150, 203, 0.6) 50%, rgba(85, 172, 216, 0.4) 100%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Sun Reflection Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`sun-reflection-${i}`}
              className="absolute bg-gradient-radial from-yellow-300/20 via-orange-300/10 to-transparent rounded-full"
              style={{
                left: `${30 + i * 25}%`,
                top: `${20 + i * 15}%`,
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            />
          ))}
        </div>

        {/* Light Rays */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`light-ray-${i}`}
              className="absolute bg-gradient-to-b from-yellow-200/30 via-transparent to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                width: `${2 + Math.random() * 2}px`,
                height: `${200 + Math.random() * 100}px`,
                transform: `rotate(${15 + i * 10}deg)`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleY: [0.5, 1.2, 0.5],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
            />
          ))}
        </div>
        
        {/* Animated wave overlay */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-32 animate-wave-roll"
            animate={{
              background: [
                "linear-gradient(to top, rgba(85, 172, 216, 0.3) 0%, transparent 100%)",
                "linear-gradient(to top, rgba(43, 150, 203, 0.3) 0%, transparent 100%)",
                "linear-gradient(to top, rgba(14, 50, 68, 0.3) 0%, transparent 100%)",
                "linear-gradient(to top, rgba(85, 172, 216, 0.3) 0%, transparent 100%)"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-24 animate-surf-float"
            style={{ animationDelay: '1s' }}
            animate={{
              background: [
                "linear-gradient(to top, rgba(43, 150, 203, 0.2) 0%, transparent 100%)",
                "linear-gradient(to top, rgba(14, 50, 68, 0.2) 0%, transparent 100%)",
                "linear-gradient(to top, rgba(85, 172, 216, 0.2) 0%, transparent 100%)",
                "linear-gradient(to top, rgba(43, 150, 203, 0.2) 0%, transparent 100%)"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Subtle Water Ripples */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`ripple-${i}`}
              className="absolute border rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${50 + Math.random() * 100}px`,
                height: `${50 + Math.random() * 100}px`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1],
                borderColor: [
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(85, 172, 216, 0.2)",
                  "rgba(43, 150, 203, 0.2)",
                  "rgba(255, 255, 255, 0.1)"
                ]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Water Surface Reflections */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`reflection-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 200}px`,
                height: `${2 + Math.random() * 4}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                x: [0, 50, 0],
                opacity: [0.1, 0.4, 0.1],
                scaleX: [0.5, 1.5, 0.5],
                background: [
                  "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
                  "linear-gradient(to right, transparent 0%, rgba(85, 172, 216, 0.1) 50%, transparent 100%)",
                  "linear-gradient(to right, transparent 0%, rgba(43, 150, 203, 0.1) 50%, transparent 100%)",
                  "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)"
                ]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Sea Foam Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`foam-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [0.8, 1.2, 0.8],
                backgroundColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(85, 172, 216, 0.4)",
                  "rgba(43, 150, 203, 0.4)",
                  "rgba(255, 255, 255, 0.3)"
                ]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating Bubbles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute border rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
                borderColor: [
                  "rgba(255, 255, 255, 0.2)",
                  "rgba(85, 172, 216, 0.3)",
                  "rgba(43, 150, 203, 0.3)",
                  "rgba(255, 255, 255, 0.2)"
                ]
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Sea Salt Crystals */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`salt-${i}`}
              className="absolute rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.3, 0.9, 0.3],
                scale: [0.8, 1.3, 0.8],
                rotate: [0, 180, 360],
                backgroundColor: [
                  "rgba(255, 255, 255, 0.4)",
                  "rgba(85, 172, 216, 0.5)",
                  "rgba(43, 150, 203, 0.5)",
                  "rgba(255, 255, 255, 0.4)"
                ]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Water Droplets */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`droplet-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 3}px`,
                height: `${3 + Math.random() * 3}px`,
              }}
              animate={{
                y: [0, -35, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [0.6, 1.4, 0.6],
                background: [
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 100%)",
                  "linear-gradient(to bottom, rgba(85, 172, 216, 0.6) 0%, transparent 100%)",
                  "linear-gradient(to bottom, rgba(43, 150, 203, 0.6) 0%, transparent 100%)",
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 100%)"
                ]
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center space-x-3 glass-effect rounded-full px-8 py-4 border border-white/40 group hover:scale-105 transition-all duration-300 relative overflow-hidden backdrop-blur-xl bg-white/10"
            whileHover={{ 
              boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.6)",
              rotateX: 10,
              rotateY: 5,
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <motion.div
              className="flex items-center space-x-2"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <MapPin size={18} className="text-surf-sand-400 group-hover:text-surf-sand-300 transition-colors duration-300" />
                <motion.div
                  className="absolute inset-0 bg-surf-sand-400/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </motion.div>
              <div className="flex flex-col items-start">
                <motion.span 
                  className="text-sm font-semibold text-white group-hover:text-surf-sand-100 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  Playa Hermosa
                </motion.span>
                <motion.span 
                  className="text-xs text-surf-light/80 group-hover:text-surf-light transition-colors duration-300"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  Tamarindo, Costa Rica
                </motion.span>
              </div>
            </motion.div>
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Floating particles around badge */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-surf-sand-400/60 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight"
          >
            <motion.div 
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <WaveText delay={0.6}>Experience the</WaveText>
            </motion.div>
            <motion.div 
              className="block text-surf-sand-500 surf-float"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <WaveText delay={0.8}>Ultimate Surf</WaveText>
            </motion.div>
            <motion.div 
              className="block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <WaveText delay={1.0}>Adventure</WaveText>
            </motion.div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-surf-light leading-relaxed"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="inline-block"
            >
              Immerse yourself in the{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="inline-block text-surf-sand-400 font-semibold"
            >
              Pura Vida
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="inline-block"
            >
              {' '}<WaterRefractionText delay={1.6}>lifestyle with world-class surf lessons, 
              stunning beachfront accommodation, and unforgettable memories in paradise.</WaterRefractionText>
            </motion.span>
          </motion.p>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center space-x-4"
          >
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-surf-sand fill-current" />
              ))}
            </div>
            <span className="text-lg font-medium">4.8/5 from 500+ reviews</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12"
          >
            <motion.button 
              className="btn-primary text-lg px-8 py-4 pulse-glow relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(77, 140, 168, 0.6)",
                rotateX: 5,
                rotateY: 5,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <motion.span
                className="relative z-10"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Book Your Surf Package
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            <motion.button 
              className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-surf-navy-900 glass-effect relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.8)",
                rotateX: -5,
                rotateY: -5,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.8 }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <motion.div
                className="flex items-center"
                animate={{
                  y: [0, -1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Play size={20} className="inline mr-2 group-hover:scale-110 transition-transform duration-300" />
                Watch Our Story
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          </motion.div>


        </motion.div>
      </div>
    </section>
  )
}

export default Hero
