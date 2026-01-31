import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ProfeChile - Encuentra tu Profesor Particular Ideal',
  description: 'Plataforma de clases particulares en Chile. Encuentra profesores de primaria y secundaria para clases online o presenciales.',
  keywords: 'profesores particulares, clases particulares, Chile, matemáticas, lenguaje, ciencias, PAES',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CL">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
