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
            cursor-pointer flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${cat.id === activeId
              ? 'bg-navy text-cream shadow-md'
              : 'bg-white text-navy/60 shadow-sm hover:text-navy hover:shadow-md'}
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
