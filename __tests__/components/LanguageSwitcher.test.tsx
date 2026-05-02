import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSwitcher } from '@/components/menu/LanguageSwitcher'

describe('LanguageSwitcher', () => {
  it('renderiza los 5 idiomas', () => {
    render(<LanguageSwitcher activeLanguage="es" onSelect={() => {}} />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('KO')).toBeInTheDocument()
    expect(screen.getByText('PT')).toBeInTheDocument()
    expect(screen.getByText('JA')).toBeInTheDocument()
  })

  it('llama a onSelect con el idioma correcto al hacer clic', async () => {
    const onSelect = jest.fn()
    render(<LanguageSwitcher activeLanguage="es" onSelect={onSelect} />)
    await userEvent.click(screen.getByText('EN'))
    expect(onSelect).toHaveBeenCalledWith('en')
  })

  it('marca el idioma activo con aria-pressed="true"', () => {
    render(<LanguageSwitcher activeLanguage="ko" onSelect={() => {}} />)
    expect(screen.getByText('KO')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('ES')).toHaveAttribute('aria-pressed', 'false')
  })
})
