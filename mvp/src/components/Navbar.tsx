'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { GraduationCap, Menu, X, User } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 text-xl font-bold ${
            isScrolled ? 'text-primary-600' : 'text-white'
          }`}>
            <GraduationCap className="w-8 h-8" />
            <span>ProfeChile</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/profesores" 
              className={`font-medium hover:text-primary-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Buscar Profesores
            </Link>
            <Link 
              href="/como-funciona" 
              className={`font-medium hover:text-primary-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Cómo Funciona
            </Link>
            <Link 
              href="/registro-profesor" 
              className={`font-medium hover:text-primary-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Soy Profesor
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/login"
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-primary-600 hover:bg-primary-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Iniciar Sesión
            </Link>
            <Link 
              href="/registro"
              className="btn btn-primary text-sm"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col gap-2 px-4">
              <Link 
                href="/profesores"
                className="py-2 text-gray-700 font-medium hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Buscar Profesores
              </Link>
              <Link 
                href="/como-funciona"
                className="py-2 text-gray-700 font-medium hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Cómo Funciona
              </Link>
              <Link 
                href="/registro-profesor"
                className="py-2 text-gray-700 font-medium hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Soy Profesor
              </Link>
              <hr className="my-2" />
              <Link 
                href="/login"
                className="py-2 text-gray-700 font-medium hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/registro"
                className="btn btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
