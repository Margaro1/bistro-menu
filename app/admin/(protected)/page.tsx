import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ProductList } from '@/components/admin/ProductList'
import type { Product } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*, product_translations(*)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-playfair text-xl font-bold text-navy">Productos</h1>
        <Link
          href="/admin/products/new"
          className="bg-navy text-white text-sm px-4 py-2 rounded-lg hover:bg-navy/90 transition-colors"
        >
          + Agregar
        </Link>
      </div>
      <ProductList products={(products ?? []) as Product[]} />
    </div>
  )
}
