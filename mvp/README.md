# ProfeChile MVP

MVP de plataforma de clases particulares en Chile. Los profesores publican su perfil y los apoderados los contactan por WhatsApp.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth & DB**: Supabase (preparado para integrar)
- **Icons**: Lucide React
- **Language**: TypeScript

## Características del MVP

- ✅ Landing page atractiva
- ✅ Búsqueda de profesores con filtros
- ✅ Perfiles de profesores
- ✅ Contacto directo por WhatsApp
- ✅ Registro de profesores (formulario multi-step)
- ✅ Registro de apoderados
- ✅ 100% responsive
- ⏳ Autenticación con Supabase (preparado)
- ⏳ Base de datos real (usando mock data por ahora)

## Instalación

```bash
# 1. Ir a la carpeta del MVP
cd mvp

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.local.example .env.local

# 4. Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Configurar Supabase (opcional)

1. Crea una cuenta gratis en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings > API y copia las credenciales
4. Pega las credenciales en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

5. Ejecuta el SQL de la tabla profesores en el SQL Editor de Supabase:

```sql
-- Tabla de profesores
CREATE TABLE profesores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  foto_url TEXT,
  titulo TEXT NOT NULL,
  universidad TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  experiencia_anos INTEGER NOT NULL,
  materias TEXT[] NOT NULL,
  niveles TEXT[] NOT NULL,
  modalidad TEXT[] NOT NULL,
  precio_hora INTEGER NOT NULL,
  region TEXT NOT NULL,
  comuna TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_resenas INTEGER DEFAULT 0,
  verificado BOOLEAN DEFAULT false,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE profesores ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede ver profesores activos
CREATE POLICY "Profesores públicos" ON profesores
  FOR SELECT USING (activo = true);

-- Política: profesores pueden editar su propio perfil
CREATE POLICY "Profesores editan su perfil" ON profesores
  FOR UPDATE USING (auth.uid() = user_id);
```

## Deploy en Vercel (Gratis)

1. Sube el código a GitHub
2. Ve a [vercel.com](https://vercel.com) y conecta tu repo
3. Agrega las variables de entorno de Supabase
4. ¡Listo! Vercel despliega automáticamente

```bash
# O usa el CLI de Vercel
npx vercel
```

## Estructura del Proyecto

```
mvp/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── page.tsx           # Home
│   │   ├── profesores/        # Lista de profesores
│   │   ├── profesor/[id]/     # Perfil de profesor
│   │   ├── login/             # Login
│   │   ├── registro/          # Registro apoderados
│   │   └── registro-profesor/ # Registro profesores
│   ├── components/            # Componentes reutilizables
│   ├── lib/                   # Utilidades y config
│   │   ├── supabase.ts       # Cliente Supabase
│   │   └── mockData.ts       # Datos de prueba
│   └── types/                 # TypeScript types
├── public/                    # Assets estáticos
└── package.json
```

## Próximos Pasos

1. **Conectar Supabase real** - Reemplazar mock data
2. **Subir fotos** - Usar Supabase Storage
3. **Sistema de reseñas** - Que apoderados puedan calificar
4. **Panel de profesor** - Para editar su perfil
5. **Pagos** - Integrar Flow.cl o Webpay (cuando sea necesario)

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Iniciar producción
npm run lint     # Verificar código
```

---

Hecho con ❤️ para el mercado chileno 🇨🇱
