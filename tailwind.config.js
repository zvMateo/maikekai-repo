/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surf Blue Palette - Optimized for better contrast and accessibility
        'surf-blue': {
          50: '#F0F8FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#55ACD8', // Primary
          600: '#2B96CB',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        'surf-light': {
          50: '#F8FAFC',
          100: '#EEF4FF',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
        'surf-dark': {
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#2B96CB',
          600: '#1E40AF',
          700: '#1D4ED8',
          800: '#1E3A8A',
          900: '#0E3244',
        },
        'surf-navy': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0E3244', // Primary
        },
        'surf-sand': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FFDA78', // Primary
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Additional surf-inspired colors
        'wave-teal': '#14B8A6',
        'coral': '#F97316',
        'seafoam': '#10B981',
        // Logo color - extracted from Mai Ke Kai logo
        'logo-teal': {
          50: '#F0F7FA',
          100: '#D9E8F0',
          200: '#B3D1E1',
          300: '#8DBAD2',
          400: '#67A3C3',
          500: '#4D8CA8', // Main logo color - exact from logo
          600: '#3D7086',
          700: '#2E5464',
          800: '#1F3842',
          900: '#101C21',
        },
        // Legacy support
        primary: {
          50: '#EEF4FF',
          100: '#55ACD8',
          200: '#2B96CB',
          300: '#0E3244',
          400: '#FFDA78',
        },
        surf: {
          blue: '#55ACD8',
          light: '#EEF4FF',
          dark: '#2B96CB',
          navy: '#0E3244',
          sand: '#FFDA78',
        }
      },
      fontFamily: {
        'serif': ['Roboto Slab', 'serif'],
        'sans': ['Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'wave-pattern': "url('/images/wave-pattern.svg')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'surf-float': 'surf-float 8s ease-in-out infinite',
        'wave-roll': 'wave-roll 4s ease-in-out infinite',
        'bubble': 'bubble 3s ease-in-out infinite',
        'swim': 'swim 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        'surf-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        'wave-roll': {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(10px) rotate(2deg)' },
        },
        'bubble': {
          '0%': { transform: 'translateY(0px) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-15px) scale(1.1)', opacity: '1' },
          '100%': { transform: 'translateY(-30px) scale(0.9)', opacity: '0' },
        },
        'swim': {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(5px) translateY(-5px)' },
          '50%': { transform: 'translateX(0px) translateY(-10px)' },
          '75%': { transform: 'translateX(-5px) translateY(-5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(85, 172, 216, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(85, 172, 216, 0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
