'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  Building,
  FileText,
  DollarSign,
  MapPin,
  CheckCircle
} from 'lucide-react'
import { MATERIAS, REGIONES, NIVELES } from '@/types'

export default function RegistroProfesorPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    // Step 1: Personal
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    // Step 2: Professional
    titulo: '',
    universidad: '',
    descripcion: '',
    experiencia_anos: '',
    // Step 3: Classes
    materias: [] as string[],
    niveles: [] as string[],
    modalidad: [] as string[],
    precio_hora: '',
    region: '',
    comuna: ''
  })

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
    
    if (step < 3) {
      setStep(step + 1)
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    
    setIsLoading(true)
    
    // TODO: Integrar con Supabase
    setTimeout(() => {
      alert('¡Registro exitoso! Tu perfil será revisado en las próximas 24 horas. Te contactaremos por email.')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary-600">
            <GraduationCap className="w-10 h-10" />
            <span>ProfeChile</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Únete como Profesor</h1>
          <p className="mt-2 text-gray-600">
            Publica tu perfil gratis y comienza a dar clases
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > s ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <span className="text-sm font-medium text-gray-500">
            {step === 1 && 'Datos personales'}
            {step === 2 && 'Información profesional'}
            {step === 3 && 'Configuración de clases'}
          </span>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Nombre</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="María"
                        className="input pl-12"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Apellido</label>
                    <input
                      type="text"
                      required
                      placeholder="González"
                      className="input"
                      value={formData.apellido}
                      onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="input pl-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Teléfono (WhatsApp)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+56</div>
                    <input
                      type="tel"
                      required
                      placeholder="912345678"
                      className="input pl-24"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Los apoderados te contactarán por WhatsApp</p>
                </div>

                <div>
                  <label className="label">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Mínimo 8 caracteres"
                      className="input pl-12 pr-12"
                      minLength={8}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="label">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Repite tu contraseña"
                      className="input pl-12"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Professional Info */}
            {step === 2 && (
              <>
                <div>
                  <label className="label">Título o Profesión</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Ej: Profesor de Matemáticas, Ingeniero Civil..."
                      className="input pl-12"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Universidad / Instituto</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Ej: Universidad de Chile, PUC..."
                      className="input pl-12"
                      value={formData.universidad}
                      onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Años de experiencia dando clases</label>
                  <select
                    required
                    className="input"
                    value={formData.experiencia_anos}
                    onChange={(e) => setFormData({ ...formData, experiencia_anos: e.target.value })}
                  >
                    <option value="">Selecciona...</option>
                    <option value="1">Menos de 1 año</option>
                    <option value="2">1-2 años</option>
                    <option value="4">3-5 años</option>
                    <option value="7">6-10 años</option>
                    <option value="12">Más de 10 años</option>
                  </select>
                </div>

                <div>
                  <label className="label">Descripción (sobre ti y tu metodología)</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntale a los apoderados sobre tu experiencia, metodología de enseñanza, logros con estudiantes..."
                    className="input resize-none"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  />
                  <p className="text-sm text-gray-500 mt-1">Mínimo 100 caracteres</p>
                </div>
              </>
            )}

            {/* Step 3: Class Configuration */}
            {step === 3 && (
              <>
                <div>
                  <label className="label">Materias que enseñas</label>
                  <p className="text-sm text-gray-500 mb-3">Selecciona todas las que apliquen</p>
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

                <div>
                  <label className="label">Niveles</label>
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

                <div>
                  <label className="label">Modalidad</label>
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

                <div className="grid grid-cols-2 gap-4">
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
                      placeholder="Ej: Providencia"
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
                      placeholder="15000"
                      className="input pl-12"
                      value={formData.precio_hora}
                      onChange={(e) => setFormData({ ...formData, precio_hora: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Precio promedio: $12.000 - $20.000 por hora
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    required
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                  />
                  <span className="text-sm text-gray-600">
                    Acepto los{' '}
                    <Link href="/terminos" className="text-primary-600 hover:underline">Términos de Uso</Link>
                    {' '}y la{' '}
                    <Link href="/privacidad" className="text-primary-600 hover:underline">Política de Privacidad</Link>
                  </span>
                </label>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn btn-secondary flex-1"
                >
                  Atrás
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary flex-1 text-lg py-4"
              >
                {isLoading 
                  ? 'Registrando...' 
                  : step < 3 
                    ? 'Continuar' 
                    : 'Crear mi Perfil Gratis'}
              </button>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-primary-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">¿Por qué unirte a ProfeChile?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Publicación de perfil 100% gratis
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Tú defines tus precios y horarios
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Sin comisiones ni pagos a la plataforma
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Contacto directo con apoderados por WhatsApp
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
