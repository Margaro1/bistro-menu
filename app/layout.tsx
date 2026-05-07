import type { Metadata } from 'next'
import { Playfair_Display, Karla } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bistro — Menú',
  description: 'Menú digital de Bistro Café',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${karla.variable}`}>
      <body className="font-karla bg-cream min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
