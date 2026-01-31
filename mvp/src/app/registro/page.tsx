'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    
    setIsLoading(true)
    
    // TODO: Integrar con Supabase Auth
    // const { data, error } = await supabase.auth.signUp({
    //   email: formData.email,
    //   password: formData.password,
    //   options: {
    //     data: {
    //       nombre: formData.nombre,
    //       apellido: formData.apellido,
    //       telefono: formData.telefono,
    //       tipo: 'apoderado'
    //     }
    //   }
    // })
    
    setTimeout(() => {
      alert('¡Registro exitoso! Funcionalidad completa próximamente. Por ahora, explora los profesores disponibles.')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary-600">
            <GraduationCap className="w-10 h-10" />
            <span>ProfeChile</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Crear Cuenta</h1>
          <p className="mt-2 text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary-600 font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre y Apellido */}
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

            {/* Email */}
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

            {/* Teléfono */}
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
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
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

            {/* Terms */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full text-lg py-4"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
            </button>
          </form>

          {/* Teacher CTA */}
          <div className="mt-6 p-4 bg-primary-50 rounded-xl text-center">
            <p className="text-sm text-gray-700">
              ¿Eres profesor y quieres dar clases?{' '}
              <Link href="/registro-profesor" className="text-primary-600 font-semibold hover:underline">
                Regístrate como profesor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
