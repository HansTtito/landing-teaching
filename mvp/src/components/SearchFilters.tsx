'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { MATERIAS, REGIONES, NIVELES } from '@/types'

interface SearchFiltersProps {
  filters: {
    materia: string
    nivel: string
    modalidad: string
    region: string
    precioMax: string
  }
  onFilterChange: (key: string, value: string) => void
  onSearch: () => void
}

export function SearchFilters({ filters, onFilterChange, onSearch }: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Materia */}
        <div className="flex-1">
          <label className="label">Materia</label>
          <select 
            className="input"
            value={filters.materia}
            onChange={(e) => onFilterChange('materia', e.target.value)}
          >
            <option value="">Todas las materias</option>
            {MATERIAS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Nivel */}
        <div className="flex-1">
          <label className="label">Nivel</label>
          <select 
            className="input"
            value={filters.nivel}
            onChange={(e) => onFilterChange('nivel', e.target.value)}
          >
            <option value="">Todos los niveles</option>
            {NIVELES.map(n => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>
        </div>

        {/* Modalidad */}
        <div className="flex-1">
          <label className="label">Modalidad</label>
          <select 
            className="input"
            value={filters.modalidad}
            onChange={(e) => onFilterChange('modalidad', e.target.value)}
          >
            <option value="">Online y Presencial</option>
            <option value="online">Solo Online</option>
            <option value="presencial">Solo Presencial</option>
          </select>
        </div>

        {/* Región */}
        <div className="flex-1">
          <label className="label">Región</label>
          <select 
            className="input"
            value={filters.region}
            onChange={(e) => onFilterChange('region', e.target.value)}
          >
            <option value="">Todas las regiones</option>
            {REGIONES.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* Precio Máximo */}
        <div className="w-full lg:w-40">
          <label className="label">Precio máx.</label>
          <select 
            className="input"
            value={filters.precioMax}
            onChange={(e) => onFilterChange('precioMax', e.target.value)}
          >
            <option value="">Sin límite</option>
            <option value="10000">$10.000</option>
            <option value="15000">$15.000</option>
            <option value="20000">$20.000</option>
            <option value="25000">$25.000</option>
            <option value="30000">$30.000</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button 
            onClick={onSearch}
            className="btn btn-primary w-full lg:w-auto"
          >
            <Search className="w-5 h-5" />
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}
