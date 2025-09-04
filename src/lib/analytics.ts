// Google Analytics 4 configuration for Maikekai Surf Hotel

// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        dimension1: 'user_type',
        dimension2: 'surf_level',
        dimension3: 'booking_intent'
      }
    })
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track surf-specific events
export const trackSurfEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'surf_hotel',
      ...parameters
    })
  }
}

// Track booking events
export const trackBookingEvent = (step: string, packageType?: string, value?: number) => {
  trackSurfEvent('booking_step', {
    step,
    package_type: packageType,
    value
  })
}

// Track surf package views
export const trackPackageView = (packageName: string, packagePrice: number) => {
  trackSurfEvent('view_package', {
    package_name: packageName,
    package_price: packagePrice,
    currency: 'USD'
  })
}

// Track gallery interactions
export const trackGalleryInteraction = (action: string, imageCategory?: string) => {
  trackSurfEvent('gallery_interaction', {
    action,
    image_category: imageCategory
  })
}

// Track review interactions
export const trackReviewInteraction = (action: string, reviewRating?: number) => {
  trackSurfEvent('review_interaction', {
    action,
    review_rating: reviewRating
  })
}

// Track contact form submissions
export const trackContactForm = (formType: string, success: boolean) => {
  trackSurfEvent('contact_form', {
    form_type: formType,
    success
  })
}

// Track user engagement
export const trackEngagement = (metric: string, value: number) => {
  trackSurfEvent('engagement', {
    metric,
    value
  })
}

// Track performance metrics
export const trackPerformance = (metric: string, value: number, unit: string = 'ms') => {
  trackSurfEvent('performance', {
    metric,
    value,
    unit
  })
}

// Track errors
export const trackError = (error: string, fatal: boolean = false) => {
  trackSurfEvent('error', {
    error_message: error,
    fatal
  })
}

// Track Core Web Vitals
export const trackWebVitals = (metric: any) => {
  trackSurfEvent('web_vitals', {
    metric_name: metric.name,
    metric_value: Math.round(metric.value),
    metric_delta: Math.round(metric.delta),
    metric_id: metric.id
  })
}

// Track user journey
export const trackUserJourney = (step: string, data?: Record<string, any>) => {
  trackSurfEvent('user_journey', {
    step,
    timestamp: Date.now(),
    ...data
  })
}

// Track conversion events
export const trackConversion = (conversionType: string, value?: number, currency: string = 'USD') => {
  trackSurfEvent('conversion', {
    conversion_type: conversionType,
    value,
    currency
  })
}

// Track social media interactions
export const trackSocialShare = (platform: string, content: string) => {
  trackSurfEvent('social_share', {
    platform,
    content
  })
}

// Track search queries
export const trackSearch = (query: string, results: number) => {
  trackSurfEvent('search', {
    search_term: query,
    results_count: results
  })
}

// Track video interactions
export const trackVideoInteraction = (action: string, videoTitle: string, progress?: number) => {
  trackSurfEvent('video_interaction', {
    action,
    video_title: videoTitle,
    progress
  })
}

// Track mobile app interactions (if applicable)
export const trackMobileApp = (action: string, data?: Record<string, any>) => {
  trackSurfEvent('mobile_app', {
    action,
    ...data
  })
}

// Track A/B test results
export const trackABTest = (testName: string, variant: string, conversion: boolean) => {
  trackSurfEvent('ab_test', {
    test_name: testName,
    variant,
    conversion
  })
}

// Track user preferences
export const trackUserPreference = (preference: string, value: any) => {
  trackSurfEvent('user_preference', {
    preference,
    value: JSON.stringify(value)
  })
}

// Track booking funnel
export const trackBookingFunnel = (step: string, data?: Record<string, any>) => {
  trackSurfEvent('booking_funnel', {
    step,
    timestamp: Date.now(),
    ...data
  })
}

// Track seasonal events
export const trackSeasonalEvent = (event: string, data?: Record<string, any>) => {
  trackSurfEvent('seasonal_event', {
    event,
    season: getCurrentSeason(),
    ...data
  })
}

// Helper function to get current season
const getCurrentSeason = () => {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

// Track weather-related events
export const trackWeatherEvent = (weather: string, surfConditions: string) => {
  trackSurfEvent('weather', {
    weather_condition: weather,
    surf_conditions: surfConditions
  })
}

// Track location-based events
export const trackLocationEvent = (location: string, action: string) => {
  trackSurfEvent('location', {
    location,
    action
  })
}

// Track device and browser info
export const trackDeviceInfo = () => {
  if (typeof window !== 'undefined') {
    trackSurfEvent('device_info', {
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      color_depth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    })
  }
}

// Track page load performance
export const trackPageLoadPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    trackPerformance('page_load_time', navigation.loadEventEnd - navigation.fetchStart)
    trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart)
    trackPerformance('first_paint', performance.getEntriesByName('first-paint')[0]?.startTime || 0)
    trackPerformance('first_contentful_paint', performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0)
  }
}

// Track Core Web Vitals
export const trackCoreWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      trackWebVitals({
        name: 'LCP',
        value: lastEntry.startTime,
        delta: lastEntry.startTime,
        id: lastEntry.entryType
      })
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // Track First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const fidEntry = entry as any
        trackWebVitals({
          name: 'FID',
          value: fidEntry.processingStart - fidEntry.startTime,
          delta: fidEntry.processingStart - fidEntry.startTime,
          id: fidEntry.entryType
        })
      })
    }).observe({ entryTypes: ['first-input'] })

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      trackWebVitals({
        name: 'CLS',
        value: clsValue,
        delta: clsValue,
        id: 'cls'
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }
}

// Initialize all tracking
export const initializeTracking = () => {
  initGA()
  trackDeviceInfo()
  trackPageLoadPerformance()
  trackCoreWebVitals()
}

// Export types for TypeScript
export interface GtagEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export interface SurfEvent {
  eventName: string
  parameters?: Record<string, any>
}

// Global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
