import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types matching your existing schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name?: string
          avatar_url?: string
          role: 'customer' | 'admin'
          phone?: string
          country?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string
          avatar_url?: string
          role?: 'customer' | 'admin'
          phone?: string
          country?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string
          role?: 'customer' | 'admin'
          phone?: string
          country?: string
          created_at?: string
          updated_at?: string
        }
      }
      surf_plans: {
        Row: {
          id: string
          name: string
          description?: string
          level: 'beginner' | 'intermediate' | 'advanced'
          duration_days: number
          duration_nights: number
          price: number
          original_price?: number
          max_participants: number
          features: string[]
          image_url?: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          level: 'beginner' | 'intermediate' | 'advanced'
          duration_days: number
          duration_nights: number
          price: number
          original_price?: number
          max_participants?: number
          features?: string[]
          image_url?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          duration_days?: number
          duration_nights?: number
          price?: number
          original_price?: number
          max_participants?: number
          features?: string[]
          image_url?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          start_date: string
          end_date: string
          participants: number
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string
          contact_info?: any
          payment_info?: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          start_date: string
          end_date: string
          participants?: number
          total_price: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string
          contact_info?: any
          payment_info?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          start_date?: string
          end_date?: string
          participants?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string
          contact_info?: any
          payment_info?: any
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          start_date: string
          participants: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          start_date: string
          participants?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          start_date?: string
          participants?: number
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          booking_id?: string
          rating: number
          title?: string
          comment: string
          is_verified: boolean
          is_public: boolean
          google_review_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          booking_id?: string
          rating: number
          title?: string
          comment: string
          is_verified?: boolean
          is_public?: boolean
          google_review_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          booking_id?: string
          rating?: number
          title?: string
          comment?: string
          is_verified?: boolean
          is_public?: boolean
          google_review_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
