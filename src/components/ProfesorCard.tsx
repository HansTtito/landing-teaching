'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Video, MapPin, CheckCircle, MessageCircle } from 'lucide-react'
import type { Profesor } from '@/types'

interface ProfesorCardProps {
  profesor: Profesor
}

export function ProfesorCard({ profesor }: ProfesorCardProps) {
  const whatsappLink = `https://wa.me/56${profesor.telefono.replace(/\D/g, '')}?text=Hola ${profesor.nombre}, te encontré en ProfeChile y me gustaría consultar por clases de ${profesor.materias[0]}.`

  return (
    <div className="card overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={profesor.foto_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'}
          alt={`${profesor.nombre} ${profesor.apellido}`}
          fill
          className="object-cover"
        />
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {profesor.modalidad.includes('online') && (
            <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <Video className="w-3 h-3" /> Online
            </span>
          )}
          {profesor.modalidad.includes('presencial') && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Presencial
            </span>
          )}
        </div>
        {profesor.verificado && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Verificado
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {profesor.nombre} {profesor.apellido}
            </h3>
            <p className="text-primary-600 font-medium text-sm">
              {profesor.materias.slice(0, 2).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-sm">{profesor.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span>{profesor.universidad}</span>
          <span>•</span>
          <span>{profesor.experiencia_anos} años exp.</span>
        </div>

        {/* Niveles */}
        <div className="flex flex-wrap gap-1 mb-3">
          {profesor.niveles.map(nivel => (
            <span 
              key={nivel} 
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {nivel === 'primaria' ? 'Primaria' : nivel === 'secundaria' ? 'Secundaria' : 'PAES'}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {profesor.descripcion}
        </p>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${profesor.precio_hora.toLocaleString('es-CL')}
            </span>
            <span className="text-gray-500 text-sm">/hora</span>
          </div>
          <div className="flex gap-2">
            <Link 
              href={`/profesor/${profesor.id}`}
              className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Ver Perfil
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
