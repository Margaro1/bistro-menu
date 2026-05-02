import { createClient } from '@/lib/supabase/server'
import { MenuHeader } from '@/components/menu/MenuHeader'
import { ProductGrid } from '@/components/menu/ProductGrid'
import type { Category } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function MenuPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select(`
      *,
      category_translations(*),
      products(
        *,
        product_translations(*)
      )
    `)
    .order('order')

  return (
    <main className="max-w-lg mx-auto">
      <MenuHeader />
      <ProductGrid categories={(categories ?? []) as Category[]} />
    </main>
  )
}
