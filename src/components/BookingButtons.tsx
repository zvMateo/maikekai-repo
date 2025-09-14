'use client'

import { ExternalLink, MessageCircle, Calendar, Home, Globe } from 'lucide-react'

const BookingButtons = () => {
  const bookingPlatforms = [
    {
      name: 'Booking.com',
      icon: Calendar,
      url: 'https://www.booking.com/hotel/cr/maikekai-surf.html',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Best rates guaranteed'
    },
    {
      name: 'Airbnb',
      icon: Home,
      url: 'https://www.airbnb.com/rooms/maikekai-surf',
      color: 'bg-pink-600 hover:bg-pink-700',
      description: 'Unique stays'
    },
    {
      name: 'Hostelworld',
      icon: Globe,
      url: 'https://www.hostelworld.com/hostels/maikekai-surf',
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Budget-friendly'
    }
  ]

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in booking a surf package at Maikekai Surf. Can you help me with more information?")
    const phone = '+50612345678'
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-surf-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-surf-navy mb-4">
            Book Your Perfect Stay
          </h2>
          <p className="text-lg text-surf-blue max-w-2xl mx-auto">
            Choose your preferred booking platform or contact us directly for personalized assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Booking Platforms */}
          {bookingPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${platform.color} text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl group animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center space-y-4">
                <platform.icon size={32} className="group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">{platform.name}</h3>
                  <p className="text-sm opacity-90">{platform.description}</p>
                </div>
                <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}

          {/* WhatsApp Direct Contact */}
          <button
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl group animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex flex-col items-center space-y-4">
              <MessageCircle size={32} className="group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-lg font-semibold mb-1">WhatsApp</h3>
                <p className="text-sm opacity-90">Direct contact</p>
              </div>
              <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-surf-blue/10">
            <h3 className="text-xl font-serif font-bold text-surf-navy mb-4">
              Why Book Direct?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-surf-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-surf-blue font-bold text-lg">✓</span>
                </div>
                <span className="font-medium text-surf-navy">Best Price Guarantee</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-surf-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-surf-blue font-bold text-lg">✓</span>
                </div>
                <span className="font-medium text-surf-navy">Free Cancellation</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-surf-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-surf-blue font-bold text-lg">✓</span>
                </div>
                <span className="font-medium text-surf-navy">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingButtons
