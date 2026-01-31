'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Check auth state
    async function checkUser() {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)
      setIsLoading(false)
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

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
              href="/#como-funciona" 
              className={`font-medium hover:text-primary-500 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Cómo Funciona
            </Link>
            {!user && (
              <Link 
                href="/registro-profesor" 
                className={`font-medium hover:text-primary-500 transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                Soy Profesor
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : user ? (
              // Usuario logueado
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard"
                  className={`px-4 py-2 font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    isScrolled 
                      ? 'text-primary-600 hover:bg-primary-50' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Mi Panel
                </Link>
                <button 
                  onClick={handleLogout}
                  className={`px-4 py-2 font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    isScrolled 
                      ? 'text-gray-600 hover:bg-gray-100' 
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Usuario no logueado
              <>
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
              </>
            )}
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
                href="/#como-funciona"
                className="py-2 text-gray-700 font-medium hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Cómo Funciona
              </Link>
              {!user && (
                <Link 
                  href="/registro-profesor"
                  className="py-2 text-gray-700 font-medium hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Soy Profesor
                </Link>
              )}
              <hr className="my-2" />
              {user ? (
                <>
                  <Link 
                    href="/dashboard"
                    className="py-2 text-gray-700 font-medium hover:text-primary-600 flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Mi Panel
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="py-2 text-red-600 font-medium hover:text-red-700 flex items-center gap-2 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
