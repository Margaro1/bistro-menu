'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Language } from '@/lib/types'

type Translations = Record<Language, { name: string; description: string }>

export async function saveProduct(data: {
  productId?: number
  categoryId: number
  price: number
  available: boolean
  imageUrl: string | null
  translations: Translations
}) {
  const supabase = await createClient()
  const { productId, categoryId, price, available, imageUrl, translations } = data

  if (productId) {
    const { error } = await supabase
      .from('products')
      .update({ category_id: categoryId, price, available, image_url: imageUrl })
      .eq('id', productId)
    if (error) throw new Error(error.message)

    for (const lang of Object.keys(translations) as Language[]) {
      const { error: e } = await supabase
        .from('product_translations')
        .upsert(
          { product_id: productId, language: lang, ...translations[lang] },
          { onConflict: 'product_id,language' }
        )
      if (e) throw new Error(e.message)
    }
  } else {
    const { data: newProduct, error } = await supabase
      .from('products')
      .insert({ category_id: categoryId, price, available, image_url: imageUrl })
      .select()
      .single()
    if (error) throw new Error(error.message)

    for (const lang of Object.keys(translations) as Language[]) {
      const { error: e } = await supabase
        .from('product_translations')
        .insert({ product_id: newProduct.id, language: lang, ...translations[lang] })
      if (e) throw new Error(e.message)
    }
  }

  redirect('/admin')
}
