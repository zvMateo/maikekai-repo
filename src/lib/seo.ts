// Sistema de SEO dinámico para Maikekai Surf Hotel
import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

const defaultSEO = {
  siteName: 'Maikekai Surf Hotel',
  siteUrl: 'https://maikekaisurf.com',
  defaultImage: 'https://maikekaisurf.com/og-image.jpg',
  twitterHandle: '@maikekaisurf',
  facebookAppId: 'your-facebook-app-id',
  locale: 'es_CR',
  alternateLocales: ['en_US', 'es_ES'],
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultSEO.defaultImage,
    url = defaultSEO.siteUrl,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'Maikekai Surf Hotel',
    section,
    tags = []
  } = config

  const fullTitle = title.includes('Maikekai') ? title : `${title} | Maikekai Surf Hotel`
  const fullDescription = description || 'Descubre el mejor hotel de surf en Costa Rica. Experiencias únicas, olas perfectas y el auténtico estilo de vida Pura Vida en Playa Hermosa.'
  
  const allKeywords = [
    'surf hotel costa rica',
    'playa hermosa surf',
    'surf lessons costa rica',
    'pura vida surf',
    'maikekai surf hotel',
    'costa rica surf resort',
    'surf camp costa rica',
    'oceanfront hotel costa rica',
    ...keywords
  ]

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: 'Maikekai Surf Hotel',
    
    // Open Graph
    openGraph: {
      type: type,
      locale: defaultSEO.locale,
      alternateLocale: defaultSEO.alternateLocales,
      url: url,
      siteName: defaultSEO.siteName,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        }
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: defaultSEO.twitterHandle,
      creator: defaultSEO.twitterHandle,
      title: fullTitle,
      description: fullDescription,
      images: [image],
    },

    // Additional meta tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: url,
      languages: {
        'es-CR': url,
        'en-US': `${url}/en`,
        'es-ES': `${url}/es`,
      },
    },

    // Verification
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },

    // App links
    appLinks: {
      web: {
        url: url,
        should_fallback: true,
      },
    },

    // Other meta tags
    other: {
      'geo.region': 'CR',
      'geo.placename': 'Playa Hermosa, Costa Rica',
      'geo.position': '9.7489;-84.7534',
      'ICBM': '9.7489, -84.7534',
      'DC.title': fullTitle,
      'DC.description': fullDescription,
      'DC.subject': allKeywords.join(', '),
      'DC.creator': author,
      'DC.publisher': 'Maikekai Surf Hotel',
      'DC.type': type,
      'DC.format': 'text/html',
      'DC.identifier': url,
      'DC.language': 'es',
      'DC.coverage': 'Costa Rica',
      'DC.rights': '© 2024 Maikekai Surf Hotel. All rights reserved.',
    },
  }
}

// Configuraciones SEO específicas para cada página
export const seoConfigs = {
  home: {
    title: 'Maikekai Surf Hotel - Pura Vida Surf Experience en Costa Rica',
    description: 'Descubre el mejor hotel de surf en Costa Rica. Experiencias únicas, olas perfectas y el auténtico estilo de vida Pura Vida en Playa Hermosa. Reserva tu estadía ahora.',
    keywords: ['hotel surf costa rica', 'playa hermosa', 'surf lessons', 'pura vida'],
    type: 'website' as const,
  },
  
  surfPackages: {
    title: 'Paquetes de Surf - Clases y Experiencias en Costa Rica',
    description: 'Elige entre nuestros paquetes de surf diseñados para todos los niveles. Desde principiantes hasta avanzados, vive la mejor experiencia de surf en Costa Rica.',
    keywords: ['paquetes surf', 'clases surf costa rica', 'surf lessons', 'surf packages'],
    type: 'website' as const,
  },
  
  gallery: {
    title: 'Galería de Fotos - Maikekai Surf Hotel Costa Rica',
    description: 'Explora nuestra galería de fotos y descubre la belleza de Maikekai Surf Hotel. Imágenes de nuestras instalaciones, olas perfectas y experiencias únicas.',
    keywords: ['galeria fotos', 'hotel costa rica', 'playa hermosa fotos', 'surf photos'],
    type: 'website' as const,
  },
  
  reviews: {
    title: 'Reseñas y Testimonios - Maikekai Surf Hotel',
    description: 'Lee las reseñas de nuestros huéspedes y descubre por qué Maikekai Surf Hotel es la mejor opción para tu experiencia de surf en Costa Rica.',
    keywords: ['reseñas hotel', 'testimonios surf', 'opiniones maikekai', 'hotel reviews'],
    type: 'website' as const,
  },
  
  contact: {
    title: 'Contacto - Maikekai Surf Hotel Costa Rica',
    description: 'Contáctanos para reservar tu estadía o resolver cualquier consulta. Estamos ubicados en Playa Hermosa, Costa Rica.',
    keywords: ['contacto hotel', 'reservas surf', 'maikekai contacto', 'playa hermosa hotel'],
    type: 'website' as const,
  },
}

// Función helper para generar URLs canónicas
export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = defaultSEO.siteUrl
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

// Función helper para generar imágenes Open Graph
export function getOGImageUrl(title: string, description?: string): string {
  const params = new URLSearchParams({
    title: title,
    description: description || '',
    site: defaultSEO.siteName,
  })
  return `${defaultSEO.siteUrl}/api/og?${params.toString()}`
}
