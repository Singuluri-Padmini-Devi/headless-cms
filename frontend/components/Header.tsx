  'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { HeaderSettings } from '@/types/header'
import { Button } from './ui/Button'

interface HeaderProps {
  settings: HeaderSettings
}

export default function Header({ settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!settings.sticky) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [settings.sticky])

  const headerClasses = `
    w-full transition-all duration-300 z-50
    ${settings.sticky ? 'fixed top-0' : 'relative'}
    ${settings.transparent && !isScrolled 
      ? 'bg-transparent' 
      : 'bg-white shadow-sm border-b border-gray-100'
    }
    ${isScrolled ? 'backdrop-blur-md bg-white/95' : ''}
  `.trim()

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {settings.logo ? (
              <Link href="/" className="block">
                <Image
                  src={settings.logo.url}
                  alt={settings.logo.alt}
                  width={settings.logo.width}
                  height={settings.logo.height}
                  className="h-8 lg:h-10 w-auto"
                  priority
                />
              </Link>
            ) : (
              <Link href="/" className="text-xl font-bold text-gray-900">
                Your Site
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {settings.navigation.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                target={item.targetBlank ? '_blank' : undefined}
                rel={item.targetBlank ? 'noopener noreferrer' : undefined}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            {settings.ctaButton?.enabled && (
              <Button
                href={settings.ctaButton.url}
                variant={settings.ctaButton.style}
                className="hidden sm:inline-flex"
              >
                {settings.ctaButton.text}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {settings.navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  target={item.targetBlank ? '_blank' : undefined}
                  rel={item.targetBlank ? 'noopener noreferrer' : undefined}
                  className="text-gray-700 hover:text-gray-900 font-medium px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              {settings.ctaButton?.enabled && (
                <div className="pt-2">
                  <Button
                    href={settings.ctaButton.url}
                    variant={settings.ctaButton.style}
                    className="w-full justify-center"
                  >
                    {settings.ctaButton.text}
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}