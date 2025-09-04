'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerformance } from '@/hooks/usePerformance'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Activity, 
  Zap, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  MousePointer,
  Scroll,
  Wifi,
  HardDrive,
  BarChart3,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react'

interface PerformanceDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export function PerformanceDashboard({ isOpen, onClose }: PerformanceDashboardProps) {
  const { metrics, getPerformanceScore, getPerformanceInsights } = usePerformance()
  const [activeTab, setActiveTab] = useState<'overview' | 'web-vitals' | 'resources' | 'network' | 'errors'>('overview')

  const performanceScore = getPerformanceScore()
  const insights = getPerformanceInsights()

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (score >= 70) return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    return <XCircle className="h-5 w-5 text-red-500" />
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'web-vitals', label: 'Web Vitals', icon: Activity },
    { id: 'resources', label: 'Resources', icon: HardDrive },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'errors', label: 'Errors', icon: AlertTriangle }
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-surf-blue to-surf-teal p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Performance Dashboard</h2>
                <p className="text-surf-light/80">Real-time performance metrics for Maikekai Surf Hotel</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-surf-blue text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 h-[calc(90vh-200px)] overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Performance Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {getScoreIcon(performanceScore)}
                      <span>Overall Performance Score</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getScoreColor(performanceScore)}`}>
                        {performanceScore}
                      </div>
                      <p className="text-gray-600 mt-2">out of 100</p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            performanceScore >= 90 ? 'bg-green-500' :
                            performanceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${performanceScore}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Page Load Time</p>
                          <p className="text-xl font-bold">
                            {metrics.pageLoadTime ? formatTime(metrics.pageLoadTime) : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm text-gray-600">First Paint</p>
                          <p className="text-xl font-bold">
                            {metrics.firstPaint ? formatTime(metrics.firstPaint) : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Resources</p>
                          <p className="text-xl font-bold">{metrics.totalResources}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-600">Errors</p>
                          <p className="text-xl font-bold">{metrics.errorCount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Insights */}
                {insights.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {insights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'web-vitals' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Largest Contentful Paint</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {metrics.lcp ? formatTime(metrics.lcp) : 'N/A'}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {metrics.lcp && metrics.lcp < 2500 ? 'Good' : 
                         metrics.lcp && metrics.lcp < 4000 ? 'Needs Improvement' : 'Poor'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">First Input Delay</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        {metrics.fid ? formatTime(metrics.fid) : 'N/A'}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {metrics.fid && metrics.fid < 100 ? 'Good' : 
                         metrics.fid && metrics.fid < 300 ? 'Needs Improvement' : 'Poor'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cumulative Layout Shift</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">
                        {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {metrics.cls && metrics.cls < 0.1 ? 'Good' : 
                         metrics.cls && metrics.cls < 0.25 ? 'Needs Improvement' : 'Poor'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">First Contentful Paint</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {metrics.firstContentfulPaint ? formatTime(metrics.firstContentfulPaint) : 'N/A'}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Time to First Byte</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {metrics.ttfb ? formatTime(metrics.ttfb) : 'N/A'}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <HardDrive className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{formatBytes(metrics.totalSize)}</p>
                        <p className="text-sm text-gray-600">Total Size</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Eye className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{metrics.imageCount}</p>
                        <p className="text-sm text-gray-600">Images</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{metrics.scriptCount}</p>
                        <p className="text-sm text-gray-600">Scripts</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{metrics.cssCount}</p>
                        <p className="text-sm text-gray-600">CSS Files</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Images</span>
                        <span className="font-bold">{metrics.imageCount} files</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>JavaScript</span>
                        <span className="font-bold">{metrics.scriptCount} files</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>CSS</span>
                        <span className="font-bold">{metrics.cssCount} files</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Resources</span>
                        <span className="font-bold">{metrics.totalResources} files</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connection Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Connection Type:</span>
                          <span className="font-bold">{metrics.connectionType || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Effective Type:</span>
                          <span className="font-bold">{metrics.effectiveType || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Downlink:</span>
                          <span className="font-bold">{metrics.downlink ? `${metrics.downlink} Mbps` : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>RTT:</span>
                          <span className="font-bold">{metrics.rtt ? `${metrics.rtt}ms` : 'N/A'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Memory Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Used Memory:</span>
                          <span className="font-bold">
                            {metrics.memoryUsage ? formatBytes(metrics.memoryUsage) : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Memory Limit:</span>
                          <span className="font-bold">
                            {metrics.memoryLimit ? formatBytes(metrics.memoryLimit) : 'N/A'}
                          </span>
                        </div>
                        {metrics.memoryUsage && metrics.memoryLimit && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(metrics.memoryUsage / metrics.memoryLimit) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'errors' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Error Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-500">{metrics.errorCount}</div>
                      <p className="text-gray-600">Total Errors</p>
                    </div>
                  </CardContent>
                </Card>

                {metrics.jsErrors.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>JavaScript Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {metrics.jsErrors.map((error, index) => (
                          <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
