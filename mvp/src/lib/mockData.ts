import type { Profesor } from '@/types'

// Datos de prueba para el MVP (simula lo que vendría de Supabase)
export const mockProfesores: Profesor[] = [
  {
    id: '1',
    nombre: 'Carolina',
    apellido: 'Muñoz',
    email: 'carolina@email.com',
    telefono: '912345678',
    foto_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesora de Matemáticas',
    universidad: 'Universidad de Chile',
    descripcion: '10 años de experiencia enseñando matemáticas. Especialista en métodos de enseñanza personalizados para cada estudiante. Me enfoco en que el alumno entienda los conceptos, no solo memorice fórmulas.',
    experiencia_anos: 10,
    materias: ['matematicas', 'fisica'],
    niveles: ['primaria', 'secundaria', 'paes'],
    modalidad: ['online', 'presencial'],
    precio_hora: 15000,
    region: 'metropolitana',
    comuna: 'Providencia',
    rating: 4.9,
    total_resenas: 127,
    verificado: true,
    activo: true,
    created_at: '2024-01-15'
  },
  {
    id: '2',
    nombre: 'Juan Pablo',
    apellido: 'Soto',
    email: 'juanpablo@email.com',
    telefono: '923456789',
    foto_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesor de Física y Química',
    universidad: 'PUC',
    descripcion: 'Magíster en Educación. Clases dinámicas con experimentos prácticos. Me apasiona hacer que la ciencia sea entretenida y comprensible para todos.',
    experiencia_anos: 8,
    materias: ['fisica', 'quimica'],
    niveles: ['secundaria', 'paes'],
    modalidad: ['presencial'],
    precio_hora: 18000,
    region: 'metropolitana',
    comuna: 'Santiago Centro',
    rating: 4.8,
    total_resenas: 89,
    verificado: true,
    activo: true,
    created_at: '2024-02-10'
  },
  {
    id: '3',
    nombre: 'Andrea',
    apellido: 'Valenzuela',
    email: 'andrea@email.com',
    telefono: '934567890',
    foto_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesora de Inglés',
    universidad: 'UAI',
    descripcion: 'Certificación Cambridge. Viví 5 años en Estados Unidos. Clases conversacionales y preparación para exámenes internacionales. Enfoque comunicativo.',
    experiencia_anos: 7,
    materias: ['ingles'],
    niveles: ['primaria', 'secundaria'],
    modalidad: ['online'],
    precio_hora: 16000,
    region: 'valparaiso',
    comuna: 'Viña del Mar',
    rating: 5.0,
    total_resenas: 156,
    verificado: true,
    activo: true,
    created_at: '2024-01-20'
  },
  {
    id: '4',
    nombre: 'Rodrigo',
    apellido: 'Fernández',
    email: 'rodrigo@email.com',
    telefono: '945678901',
    foto_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesor de Lenguaje',
    universidad: 'USACH',
    descripcion: 'Especialista en comprensión lectora y redacción. Preparo estudiantes para la PAES con excelentes resultados. Metodología activa y participativa.',
    experiencia_anos: 12,
    materias: ['lenguaje'],
    niveles: ['secundaria', 'paes'],
    modalidad: ['online', 'presencial'],
    precio_hora: 14000,
    region: 'metropolitana',
    comuna: 'Ñuñoa',
    rating: 4.7,
    total_resenas: 203,
    verificado: true,
    activo: true,
    created_at: '2024-03-05'
  },
  {
    id: '5',
    nombre: 'María José',
    apellido: 'Lagos',
    email: 'mariajose@email.com',
    telefono: '956789012',
    foto_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesora de Ciencias',
    universidad: 'Universidad de Concepción',
    descripcion: 'Bióloga con vocación docente. Hago las ciencias fáciles de entender con ejemplos de la vida cotidiana. Ideal para estudiantes que les cuesta la materia.',
    experiencia_anos: 5,
    materias: ['biologia', 'ciencias'],
    niveles: ['primaria', 'secundaria'],
    modalidad: ['online'],
    precio_hora: 12000,
    region: 'biobio',
    comuna: 'Concepción',
    rating: 4.9,
    total_resenas: 67,
    verificado: true,
    activo: true,
    created_at: '2024-02-28'
  },
  {
    id: '6',
    nombre: 'Felipe',
    apellido: 'Araya',
    email: 'felipe@email.com',
    telefono: '967890123',
    foto_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesor de Historia',
    universidad: 'UDP',
    descripcion: 'Historiador apasionado. Mis clases son como contar historias, no como memorizar fechas. Preparo para PAES con enfoque en análisis de fuentes.',
    experiencia_anos: 6,
    materias: ['historia'],
    niveles: ['secundaria', 'paes'],
    modalidad: ['online', 'presencial'],
    precio_hora: 13000,
    region: 'metropolitana',
    comuna: 'Las Condes',
    rating: 4.8,
    total_resenas: 94,
    verificado: false,
    activo: true,
    created_at: '2024-03-10'
  },
  {
    id: '7',
    nombre: 'Valentina',
    apellido: 'Cortés',
    email: 'valentina@email.com',
    telefono: '978901234',
    foto_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesora de Matemáticas',
    universidad: 'Universidad de Chile',
    descripcion: 'Ingeniera civil con pasión por enseñar. Especialista en preparación PAES matemáticas. Resultados comprobados: mis alumnos suben en promedio 150 puntos.',
    experiencia_anos: 4,
    materias: ['matematicas'],
    niveles: ['secundaria', 'paes'],
    modalidad: ['online'],
    precio_hora: 20000,
    region: 'metropolitana',
    comuna: 'Vitacura',
    rating: 4.9,
    total_resenas: 78,
    verificado: true,
    activo: true,
    created_at: '2024-01-25'
  },
  {
    id: '8',
    nombre: 'Sebastián',
    apellido: 'Mora',
    email: 'sebastian@email.com',
    telefono: '989012345',
    foto_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    titulo: 'Profesor de Física',
    universidad: 'UTFSM',
    descripcion: 'Físico de la UTFSM. Hago la física simple con muchos ejemplos prácticos. Ideal para quienes van a seguir carreras de ingeniería.',
    experiencia_anos: 9,
    materias: ['fisica', 'matematicas'],
    niveles: ['secundaria', 'paes'],
    modalidad: ['online', 'presencial'],
    precio_hora: 17000,
    region: 'valparaiso',
    comuna: 'Valparaíso',
    rating: 4.6,
    total_resenas: 112,
    verificado: true,
    activo: true,
    created_at: '2024-02-15'
  }
]

// Función para simular búsqueda/filtrado
export function filterProfesores(
  profesores: Profesor[],
  filters: {
    materia?: string
    nivel?: string
    modalidad?: string
    region?: string
    precioMax?: string
  }
): Profesor[] {
  return profesores.filter(p => {
    if (filters.materia && !p.materias.includes(filters.materia)) return false
    if (filters.nivel && !p.niveles.includes(filters.nivel as any)) return false
    if (filters.modalidad && !p.modalidad.includes(filters.modalidad as any)) return false
    if (filters.region && p.region !== filters.region) return false
    if (filters.precioMax && p.precio_hora > parseInt(filters.precioMax)) return false
    return true
  })
}
