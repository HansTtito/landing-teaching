import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export type Database = {
  public: {
    Tables: {
      profesores: {
        Row: {
          id: string
          user_id: string
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
          niveles: string[]
          modalidad: string[]
          precio_hora: number
          region: string
          comuna: string
          rating: number
          total_resenas: number
          verificado: boolean
          activo: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profesores']['Row'], 'id' | 'created_at' | 'rating' | 'total_resenas'>
        Update: Partial<Database['public']['Tables']['profesores']['Insert']>
      }
      resenas: {
        Row: {
          id: string
          profesor_id: string
          usuario_id: string
          nombre_usuario: string
          rating: number
          comentario: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['resenas']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['resenas']['Insert']>
      }
    }
  }
}
