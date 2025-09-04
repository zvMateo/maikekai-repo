// Google Reviews Service
// This service handles fetching reviews from Google Places API

import { Review } from '@/types'

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface GoogleReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

export interface GooglePlaceDetails {
  place_id: string
  name: string
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
}

export const googleReviewsService = {
  // Fetch reviews from Google Places API
  async getReviews(placeId: string): Promise<ApiResponse<GooglePlaceDetails>> {
    try {
      // Note: In production, this should be called from your backend API
      // to keep the API key secure
      const response = await fetch(`/api/google-reviews?place_id=${placeId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to fetch Google reviews' 
      }
    }
  },

  // Transform Google review to our Review format
  transformGoogleReview(googleReview: GoogleReview, placeId: string): Omit<Review, 'id' | 'created_at' | 'updated_at'> {
    return {
      user_id: 'google-user', // Placeholder for Google reviews
      rating: googleReview.rating,
      title: googleReview.text.substring(0, 100) + (googleReview.text.length > 100 ? '...' : ''),
      comment: googleReview.text,
      is_verified: true, // Google reviews are verified
      is_public: true,
      google_review_id: googleReview.time.toString(),
      booking_id: undefined
    }
  },

  // Get formatted review data for display
  formatReviewForDisplay(googleReview: GoogleReview) {
    return {
      id: googleReview.time.toString(),
      name: googleReview.author_name,
      country: this.extractCountryFromLanguage(googleReview.language),
      comment: googleReview.text,
      date: this.formatRelativeTime(googleReview.relative_time_description),
      rating: googleReview.rating,
      avatar: googleReview.author_name.charAt(0).toUpperCase(),
      profile_photo_url: googleReview.profile_photo_url,
      is_google_review: true
    }
  },

  // Extract country from language code
  extractCountryFromLanguage(language: string): string {
    const languageMap: { [key: string]: string } = {
      'en': 'USA',
      'es': 'Costa Rica',
      'fr': 'France',
      'de': 'Germany',
      'it': 'Italy',
      'pt': 'Brazil',
      'nl': 'Netherlands',
      'sv': 'Sweden',
      'no': 'Norway',
      'da': 'Denmark',
      'fi': 'Finland',
      'pl': 'Poland',
      'ru': 'Russia',
      'ja': 'Japan',
      'ko': 'South Korea',
      'zh': 'China',
      'ar': 'Saudi Arabia',
      'hi': 'India',
      'th': 'Thailand',
      'vi': 'Vietnam',
      'id': 'Indonesia',
      'ms': 'Malaysia',
      'tl': 'Philippines'
    }
    
    return languageMap[language] || 'Unknown'
  },

  // Format relative time to readable date
  formatRelativeTime(relativeTime: string): string {
    const now = new Date()
    const timeMap: { [key: string]: number } = {
      'a minute ago': 1,
      'minutes ago': 5,
      'an hour ago': 60,
      'hours ago': 120,
      'a day ago': 1440,
      'days ago': 2880,
      'a week ago': 10080,
      'weeks ago': 20160,
      'a month ago': 43200,
      'months ago': 86400,
      'a year ago': 525600,
      'years ago': 1051200
    }

    // For now, return the relative time as is
    // In a real implementation, you'd convert this to actual dates
    return relativeTime
  }
}

// API Route for Google Reviews (to be created)
export const createGoogleReviewsAPI = (apiKey: string) => {
  return async (placeId: string): Promise<GooglePlaceDetails> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,user_ratings_total,reviews&key=${apiKey}`
    )
    
    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`)
    }
    
    return data.result
  }
}

