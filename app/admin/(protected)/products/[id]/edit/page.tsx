import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'
import type { Product } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*, product_translations(*)')
    .eq('id', id)
    .single()

  if (!product) notFound()

  return (
    <div>
      <h1 className="font-playfair text-xl font-bold text-navy mb-4">Editar producto</h1>
      <ProductForm product={product as Product} />
    </div>
  )
}
