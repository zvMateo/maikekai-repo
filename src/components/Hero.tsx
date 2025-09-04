'use client'

import { motion } from 'framer-motion'
import { Play, MapPin, Star, Waves, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useIsClient } from '@/hooks/useIsClient'
import { WaveText, WaterRefractionText } from '@/components/ui/AnimatedText'
import { Button } from '@/components/ui/Button'
import { 
  FloatingBubbles, 
  SeaFoamParticles, 
  WaterRipples, 
  WaterSurfaceReflections, 
  SeaSaltCrystals, 
  WaterDroplets 
} from '@/components/animations/WaterEffects'

const Hero = () => {
  const isClient = useIsClient()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-surf-navy via-surf-blue to-logo-teal-500">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={isClient ? {
            scale: [1, 1.05, 1],
            y: [0, -20, 0],
          } : {}}
          transition={isClient ? {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Surf waves in Costa Rica"
            fill
            className="object-cover"
            priority
            sizes="100vw"
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
            animate={isClient ? {
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            } : {}}
            transition={isClient ? {
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            } : {}}
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
              width: `${2 + (i * 0.4)}px`,
              height: `${200 + (i * 20)}px`,
              transform: `rotate(${15 + i * 10}deg)`,
            }}
            animate={isClient ? {
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.5, 1.2, 0.5],
              x: [0, 20, 0],
            } : {}}
            transition={isClient ? {
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            } : {}}
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

      {/* Water Effects */}
      <WaterRipples />
      <WaterSurfaceReflections />
      <SeaFoamParticles />
      <FloatingBubbles />
      <SeaSaltCrystals />
      <WaterDroplets />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
          >
            <MapPin className="w-4 h-4 text-yellow-300 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium">Playa Hermosa, Costa Rica</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Main Title */}
          <div className="space-y-4">
            <WaveText
              text="MAIKEKAI SURF"
              className="text-6xl md:text-8xl font-bold font-serif tracking-wider"
              delay={0.6}
              duration={2}
            />
            <WaterRefractionText
              text="Pura Vida Surf Experience"
              className="text-2xl md:text-3xl font-light tracking-wide"
              delay={1.2}
              duration={2.5}
            />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed"
          >
            Discover the ultimate surf destination in Costa Rica. Experience world-class waves, 
            professional instruction, and the purest form of the Pura Vida lifestyle.
          </motion.p>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9</span>
            <span className="text-white/70">(180+ reviews)</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="xl"
              className="bg-logo-teal-500 hover:bg-logo-teal-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
              motionProps={{
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 }
              }}
            >
              <Waves className="w-5 h-5 mr-2" />
              Book Your Stay
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              className="border-2 border-white text-white hover:bg-white hover:text-surf-navy px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              motionProps={{
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 }
              }}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Our Story
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            {/* <span className="text-sm font-medium mb-2">Scroll to explore</span> */}
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero