'use client'

import Image from 'next/image'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '@/hooks/useLanguage'

export function MenuHeader() {
  const { language, setLanguage } = useLanguage()

  return (
    <header className="bg-cream sticky top-0 z-10 border-b border-blue-50 px-4 py-3 flex items-center justify-between">
      <Image
        src="/bistro-logo.jpeg"
        alt="Bistro"
        width={80}
        height={40}
        className="object-contain"
        priority
      />
      <LanguageSwitcher activeLanguage={language} onSelect={setLanguage} />
    </header>
  )
}
