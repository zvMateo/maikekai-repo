// Structured Data (Schema.org) para Maikekai Surf Hotel
export interface StructuredDataConfig {
  type: 'Hotel' | 'LocalBusiness' | 'TouristAttraction' | 'Service' | 'Product' | 'Review' | 'FAQPage'
  data: any
}

// Datos del hotel para Schema.org
export const hotelStructuredData = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": "https://maikekaisurf.com/#hotel",
  "name": "Maikekai Surf Hotel",
  "alternateName": "Maikekai Surf Resort",
  "description": "Hotel de surf de lujo ubicado en Playa Hermosa, Costa Rica. Ofrecemos experiencias únicas de surf, clases profesionales y el auténtico estilo de vida Pura Vida.",
  "url": "https://maikekaisurf.com",
  "logo": "https://maikekaisurf.com/logo.png",
  "image": [
    "https://maikekaisurf.com/hotel-exterior.jpg",
    "https://maikekaisurf.com/ocean-view-rooms.jpg",
    "https://maikekaisurf.com/surf-lessons.jpg",
    "https://maikekaisurf.com/infinity-pool.jpg"
  ],
  "telephone": "+506-1234-5678",
  "email": "info@maikekaisurf.com",
  "priceRange": "$$$",
  "starRating": {
    "@type": "Rating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Playa Hermosa",
    "addressLocality": "Garabito",
    "addressRegion": "Puntarenas",
    "postalCode": "61101",
    "addressCountry": "CR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "9.7489",
    "longitude": "-84.7534"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "checkinTime": "15:00",
  "checkoutTime": "11:00",
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "WiFi",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Pool",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Restaurant",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Surf Lessons",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Equipment Rental",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Beach Access",
      "value": true
    }
  ],
  "petsAllowed": false,
  "smokingAllowed": false,
  "sameAs": [
    "https://www.facebook.com/maikekaisurf",
    "https://www.instagram.com/maikekaisurf",
    "https://www.tripadvisor.com/maikekaisurf"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Surf Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pura Vida Beginner Package",
          "description": "Perfect for first-time surfers. Learn the basics in a safe, supportive environment.",
          "provider": {
            "@type": "Organization",
            "name": "Maikekai Surf Hotel"
          }
        },
        "price": "450",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Costa Rica Intermediate Package",
          "description": "Take your surfing to the next level with advanced techniques and video analysis.",
          "provider": {
            "@type": "Organization",
            "name": "Maikekai Surf Hotel"
          }
        },
        "price": "650",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pro Surfer Experience",
          "description": "For experienced surfers looking for challenging waves and professional coaching.",
          "provider": {
            "@type": "Organization",
            "name": "Maikekai Surf Hotel"
          }
        },
        "price": "850",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    ]
  }
}

// Structured data para servicios de surf
export const surfServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Surf Lessons Costa Rica",
  "description": "Professional surf instruction for all levels in Playa Hermosa, Costa Rica",
  "provider": {
    "@type": "Organization",
    "name": "Maikekai Surf Hotel",
    "url": "https://maikekaisurf.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Costa Rica"
  },
  "serviceType": "Surf Instruction",
  "offers": {
    "@type": "Offer",
    "price": "450",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Surf Lesson Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Beginner Surf Lessons",
          "description": "Learn to surf with certified instructors in a safe environment"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Intermediate Surf Lessons",
          "description": "Improve your technique with advanced coaching and video analysis"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Advanced Surf Coaching",
          "description": "Professional coaching for experienced surfers"
        }
      }
    ]
  }
}

// Structured data para reseñas
export function generateReviewsStructuredData(reviews: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": "https://maikekaisurf.com/#hotel",
    "name": "Maikekai Surf Hotel",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.slice(0, 10).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name || "Anonymous"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.comment,
      "datePublished": review.date,
      "publisher": {
        "@type": "Organization",
        "name": "Maikekai Surf Hotel"
      }
    }))
  }
}

// Structured data para FAQ
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué incluyen los paquetes de surf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestros paquetes incluyen alojamiento, clases de surf con instructores certificados, equipamiento (tabla y traje de neopreno), desayuno y almuerzo, transporte a las playas, y acceso a todas las instalaciones del hotel."
      }
    },
    {
      "@type": "Question",
      "name": "¿Necesito experiencia previa en surf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, no necesitas experiencia previa. Tenemos paquetes diseñados específicamente para principiantes, con instructores certificados que te enseñarán desde lo básico en un ambiente seguro y divertido."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué temporada es mejor para surfear en Costa Rica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Costa Rica ofrece excelentes condiciones de surf todo el año. La temporada alta es de diciembre a abril (época seca), pero las olas son consistentes durante todo el año. Playa Hermosa es conocida por sus olas constantes y de calidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Incluyen el equipamiento de surf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todos nuestros paquetes incluyen el equipamiento completo: tabla de surf de alta calidad, traje de neopreno, y todos los accesorios necesarios. También tenemos equipamiento disponible para alquiler si necesitas algo específico."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo llego a Maikekai Surf Hotel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estamos ubicados en Playa Hermosa, a solo 1 hora del Aeropuerto Internacional Juan Santamaría. Ofrecemos servicio de traslado desde el aeropuerto, o puedes llegar en vehículo propio. Las direcciones exactas se envían con la confirmación de reserva."
      }
    }
  ]
}

// Función para generar structured data dinámico
export function generateStructuredData(type: string, data?: any) {
  switch (type) {
    case 'hotel':
      return hotelStructuredData
    case 'surf-service':
      return surfServiceStructuredData
    case 'reviews':
      return generateReviewsStructuredData(data || [])
    case 'faq':
      return faqStructuredData
    default:
      return null
  }
}
