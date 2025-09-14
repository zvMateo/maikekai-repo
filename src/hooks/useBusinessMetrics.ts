'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  trackSurfEvent, 
  trackBookingEvent, 
  trackGalleryInteraction,
  trackReviewInteraction,
  trackContactForm,
  trackConversion,
  trackUserJourney
} from '@/lib/analytics'

interface BusinessMetrics {
  // Surf Package Metrics
  packageViews: Record<string, number>
  packageInterests: Record<string, number>
  packageBookings: Record<string, number>
  
  // Gallery Metrics
  galleryViews: number
  imageClicks: number
  slideshowStarts: number
  slideshowCompletions: number
  
  // Review Metrics
  reviewViews: number
  reviewInteractions: number
  reviewShares: number
  
  // Contact Metrics
  contactFormSubmissions: number
  contactFormSuccesses: number
  contactFormErrors: number
  
  // User Journey Metrics
  userJourneySteps: Record<string, number>
  bounceRate: number
  timeOnSite: number
  pageViews: number
  
  // Conversion Metrics
  conversions: number
  conversionValue: number
  conversionRate: number
  
  // Seasonal Metrics
  seasonalTrends: Record<string, number>
  weatherCorrelations: Record<string, number>
  
  // Device Metrics
  deviceTypes: Record<string, number>
  browserTypes: Record<string, number>
  screenSizes: Record<string, number>
  
  // Geographic Metrics
  countries: Record<string, number>
  cities: Record<string, number>
  timezones: Record<string, number>
}

const initialMetrics: BusinessMetrics = {
  packageViews: {},
  packageInterests: {},
  packageBookings: {},
  galleryViews: 0,
  imageClicks: 0,
  slideshowStarts: 0,
  slideshowCompletions: 0,
  reviewViews: 0,
  reviewInteractions: 0,
  reviewShares: 0,
  contactFormSubmissions: 0,
  contactFormSuccesses: 0,
  contactFormErrors: 0,
  userJourneySteps: {},
  bounceRate: 0,
  timeOnSite: 0,
  pageViews: 0,
  conversions: 0,
  conversionValue: 0,
  conversionRate: 0,
  seasonalTrends: {},
  weatherCorrelations: {},
  deviceTypes: {},
  browserTypes: {},
  screenSizes: {},
  countries: {},
  cities: {},
  timezones: {}
}

