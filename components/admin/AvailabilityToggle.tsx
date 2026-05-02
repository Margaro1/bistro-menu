'use client'

interface Props {
  productId: number
  available: boolean
  onToggle: (id: number, newValue: boolean) => void
}

export function AvailabilityToggle({ productId, available, onToggle }: Props) {
  return (
    <button
      role="switch"
      aria-checked={available}
      onClick={() => onToggle(productId, !available)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-1 ${available ? 'bg-navy' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${available ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}
      />
    </button>
  )
}
