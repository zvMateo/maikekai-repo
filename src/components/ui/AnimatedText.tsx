'use client'

import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  motionProps?: MotionProps
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  motionProps,
  as: Component = 'span'
}: AnimatedTextProps) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay }
    })
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        duration
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        duration
      }
    }
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate="visible"
      {...motionProps}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
        >
          <Component>{word}</Component>
        </motion.span>
      ))}
    </motion.div>
  )
}

interface WaveTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  motionProps?: MotionProps
}

export function WaveText({
  text,
  className,
  delay = 0,
  duration = 2,
  motionProps
}: WaveTextProps) {
  const letters = text.split('')

  return (
    <motion.div
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      {...motionProps}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 20,
              rotateX: -90
            },
            visible: { 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              transition: {
                delay: delay + (index * 0.1),
                duration: duration,
                type: "spring" as const,
                stiffness: 100,
                damping: 12
              }
            }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface WaterRefractionTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  motionProps?: MotionProps
}

export function WaterRefractionText({
  text,
  className,
  delay = 0,
  duration = 3,
  motionProps
}: WaterRefractionTextProps) {
  const letters = text.split('')

  return (
    <motion.div
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      {...motionProps}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { 
              opacity: 0,
              scale: 0.8,
              rotateY: -180
            },
            visible: { 
              opacity: 1,
              scale: 1,
              rotateY: 0,
              transition: {
                delay: delay + (index * 0.15),
                duration: duration,
                type: "spring" as const,
                stiffness: 80,
                damping: 15
              }
            }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}
