import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { clerkConfigCustom } from '@/lib/clerk'
import { generateMetadata, seoConfigs } from '@/lib/seo'
import { HotelStructuredData } from '@/components/seo/StructuredData'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = generateMetadata(seoConfigs.home)

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
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://images.unsplash.com" />
          
          {/* DNS prefetch for performance */}
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        </head>
        <body className={`${inter.className} antialiased`}>
          <AnalyticsProvider>
            {children}
            <HotelStructuredData />
          </AnalyticsProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
