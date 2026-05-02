// Translation dictionaries
const translations: Record<string, Record<string, string>> = {
  en: {
    hello: 'Hello',
    'menu.items.breakfast': 'Breakfast',
  },
  es: {
    hello: 'Hola',
    'menu.items.breakfast': 'Desayuno',
  },
};

/**
 * Get a translated string for a given key and language
 * @param key - The translation key
 * @param language - The language code (default: 'en')
 * @returns The translated string or the key if translation not found
 */
export function getTranslation(key: string, language: string = 'en'): string {
  const lang = translations[language];

  if (!lang) {
    // Fall back to English if language not found
    return translations.en[key] ?? key;
  }

  return lang[key] ?? key;
}
