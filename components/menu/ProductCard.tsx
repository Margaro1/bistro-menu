import Image from 'next/image'
import type { Language, Product } from '@/lib/types'
import { getUIString } from '@/lib/i18n'

interface Props {
  product: Product
  language: Language
}

export function ProductCard({ product, language }: Props) {
  const translation =
    product.product_translations.find(t => t.language === language) ??
    product.product_translations.find(t => t.language === 'es') ??
    { name: '', description: '' }

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-white shadow-sm border border-blue-50 ${!product.available ? 'opacity-60' : ''}`}>
      <div className="relative aspect-square bg-blue-50">
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
            className="w-full h-full flex items-center justify-center text-blue-200"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
        {!product.available && (
          <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded-full">
            {getUIString(language, 'outOfStock')}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="font-semibold text-navy text-sm leading-tight">{translation.name}</p>
        {translation.description && (
          <p className="text-gray-500 text-xs mt-1 leading-tight line-clamp-2">{translation.description}</p>
        )}
        <p className="text-navy font-bold mt-2 text-sm">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}
