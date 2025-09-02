# Maikekai Surf - Costa Rica Surf Resort Website

A modern, responsive website for Maikekai Surf Hotel in Costa Rica, built with Next.js, TypeScript, TailwindCSS, and Supabase.

## 🌊 Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Multi-language Support**: English, Spanish, French, and German
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Surf Packages**: Interactive booking system for surf lessons
- **Reviews Integration**: Display reviews from multiple platforms
- **Direct Booking Links**: Integration with Booking.com, Airbnb, and Hostelworld
- **WhatsApp Integration**: Direct contact via WhatsApp
- **Admin Panel**: Management system for packages and bookings

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Next.js Image Optimization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/maikekai-surf.git
   cd maikekai-surf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   
   # Contact Information
   NEXT_PUBLIC_CONTACT_PHONE=+50612345678
   NEXT_PUBLIC_CONTACT_EMAIL=info@maikekaisurf.com
   NEXT_PUBLIC_WHATSAPP_NUMBER=+50612345678
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL migrations (see `supabase/migrations/`)
   - Update the environment variables with your Supabase credentials

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── BookingButtons.tsx # Booking platform links
│   ├── Features.tsx    # Features section
│   ├── SurfPackages.tsx # Surf packages
│   ├── Reviews.tsx     # Customer reviews
│   └── Footer.tsx      # Footer
├── lib/               # Utility libraries
│   └── supabase.ts    # Supabase client
├── types/             # TypeScript types
│   └── index.ts       # Type definitions
├── hooks/             # Custom React hooks
└── utils/             # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#55ACD8`
- **Light Blue**: `#EEF4FF`
- **Dark Blue**: `#2B96CB`
- **Navy**: `#0E3244`
- **Sand**: `#FFDA78`

### Typography
- **Serif**: Roboto Slab (headings)
- **Sans**: Work Sans (body text)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Configuration

### Supabase Setup

1. Create tables for:
   - `users` - User accounts and roles
   - `surf_packages` - Surf lesson packages
   - `bookings` - Customer bookings
   - `reviews` - Customer reviews

2. Set up Row Level Security (RLS) policies

3. Configure authentication providers

### SEO Configuration

Update the metadata in `src/app/layout.tsx`:
- Site title and description
- Open Graph tags
- Twitter Card tags
- Schema.org structured data

### Booking Platform Links

Update the booking URLs in `src/components/BookingButtons.tsx`:
- Booking.com
- Airbnb
- Hostelworld

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic with Next.js

## 🔒 Security

- Environment variables for sensitive data
- Supabase Row Level Security
- Input validation and sanitization
- HTTPS enforcement in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, email info@maikekaisurf.com or create an issue in this repository.

## 🏄‍♂️ About Maikekai Surf

Maikekai Surf is a premier surf resort located in Playa Hermosa, Guanacaste, Costa Rica. We offer world-class surf lessons, comfortable beachfront accommodation, and the authentic Pura Vida lifestyle.

---

Built with ❤️ for the surf community
