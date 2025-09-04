'use client'

import { generateStructuredData } from '@/lib/structured-data'

interface StructuredDataProps {
  type: 'hotel' | 'surf-service' | 'reviews' | 'faq'
  data?: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = generateStructuredData(type, data)

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

// Componente específico para el hotel
export function HotelStructuredData() {
  return <StructuredData type="hotel" />
}

// Componente específico para servicios de surf
export function SurfServiceStructuredData() {
  return <StructuredData type="surf-service" />
}

// Componente específico para reseñas
export function ReviewsStructuredData({ reviews }: { reviews: any[] }) {
  return <StructuredData type="reviews" data={reviews} />
}

// Componente específico para FAQ
export function FAQStructuredData() {
  return <StructuredData type="faq" />
}
