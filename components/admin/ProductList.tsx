'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AvailabilityToggle } from './AvailabilityToggle'
import type { Product } from '@/lib/types'

interface Props {
  products: Product[]
}

export function ProductList({ products: initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts)

  async function handleToggle(id: number, newValue: boolean) {
    const supabase = createClient()
    await supabase.from('products').update({ available: newValue }).eq('id', id)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, available: newValue } : p))
  }

  return (
    <div className="space-y-2">
      {products.map(product => {
        const name = product.product_translations.find(t => t.language === 'es')?.name ?? 'Sin nombre'
        return (
          <div key={product.id} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-blue-50 flex-shrink-0 relative">
              {product.image_url ? (
                <Image src={product.image_url} alt={name} fill className="object-cover" sizes="48px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-blue-200 text-xs">—</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-navy text-sm truncate">{name}</p>
              <p className="text-gray-400 text-xs">${product.price.toFixed(2)}</p>
            </div>
            <AvailabilityToggle productId={product.id} available={product.available} onToggle={handleToggle} />
            <Link href={`/admin/products/${product.id}/edit`} className="text-xs text-navy/60 hover:text-navy underline">
              Editar
            </Link>
          </div>
        )
      })}
    </div>
  )
}
