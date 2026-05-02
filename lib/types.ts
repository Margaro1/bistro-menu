export type Language = 'es' | 'en'

export const LANGUAGES: Language[] = ['es', 'en']

export interface CategoryTranslation {
  language: Language
  name: string
}

export interface ProductTranslation {
  language: Language
  name: string
  description: string
}

export interface Product {
  id: number
  category_id: number
  image_url: string | null
  price: number
  available: boolean
  created_at: string
  product_translations: ProductTranslation[]
}

export interface Category {
  id: number
  slug: string
  order: number
  category_translations: CategoryTranslation[]
  products: Product[]
}
