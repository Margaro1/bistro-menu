import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryTabs } from '@/components/menu/CategoryTabs'

const categories = [
  { id: 1, name: 'Bebidas Calientes' },
  { id: 2, name: 'Bebidas Frías' },
  { id: 3, name: 'Platillos' },
]

describe('CategoryTabs', () => {
  it('renderiza un tab por cada categoría', () => {
    render(<CategoryTabs categories={categories} activeId={1} onSelect={() => {}} />)
    expect(screen.getByText('Bebidas Calientes')).toBeInTheDocument()
    expect(screen.getByText('Bebidas Frías')).toBeInTheDocument()
    expect(screen.getByText('Platillos')).toBeInTheDocument()
  })

  it('llama a onSelect con el id correcto al hacer clic', async () => {
    const onSelect = jest.fn()
    render(<CategoryTabs categories={categories} activeId={1} onSelect={onSelect} />)
    await userEvent.click(screen.getByText('Bebidas Frías'))
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('marca el tab activo con aria-selected="true"', () => {
    render(<CategoryTabs categories={categories} activeId={1} onSelect={() => {}} />)
    expect(screen.getByText('Bebidas Calientes').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Bebidas Frías').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'false')
  })
})
