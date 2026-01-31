# ProfeChile - Landing Page

Landing page para una plataforma de clases particulares en Chile, donde profesores pueden publicar su perfil y ofrecer clases a estudiantes de primaria y secundaria.

## Características

- **Diseño moderno y responsive**: Se adapta a todos los dispositivos (desktop, tablet, móvil)
- **Secciones completas**:
  - Hero con buscador de profesores
  - Cómo funciona (3 pasos)
  - Materias disponibles (Matemáticas, Lenguaje, Ciencias, etc.)
  - Profesores destacados
  - Sección para profesores (registro)
  - Testimonios de usuarios
  - Precios transparentes
  - Preguntas frecuentes (FAQ)
  - Footer con links y redes sociales

## Tecnologías

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Animaciones)
- JavaScript (ES6+)
- Font Awesome (iconos)
- Google Fonts (Inter)

## Estructura de Archivos

```
landing-teacher/
├── index.html      # Página principal
├── styles.css      # Estilos CSS
├── script.js       # JavaScript para interactividad
└── README.md       # Este archivo
```

## Cómo Usar

1. **Abrir localmente**: Simplemente abre `index.html` en tu navegador

2. **Con servidor local** (recomendado):
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (npx)
   npx serve
   
   # Con Live Server de VS Code
   # Click derecho en index.html > "Open with Live Server"
   ```

3. Visita `http://localhost:8000` (o el puerto que uses)

## Funcionalidades JavaScript

- **Navbar con scroll**: Cambia de transparente a sólido al hacer scroll
- **Menú móvil**: Toggle para navegación en dispositivos pequeños
- **FAQ Acordeón**: Preguntas que se expanden/contraen
- **Smooth scroll**: Navegación suave a las secciones
- **Animaciones al scroll**: Elementos aparecen con animación al entrar en viewport
- **Contador animado**: Los números del hero se animan
- **Parallax sutil**: Tarjetas flotantes siguen el mouse
- **Toast notifications**: Sistema de notificaciones

## Personalización

### Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --primary: #4F46E5;       /* Color principal (morado/índigo) */
    --secondary: #10B981;     /* Color secundario (verde) */
    --accent: #F59E0B;        /* Color de acento (amarillo/naranja) */
    /* ... más colores */
}
```

### Contenido
- Modifica el texto directamente en `index.html`
- Cambia las imágenes por URLs propias (actualmente usa Unsplash)
- Ajusta los precios de ejemplo según el mercado

### Logos de universidades
Actualmente son texto plano. Para agregar logos reales:
1. Reemplaza los divs `.trust-logo` por imágenes
2. Ajusta los estilos en `.trust-logos`

## Próximos Pasos (Sugerencias)

Para convertir esta landing en una plataforma funcional:

1. **Backend**: Implementar con Node.js, Django, Laravel, etc.
2. **Base de datos**: PostgreSQL o MongoDB para usuarios y clases
3. **Autenticación**: Sistema de login para profesores y apoderados
4. **Pagos**: Integrar Webpay, Mercado Pago o Stripe
5. **Videollamadas**: Integrar Zoom API o Jitsi
6. **Panel de administración**: Dashboard para gestionar la plataforma

## Licencia

Este proyecto está disponible para uso personal y comercial.

---

Hecho con ❤️ para el mercado chileno 🇨🇱
