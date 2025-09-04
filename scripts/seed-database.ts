// Script to seed the database with sample data
// Run with: npx tsx scripts/seed-database.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const sampleSurfPlans = [
  {
    name: 'Pura Vida Beginner',
    description: 'Perfect for first-time surfers. Learn the basics in a safe, supportive environment with our certified instructors.',
    level: 'beginner',
    duration_days: 3,
    duration_nights: 2,
    price: 450,
    original_price: 550,
    max_participants: 4,
    features: [
      '3 days of surf lessons (2 hours each)',
      'ISA certified instructor',
      'Premium surfboard & wetsuit rental',
      'Beachfront accommodation',
      'Daily breakfast & lunch',
      'Transport to Playa Hermosa',
      'Safety briefing & ocean awareness',
      'Surf theory basics',
      'Free WiFi & equipment storage'
    ],
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    name: 'Costa Rica Intermediate',
    description: 'Take your surfing to the next level with advanced techniques, video analysis, and challenging waves.',
    level: 'intermediate',
    duration_days: 5,
    duration_nights: 4,
    price: 750,
    original_price: 900,
    max_participants: 3,
    features: [
      '5 days of surf lessons (3 hours each)',
      'Advanced technique training',
      'Video analysis sessions',
      'Premium surfboard selection',
      'Oceanfront accommodation',
      'All meals included',
      'Transport to multiple surf spots',
      'Professional surf photography',
      'Surf fitness training',
      'Wave reading techniques'
    ],
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    name: 'Elite Advanced Pro',
    description: 'For experienced surfers looking to master big waves, perfect their style, and explore exclusive breaks.',
    level: 'advanced',
    duration_days: 7,
    duration_nights: 6,
    price: 1200,
    original_price: 1500,
    max_participants: 2,
    features: [
      '7 days of advanced coaching (4 hours each)',
      'Big wave training & safety',
      'Personal video analysis',
      'Professional surfboard collection',
      'Luxury beachfront accommodation',
      'Gourmet meals & local cuisine',
      'Exclusive surf spot access',
      'Professional photography package',
      'Surf theory & oceanography',
      'Competition preparation',
      'Personalized training plan'
    ],
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    name: 'Weekend Warrior',
    description: 'Perfect for busy professionals. Intensive weekend surf experience with maximum learning in minimal time.',
    level: 'beginner',
    duration_days: 2,
    duration_nights: 1,
    price: 280,
    original_price: 350,
    max_participants: 6,
    features: [
      '2 days of intensive surf lessons',
      'Quick start program',
      'Basic equipment included',
      'Shared accommodation',
      'Breakfast included',
      'Transport to beach',
      'Safety essentials',
      'Take-home surf guide'
    ],
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    is_active: true
  }
]

const sampleReviews = [
  {
    user_id: '00000000-0000-0000-0000-000000000001', // Placeholder user ID
    rating: 5,
    title: 'Amazing experience!',
    comment: 'Pura vida! The instructors were incredible. I caught my first wave in 3 days. This place changed my life.',
    is_verified: true,
    is_public: true,
    google_review_id: 'google_review_1'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000002',
    rating: 5,
    title: 'Perfect waves and vibes',
    comment: 'Perfect waves, perfect instructors, perfect vibes. Will definitely be back next season!',
    is_verified: true,
    is_public: true,
    google_review_id: 'google_review_2'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000003',
    rating: 5,
    title: 'Great for beginners',
    comment: 'As a beginner, I was nervous but the team made me feel so comfortable. The beachfront location is stunning!',
    is_verified: true,
    is_public: true,
    google_review_id: 'google_review_3'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000004',
    rating: 5,
    title: 'Professional operation',
    comment: 'Professional operation from start to finish. ISA certified instructors and top quality equipment.',
    is_verified: true,
    is_public: true,
    google_review_id: 'google_review_4'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000005',
    rating: 5,
    title: 'Advanced coaching was perfect',
    comment: 'The advanced coaching was exactly what I needed. Big wave training and video analysis helped me improve so much.',
    is_verified: true,
    is_public: true,
    google_review_id: 'google_review_5'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000006',
    rating: 5,
    title: 'Great value!',
    comment: 'Great value! Everything included - accommodation, meals, transport, equipment. Perfect for year-round surfing.',
    is_verified: true,
    is_public: true,
    google_review_id: 'google_review_6'
  }
]

async function seedDatabase() {
  try {
    console.log('🌊 Seeding Maikekai Surf database...')

    // Clear existing data
    console.log('Clearing existing data...')
    await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('surf_plans').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // Insert surf plans
    console.log('Inserting surf plans...')
    const { data: plans, error: plansError } = await supabase
      .from('surf_plans')
      .insert(sampleSurfPlans)
      .select()

    if (plansError) {
      throw plansError
    }

    console.log(`✅ Inserted ${plans?.length || 0} surf plans`)

    // Insert reviews
    console.log('Inserting reviews...')
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .insert(sampleReviews)
      .select()

    if (reviewsError) {
      throw reviewsError
    }

    console.log(`✅ Inserted ${reviews?.length || 0} reviews`)

    console.log('🎉 Database seeded successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

