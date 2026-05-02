'use client'

import type { Language } from '@/lib/types'

const LABELS: Record<Language, string> = {
  es: 'ES', en: 'EN',
}

interface Props {
  activeLanguage: Language
  onSelect: (lang: Language) => void
}

export function LanguageSwitcher({ activeLanguage, onSelect }: Props) {
  return (
    <div className="flex bg-white rounded-full p-0.5 shadow-sm border border-navy/10">
      {(Object.entries(LABELS) as [Language, string][]).map(([lang, label]) => (
        <button
          key={lang}
          aria-pressed={lang === activeLanguage}
          onClick={() => onSelect(lang)}
          className={`
            px-3 py-1 text-xs font-bold rounded-full transition-all duration-200
            ${lang === activeLanguage ? 'bg-navy text-cream shadow-sm' : 'text-navy/50 hover:text-navy'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
