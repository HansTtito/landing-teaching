'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { 
  User, 
  Star, 
  Eye, 
  MessageCircle, 
  Edit, 
  LogOut,
  Loader2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  Settings,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react'
import { MATERIAS, REGIONES } from '@/types'
import type { Profesor } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profesor, setProfesor] = useState<Profesor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        // Verificar sesión
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        
        if (!currentUser) {
          router.push('/login')
          return
        }
        
        setUser(currentUser)

        // Cargar perfil de profesor
        const { data: profesorData, error } = await supabase
          .from('profesores')
          .select('*')
          .eq('user_id', currentUser.id)
          .single()

        if (error) {
          console.log('No es profesor o no tiene perfil:', error)
          // Si no tiene perfil de profesor, podría ser apoderado
        } else {
          setProfesor(profesorData as Profesor)
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const copyProfileLink = () => {
    if (profesor) {
      const link = `${window.location.origin}/profesor/${profesor.id}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null // Redirect handled in useEffect
  }

  // Si no es profesor, mostrar dashboard de apoderado
  if (!profesor) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Hola, {user.user_metadata?.nombre || 'Usuario'}!
            </h1>
            <p className="text-gray-600 mb-6">
              Tu cuenta está activa. Puedes buscar profesores y contactarlos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profesores" className="btn btn-primary">
                Buscar Profesores
              </Link>
              <Link href="/registro-profesor" className="btn btn-secondary">
                Quiero ser Profesor
              </Link>
            </div>

            <hr className="my-8" />

            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard de Profesor
  const profileLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/profesor/${profesor.id}`
  const materiasLabels = profesor.materias.map(m => 
    MATERIAS.find(mat => mat.value === m)?.label || m
  ).join(', ')

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Panel</h1>
            <p className="text-gray-600">Administra tu perfil de profesor</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href={`/profesor/${profesor.id}`}
              target="_blank"
              className="btn btn-secondary text-sm"
            >
              <Eye className="w-4 h-4" />
              Ver mi perfil público
            </Link>
            <button 
              onClick={handleLogout}
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>

        {/* Status Banner */}
        {!profesor.verificado && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Perfil pendiente de verificación</p>
              <p className="text-sm text-yellow-700">
                Tu perfil está visible pero no tiene la insignia de verificado. 
                Esto puede tardar hasta 24 horas.
              </p>
            </div>
          </div>
        )}

        {profesor.verificado && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-medium text-green-800">
              ¡Tu perfil está verificado y visible para todos los apoderados!
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-primary-500" />
              <span className="text-xs text-green-600 font-medium">+12%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-sm text-gray-500">Visitas al perfil</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <MessageCircle className="w-8 h-8 text-green-500" />
              <span className="text-xs text-green-600 font-medium">Nuevo</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-sm text-gray-500">Contactos WhatsApp</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profesor.rating.toFixed(1)}</p>
            <p className="text-sm text-gray-500">{profesor.total_resenas} reseñas</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${profesor.precio_hora.toLocaleString('es-CL')}
            </p>
            <p className="text-sm text-gray-500">Precio por hora</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mi Perfil</h2>
                <Link 
                  href="/dashboard/editar"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={profesor.foto_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'}
                    alt={profesor.nombre}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nombre</p>
                    <p className="font-semibold text-gray-900">{profesor.nombre} {profesor.apellido}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Título</p>
                    <p className="font-semibold text-gray-900">{profesor.titulo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Universidad</p>
                    <p className="font-semibold text-gray-900">{profesor.universidad}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Materias</p>
                    <p className="font-semibold text-gray-900">{materiasLabels}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-semibold text-gray-900">{profesor.comuna}, {profesor.region}</p>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              <div>
                <p className="text-sm text-gray-500 mb-2">Descripción</p>
                <p className="text-gray-700 whitespace-pre-line">{profesor.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Profile */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Comparte tu perfil</h3>
              <p className="text-sm text-gray-600 mb-4">
                Comparte este link con tus conocidos para que vean tu perfil:
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={profileLink}
                  className="input text-sm flex-1"
                />
                <button 
                  onClick={copyProfileLink}
                  className="btn btn-primary px-3"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-2">¡Link copiado!</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-2">
                <Link 
                  href="/dashboard/editar"
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Editar perfil</span>
                </Link>
                <Link 
                  href={`/profesor/${profesor.id}`}
                  target="_blank"
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Ver perfil público</span>
                </Link>
                <Link 
                  href="/dashboard/configuracion"
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Configuración</span>
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-primary-50 rounded-2xl p-6">
              <h3 className="font-bold text-primary-900 mb-3">Tips para más alumnos</h3>
              <ul className="space-y-2 text-sm text-primary-800">
                <li>• Completa tu descripción con detalles</li>
                <li>• Sube una foto profesional</li>
                <li>• Responde rápido por WhatsApp</li>
                <li>• Pide reseñas a tus alumnos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
