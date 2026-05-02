import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy text-white px-4 py-3 flex items-center justify-between">
        <span className="font-playfair font-bold text-lg">Bistro Admin</span>
        <form action="/auth/signout" method="post">
          <button type="submit" className="text-sm text-white/70 hover:text-white transition-colors">
            Cerrar sesión
          </button>
        </form>
      </header>
      <main className="max-w-lg mx-auto p-4">{children}</main>
    </div>
  )
}
