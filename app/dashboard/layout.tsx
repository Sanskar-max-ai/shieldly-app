import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Shield, Home, Search, History, Settings, LogOut, ChevronRight } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Protect all /dashboard routes
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen hero-bg flex">
      {/* Sidebar */}
      <aside className="w-64 border-r fixed h-full flex flex-col" style={{ borderColor: 'var(--shield-border)', background: 'rgba(6,11,20,0.95)' }}>
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded shrink-0 bg-gradient-to-br from-[#00ff88] to-[#00664d] flex items-center justify-center">
              <Shield size={18} className="text-[#060b14]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--shield-white)' }}>
              Shield<span style={{ color: 'var(--shield-green)' }}>ly</span>
            </span>
          </Link>

          <nav className="space-y-1">
            {[
              { label: 'Overview', icon: Home, href: '/dashboard' },
              { label: 'New Scan', icon: Search, href: '/dashboard/scan' },
              { label: 'Scan History', icon: History, href: '/dashboard/history' },
              { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
            ].map((item) => (
              <Link key={item.label} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                style={{ color: 'var(--shield-text)' }}>
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Plan Upgrade Teaser */}
        <div className="mt-auto p-6">
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.1)' }}>
            <div className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: 'var(--shield-green)' }}>
              {profile?.plan || 'Free'} Plan
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--shield-text)' }}>
              {profile?.plan === 'free' ? 'Upgrade to Starter to unlock full AI reports.' : 'Manage your billing & usage.'}
            </p>
            <Link href="/dashboard/settings/billing" className="text-xs font-semibold flex items-center gap-1 transition-colors hover:text-white" style={{ color: 'var(--shield-green)' }}>
              View plans <ChevronRight size={12} />
            </Link>
          </div>

          <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--shield-border)' }}>
            <div className="truncate pr-2">
              <div className="text-sm font-medium text-white truncate">{profile?.full_name || 'User'}</div>
              <div className="text-xs truncate" style={{ color: 'var(--shield-text)' }}>{user.email}</div>
            </div>
            <form action="/auth/signout" method="post">
              <button type="submit" className="text-[var(--shield-text)] hover:text-white transition-colors" title="Log out">
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
