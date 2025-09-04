import { supabase } from '@/lib/supabase'
import { SurfPlan, Review, Booking, Profile, ApiResponse } from '@/types'

// Surf Plans Service
export const surfPlansService = {
  // Get all active surf plans
  async getAll(): Promise<ApiResponse<SurfPlan[]>> {
    try {
      const { data, error } = await supabase
        .from('surf_plans')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Get surf plan by ID
  async getById(id: string): Promise<ApiResponse<SurfPlan>> {
    try {
      const { data, error } = await supabase
        .from('surf_plans')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Get surf plans by level
  async getByLevel(level: string): Promise<ApiResponse<SurfPlan[]>> {
    try {
      const { data, error } = await supabase
        .from('surf_plans')
        .select('*')
        .eq('is_active', true)
        .eq('level', level)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Reviews Service
export const reviewsService = {
  // Get all public reviews
  async getAll(): Promise<ApiResponse<Review[]>> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profile:profiles(full_name, avatar_url, country)
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Get reviews by rating
  async getByRating(rating: number): Promise<ApiResponse<Review[]>> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profile:profiles(full_name, avatar_url, country)
        `)
        .eq('is_public', true)
        .eq('rating', rating)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Get Google reviews (reviews with google_review_id)
  async getGoogleReviews(): Promise<ApiResponse<Review[]>> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profile:profiles(full_name, avatar_url, country)
        `)
        .eq('is_public', true)
        .not('google_review_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Get average rating
  async getAverageRating(): Promise<ApiResponse<number>> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('is_public', true)

      if (error) throw error

      if (!data || data.length === 0) {
        return { data: 0, error: null }
      }

      const average = data.reduce((sum, review) => sum + review.rating, 0) / data.length
      return { data: Math.round(average * 10) / 10, error: null }
    } catch (error) {
      return { data: 0, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Get total review count
  async getTotalCount(): Promise<ApiResponse<number>> {
    try {
      const { count, error } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('is_public', true)

      if (error) throw error

      return { data: count || 0, error: null }
    } catch (error) {
      return { data: 0, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Bookings Service
export const bookingsService = {
  // Create a new booking
  async create(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Booking>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select(`
          *,
          profile:profiles(full_name, email, phone),
          surf_plan:surf_plans(name, price, duration_days)
        `)
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Get bookings by user
  async getByUser(userId: string): Promise<ApiResponse<Booking[]>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profile:profiles(full_name, email, phone),
          surf_plan:surf_plans(name, price, duration_days, image_url)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Update booking status
  async updateStatus(id: string, status: string): Promise<ApiResponse<Booking>> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(`
          *,
          profile:profiles(full_name, email, phone),
          surf_plan:surf_plans(name, price, duration_days)
        `)
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Profiles Service
export const profilesService = {
  // Get profile by ID
  async getById(id: string): Promise<ApiResponse<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Update profile
  async update(id: string, updates: Partial<Profile>): Promise<ApiResponse<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*')
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

