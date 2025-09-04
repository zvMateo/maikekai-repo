'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerformance } from '@/hooks/usePerformance'
import { 
  Activity, 
  Zap, 
  Clock, 
  Eye, 
  MousePointer, 
  Scroll,
  Wifi,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react'

interface RealtimeMetricsProps {
  isVisible: boolean
  onToggle: () => void
}

export function RealtimeMetrics({ isVisible, onToggle }: RealtimeMetricsProps) {
  const { metrics, getPerformanceScore } = usePerformance()
  const [isExpanded, setIsExpanded] = useState(false)

  const performanceScore = getPerformanceScore()

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (score >= 70) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Compact View */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div 
          className="bg-gradient-to-r from-surf-blue to-surf-teal p-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              {getScoreIcon(performanceScore)}
              <span className="text-sm font-bold">{performanceScore}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart3 className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {/* Core Web Vitals */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Core Web Vitals</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-blue-500" />
                      <span className="text-gray-600">LCP:</span>
                      <span className="font-medium">
                        {metrics.lcp ? formatTime(metrics.lcp) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="h-3 w-3 text-green-500" />
                      <span className="text-gray-600">FID:</span>
                      <span className="font-medium">
                        {metrics.fid ? formatTime(metrics.fid) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 text-purple-500" />
                      <span className="text-gray-600">CLS:</span>
                      <span className="font-medium">
                        {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3 text-yellow-500" />
                      <span className="text-gray-600">FCP:</span>
                      <span className="font-medium">
                        {metrics.firstContentfulPaint ? formatTime(metrics.firstContentfulPaint) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Performance</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Load Time:</span>
                      <span className="font-medium">
                        {metrics.pageLoadTime ? formatTime(metrics.pageLoadTime) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resources:</span>
                      <span className="font-medium">{metrics.totalResources}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{formatBytes(metrics.totalSize)}</span>
                    </div>
                  </div>
                </div>

                {/* User Interactions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Interactions</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <MousePointer className="h-3 w-3 text-blue-500" />
                      <span className="text-gray-600">Clicks:</span>
                      <span className="font-medium">{metrics.clickCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Scroll className="h-3 w-3 text-green-500" />
                      <span className="text-gray-600">Scroll:</span>
                      <span className="font-medium">{metrics.scrollDepth}%</span>
                    </div>
                  </div>
                </div>

                {/* Network & Memory */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">System</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Connection:</span>
                      <span className="font-medium">{metrics.effectiveType || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Memory:</span>
                      <span className="font-medium">
                        {metrics.memoryUsage ? formatBytes(metrics.memoryUsage) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Errors:</span>
                      <span className={`font-medium ${metrics.errorCount > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {metrics.errorCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Score Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Performance Score</span>
                    <span className={`font-bold ${getScoreColor(performanceScore)}`}>
                      {performanceScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        performanceScore >= 90 ? 'bg-green-500' :
                        performanceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${performanceScore}%` }}
                    />
                  </div>
                </div>

                {/* Close Button */}
                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={onToggle}
                    className="w-full text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Hide Metrics
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
