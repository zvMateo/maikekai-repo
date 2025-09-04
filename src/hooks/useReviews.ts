import { useState, useEffect } from 'react'
import { reviewsService } from '@/services/supabase'
import { googleReviewsService } from '@/services/googleReviews'
import { Review } from '@/types'

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [googleReviews, setGoogleReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [averageRating, setAverageRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch both Supabase reviews and Google reviews
        const [supabaseResult, googleResult] = await Promise.all([
          reviewsService.getAll(),
          fetchGoogleReviews()
        ])
        
        if (supabaseResult.error) {
          console.warn('Supabase reviews error:', supabaseResult.error)
        } else if (supabaseResult.data) {
          setReviews(supabaseResult.data)
        }
        
        if (googleResult.error) {
          console.warn('Google reviews error:', googleResult.error)
        } else if (googleResult.data) {
          setGoogleReviews(googleResult.data)
        }
        
        // Fetch average rating and total count
        const [avgResult, countResult] = await Promise.all([
          reviewsService.getAverageRating(),
          reviewsService.getTotalCount()
        ])
        
        if (avgResult.data !== null) {
          setAverageRating(avgResult.data)
        }
        
        if (countResult.data !== null) {
          setTotalReviews(countResult.data)
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const fetchGoogleReviews = async () => {
    try {
      // You'll need to replace this with your actual Google Place ID
      const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJ...' // Replace with actual place ID
      
      const { data, error } = await googleReviewsService.getReviews(placeId)
      
      if (error) {
        return { data: null, error }
      }
      
      if (data?.reviews) {
        const formattedReviews = data.reviews.map(review => 
          googleReviewsService.formatReviewForDisplay(review)
        )
        return { data: formattedReviews, error: null }
      }
      
      return { data: null, error: 'No reviews found' }
    } catch (err) {
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'Failed to fetch Google reviews' 
      }
    }
  }

  const getReviewsByRating = async (rating: number) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await reviewsService.getByRating(rating)
      
      if (error) {
        setError(error)
        return []
      }
      
      return data || []
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return []
    } finally {
      setLoading(false)
    }
  }

  // Combine Supabase and Google reviews for display
  const getAllReviews = () => {
    const combinedReviews = [
      ...reviews.map(review => ({
        ...review,
        is_google_review: false,
        name: review.profile?.full_name || 'Anonymous',
        country: review.profile?.country || 'Unknown',
        avatar: review.profile?.full_name?.charAt(0)?.toUpperCase() || 'A',
        date: new Date(review.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      })),
      ...googleReviews
    ]
    
    return combinedReviews.sort((a, b) => {
      // Sort by date, newest first
      const dateA = a.is_google_review ? new Date(a.time || 0) : new Date(a.created_at)
      const dateB = b.is_google_review ? new Date(b.time || 0) : new Date(b.created_at)
      return dateB.getTime() - dateA.getTime()
    })
  }

  return {
    reviews: getAllReviews(),
    supabaseReviews: reviews,
    googleReviews,
    loading,
    error,
    averageRating,
    totalReviews,
    getReviewsByRating,
    refetch: () => {
      setLoading(true)
      setError(null)
      // Re-fetch logic here
    }
  }
}

