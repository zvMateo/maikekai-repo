'use client'

import Head from 'next/head'
import { SEOConfig } from '@/lib/seo'

interface MetaTagsProps {
  config: SEOConfig
}

export function MetaTags({ config }: MetaTagsProps) {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
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

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="es" />
      <meta name="revisit-after" content="1 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="geo.region" content="CR" />
      <meta name="geo.placename" content="Playa Hermosa, Costa Rica" />
      <meta name="geo.position" content="9.7489;-84.7534" />
      <meta name="ICBM" content="9.7489, -84.7534" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Maikekai Surf Hotel" />
      <meta property="og:locale" content="es_CR" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@maikekaisurf" />
      <meta name="twitter:creator" content="@maikekaisurf" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#55ACD8" />
      <meta name="msapplication-TileColor" content="#55ACD8" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Maikekai Surf" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Alternate Language Versions */}
      <link rel="alternate" hrefLang="es-cr" href={url} />
      <link rel="alternate" hrefLang="en-us" href={`${url}/en`} />
      <link rel="alternate" hrefLang="es-es" href={`${url}/es`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Head>
  )
}
