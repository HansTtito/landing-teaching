-- ============================================
-- SQL para crear las tablas en Supabase
-- Ejecutar en: https://supabase.com/dashboard/project/zwpsegrlpfelnassahbo/sql
-- ============================================

-- Tabla de perfiles (para apoderados y datos básicos)
CREATE TABLE IF NOT EXISTS perfiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  telefono TEXT,
  tipo TEXT NOT NULL DEFAULT 'apoderado' CHECK (tipo IN ('apoderado', 'profesor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Tabla de profesores
CREATE TABLE IF NOT EXISTS profesores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  foto_url TEXT,
  titulo TEXT NOT NULL,
  universidad TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  experiencia_anos INTEGER NOT NULL DEFAULT 1,
  materias TEXT[] NOT NULL DEFAULT '{}',
  niveles TEXT[] NOT NULL DEFAULT '{}',
  modalidad TEXT[] NOT NULL DEFAULT '{}',
  precio_hora INTEGER NOT NULL,
  region TEXT NOT NULL,
  comuna TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_resenas INTEGER DEFAULT 0,
  verificado BOOLEAN DEFAULT false,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id),
  UNIQUE(email)
);

-- Tabla de reseñas
CREATE TABLE IF NOT EXISTS resenas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profesor_id UUID REFERENCES profesores(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_usuario TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comentario TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Habilitar Row Level Security (RLS)
-- ============================================

ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesores ENABLE ROW LEVEL SECURITY;
ALTER TABLE resenas ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Políticas de seguridad para PERFILES
-- ============================================

-- Cualquiera puede ver perfiles públicos
CREATE POLICY "Perfiles públicos" ON perfiles
  FOR SELECT USING (true);

-- Usuarios pueden insertar su propio perfil
CREATE POLICY "Usuarios pueden crear su perfil" ON perfiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "Usuarios pueden editar su perfil" ON perfiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- Políticas de seguridad para PROFESORES
-- ============================================

-- Cualquiera puede ver profesores activos
CREATE POLICY "Profesores públicos" ON profesores
  FOR SELECT USING (activo = true);

-- Usuarios pueden insertar su perfil de profesor
CREATE POLICY "Usuarios pueden crear perfil profesor" ON profesores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Profesores pueden actualizar su propio perfil
CREATE POLICY "Profesores pueden editar su perfil" ON profesores
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- Políticas de seguridad para RESEÑAS
-- ============================================

-- Cualquiera puede ver reseñas
CREATE POLICY "Reseñas públicas" ON resenas
  FOR SELECT USING (true);

-- Usuarios autenticados pueden crear reseñas
CREATE POLICY "Usuarios pueden crear reseñas" ON resenas
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- ============================================
-- Función para actualizar rating del profesor
-- ============================================

CREATE OR REPLACE FUNCTION update_profesor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profesores
  SET 
    rating = (SELECT AVG(rating) FROM resenas WHERE profesor_id = NEW.profesor_id),
    total_resenas = (SELECT COUNT(*) FROM resenas WHERE profesor_id = NEW.profesor_id)
  WHERE id = NEW.profesor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar rating cuando se agrega una reseña
DROP TRIGGER IF EXISTS on_resena_created ON resenas;
CREATE TRIGGER on_resena_created
  AFTER INSERT ON resenas
  FOR EACH ROW
  EXECUTE FUNCTION update_profesor_rating();

-- ============================================
-- Índices para mejor rendimiento
-- ============================================

CREATE INDEX IF NOT EXISTS idx_profesores_activo ON profesores(activo);
CREATE INDEX IF NOT EXISTS idx_profesores_region ON profesores(region);
CREATE INDEX IF NOT EXISTS idx_profesores_materias ON profesores USING GIN(materias);
CREATE INDEX IF NOT EXISTS idx_profesores_niveles ON profesores USING GIN(niveles);
CREATE INDEX IF NOT EXISTS idx_resenas_profesor ON resenas(profesor_id);

-- ============================================
-- Datos de ejemplo (opcional)
-- ============================================

-- Puedes descomentar esto para agregar profesores de ejemplo:
/*
INSERT INTO profesores (user_id, nombre, apellido, email, telefono, titulo, universidad, descripcion, experiencia_anos, materias, niveles, modalidad, precio_hora, region, comuna, verificado, activo)
VALUES 
  (gen_random_uuid(), 'Carolina', 'Muñoz', 'carolina@demo.com', '912345678', 'Profesora de Matemáticas', 'Universidad de Chile', 'Profesora con 10 años de experiencia en matemáticas.', 10, ARRAY['matematicas'], ARRAY['primaria', 'secundaria'], ARRAY['online', 'presencial'], 15000, 'metropolitana', 'Providencia', true, true),
  (gen_random_uuid(), 'Juan Pablo', 'Soto', 'juanpablo@demo.com', '923456789', 'Profesor de Física', 'PUC', 'Magíster en Educación con especialidad en física.', 8, ARRAY['fisica', 'quimica'], ARRAY['secundaria', 'paes'], ARRAY['presencial'], 18000, 'metropolitana', 'Santiago Centro', true, true);
*/

-- ============================================
-- ¡Listo! Las tablas han sido creadas.
-- ============================================
