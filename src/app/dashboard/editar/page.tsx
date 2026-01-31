'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { 
  ArrowLeft, 
  Save, 
  Loader2,
  AlertCircle,
  CheckCircle,
  Camera,
  DollarSign
} from 'lucide-react'
import { MATERIAS, REGIONES, NIVELES } from '@/types'
import type { Profesor } from '@/types'

export default function EditarPerfilPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [profesor, setProfesor] = useState<Profesor | null>(null)
  
  const [formData, setFormData] = useState({
    titulo: '',
    universidad: '',
    descripcion: '',
    experiencia_anos: 0,
    materias: [] as string[],
    niveles: [] as string[],
    modalidad: [] as string[],
    precio_hora: 0,
    region: '',
    comuna: '',
    telefono: ''
  })

  useEffect(() => {
    async function loadData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/login')
          return
        }

        const { data: profesorData, error } = await supabase
          .from('profesores')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error || !profesorData) {
          router.push('/dashboard')
          return
        }

        setProfesor(profesorData as Profesor)
        setFormData({
          titulo: profesorData.titulo,
          universidad: profesorData.universidad,
          descripcion: profesorData.descripcion,
          experiencia_anos: profesorData.experiencia_anos,
          materias: profesorData.materias,
          niveles: profesorData.niveles,
          modalidad: profesorData.modalidad,
          precio_hora: profesorData.precio_hora,
          region: profesorData.region,
          comuna: profesorData.comuna,
          telefono: profesorData.telefono
        })
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router])

  const handleMateriaToggle = (materia: string) => {
    setFormData(prev => ({
      ...prev,
      materias: prev.materias.includes(materia)
        ? prev.materias.filter(m => m !== materia)
        : [...prev.materias, materia]
    }))
  }

  const handleNivelToggle = (nivel: string) => {
    setFormData(prev => ({
      ...prev,
      niveles: prev.niveles.includes(nivel)
        ? prev.niveles.filter(n => n !== nivel)
        : [...prev.niveles, nivel]
    }))
  }

  const handleModalidadToggle = (modalidad: string) => {
    setFormData(prev => ({
      ...prev,
      modalidad: prev.modalidad.includes(modalidad)
        ? prev.modalidad.filter(m => m !== modalidad)
        : [...prev.modalidad, modalidad]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user || !profesor) {
        setError('No autorizado')
        return
      }

      const { error: updateError } = await supabase
        .from('profesores')
        .update({
          titulo: formData.titulo,
          universidad: formData.universidad,
          descripcion: formData.descripcion,
          experiencia_anos: formData.experiencia_anos,
          materias: formData.materias,
          niveles: formData.niveles,
          modalidad: formData.modalidad,
          precio_hora: formData.precio_hora,
          region: formData.region,
          comuna: formData.comuna,
          telefono: formData.telefono
        })
        .eq('id', profesor.id)
        .eq('user_id', user.id)

      if (updateError) {
        setError('Error al guardar los cambios')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      setError('Error al guardar')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (!profesor) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al panel
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
          <p className="text-gray-600">Actualiza tu información profesional</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <p>¡Cambios guardados correctamente!</p>
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Información Básica</h2>
            
            <div className="space-y-4">
              <div>
                <label className="label">Título o Profesión</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Universidad / Instituto</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.universidad}
                  onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Años de experiencia</label>
                <select
                  required
                  className="input"
                  value={formData.experiencia_anos}
                  onChange={(e) => setFormData({ ...formData, experiencia_anos: parseInt(e.target.value) })}
                >
                  <option value="1">Menos de 1 año</option>
                  <option value="2">1-2 años</option>
                  <option value="4">3-5 años</option>
                  <option value="7">6-10 años</option>
                  <option value="12">Más de 10 años</option>
                </select>
              </div>

              <div>
                <label className="label">Descripción</label>
                <textarea
                  required
                  rows={5}
                  className="input resize-none"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Describe tu experiencia, metodología y qué te hace especial como profesor.
                </p>
              </div>

              <div>
                <label className="label">Teléfono WhatsApp</label>
                <input
                  type="tel"
                  required
                  className="input"
                  placeholder="912345678"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Materias */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Materias que enseñas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MATERIAS.map(materia => (
                <button
                  key={materia.value}
                  type="button"
                  onClick={() => handleMateriaToggle(materia.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.materias.includes(materia.value)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {materia.label}
                </button>
              ))}
            </div>
          </div>

          {/* Niveles */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Niveles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {NIVELES.map(nivel => (
                <button
                  key={nivel.value}
                  type="button"
                  onClick={() => handleNivelToggle(nivel.value)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    formData.niveles.includes(nivel.value)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {nivel.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modalidad */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Modalidad</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleModalidadToggle('online')}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  formData.modalidad.includes('online')
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🖥️ Clases Online
              </button>
              <button
                type="button"
                onClick={() => handleModalidadToggle('presencial')}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  formData.modalidad.includes('presencial')
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏠 Clases Presenciales
              </button>
            </div>
          </div>

          {/* Location & Price */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ubicación y Precio</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">Región</label>
                <select
                  required
                  className="input"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  <option value="">Selecciona...</option>
                  {REGIONES.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Comuna</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.comuna}
                  onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label">Precio por hora (CLP)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min="5000"
                  max="100000"
                  step="1000"
                  className="input pl-12"
                  value={formData.precio_hora}
                  onChange={(e) => setFormData({ ...formData, precio_hora: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="btn btn-secondary flex-1">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary flex-1"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