export function useBusinessMetrics() {
  const [metrics, setMetrics] = useState<BusinessMetrics>(initialMetrics)
  const [isTracking, setIsTracking] = useState(false)

  // Track package view
  const trackPackageView = useCallback((packageName: string, packagePrice: number) => {
    setMetrics(prev => ({
      ...prev,
      packageViews: {
        ...prev.packageViews,
        [packageName]: (prev.packageViews[packageName] || 0) + 1
      }
    }))
    
    // Track in analytics
    trackSurfEvent('package_view', {
      package_name: packageName,
      package_price: packagePrice,
      timestamp: Date.now()
    })
  }, [])

  // Track package interest
  const trackPackageInterest = useCallback((packageName: string) => {
    setMetrics(prev => ({
      ...prev,
      packageInterests: {
        ...prev.packageInterests,
        [packageName]: (prev.packageInterests[packageName] || 0) + 1
      }
    }))
    
    trackSurfEvent('package_interest', {
      package_name: packageName,
      timestamp: Date.now()
    })
  }, [])

  // Track package booking
  const trackPackageBooking = useCallback((packageName: string, packagePrice: number) => {
    setMetrics(prev => ({
      ...prev,
      packageBookings: {
        ...prev.packageBookings,
        [packageName]: (prev.packageBookings[packageName] || 0) + 1
      },
      conversions: prev.conversions + 1,
      conversionValue: prev.conversionValue + packagePrice
    }))
    
    trackBookingEvent('package_booking', packageName, packagePrice)
    trackConversion('package_booking', packagePrice)
  }, [])

  // Track gallery interactions
  const trackGalleryView = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      galleryViews: prev.galleryViews + 1
    }))
    
    trackGalleryInteraction('view', 'gallery')
  }, [])

  const trackImageClick = useCallback((imageCategory: string) => {
    setMetrics(prev => ({
      ...prev,
      imageClicks: prev.imageClicks + 1
    }))
    
    trackGalleryInteraction('click', imageCategory)
  }, [])

  const trackSlideshowStart = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      slideshowStarts: prev.slideshowStarts + 1
    }))
    
    trackGalleryInteraction('slideshow_start', 'gallery')
  }, [])

  const trackSlideshowComplete = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      slideshowCompletions: prev.slideshowCompletions + 1
    }))
    
    trackGalleryInteraction('slideshow_complete', 'gallery')
  }, [])

  // Track review interactions
  const trackReviewView = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      reviewViews: prev.reviewViews + 1
    }))
    
    trackReviewInteraction('view')
  }, [])

  const trackReviewInteraction = useCallback((action: string, reviewRating?: number) => {
    setMetrics(prev => ({
      ...prev,
      reviewInteractions: prev.reviewInteractions + 1
    }))
    
    trackReviewInteraction(action, reviewRating)
  }, [])

  const trackReviewShare = useCallback((platform: string) => {
    setMetrics(prev => ({
      ...prev,
      reviewShares: prev.reviewShares + 1
    }))
    
    trackSurfEvent('review_share', {
      platform,
      timestamp: Date.now()
    })
  }, [])

  // Track contact form
  const trackContactFormSubmission = useCallback((formType: string, success: boolean) => {
    setMetrics(prev => ({
      ...prev,
      contactFormSubmissions: prev.contactFormSubmissions + 1,
      contactFormSuccesses: success ? prev.contactFormSuccesses + 1 : prev.contactFormSuccesses,
      contactFormErrors: success ? prev.contactFormErrors : prev.contactFormErrors + 1
    }))
    
    trackContactForm(formType, success)
  }, [])

  // Track user journey
  const trackUserJourneyStep = useCallback((step: string, data?: Record<string, any>) => {
    setMetrics(prev => ({
      ...prev,
      userJourneySteps: {
        ...prev.userJourneySteps,
        [step]: (prev.userJourneySteps[step] || 0) + 1
      }
    }))
    
    trackUserJourney(step, data)
  }, [])

  // Track page view
  const trackPageView = useCallback((page: string) => {
    setMetrics(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1
    }))
    
    trackSurfEvent('page_view', {
      page,
      timestamp: Date.now()
    })
  }, [])

  // Track device information
  const trackDeviceInfo = useCallback(() => {
    if (typeof window === 'undefined') return

    const deviceType = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
    const browserType = navigator.userAgent.includes('Chrome') ? 'chrome' :
                       navigator.userAgent.includes('Firefox') ? 'firefox' :
                       navigator.userAgent.includes('Safari') ? 'safari' : 'other'
    const screenSize = `${window.innerWidth}x${window.innerHeight}`
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    setMetrics(prev => ({
      ...prev,
      deviceTypes: {
        ...prev.deviceTypes,
        [deviceType]: (prev.deviceTypes[deviceType] || 0) + 1
      },
      browserTypes: {
        ...prev.browserTypes,
        [browserType]: (prev.browserTypes[browserType] || 0) + 1
      },
      screenSizes: {
        ...prev.screenSizes,
        [screenSize]: (prev.screenSizes[screenSize] || 0) + 1
      },
      timezones: {
        ...prev.timezones,
        [timezone]: (prev.timezones[timezone] || 0) + 1
      }
    }))
  }, [])

  // Track seasonal trends
  const trackSeasonalTrend = useCallback((trend: string, value: number) => {
    setMetrics(prev => ({
      ...prev,
      seasonalTrends: {
        ...prev.seasonalTrends,
        [trend]: (prev.seasonalTrends[trend] || 0) + value
      }
    }))
  }, [])

  // Track weather correlation
  const trackWeatherCorrelation = useCallback((weather: string, surfConditions: string) => {
    setMetrics(prev => ({
      ...prev,
      weatherCorrelations: {
        ...prev.weatherCorrelations,
        [weather]: (prev.weatherCorrelations[weather] || 0) + 1
      }
    }))
  }, [])

  // Calculate conversion rate
  const getConversionRate = useCallback(() => {
    if (metrics.pageViews === 0) return 0
    return (metrics.conversions / metrics.pageViews) * 100
  }, [metrics.conversions, metrics.pageViews])

  // Calculate package conversion rates
  const getPackageConversionRates = useCallback(() => {
    const rates: Record<string, number> = {}
    
    Object.keys(metrics.packageViews).forEach(packageName => {
      const views = metrics.packageViews[packageName] || 0
      const bookings = metrics.packageBookings[packageName] || 0
      rates[packageName] = views > 0 ? (bookings / views) * 100 : 0
    })
    
    return rates
  }, [metrics.packageViews, metrics.packageBookings])

  // Get top performing packages
  const getTopPackages = useCallback(() => {
    return Object.entries(metrics.packageViews)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, views]) => ({ name, views }))
  }, [metrics.packageViews])

  // Get user journey insights
  const getUserJourneyInsights = useCallback(() => {
    const totalSteps = Object.values(metrics.userJourneySteps).reduce((sum, count) => sum + count, 0)
    const stepRates: Record<string, number> = {}
    
    Object.entries(metrics.userJourneySteps).forEach(([step, count]) => {
      stepRates[step] = totalSteps > 0 ? (count / totalSteps) * 100 : 0
    })
    
    return stepRates
  }, [metrics.userJourneySteps])

  // Get device insights
  const getDeviceInsights = useCallback(() => {
    const totalDevices = Object.values(metrics.deviceTypes).reduce((sum, count) => sum + count, 0)
    const deviceRates: Record<string, number> = {}
    
    Object.entries(metrics.deviceTypes).forEach(([device, count]) => {
      deviceRates[device] = totalDevices > 0 ? (count / totalDevices) * 100 : 0
    })
    
    return deviceRates
  }, [metrics.deviceTypes])

  // Start tracking
  const startTracking = useCallback(() => {
    if (isTracking) return
    
    setIsTracking(true)
    trackDeviceInfo()
    trackPageView('home')
    trackUserJourneyStep('landing')
  }, [isTracking, trackDeviceInfo, trackPageView, trackUserJourneyStep])

  // Stop tracking
  const stopTracking = useCallback(() => {
    setIsTracking(false)
  }, [])

  // Initialize tracking on mount
  useEffect(() => {
    if (!isTracking) {
      setIsTracking(true)
      trackDeviceInfo()
      trackPageView('home')
      trackUserJourneyStep('landing')
    }
  }, []) // Empty dependency array to run only once

  return {
    metrics,
    isTracking,
    startTracking,
    stopTracking,
    trackPackageView,
    trackPackageInterest,
    trackPackageBooking,
    trackGalleryView,
    trackImageClick,
    trackSlideshowStart,
    trackSlideshowComplete,
    trackReviewView,
    trackReviewInteraction,
    trackReviewShare,
    trackContactFormSubmission,
    trackUserJourneyStep,
    trackPageView,
    trackSeasonalTrend,
    trackWeatherCorrelation,
    getConversionRate,
    getPackageConversionRates,
    getTopPackages,
    getUserJourneyInsights,
    getDeviceInsights
  }
}
