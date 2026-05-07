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
      className={`cursor-pointer group rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col w-full text-left transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 active:shadow-sm ${!product.available ? 'opacity-60' : ''}`}
    >
      <div className="relative aspect-square bg-cream overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={translation.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
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
        {product.image_url && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />
        )}
        <span className="absolute bottom-2.5 right-2.5 font-playfair font-bold text-white text-sm bg-gold px-2.5 py-0.5 rounded-full shadow-md">
          ${product.price.toFixed(2)}
        </span>
        {!product.available && (
          <div className="absolute inset-0 bg-cream/75 flex items-center justify-center">
            <span className="bg-navy text-cream text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              {getUIString(language, 'outOfStock')}
            </span>
          </div>
        )}
      </div>
      <div className="px-3 py-2.5 flex flex-col gap-0.5">
        <p className="font-playfair font-bold text-navy text-sm leading-tight">{translation.name}</p>
        {translation.description && (
          <p className="text-navy/50 text-[11px] leading-snug line-clamp-1">{translation.description}</p>
        )}
      </div>
    </button>
  )
}
