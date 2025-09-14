'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const FixedBottomBar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isInHero, setIsInHero] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      
      // Mostrar la barra cuando scrolleas más allá del hero
      setIsVisible(scrollY > heroHeight * 0.8)
      
      // Determinar si estás en el hero section
      setIsInHero(scrollY < heroHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-surf-blue-100/50 shadow-lg animate-slide-up"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              {/* Left side - Info */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-logo-teal-500 to-logo-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surf-navy-800">MAIKEKAI SURF</h3>
                    <p className="text-xs text-surf-blue-600">Costa Rica</p>
                  </div>
                </div>
                
                <div className="hidden sm:block w-px h-6 bg-surf-blue-200"></div>
                
                <div className="hidden sm:flex items-center space-x-1 text-surf-navy-700">
                  <span className="text-sm font-medium">1 WEEK</span>
                  <div className="w-1 h-1 bg-logo-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">From $450/person</span>
                </div>
              </div>

              {/* Right side - CTA Button */}
              <Link 
                href="#packages" 
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg ${
                  isInHero 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-logo-teal-500 hover:bg-logo-teal-600 text-white hover:scale-105'
                }`}
                onClick={(e) => {
                  if (isInHero) {
                    e.preventDefault()
                  }
                }}
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FixedBottomBar
