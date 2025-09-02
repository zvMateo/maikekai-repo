import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { clerkConfigCustom } from '@/lib/clerk'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Maikekai Surf - Costa Rica Surf Resort & Hotel',
  description: 'Experience the ultimate surf adventure at Maikekai Surf Hotel in Costa Rica. Book your surf lessons, accommodation, and immerse yourself in the Pura Vida lifestyle.',
  keywords: 'surf hotel, costa rica, surf lessons, surf resort, maikekai, pura vida, surf accommodation',
  authors: [{ name: 'Maikekai Surf' }],
  creator: 'Maikekai Surf',
  publisher: 'Maikekai Surf',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://maikekaisurf.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'es': '/es',
      'fr': '/fr',
      'de': '/de',
    },
  },
  openGraph: {
    title: 'Maikekai Surf - Costa Rica Surf Resort & Hotel',
    description: 'Experience the ultimate surf adventure at Maikekai Surf Hotel in Costa Rica. Book your surf lessons, accommodation, and immerse yourself in the Pura Vida lifestyle.',
    url: 'https://maikekaisurf.com',
    siteName: 'Maikekai Surf',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Maikekai Surf Hotel - Costa Rica',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maikekai Surf - Costa Rica Surf Resort & Hotel',
    description: 'Experience the ultimate surf adventure at Maikekai Surf Hotel in Costa Rica.',
    images: ['/images/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={clerkConfigCustom.appearance}>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#55ACD8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Schema.org structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Hotel",
                "name": "Maikekai Surf",
                "description": "Surf resort and hotel in Costa Rica offering surf lessons and accommodation",
                "url": "https://maikekaisurf.com",
                "telephone": "+506-1234-5678",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Playa Hermosa",
                  "addressLocality": "Guanacaste",
                  "addressRegion": "Costa Rica",
                  "postalCode": "50101",
                  "addressCountry": "CR"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "10.4631",
                  "longitude": "-85.6667"
                },
                "amenityFeature": [
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Surf Lessons",
                    "value": true
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Beach Access",
                    "value": true
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Restaurant",
                    "value": true
                  }
                ],
                "image": [
                  "https://maikekaisurf.com/images/hotel-exterior.jpg",
                  "https://maikekaisurf.com/images/surf-lessons.jpg",
                  "https://maikekaisurf.com/images/beach-view.jpg"
                ],
                "priceRange": "$$",
                "starRating": {
                  "@type": "Rating",
                  "ratingValue": "4.5",
                  "bestRating": "5"
                }
              })
            }}
          />
        </head>
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
