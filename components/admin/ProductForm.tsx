'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { AvailabilityToggle } from './AvailabilityToggle'
import type { Language, Product } from '@/lib/types'

const LANG_LABELS: { code: Language; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
]

const CATEGORIES = [
  { id: 1, label: 'Bebidas Calientes' },
  { id: 2, label: 'Bebidas Frías' },
  { id: 3, label: 'Platillos' },
  { id: 4, label: 'Postres' },
]

type Translations = Record<Language, { name: string; description: string }>

function emptyTranslations(): Translations {
  return {
    es: { name: '', description: '' },
    en: { name: '', description: '' },
    ko: { name: '', description: '' },
    pt: { name: '', description: '' },
    ja: { name: '', description: '' },
  }
}

interface Props {
  product?: Product
}

export function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEditing = !!product

  const [price, setPrice] = useState(product?.price?.toString() ?? '')
  const [categoryId, setCategoryId] = useState(product?.category_id ?? 1)
  const [available, setAvailable] = useState(product?.available ?? true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null)
  const [activeTab, setActiveTab] = useState<Language>('es')
  const [translations, setTranslations] = useState<Translations>(() => {
    if (!product) return emptyTranslations()
    const state = emptyTranslations()
    for (const t of product.product_translations) {
      state[t.language] = { name: t.name, description: t.description }
    }
    return state
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function updateTranslation(lang: Language, field: 'name' | 'description', value: string) {
    setTranslations(prev => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const supabase = createClient()

    try {
      let imageUrl = product?.image_url ?? null

      if (imageFile) {
        const ext = imageFile.name.split('.').pop()
        const filename = `${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filename, imageFile, { upsert: true })
        if (uploadError) throw uploadError
        imageUrl = supabase.storage.from('product-images').getPublicUrl(filename).data.publicUrl
      }

      if (isEditing) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ category_id: categoryId, price: parseFloat(price), available, image_url: imageUrl })
          .eq('id', product.id)
        if (updateError) throw updateError

        for (const lang of Object.keys(translations) as Language[]) {
          await supabase.from('product_translations')
            .upsert(
              { product_id: product.id, language: lang, ...translations[lang] },
              { onConflict: 'product_id,language' }
            )
        }
      } else {
        const { data: newProduct, error: insertError } = await supabase
          .from('products')
          .insert({ category_id: categoryId, price: parseFloat(price), available, image_url: imageUrl })
          .select()
          .single()
        if (insertError) throw insertError

        for (const lang of Object.keys(translations) as Language[]) {
          await supabase.from('product_translations')
            .insert({ product_id: newProduct.id, language: lang, ...translations[lang] })
        }
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Error al guardar. Intenta de nuevo.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-sm font-medium text-navy mb-2">Foto</p>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-blue-50 overflow-hidden flex items-center justify-center relative">
            {imagePreview ? (
              <Image src={imagePreview} alt="Preview" fill className="object-cover" sizes="80px" />
            ) : (
              <span className="text-blue-200 text-xs text-center px-1">Sin foto</span>
            )}
          </div>
          <label className="cursor-pointer bg-white border border-navy/20 text-navy text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Subir foto
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-navy mb-1">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="w-full border border-blue-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-navy mb-1">Categoría</label>
          <select
            id="category"
            value={categoryId}
            onChange={e => setCategoryId(Number(e.target.value))}
            className="w-full border border-blue-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy bg-white"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-navy">Disponible</span>
        <AvailabilityToggle
          productId={0}
          available={available}
          onToggle={(_, v) => setAvailable(v)}
        />
      </div>

      <div>
        <p className="text-sm font-medium text-navy mb-2">Nombre y descripción</p>
        <div className="flex gap-1 mb-3 border-b border-blue-100">
          {LANG_LABELS.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => setActiveTab(code)}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors -mb-px ${activeTab === code ? 'border-navy text-navy' : 'border-transparent text-gray-400 hover:text-navy'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nombre"
            value={translations[activeTab].name}
            onChange={e => updateTranslation(activeTab, 'name', e.target.value)}
            className="w-full border border-blue-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={translations[activeTab].description}
            onChange={e => updateTranslation(activeTab, 'description', e.target.value)}
            rows={2}
            className="w-full border border-blue-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-navy/20 text-navy text-sm py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-navy text-white text-sm py-2 rounded-lg hover:bg-navy/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
