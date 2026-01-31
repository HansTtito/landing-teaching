'use client'

import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { mockProfesores } from '@/lib/mockData'
import { 
  Star, 
  Video, 
  MapPin, 
  CheckCircle, 
  MessageCircle,
  GraduationCap,
  Clock,
  Award,
  ArrowLeft,
  Loader2,
  Calendar,
  Users
} from 'lucide-react'
import { MATERIAS, REGIONES } from '@/types'
import type { Profesor } from '@/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProfesorPage({ params }: PageProps) {
  const { id } = use(params)
  const [profesor, setProfesor] = useState<Profesor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [resenas, setResenas] = useState<any[]>([])

  useEffect(() => {
    async function loadProfesor() {
      try {
        // Intentar cargar de Supabase
        const { data, error } = await supabase
          .from('profesores')
          .select('*')
          .eq('id', id)
          .eq('activo', true)
          .single()

        if (error || !data) {
          // Si no encuentra en DB, buscar en mock data
          const mockProf = mockProfesores.find(p => p.id === id)
          setProfesor(mockProf || null)
        } else {
          setProfesor(data as Profesor)
          
          // Cargar reseñas
          const { data: resenasData } = await supabase
            .from('resenas')
            .select('*')
            .eq('profesor_id', id)
            .order('created_at', { ascending: false })
            .limit(5)
          
          if (resenasData) {
            setResenas(resenasData)
          }
        }
      } catch (err) {
        // Fallback a mock data
        const mockProf = mockProfesores.find(p => p.id === id)
        setProfesor(mockProf || null)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfesor()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (!profesor) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profesor no encontrado</h1>
          <p className="text-gray-600 mb-6">Este perfil no existe o ya no está disponible.</p>
          <Link href="/profesores" className="btn btn-primary">
            Ver todos los profesores
          </Link>
        </div>
      </div>
    )
  }

  const whatsappLink = `https://wa.me/56${profesor.telefono.replace(/\D/g, '')}?text=Hola ${profesor.nombre}, te encontré en ProfeChile y me gustaría consultar por clases de ${MATERIAS.find(m => m.value === profesor.materias[0])?.label || profesor.materias[0]}.`

  const materiasLabels = profesor.materias.map(m => 
    MATERIAS.find(mat => mat.value === m)?.label || m
  )

  const regionLabel = REGIONES.find(r => r.value === profesor.region)?.label || profesor.region

  // Reseñas de ejemplo si no hay reales
  const displayResenas = resenas.length > 0 ? resenas : [
    { id: 1, nombre_usuario: 'María F.', rating: 5, comentario: 'Excelente profesor/a, muy paciente y clara en sus explicaciones.', created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 2, nombre_usuario: 'Roberto D.', rating: 5, comentario: 'Muy recomendable. Domina la materia y sabe cómo enseñar.', created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 3, nombre_usuario: 'Carmen L.', rating: 4, comentario: 'Buenas clases, puntual y responsable.', created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() },
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
    return `Hace ${Math.floor(diffDays / 30)} meses`
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          href="/profesores"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a profesores
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative flex-shrink-0">
                  <Image
                    src={profesor.foto_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'}
                    alt={`${profesor.nombre} ${profesor.apellido}`}
                    width={180}
                    height={180}
                    className="rounded-2xl object-cover w-[180px] h-[180px]"
                  />
                  {profesor.verificado && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {profesor.nombre} {profesor.apellido}
                      </h1>
                      <p className="text-primary-600 font-semibold text-lg">
                        {profesor.titulo}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-xl flex-shrink-0">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-lg">{profesor.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm">({profesor.total_resenas})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      {profesor.universidad}
                    </span>
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {profesor.experiencia_anos} años exp.
                    </span>
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {profesor.comuna}, {regionLabel}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profesor.modalidad.includes('online') && (
                      <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Video className="w-4 h-4" /> Clases Online
                      </span>
                    )}
                    {profesor.modalidad.includes('presencial') && (
                      <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Presencial
                      </span>
                    )}
                    {profesor.verificado && (
                      <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Verificado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre mí</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {profesor.descripcion}
              </p>
            </div>

            {/* Materias y Niveles */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Materias que enseño</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {materiasLabels.map(materia => (
                  <span 
                    key={materia}
                    className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium"
                  >
                    {materia}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">Niveles</h3>
              <div className="flex flex-wrap gap-2">
                {profesor.niveles.map(nivel => (
                  <span 
                    key={nivel}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    {nivel === 'primaria' ? 'Primaria (1° a 6° básico)' : 
                     nivel === 'secundaria' ? 'Secundaria (7° básico a 4° medio)' : 
                     'Preparación PAES'}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Reseñas ({profesor.total_resenas || displayResenas.length})
              </h2>
              <div className="space-y-4">
                {displayResenas.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-primary-600">
                            {review.nombre_usuario[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.nombre_usuario}</p>
                          <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array(review.rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                        {Array(5 - review.rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gray-200" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comentario}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${profesor.precio_hora.toLocaleString('es-CL')}
                </span>
                <span className="text-gray-500">/hora</span>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full text-lg mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>

              <p className="text-center text-sm text-gray-500 mb-6">
                Responde generalmente en menos de 2 horas
              </p>

              <hr className="mb-6" />

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span>{profesor.total_resenas || 0} alumnos</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>{profesor.rating.toFixed(1)} de valoración</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>Disponibilidad flexible</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>Respuesta rápida</span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Consejos de seguridad</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Coordina la primera clase antes de pagar</li>
                <li>• Usa videollamada para clases online</li>
                <li>• Pide referencias si es presencial</li>
                <li>• Acuerda el precio antes de empezar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
