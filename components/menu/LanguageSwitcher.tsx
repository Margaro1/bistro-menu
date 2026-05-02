'use client'

import type { Language } from '@/lib/types'

const LABELS: Record<Language, string> = {
  es: 'ES', en: 'EN', ko: 'KO', pt: 'PT', ja: 'JA',
}

interface Props {
  activeLanguage: Language
  onSelect: (lang: Language) => void
}

export function LanguageSwitcher({ activeLanguage, onSelect }: Props) {
  return (
    <div className="flex gap-1">
      {(Object.entries(LABELS) as [Language, string][]).map(([lang, label]) => (
        <button
          key={lang}
          aria-pressed={lang === activeLanguage}
          onClick={() => onSelect(lang)}
          className={`
            px-2 py-1 text-xs font-bold rounded transition-colors
            ${lang === activeLanguage ? 'text-navy underline underline-offset-2' : 'text-navy/50 hover:text-navy'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
