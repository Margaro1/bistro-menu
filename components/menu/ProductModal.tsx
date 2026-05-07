'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import type { Language, Product } from '@/lib/types'
import { getUIString } from '@/lib/i18n'

interface Props {
  product: Product
  language: Language
  onClose: () => void
}

export function ProductModal({ product, language, onClose }: Props) {
  const translation =
    product.product_translations.find(t => t.language === language) ??
    product.product_translations.find(t => t.language === 'es') ??
    { name: '', description: '' }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-end animate-fade-in">
      <div className="absolute inset-0 bg-navy/50" onClick={onClose} />

      <div className="relative w-full bg-white rounded-t-3xl overflow-hidden max-h-[88vh] flex flex-col animate-slide-up">
        <div className="relative aspect-[4/3] bg-cream flex-shrink-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={translation.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-navy/20">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-white transition-colors duration-200"
            aria-label="Cerrar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          {!product.available && (
            <div className="absolute inset-0 bg-cream/70 flex items-center justify-center">
              <span className="bg-navy text-cream text-sm font-semibold px-4 py-2 rounded-full tracking-wide">
                {getUIString(language, 'outOfStock')}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-playfair font-bold text-navy text-2xl leading-tight flex-1">
              {translation.name}
            </h2>
            <p className="font-playfair font-bold text-gold text-2xl flex-shrink-0">
              ${product.price.toFixed(2)}
            </p>
          </div>
          {translation.description && (
            <p className="text-navy/70 text-sm mt-3 leading-relaxed">
              {translation.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
