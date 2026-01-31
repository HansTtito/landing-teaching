'use client'

import { useState, useMemo } from 'react'
import { SearchFilters } from '@/components/SearchFilters'
import { ProfesorCard } from '@/components/ProfesorCard'
import { mockProfesores, filterProfesores } from '@/lib/mockData'
import { Users, Filter } from 'lucide-react'

export default function ProfesoresPage() {
  const [filters, setFilters] = useState({
    materia: '',
    nivel: '',
    modalidad: '',
    region: '',
    precioMax: ''
  })

  const [sortBy, setSortBy] = useState<'rating' | 'precio' | 'experiencia'>('rating')

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredProfesores = useMemo(() => {
    let result = filterProfesores(mockProfesores, filters)
    
    // Sort
    switch (sortBy) {
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'precio':
        result = [...result].sort((a, b) => a.precio_hora - b.precio_hora)
        break
      case 'experiencia':
        result = [...result].sort((a, b) => b.experiencia_anos - a.experiencia_anos)
        break
    }
    
    return result
  }, [filters, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Encuentra tu Profesor Ideal
          </h1>
          <p className="text-white/80 text-lg">
            {mockProfesores.length} profesores disponibles en todo Chile
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filters */}
        <SearchFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={() => {}}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>
              <strong className="text-gray-900">{filteredProfesores.length}</strong> profesores encontrados
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">Ordenar por:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="rating">Mejor valorados</option>
              <option value="precio">Menor precio</option>
              <option value="experiencia">Más experiencia</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProfesores.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filteredProfesores.map(profesor => (
              <ProfesorCard key={profesor.id} profesor={profesor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No encontramos profesores con esos filtros
            </h3>
            <p className="text-gray-500 mb-6">
              Intenta ajustar los filtros para ver más resultados
            </p>
            <button 
              onClick={() => setFilters({
                materia: '',
                nivel: '',
                modalidad: '',
                region: '',
                precioMax: ''
              })}
              className="btn btn-secondary"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
