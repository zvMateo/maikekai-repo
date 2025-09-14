'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { XCircle } from 'lucide-react'

interface BusinessMetricsProps {
  isOpen: boolean
  onClose: () => void
}

export function BusinessMetrics({ isOpen, onClose }: BusinessMetricsProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-surf-blue to-surf-teal p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Business Metrics</h2>
              <p className="text-surf-light/80">Business analytics for Maikekai Surf Hotel</p>
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

        {/* Content */}
        <div className="p-6 h-[calc(90vh-200px)] overflow-y-auto">
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Business Metrics</h3>
            <p className="text-gray-500">Business analytics have been disabled for better performance.</p>
          </div>
        </div>
      </div>
    </div>
  )
}