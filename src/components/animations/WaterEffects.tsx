'use client'

import { motion } from 'framer-motion'
import { useIsClient } from '@/hooks/useIsClient'

interface WaterEffectProps {
  className?: string
  count?: number
  delay?: number
}

export function FloatingBubbles({ className = "", count = 25, delay = 0 }: WaterEffectProps) {
  const isClient = useIsClient()

  return (
    <div className={`absolute inset-0 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute border rounded-full"
          style={{
            left: `${(i * 4) + (i * 0.5)}%`,
            top: `${(i * 4) + (i * 0.3)}%`,
            width: `${4 + (i * 0.3)}px`,
            height: `${4 + (i * 0.3)}px`,
          }}
          animate={isClient ? {
            y: [0, -60, 0],
            x: [0, (i * 1.2) - 15, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5],
            borderColor: [
              "rgba(255, 255, 255, 0.2)",
              "rgba(85, 172, 216, 0.3)",
              "rgba(43, 150, 203, 0.3)",
              "rgba(255, 255, 255, 0.2)"
            ]
          } : {}}
          transition={isClient ? {
            duration: 5 + (i * 0.16),
            repeat: Infinity,
            delay: delay + (i * 0.16),
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  )
}

export function SeaFoamParticles({ className = "", count = 15, delay = 0 }: WaterEffectProps) {
  const isClient = useIsClient()

  return (
    <div className={`absolute inset-0 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`foam-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${(i * 6.5) + (i * 1)}%`,
            top: `${(i * 6) + (i * 2)}%`,
            width: `${2 + (i * 0.2)}px`,
            height: `${2 + (i * 0.2)}px`,
          }}
          animate={isClient ? {
            y: [0, -40, 0],
            x: [0, (i * 2) - 10, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.2, 0.8],
            backgroundColor: [
              "rgba(255, 255, 255, 0.3)",
              "rgba(85, 172, 216, 0.4)",
              "rgba(43, 150, 203, 0.4)",
              "rgba(255, 255, 255, 0.3)"
            ]
          } : {}}
          transition={isClient ? {
            duration: 4 + (i * 0.2),
            repeat: Infinity,
            delay: delay + (i * 0.2),
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  )
}

export function WaterRipples({ className = "", count = 8, delay = 0 }: WaterEffectProps) {
  const isClient = useIsClient()

  return (
    <div className={`absolute inset-0 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute border rounded-full"
          style={{
            left: `${(i * 12.5) + (i * 3)}%`,
            top: `${(i * 10) + (i * 5)}%`,
            width: `${50 + (i * 12)}px`,
            height: `${50 + (i * 12)}px`,
          }}
          animate={isClient ? {
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
            borderColor: [
              "rgba(255, 255, 255, 0.1)",
              "rgba(85, 172, 216, 0.2)",
              "rgba(43, 150, 203, 0.2)",
              "rgba(255, 255, 255, 0.1)"
            ]
          } : {}}
          transition={isClient ? {
            duration: 6 + (i * 0.5),
            repeat: Infinity,
            delay: delay + (i * 0.6),
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  )
}

export function WaterSurfaceReflections({ className = "", count = 6, delay = 0 }: WaterEffectProps) {
  const isClient = useIsClient()

  return (
    <div className={`absolute inset-0 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`reflection-${i}`}
          className="absolute"
          style={{
            left: `${(i * 16) + (i * 2)}%`,
            top: `${(i * 15) + (i * 3)}%`,
            width: `${100 + (i * 30)}px`,
            height: `${2 + (i * 0.5)}px`,
            transform: `rotate(${i * 60}deg)`,
          }}
          animate={isClient ? {
            x: [0, 50, 0],
            opacity: [0.1, 0.4, 0.1],
            scaleX: [0.5, 1.5, 0.5],
            background: [
              "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
              "linear-gradient(to right, transparent 0%, rgba(85, 172, 216, 0.1) 50%, transparent 100%)",
              "linear-gradient(to right, transparent 0%, rgba(43, 150, 203, 0.1) 50%, transparent 100%)",
              "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)"
            ]
          } : {}}
          transition={isClient ? {
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            delay: delay + (i * 0.5),
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  )
}

export function SeaSaltCrystals({ className = "", count = 20, delay = 0 }: WaterEffectProps) {
  const isClient = useIsClient()

  return (
    <div className={`absolute inset-0 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`salt-${i}`}
          className="absolute rounded-sm"
          style={{
            left: `${(i * 5) + (i * 0.2)}%`,
            top: `${(i * 5) + (i * 0.1)}%`,
            width: `${1 + (i * 0.1)}px`,
            height: `${1 + (i * 0.1)}px`,
            transform: `rotate(${i * 18}deg)`,
          }}
          animate={isClient ? {
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
          } : {}}
          transition={isClient ? {
            duration: 3 + (i * 0.1),
            repeat: Infinity,
            delay: delay + (i * 0.1),
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  )
}

export function WaterDroplets({ className = "", count = 12, delay = 0 }: WaterEffectProps) {
  const isClient = useIsClient()

  return (
    <div className={`absolute inset-0 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`droplet-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${(i * 8.3) + (i * 0.1)}%`,
            top: `${(i * 8.3) + (i * 0.05)}%`,
            width: `${3 + (i * 0.25)}px`,
            height: `${3 + (i * 0.25)}px`,
          }}
          animate={isClient ? {
            y: [0, -35, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.6, 1.4, 0.6],
            background: [
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 100%)",
              "linear-gradient(to bottom, rgba(85, 172, 216, 0.6) 0%, transparent 100%)",
              "linear-gradient(to bottom, rgba(43, 150, 203, 0.6) 0%, transparent 100%)",
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 100%)"
            ]
          } : {}}
          transition={isClient ? {
            duration: 2.5 + (i * 0.125),
            repeat: Infinity,
            delay: delay + (i * 0.167),
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  )
}
