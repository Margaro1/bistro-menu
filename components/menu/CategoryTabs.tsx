'use client'

interface Category {
  id: number
  name: string
}

interface Props {
  categories: Category[]
  activeId: number
  onSelect: (id: number) => void
}

export function CategoryTabs({ categories, activeId, onSelect }: Props) {
  return (
    <div role="tablist" className="flex gap-2 overflow-x-auto pb-1 px-4 scrollbar-hide">
      {categories.map(cat => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={cat.id === activeId}
          onClick={() => onSelect(cat.id)}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${cat.id === activeId
              ? 'bg-navy text-white'
              : 'bg-white text-navy border border-navy/20 hover:bg-blue-50'}
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
