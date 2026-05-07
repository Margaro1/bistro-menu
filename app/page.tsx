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
      <section className="relative bg-navy h-44 flex flex-col items-center justify-center gap-2 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A227 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div className="flex items-center gap-4 px-10 w-full">
          <div className="h-px flex-1 bg-gold/30" />
          <span className="text-gold/60 text-[9px] tracking-[0.35em] uppercase font-karla">Menú Digital</span>
          <div className="h-px flex-1 bg-gold/30" />
        </div>
        <h1 className="font-playfair text-cream text-5xl font-bold tracking-widest">Bistro</h1>
        <div className="flex items-center gap-2.5">
          <div className="h-px w-8 bg-gold/40" />
          <div className="w-1 h-1 rounded-full bg-gold/50" />
          <div className="h-px w-8 bg-gold/40" />
        </div>
      </section>
      <ProductGrid categories={(categories ?? []) as Category[]} />
    </main>
  )
}
