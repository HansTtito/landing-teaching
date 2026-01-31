import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, 
  GraduationCap, 
  Video, 
  Shield, 
  Star, 
  CheckCircle,
  Calculator,
  BookOpen,
  Flask,
  Globe,
  History,
  Target,
  ArrowRight
} from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 text-yellow-400" />
                +500 Profesores Verificados en Chile
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Encuentra el{' '}
                <span className="relative">
                  <span className="relative z-10">Profesor Particular</span>
                  <span className="absolute bottom-2 left-0 right-0 h-4 bg-white/20 -z-0 rounded"></span>
                </span>
                {' '}Ideal para tu Hijo
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-lg">
                Clases personalizadas de primaria y secundaria con los mejores profesores de Chile. 
                Online o presencial, tú eliges.
              </p>

              {/* Search Box */}
              <div className="bg-white rounded-2xl p-2 shadow-2xl mb-8">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text"
                      placeholder="¿Qué materia necesitas?"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 text-gray-900"
                    />
                  </div>
                  <select className="px-4 py-4 rounded-xl bg-gray-100 text-gray-700 font-medium border-0 focus:ring-2 focus:ring-primary-500">
                    <option value="">Nivel</option>
                    <option value="primaria">Primaria</option>
                    <option value="secundaria">Secundaria</option>
                    <option value="paes">PAES</option>
                  </select>
                  <Link href="/profesores" className="btn btn-primary px-8">
                    Buscar
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { number: '500+', label: 'Profesores' },
                  { number: '10.000+', label: 'Clases' },
                  { number: '4.9', label: 'Rating' },
                  { number: '15', label: 'Regiones' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image/Cards */}
            <div className="hidden lg:block relative">
              <div className="relative w-80 mx-auto">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 text-center">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
                    alt="Profesora"
                    width={180}
                    height={180}
                    className="rounded-2xl mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900">Carolina Muñoz</h3>
                  <p className="text-primary-600 font-medium">Profesora de Matemáticas</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-700">4.9</span>
                    <span className="text-gray-500">(127 reseñas)</span>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-16 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 animate-bounce">
                  <Video className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-gray-700">Clase Online</span>
                </div>
                
                <div className="absolute top-20 -right-12 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-gray-700">Verificado</span>
                </div>
                
                <div className="absolute bottom-20 -left-8 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-700">Pago Seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-6">Profesores de las mejores universidades de Chile</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {['Universidad de Chile', 'PUC', 'USACH', 'UDP', 'UAI'].map((uni) => (
              <span key={uni} className="text-xl font-bold text-gray-300 hover:text-primary-600 transition-colors">
                {uni}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Proceso Simple
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Cómo Funciona?</h2>
            <p className="text-xl text-gray-600">En solo 3 pasos puedes comenzar las clases para tu hijo</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                step: '1',
                title: 'Busca tu Profesor',
                description: 'Filtra por materia, nivel, ubicación y precio. Lee las reseñas de otros apoderados.'
              },
              {
                icon: GraduationCap,
                step: '2',
                title: 'Contacta por WhatsApp',
                description: 'Escríbele directamente al profesor para coordinar horarios y resolver dudas.'
              },
              {
                icon: Video,
                step: '3',
                title: 'Comienza las Clases',
                description: 'Clases online por Zoom/Meet o presenciales. Paga directamente al profesor.'
              }
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="w-full h-full bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-gray-900 font-bold rounded-full flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Todas las Materias
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Qué Necesitas Aprender?</h2>
            <p className="text-xl text-gray-600">Profesores especializados en todas las materias del currículum chileno</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Calculator, name: 'Matemáticas', color: 'bg-blue-100 text-blue-600', count: '120+' },
              { icon: BookOpen, name: 'Lenguaje', color: 'bg-yellow-100 text-yellow-600', count: '95+' },
              { icon: Flask, name: 'Ciencias', color: 'bg-green-100 text-green-600', count: '85+' },
              { icon: History, name: 'Historia', color: 'bg-red-100 text-red-600', count: '60+' },
              { icon: Globe, name: 'Inglés', color: 'bg-purple-100 text-purple-600', count: '110+' },
              { icon: Target, name: 'PAES', color: 'bg-pink-100 text-pink-600', count: '75+' },
            ].map((subject) => (
              <Link 
                key={subject.name}
                href={`/profesores?materia=${subject.name.toLowerCase()}`}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-primary-300 hover:shadow-lg transition-all text-center group"
              >
                <div className={`w-14 h-14 ${subject.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <subject.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{subject.name}</h3>
                <p className="text-sm text-primary-600 font-medium">{subject.count} profesores</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Teachers */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Para Profesores
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Eres Profesor? Únete a Nuestra Comunidad
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Publica tu perfil gratis y comienza a dar clases particulares. Tú defines tus horarios, precios y modalidad.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Publicación de perfil gratuita',
                  'Tú defines tus tarifas',
                  'Flexibilidad de horarios',
                  'Contacto directo con apoderados',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/registro-profesor" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Registrarme como Profesor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
                alt="Profesor dando clases"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para Mejorar las Notas de tu Hijo?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Encuentra hoy al profesor perfecto. Es gratis buscar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profesores" className="btn btn-primary text-lg px-8 py-4">
              Buscar Profesor
            </Link>
            <Link href="/registro-profesor" className="btn btn-secondary text-lg px-8 py-4">
              Soy Profesor
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
