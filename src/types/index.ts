export interface Profesor {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  foto_url: string | null
  titulo: string
  universidad: string
  descripcion: string
  experiencia_anos: number
  materias: string[]
  niveles: ('primaria' | 'secundaria' | 'paes')[]
  modalidad: ('online' | 'presencial')[]
  precio_hora: number
  region: string
  comuna: string
  rating: number
  total_resenas: number
  verificado: boolean
  activo: boolean
  created_at: string
}

export interface Resena {
  id: string
  profesor_id: string
  usuario_id: string
  nombre_usuario: string
  rating: number
  comentario: string
  created_at: string
}

export interface Usuario {
  id: string
  email: string
  nombre: string
  apellido: string
  telefono: string
  tipo: 'apoderado' | 'profesor'
  created_at: string
}

export type Materia = 
  | 'matematicas'
  | 'lenguaje'
  | 'ciencias'
  | 'fisica'
  | 'quimica'
  | 'biologia'
  | 'historia'
  | 'ingles'
  | 'paes'

export type Region = 
  | 'metropolitana'
  | 'valparaiso'
  | 'biobio'
  | 'araucania'
  | 'ohiggins'
  | 'maule'
  | 'coquimbo'
  | 'antofagasta'
  | 'los-lagos'
  | 'tarapaca'
  | 'atacama'
  | 'los-rios'
  | 'arica'
  | 'aysen'
  | 'magallanes'

export const MATERIAS: { value: Materia; label: string }[] = [
  { value: 'matematicas', label: 'Matemáticas' },
  { value: 'lenguaje', label: 'Lenguaje' },
  { value: 'ciencias', label: 'Ciencias Naturales' },
  { value: 'fisica', label: 'Física' },
  { value: 'quimica', label: 'Química' },
  { value: 'biologia', label: 'Biología' },
  { value: 'historia', label: 'Historia y Geografía' },
  { value: 'ingles', label: 'Inglés' },
  { value: 'paes', label: 'Preparación PAES' },
]

export const REGIONES: { value: Region; label: string }[] = [
  { value: 'metropolitana', label: 'Región Metropolitana' },
  { value: 'valparaiso', label: 'Valparaíso' },
  { value: 'biobio', label: 'Biobío' },
  { value: 'araucania', label: 'La Araucanía' },
  { value: 'ohiggins', label: "O'Higgins" },
  { value: 'maule', label: 'Maule' },
  { value: 'coquimbo', label: 'Coquimbo' },
  { value: 'antofagasta', label: 'Antofagasta' },
  { value: 'los-lagos', label: 'Los Lagos' },
  { value: 'tarapaca', label: 'Tarapacá' },
  { value: 'atacama', label: 'Atacama' },
  { value: 'los-rios', label: 'Los Ríos' },
  { value: 'arica', label: 'Arica y Parinacota' },
  { value: 'aysen', label: 'Aysén' },
  { value: 'magallanes', label: 'Magallanes' },
]

export const NIVELES = [
  { value: 'primaria', label: 'Primaria (1° a 6° básico)' },
  { value: 'secundaria', label: 'Secundaria (7° básico a 4° medio)' },
  { value: 'paes', label: 'Preparación PAES' },
]
