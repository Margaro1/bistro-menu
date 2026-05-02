import { getUIString, UI_STRINGS } from '@/lib/i18n'

describe('getUIString', () => {
  it('retorna el string correcto en cada idioma', () => {
    expect(getUIString('es', 'outOfStock')).toBe('Agotado')
    expect(getUIString('en', 'outOfStock')).toBe('Out of stock')
    expect(getUIString('ko', 'outOfStock')).toBe('품절')
    expect(getUIString('pt', 'outOfStock')).toBe('Esgotado')
    expect(getUIString('ja', 'outOfStock')).toBe('売り切れ')
  })

  it('los 5 idiomas tienen exactamente las mismas claves', () => {
    const keys = Object.keys(UI_STRINGS.es)
    for (const lang of ['en', 'ko', 'pt', 'ja'] as const) {
      expect(Object.keys(UI_STRINGS[lang]).sort()).toEqual(keys.sort())
    }
  })
})
