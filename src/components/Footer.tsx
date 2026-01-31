import Link from 'next/link'
import { GraduationCap, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <GraduationCap className="w-8 h-8" />
              <span>ProfeChile</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              La plataforma #1 de clases particulares en Chile. Conectamos estudiantes con los mejores profesores.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Para Estudiantes</h4>
            <ul className="space-y-2">
              <li><Link href="/profesores" className="text-gray-400 hover:text-white transition-colors">Buscar Profesores</Link></li>
              <li><Link href="/como-funciona" className="text-gray-400 hover:text-white transition-colors">Cómo Funciona</Link></li>
              <li><Link href="/precios" className="text-gray-400 hover:text-white transition-colors">Precios</Link></li>
              <li><Link href="/garantia" className="text-gray-400 hover:text-white transition-colors">Garantía</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Para Profesores</h4>
            <ul className="space-y-2">
              <li><Link href="/registro-profesor" className="text-gray-400 hover:text-white transition-colors">Registrarse</Link></li>
              <li><Link href="/beneficios" className="text-gray-400 hover:text-white transition-colors">Beneficios</Link></li>
              <li><Link href="/ayuda" className="text-gray-400 hover:text-white transition-colors">Centro de Ayuda</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terminos" className="text-gray-400 hover:text-white transition-colors">Términos de Uso</Link></li>
              <li><Link href="/privacidad" className="text-gray-400 hover:text-white transition-colors">Privacidad</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 ProfeChile. Todos los derechos reservados. Hecho con ❤️ en Chile.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Pagos seguros:</span>
            <span className="font-semibold">Webpay</span>
            <span className="font-semibold">Flow</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
