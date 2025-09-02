'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    services: [
      { name: 'Surf Lessons', href: '#lessons' },
      { name: 'Accommodation', href: '#accommodation' },
      { name: 'Equipment Rental', href: '#equipment' },
      { name: 'Transportation', href: '#transport' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Safety', href: '#safety' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refunds' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/maikekaisurf' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/maikekaisurf' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/maikekaisurf' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/maikekaisurf' }
  ]

  return (
    <footer id="contact" className="bg-surf-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-surf-blue to-surf-dark rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold">Maikekai Surf</h3>
                    <p className="text-sm text-surf-light">Costa Rica</p>
                  </div>
                </div>
                
                <p className="text-surf-light mb-6 leading-relaxed">
                  Experience the ultimate surf adventure in the heart of Costa Rica. 
                  Our beachfront resort offers world-class surf lessons, comfortable accommodation, 
                  and the authentic Pura Vida lifestyle.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} className="text-surf-blue" />
                    <span className="text-sm text-surf-light">
                      Playa Hermosa, Guanacaste, Costa Rica
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-surf-blue" />
                    <a href="tel:+50612345678" className="text-sm text-surf-light hover:text-surf-blue transition-colors">
                      +506 1234-5678
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-surf-blue" />
                    <a href="mailto:info@maikekaisurf.com" className="text-sm text-surf-light hover:text-surf-blue transition-colors">
                      info@maikekaisurf.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe size={16} className="text-surf-blue" />
                    <a href="https://maikekaisurf.com" className="text-sm text-surf-light hover:text-surf-blue transition-colors">
                      www.maikekaisurf.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-surf-light hover:text-surf-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-surf-light hover:text-surf-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-surf-light hover:text-surf-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-surf-blue/20 py-8"
        >
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-sm text-surf-light mb-4">
              Subscribe to our newsletter for surf conditions, special offers, and Costa Rica travel tips.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 w-full px-4 py-2 rounded-lg bg-surf-blue/10 border border-surf-blue/20 text-white placeholder-surf-light focus:outline-none focus:ring-2 focus:ring-surf-blue"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-surf-blue/20 py-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-surf-light">
              © {currentYear} Maikekai Surf. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-surf-light hover:text-surf-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-surf-blue/10 rounded-full flex items-center justify-center text-surf-light hover:text-surf-blue hover:bg-surf-blue/20 transition-colors"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave Pattern */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-surf-blue/20 to-transparent"></div>
        <svg
          className="absolute bottom-0 w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-surf-blue"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-surf-blue"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-surf-blue"
          />
        </svg>
      </div>
    </footer>
  )
}

export default Footer
