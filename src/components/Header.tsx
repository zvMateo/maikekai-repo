'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe, User, LogOut, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('EN')
  const { user, isSignedIn } = useUser()

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
  ]

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Packages', href: '#packages' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-surf-blue-100/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-auto group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/Mai Ke Kai - Logotipo - Original.png"
                alt="Maikekai Surf Logo"
                width={100}
                height={40}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-surf-navy-700 hover:text-surf-blue-600 font-medium transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-surf-blue-50 text-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-logo-teal-500 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="hidden lg:block">
              <button
                onClick={() => setCurrentLanguage(currentLanguage === 'EN' ? 'ES' : 'EN')}
                className="flex items-center space-x-1 text-surf-navy-600 hover:text-surf-blue-600 transition-all duration-300 px-2 py-1.5 rounded-md hover:bg-surf-blue-50"
              >
                <Globe size={14} />
                <span className="text-xs font-medium">{currentLanguage}</span>
              </button>
            </div>

            {/* Auth Section */}
            {isSignedIn ? (
              <div className="flex items-center space-x-1">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-7 h-7",
                      userButtonPopoverCard: "shadow-2xl border-0",
                      userButtonPopoverActionButton: "hover:bg-surf-light text-surf-navy",
                      userButtonPopoverActionButtonText: "text-surf-navy font-medium",
                    }
                  }}
                />
                {user?.publicMetadata?.role === 'admin' && (
                  <Link href="/admin" className="flex items-center space-x-1 text-surf-navy-600 hover:text-surf-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-surf-blue-50">
                    <Settings size={14} />
                    <span className="hidden sm:block text-xs font-medium">Admin</span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <SignInButton mode="modal">
                  <button className="text-surf-navy-600 hover:text-surf-blue-600 font-medium transition-colors px-2 py-1.5 rounded-md hover:bg-surf-blue-50 text-xs">
                    Iniciar Sesión
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-logo-teal-500 hover:bg-logo-teal-600 text-white font-medium px-3 py-1.5 rounded-lg transition-all duration-300 text-xs shadow-md hover:shadow-lg">
                    Registrarse
                  </button>
                </SignUpButton>
              </div>
            )}


          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 text-surf-navy-700 hover:text-surf-blue-600 transition-all duration-300 rounded-md hover:bg-surf-blue-50"
          >
            {isMenuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-surf-blue-100/50 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-surf-navy-700 hover:text-surf-blue-600 font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-surf-blue-50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-surf-blue-100/50">
                {isSignedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-surf-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-surf-blue-500 to-surf-blue-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user?.firstName?.charAt(0)?.toUpperCase() || user?.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-surf-navy-700 text-sm">
                          {user?.fullName || user?.emailAddresses[0]?.emailAddress || 'Usuario'}
                        </p>
                        <p className="text-xs text-surf-blue-600">
                          {user?.publicMetadata?.role === 'admin' ? 'Administrador' : 'Cliente'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link href="/profile" className="flex items-center space-x-2 text-surf-navy-700 hover:text-surf-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-surf-blue-50 transition-all duration-300">
                        <User size={16} />
                        <span className="text-sm">Mi Perfil</span>
                      </Link>
                      {user?.publicMetadata?.role === 'admin' && (
                        <Link href="/admin" className="flex items-center space-x-2 text-surf-navy-700 hover:text-surf-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-surf-blue-50 transition-all duration-300">
                          <Settings size={16} />
                          <span className="text-sm">Administración</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <SignInButton mode="modal">
                      <button className="w-full text-left text-surf-navy-700 hover:text-surf-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-surf-blue-50 transition-all duration-300">
                        Iniciar Sesión
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full bg-logo-teal-500 hover:bg-logo-teal-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                        Registrarse
                      </button>
                    </SignUpButton>
                  </div>
                )}
              </div>
              
              {/* Mobile Language */}
              <div className="pt-4 border-t border-surf-blue-100/50">
                <button
                  onClick={() => setCurrentLanguage(currentLanguage === 'EN' ? 'ES' : 'EN')}
                  className="flex items-center space-x-1 text-surf-navy-700 hover:text-surf-blue-600 transition-all duration-300 px-2 py-1 rounded-md hover:bg-surf-blue-50"
                >
                  <Globe size={16} />
                  <span className="text-sm font-medium">{currentLanguage}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
