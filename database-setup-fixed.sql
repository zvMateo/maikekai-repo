-- Database setup for Maikekai Surf Hotel (Fixed Version)
-- Run this script in your Supabase SQL Editor

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_surf_packages_updated_at ON public.surf_packages;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    avatar TEXT,
    phone TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create surf_packages table
CREATE TABLE IF NOT EXISTS public.surf_packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL, -- days
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    includes TEXT[] NOT NULL,
    image TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
    max_students INTEGER DEFAULT 6,
    equipment BOOLEAN DEFAULT true,
    accommodation BOOLEAN DEFAULT true,
    meals BOOLEAN DEFAULT false,
    transport BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    package_id UUID REFERENCES public.surf_packages(id) ON DELETE CASCADE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    guests INTEGER DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    special_requests TEXT,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    date DATE NOT NULL,
    source TEXT CHECK (source IN ('google', 'booking', 'airbnb', 'hostelworld', 'website')) NOT NULL,
    verified BOOLEAN DEFAULT false,
    avatar TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_surf_packages_updated_at BEFORE UPDATE ON public.surf_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surf_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Anyone can view active surf packages" ON public.surf_packages;
DROP POLICY IF EXISTS "Admins can manage surf packages" ON public.surf_packages;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can manage all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can view active reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;

-- Create RLS policies

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Surf packages policies (public read, admin write)
CREATE POLICY "Anyone can view active surf packages" ON public.surf_packages
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage surf packages" ON public.surf_packages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own bookings" ON public.bookings
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own bookings" ON public.bookings
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all bookings" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all bookings" ON public.bookings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Reviews policies (public read, admin write)
CREATE POLICY "Anyone can view active reviews" ON public.reviews
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage reviews" ON public.reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Insert sample data (only if tables are empty)
INSERT INTO public.surf_packages (name, description, duration, price, includes, image, difficulty, max_students, equipment, accommodation, meals, transport)
SELECT * FROM (VALUES
    (
        'Beginner Surf Package',
        'Perfect for first-time surfers. Learn the basics in a safe, supportive environment with our expert instructors.',
        3,
        299.00,
        ARRAY['Surf lessons', 'Equipment rental', 'Accommodation', 'Breakfast', 'Transport to beach'],
        'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
        'beginner',
        4,
        true,
        true,
        true,
        true
    ),
    (
        'Intermediate Surf Package',
        'Take your surfing to the next level with advanced techniques and challenging waves.',
        5,
        499.00,
        ARRAY['Advanced surf lessons', 'Premium equipment', 'Accommodation', 'All meals', 'Transport', 'Video analysis'],
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'intermediate',
        3,
        true,
        true,
        true,
        true
    ),
    (
        'Advanced Surf Package',
        'For experienced surfers looking to master big waves and perfect their technique.',
        7,
        799.00,
        ARRAY['Expert coaching', 'Premium equipment', 'Luxury accommodation', 'All meals', 'Transport', 'Video analysis', 'Photography'],
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'advanced',
        2,
        true,
        true,
        true,
        true
    )
) AS v(name, description, duration, price, includes, image, difficulty, max_students, equipment, accommodation, meals, transport)
WHERE NOT EXISTS (SELECT 1 FROM public.surf_packages);

-- Insert sample reviews (only if table is empty)
INSERT INTO public.reviews (author, rating, comment, date, source, verified, avatar)
SELECT * FROM (VALUES
    (
        'Sarah Johnson',
        5,
        'Amazing experience! The instructors were professional and patient. The waves were perfect for learning. Highly recommend!',
        '2024-01-15',
        'google',
        true,
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    ),
    (
        'Mike Chen',
        5,
        'Best surf vacation ever! The accommodation was comfortable and the food was delicious. Will definitely come back!',
        '2024-01-10',
        'booking',
        true,
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    ),
    (
        'Emma Rodriguez',
        4,
        'Great location and friendly staff. The surf lessons were well-structured and I learned a lot in just a few days.',
        '2024-01-08',
        'airbnb',
        true,
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    ),
    (
        'David Thompson',
        5,
        'Incredible surf spot! The instructors really know their stuff and the equipment is top quality. Pura vida!',
        '2024-01-05',
        'hostelworld',
        true,
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    ),
    (
        'Lisa Wang',
        4,
        'Beautiful location and excellent service. The surf package was well worth the price. Highly recommend for beginners!',
        '2024-01-03',
        'google',
        true,
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
    )
) AS v(author, rating, comment, date, source, verified, avatar)
WHERE NOT EXISTS (SELECT 1 FROM public.reviews);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role, phone, country)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
        NEW.raw_user_meta_data->>'phone',
        NEW.raw_user_meta_data->>'country'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
