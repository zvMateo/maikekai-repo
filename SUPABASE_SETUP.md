# 🏄‍♂️ Supabase Integration Setup Guide

## 📋 Overview

This guide will help you set up the complete Supabase integration for Maikekai Surf, including:
- Real-time data for surf packages
- Google Reviews integration
- User authentication and profiles
- Booking system

## 🚀 Quick Start

### 1. Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Project Settings > API
3. **Copy the example environment file**:
   ```bash
   cp env.clerk.example .env.local
   ```

4. **Add your Supabase credentials** to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### 2. Database Schema

The database schema is already defined in `src/lib/supabase.ts`. Your Supabase project should have these tables:

- `profiles` - User profiles
- `surf_plans` - Surf packages
- `reviews` - Customer reviews
- `bookings` - Booking records
- `cart_items` - Shopping cart items

### 3. Seed the Database

Run the seed script to populate your database with sample data:

```bash
# Install tsx if you haven't already
npm install -g tsx

# Run the seed script
npx tsx scripts/seed-database.ts
```

### 4. Google Reviews Setup

1. **Enable Google Places API** in [Google Cloud Console](https://console.cloud.google.com)
2. **Get your API key** from APIs & Services > Credentials
3. **Find your Google Place ID**:
   - Go to [Google Places ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for "Maikekai Surf" or your business name
   - Copy the Place ID

4. **Add to your environment**:
   ```env
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   NEXT_PUBLIC_GOOGLE_PLACE_ID=your_google_place_id
   ```

## 🔧 Configuration Details

### Supabase RLS (Row Level Security)

Make sure to enable RLS policies for your tables:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE surf_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Public read access for surf_plans
CREATE POLICY "Public surf_plans read access" ON surf_plans
  FOR SELECT USING (is_active = true);

-- Public read access for reviews
CREATE POLICY "Public reviews read access" ON reviews
  FOR SELECT USING (is_public = true);

-- User-specific access for bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Google Places API Configuration

1. **Enable the following APIs**:
   - Places API
   - Places API (New)
   - Maps JavaScript API

2. **Set up API restrictions** (recommended):
   - HTTP referrers: `localhost:3000/*`, `yourdomain.com/*`
   - Or IP addresses for server-side calls

## 📊 Data Structure

### Surf Plans
```typescript
interface SurfPlan {
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
```

### Reviews
```typescript
interface Review {
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
```

## 🧪 Testing the Integration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Check the console** for any errors
3. **Visit the packages section** - should show loading state then data
4. **Visit the reviews section** - should show Google reviews and Supabase reviews

## 🔍 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check your `.env.local` file
   - Make sure variable names match exactly

2. **"Failed to fetch Google reviews"**
   - Verify your Google Places API key
   - Check that the Place ID is correct
   - Ensure the API is enabled

3. **"Error loading packages"**
   - Check your Supabase connection
   - Verify the database schema matches
   - Run the seed script

4. **CORS errors with Google API**
   - Make sure you're calling the API from your backend (API route)
   - Check your API key restrictions

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 📈 Next Steps

Once the basic integration is working:

1. **Add real Google Reviews** - The system will automatically fetch and display them
2. **Implement booking functionality** - Connect to payment systems
3. **Add admin panel** - For managing packages and reviews
4. **Set up real-time updates** - Using Supabase subscriptions

## 🆘 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Test the API endpoints directly
4. Check Supabase logs in the dashboard

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

