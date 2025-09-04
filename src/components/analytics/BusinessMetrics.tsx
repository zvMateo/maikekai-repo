'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBusinessMetrics } from '@/hooks/useBusinessMetrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Clock,
  MapPin,
  Cloud,
  XCircle
} from 'lucide-react'

interface BusinessMetricsProps {
  isOpen: boolean
  onClose: () => void
}

export function BusinessMetrics({ isOpen, onClose }: BusinessMetricsProps) {
  const { 
    metrics, 
    getConversionRate, 
    getPackageConversionRates, 
    getTopPackages, 
    getUserJourneyInsights, 
    getDeviceInsights 
  } = useBusinessMetrics()
  
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'users' | 'conversions' | 'seasonal'>('overview')

  const conversionRate = getConversionRate()
  const packageConversionRates = getPackageConversionRates()
  const topPackages = getTopPackages()
  const userJourneyInsights = getUserJourneyInsights()
  const deviceInsights = getDeviceInsights()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'packages', label: 'Packages', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'conversions', label: 'Conversions', icon: DollarSign },
    { id: 'seasonal', label: 'Seasonal', icon: Calendar }
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
                <h2 className="text-2xl font-bold">Business Metrics</h2>
                <p className="text-surf-light/80">Analytics and insights for Maikekai Surf Hotel</p>
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
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Page Views</p>
                          <p className="text-2xl font-bold">{metrics.pageViews}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Conversions</p>
                          <p className="text-2xl font-bold">{metrics.conversions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-600">Conversion Rate</p>
                          <p className="text-2xl font-bold">{conversionRate.toFixed(1)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <MousePointer className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="text-sm text-gray-600">Gallery Views</p>
                          <p className="text-2xl font-bold">{metrics.galleryViews}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Package Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Packages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topPackages.map((package_, index) => (
                        <div key={package_.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                            <span className="font-medium">{package_.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{package_.views} views</span>
                            <span className="text-sm font-medium text-green-600">
                              {packageConversionRates[package_.name]?.toFixed(1)}% conversion
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Device Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Device Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(deviceInsights).map(([device, percentage]) => (
                        <div key={device} className="text-center">
                          <div className="text-2xl font-bold">{percentage.toFixed(1)}%</div>
                          <div className="text-sm text-gray-600 capitalize">{device}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(metrics.packageViews).map(([packageName, views]) => (
                    <Card key={packageName}>
                      <CardHeader>
                        <CardTitle className="text-lg">{packageName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Views:</span>
                            <span className="font-bold">{views}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Interests:</span>
                            <span className="font-bold">{metrics.packageInterests[packageName] || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bookings:</span>
                            <span className="font-bold">{metrics.packageBookings[packageName] || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Conversion:</span>
                            <span className="font-bold text-green-600">
                              {packageConversionRates[packageName]?.toFixed(1) || 0}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Journey</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(userJourneyInsights).map(([step, percentage]) => (
                          <div key={step} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 capitalize">{step.replace('_', ' ')}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Geographic Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(metrics.countries).slice(0, 5).map(([country, count]) => (
                          <div key={country} className="flex justify-between">
                            <span className="text-sm text-gray-600">{country}</span>
                            <span className="font-bold">{count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'conversions' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">${metrics.conversionValue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{conversionRate.toFixed(1)}%</p>
                        <p className="text-sm text-gray-600">Conversion Rate</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{metrics.conversions}</p>
                        <p className="text-sm text-gray-600">Total Conversions</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Page Views</span>
                        <span className="font-bold">{metrics.pageViews}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Package Views</span>
                        <span className="font-bold">{Object.values(metrics.packageViews).reduce((sum, count) => sum + count, 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Package Interests</span>
                        <span className="font-bold">{Object.values(metrics.packageInterests).reduce((sum, count) => sum + count, 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Bookings</span>
                        <span className="font-bold text-green-600">{metrics.conversions}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'seasonal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Seasonal Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(metrics.seasonalTrends).map(([trend, value]) => (
                          <div key={trend} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">{trend}</span>
                            <span className="font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Weather Correlations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(metrics.weatherCorrelations).map(([weather, count]) => (
                          <div key={weather} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">{weather}</span>
                            <span className="font-bold">{count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
