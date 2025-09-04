'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  animated?: boolean
  motionProps?: any
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 75,
  sizes = '100vw',
  placeholder = 'empty',
  blurDataURL,
  animated = true,
  motionProps,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div 
        className={cn(
          "bg-gray-200 flex items-center justify-center text-gray-500",
          className
        )}
        style={fill ? {} : { width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    )
  }

  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={cn(
        "transition-opacity duration-300",
        isLoading ? "opacity-0" : "opacity-100",
        className
      )}
      priority={priority}
      quality={quality}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  )

  if (animated && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...motionProps}
      >
        {imageElement}
      </motion.div>
    )
  }

  return imageElement
}

// Componente especializado para imágenes de surf
export function SurfImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'quality' | 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

// Componente para imágenes de galería
export function GalleryImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'quality' | 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn("object-cover cursor-pointer", className)}
      quality={90}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      {...props}
    />
  )
}
