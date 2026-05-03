import Image from 'next/image'
import type { Language, Product } from '@/lib/types'
import { getUIString } from '@/lib/i18n'

interface Props {
  product: Product
  language: Language
  onClick?: () => void
}

export function ProductCard({ product, language, onClick }: Props) {
  const translation =
    product.product_translations.find(t => t.language === language) ??
    product.product_translations.find(t => t.language === 'es') ??
    { name: '', description: '' }

  return (
    <button
      onClick={onClick}
      className={`rounded-2xl overflow-hidden bg-white shadow-md flex flex-col w-full text-left active:scale-95 transition-transform duration-150 ${!product.available ? 'opacity-50' : ''}`}
    >
      <div className="relative aspect-[4/3] bg-cream">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={translation.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div
            data-testid="product-image-placeholder"
            className="w-full h-full flex items-center justify-center text-navy/20"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-cream/70 flex items-center justify-center">
            <span className="bg-navy text-cream text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              {getUIString(language, 'outOfStock')}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1">
        <p className="font-playfair font-bold text-navy text-sm leading-snug">{translation.name}</p>
        {translation.description && (
          <p className="text-navy/50 text-xs leading-snug line-clamp-2">{translation.description}</p>
        )}
        <p className="font-playfair font-bold text-navy text-base mt-auto pt-1">${product.price.toFixed(2)}</p>
      </div>
    </button>
  )
}
