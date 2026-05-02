import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/menu/ProductCard'
import type { Product } from '@/lib/types'

const product: Product = {
  id: 1,
  category_id: 1,
  image_url: null,
  price: 45.00,
  available: true,
  created_at: '2026-01-01T00:00:00Z',
  product_translations: [
    { language: 'es', name: 'Café Latte', description: 'Espresso con leche' },
    { language: 'en', name: 'Latte', description: 'Espresso with milk' },
  ],
}

describe('ProductCard', () => {
  it('muestra nombre y descripción en el idioma activo', () => {
    render(<ProductCard product={product} language="es" />)
    expect(screen.getByText('Café Latte')).toBeInTheDocument()
    expect(screen.getByText('Espresso con leche')).toBeInTheDocument()
  })

  it('muestra nombre en inglés cuando language="en"', () => {
    render(<ProductCard product={product} language="en" />)
    expect(screen.getByText('Latte')).toBeInTheDocument()
  })

  it('muestra el precio formateado', () => {
    render(<ProductCard product={product} language="es" />)
    expect(screen.getByText('$45.00')).toBeInTheDocument()
  })

  it('muestra badge "Agotado" cuando available=false', () => {
    render(<ProductCard product={{ ...product, available: false }} language="es" />)
    expect(screen.getByText('Agotado')).toBeInTheDocument()
  })

  it('no muestra badge cuando available=true', () => {
    render(<ProductCard product={product} language="es" />)
    expect(screen.queryByText('Agotado')).not.toBeInTheDocument()
  })

  it('muestra placeholder cuando image_url es null', () => {
    render(<ProductCard product={product} language="es" />)
    expect(screen.getByTestId('product-image-placeholder')).toBeInTheDocument()
  })
})
