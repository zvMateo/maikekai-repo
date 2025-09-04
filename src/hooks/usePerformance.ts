'use client'

import { useEffect, useState, useCallback } from 'react'
import { trackPerformance, trackWebVitals, trackError } from '@/lib/analytics'

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null
  fid: number | null
  cls: number | null
  fcp: number | null
  ttfb: number | null
  
  // Custom metrics
  pageLoadTime: number | null
  domContentLoaded: number | null
  firstPaint: number | null
  firstContentfulPaint: number | null
  
  // Resource metrics
  totalResources: number
  totalSize: number
  imageCount: number
  scriptCount: number
  cssCount: number
  
  // Network metrics
  connectionType: string | null
  effectiveType: string | null
  downlink: number | null
  rtt: number | null
  
  // Memory metrics
  memoryUsage: number | null
  memoryLimit: number | null
  
  // Error metrics
  errorCount: number
  jsErrors: string[]
  
  // User interaction metrics
  clickCount: number
  scrollDepth: number
  timeOnPage: number
  bounceRate: number
}

const initialMetrics: PerformanceMetrics = {
  lcp: null,
  fid: null,
  cls: null,
  fcp: null,
  ttfb: null,
  pageLoadTime: null,
  domContentLoaded: null,
  firstPaint: null,
  firstContentfulPaint: null,
  totalResources: 0,
  totalSize: 0,
  imageCount: 0,
  scriptCount: 0,
  cssCount: 0,
  connectionType: null,
  effectiveType: null,
  downlink: null,
  rtt: null,
  memoryUsage: null,
  memoryLimit: null,
  errorCount: 0,
  jsErrors: [],
  clickCount: 0,
  scrollDepth: 0,
  timeOnPage: 0,
  bounceRate: 0
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(initialMetrics)
  const [isTracking, setIsTracking] = useState(false)

  // Track Core Web Vitals
  const trackCoreWebVitals = useCallback(() => {
    if (typeof window === 'undefined') return

    // Track LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      const lcpValue = lastEntry.startTime
      
      setMetrics(prev => ({ ...prev, lcp: lcpValue }))
      trackWebVitals({
        name: 'LCP',
        value: lcpValue,
        delta: lcpValue,
        id: 'lcp'
      })
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Track FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const fidEntry = entry as any
        const fidValue = fidEntry.processingStart - fidEntry.startTime
        setMetrics(prev => ({ ...prev, fid: fidValue }))
        trackWebVitals({
          name: 'FID',
          value: fidValue,
          delta: fidValue,
          id: 'fid'
        })
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Track CLS
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      setMetrics(prev => ({ ...prev, cls: clsValue }))
      trackWebVitals({
        name: 'CLS',
        value: clsValue,
        delta: clsValue,
        id: 'cls'
      })
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    return () => {
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  // Track page load performance
  const trackPageLoadMetrics = useCallback(() => {
    if (typeof window === 'undefined') return

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
      const ttfb = navigation.responseStart - navigation.fetchStart
      
      setMetrics(prev => ({
        ...prev,
        pageLoadTime,
        domContentLoaded,
        ttfb
      }))

      trackPerformance('page_load_time', pageLoadTime)
      trackPerformance('dom_content_loaded', domContentLoaded)
      trackPerformance('ttfb', ttfb)
    }

    // Track First Paint and First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint')
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-paint') {
        setMetrics(prev => ({ ...prev, firstPaint: entry.startTime }))
        trackPerformance('first_paint', entry.startTime)
      }
      if (entry.name === 'first-contentful-paint') {
        setMetrics(prev => ({ ...prev, firstContentfulPaint: entry.startTime }))
        trackPerformance('first_contentful_paint', entry.startTime)
      }
    })
  }, [])

  // Track resource metrics
  const trackResourceMetrics = useCallback(() => {
    if (typeof window === 'undefined') return

    const resources = performance.getEntriesByType('resource')
    let totalSize = 0
    let imageCount = 0
    let scriptCount = 0
    let cssCount = 0

    resources.forEach((resource) => {
      const resourceEntry = resource as any
      totalSize += resourceEntry.transferSize || 0
      
      if (resource.name.includes('.js')) scriptCount++
      else if (resource.name.includes('.css')) cssCount++
      else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) imageCount++
    })

    setMetrics(prev => ({
      ...prev,
      totalResources: resources.length,
      totalSize,
      imageCount,
      scriptCount,
      cssCount
    }))
  }, [])

  // Track network information
  const trackNetworkInfo = useCallback(() => {
    if (typeof window === 'undefined' || !('connection' in navigator)) return

    const connection = (navigator as any).connection
    if (connection) {
      setMetrics(prev => ({
        ...prev,
        connectionType: connection.type,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      }))
    }
  }, [])

  // Track memory usage
  const trackMemoryUsage = useCallback(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) return

    const memory = (performance as any).memory
    if (memory) {
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memory.usedJSHeapSize,
        memoryLimit: memory.jsHeapSizeLimit
      }))
    }
  }, [])

  // Track user interactions
  const trackUserInteractions = useCallback(() => {
    if (typeof window === 'undefined') return

    let clickCount = 0
    let scrollDepth = 0
    let maxScrollDepth = 0
    let startTime = Date.now()

    // Track clicks
    const handleClick = () => {
      clickCount++
      setMetrics(prev => ({ ...prev, clickCount }))
    }

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollDepth = Math.round((scrollTop / documentHeight) * 100)
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        setMetrics(prev => ({ ...prev, scrollDepth: maxScrollDepth }))
      }
    }

    // Track time on page
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime
      setMetrics(prev => ({ ...prev, timeOnPage }))
      trackPerformance('time_on_page', timeOnPage)
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // Track errors
  const trackErrors = useCallback(() => {
    if (typeof window === 'undefined') return

    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || 'Unknown error'
      setMetrics(prev => ({
        ...prev,
        errorCount: prev.errorCount + 1,
        jsErrors: [...prev.jsErrors, errorMessage]
      }))
      trackError(errorMessage, false)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.message || 'Unhandled promise rejection'
      setMetrics(prev => ({
        ...prev,
        errorCount: prev.errorCount + 1,
        jsErrors: [...prev.jsErrors, errorMessage]
      }))
      trackError(errorMessage, false)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  // Start tracking
  const startTracking = useCallback(() => {
    if (isTracking) return

    setIsTracking(true)
    
    // Track initial metrics
    trackPageLoadMetrics()
    trackResourceMetrics()
    trackNetworkInfo()
    trackMemoryUsage()
    
    // Set up observers
    const cleanup = [
      trackCoreWebVitals(),
      trackUserInteractions(),
      trackErrors()
    ].filter(Boolean)

    return () => {
      cleanup.forEach(cleanupFn => cleanupFn?.())
    }
  }, [isTracking, trackCoreWebVitals, trackPageLoadMetrics, trackResourceMetrics, trackNetworkInfo, trackMemoryUsage, trackUserInteractions, trackErrors])

  // Stop tracking
  const stopTracking = useCallback(() => {
    setIsTracking(false)
  }, [])

  // Get performance score
  const getPerformanceScore = useCallback(() => {
    let score = 100

    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (metrics.lcp !== null) {
      if (metrics.lcp > 4000) score -= 30
      else if (metrics.lcp > 2500) score -= 15
    }

    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (metrics.fid !== null) {
      if (metrics.fid > 300) score -= 25
      else if (metrics.fid > 100) score -= 10
    }

    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (metrics.cls !== null) {
      if (metrics.cls > 0.25) score -= 20
      else if (metrics.cls > 0.1) score -= 10
    }

    // Page load time scoring
    if (metrics.pageLoadTime !== null) {
      if (metrics.pageLoadTime > 5000) score -= 15
      else if (metrics.pageLoadTime > 3000) score -= 5
    }

    // Error penalty
    score -= metrics.errorCount * 5

    return Math.max(0, Math.min(100, score))
  }, [metrics])

  // Get performance insights
  const getPerformanceInsights = useCallback(() => {
    const insights = []
    const score = getPerformanceScore()

    if (metrics.lcp && metrics.lcp > 2500) {
      insights.push('Largest Contentful Paint is slow. Consider optimizing images and reducing server response time.')
    }

    if (metrics.fid && metrics.fid > 100) {
      insights.push('First Input Delay is high. Consider reducing JavaScript execution time.')
    }

    if (metrics.cls && metrics.cls > 0.1) {
      insights.push('Cumulative Layout Shift is high. Ensure images have dimensions and avoid inserting content above existing content.')
    }

    if (metrics.pageLoadTime && metrics.pageLoadTime > 3000) {
      insights.push('Page load time is slow. Consider optimizing resources and using a CDN.')
    }

    if (metrics.errorCount > 0) {
      insights.push(`${metrics.errorCount} JavaScript errors detected. Fix these to improve user experience.`)
    }

    if (metrics.totalSize > 1000000) {
      insights.push('Total resource size is large. Consider code splitting and image optimization.')
    }

    if (score < 50) {
      insights.push('Overall performance score is low. Focus on Core Web Vitals improvements.')
    }

    return insights
  }, [metrics, getPerformanceScore])

  // Initialize tracking on mount
  useEffect(() => {
    const cleanup = startTracking()
    return cleanup
  }, [startTracking])

  return {
    metrics,
    isTracking,
    startTracking,
    stopTracking,
    getPerformanceScore,
    getPerformanceInsights
  }
}
