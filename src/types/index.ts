// Database types matching your Supabase schema

export type UserRole = 'customer' | 'admin'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type SurfLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: UserRole
  phone?: string
  country?: string
  created_at: string
  updated_at: string
}

export interface SurfPlan {
  id: string
  name: string
  description?: string
  level: SurfLevel
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

export interface Booking {
  id: string
  user_id: string
  plan_id: string
  start_date: string
  end_date: string
  participants: number
  total_price: number
  status: BookingStatus
  special_requests?: string
  contact_info?: any
  payment_info?: any
  created_at: string
  updated_at: string
  // Relations
  profile?: Profile
  surf_plan?: SurfPlan
}

export interface CartItem {
  id: string
  user_id: string
  plan_id: string
  start_date: string
  participants: number
  created_at: string
  // Relations
  surf_plan?: SurfPlan
}

export interface Review {
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
  // Relations
  profile?: Profile
  booking?: Booking
}

// Legacy types for backward compatibility
export interface SurfPackage extends SurfPlan {}
export interface User extends Profile {}

// Form types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

// Cart context types
export interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id' | 'created_at'>) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
