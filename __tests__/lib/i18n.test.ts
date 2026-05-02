import { getUIString, UI_STRINGS } from '@/lib/i18n'

describe('getUIString', () => {
  it('retorna el string correcto en cada idioma', () => {
    expect(getUIString('es', 'outOfStock')).toBe('Agotado')
    expect(getUIString('en', 'outOfStock')).toBe('Out of stock')
  })

  it('los 2 idiomas tienen exactamente las mismas claves', () => {
    const keys = Object.keys(UI_STRINGS.es)
    expect(Object.keys(UI_STRINGS.en).sort()).toEqual(keys.sort())
  })
})
