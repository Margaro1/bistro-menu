'use client'

import { useState } from 'react'
import { CategoryTabs } from './CategoryTabs'
import { ProductCard } from './ProductCard'
import { useLanguage } from '@/hooks/useLanguage'
import type { Category } from '@/lib/types'

interface Props {
  categories: Category[]
}

export function ProductGrid({ categories }: Props) {
  const { language } = useLanguage()
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? 0)

  const activeCategory = categories.find(c => c.id === activeCategoryId) ?? categories[0]

  const tabCategories = categories.map(cat => ({
    id: cat.id,
    name:
      cat.category_translations.find(t => t.language === language)?.name ??
      cat.category_translations.find(t => t.language === 'es')?.name ??
      cat.slug,
  }))

  return (
    <div>
      <div className="sticky top-[60px] z-10 bg-cream py-3">
        <CategoryTabs
          categories={tabCategories}
          activeId={activeCategoryId}
          onSelect={setActiveCategoryId}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        {activeCategory?.products.map(product => (
          <ProductCard key={product.id} product={product} language={language} />
        ))}
      </div>
    </div>
  )
}
