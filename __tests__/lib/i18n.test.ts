import { getTranslation } from '../../lib/i18n';

describe('i18n', () => {
  describe('getTranslation', () => {
    it('should return the translated string for a given key', () => {
      expect(getTranslation('hello')).toBe('Hello');
    });

    it('should return the Spanish translation when language is set to es', () => {
      expect(getTranslation('hello', 'es')).toBe('Hola');
    });

    it('should return the English translation when language is set to en', () => {
      expect(getTranslation('hello', 'en')).toBe('Hello');
    });

    it('should return the key if translation is not found', () => {
      expect(getTranslation('nonexistent_key')).toBe('nonexistent_key');
    });

    it('should handle nested keys with dots', () => {
      expect(getTranslation('menu.items.breakfast')).toBe('Breakfast');
    });

    it('should handle nested keys in Spanish', () => {
      expect(getTranslation('menu.items.breakfast', 'es')).toBe('Desayuno');
    });
  });
});
