'use client'

import { useEffect, useState } from 'react'
import { initializeTracking } from '@/lib/analytics'
import { RealtimeMetrics } from './RealtimeMetrics'
import { PerformanceDashboard } from './PerformanceDashboard'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [showMetrics, setShowMetrics] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  // Initialize analytics on mount
  useEffect(() => {
    initializeTracking()
  }, [])

  // Keyboard shortcut to toggle metrics
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + M to toggle metrics
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'M') {
        event.preventDefault()
        setShowMetrics(!showMetrics)
      }
      
      // Ctrl/Cmd + Shift + D to toggle dashboard
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        setShowDashboard(!showDashboard)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showMetrics, showDashboard])

  return (
    <>
      {children}
      
      {/* Real-time Metrics Widget */}
      <RealtimeMetrics 
        isVisible={showMetrics} 
        onToggle={() => setShowMetrics(!showMetrics)} 
      />
      
      {/* Performance Dashboard */}
      <PerformanceDashboard 
        isOpen={showDashboard} 
        onClose={() => setShowDashboard(false)} 
      />
    </>
  )
}
