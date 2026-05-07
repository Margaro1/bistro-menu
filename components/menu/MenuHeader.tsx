'use client'

import Image from 'next/image'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '@/hooks/useLanguage'

export function MenuHeader() {
  const { language, setLanguage } = useLanguage()

  return (
    <header className="bg-cream sticky top-0 z-10 px-5 py-3 flex items-center justify-between border-b border-navy/10">
      <Image
        src="/bistro-logo.jpeg"
        alt="Bistro"
        width={90}
        height={45}
        className="object-contain"
        priority
      />
      <LanguageSwitcher activeLanguage={language} onSelect={setLanguage} />
    </header>
  )
}
