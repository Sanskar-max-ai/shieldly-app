'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Palette, Upload, Lock, CheckCircle, AlertTriangle, Save, Eye } from 'lucide-react'
import Link from 'next/link'

type BrandingProfile = {
  plan: string | null
  brand_name: string | null
  brand_logo_url: string | null
  brand_color: string | null
}

export default function BrandingPage() {
  const [profile, setProfile] = useState<BrandingProfile>({
    plan: 'free',
    brand_name: '',
    brand_logo_url: '',
    brand_color: '#00ff88',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('plan, brand_name, brand_logo_url, brand_color')
          .eq('id', user.id)
          .single()
        if (data) setProfile({
          plan: data.plan || 'free',
          brand_name: data.brand_name || '',
          brand_logo_url: data.brand_logo_url || '',
          brand_color: data.brand_color || '#00ff88',
        })
      }
      setLoading(false)
    }
    getProfile()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({
        brand_name: profile.brand_name || null,
        brand_logo_url: profile.brand_logo_url || null,
        brand_color: profile.brand_color || '#00ff88',
      })
      .eq('id', user.id)

    setMessage(error
      ? { type: 'error', text: 'Failed to save branding. Please try again.' }
      : { type: 'success', text: 'White-label branding saved. Your Technical Briefs now use your brand.' }
    )
    setSaving(false)
  }

  const isAgency = profile.plan === 'agency'

  if (loading) return <div className="animate-pulse p-20 text-center text-[var(--zynthsecure-text)]">Loading branding settings...</div>

  return (
    <div className="max-w-3xl animate-fade-up">
      <Link href="/dashboard/settings" className="inline-flex items-center gap-2 text-sm text-[var(--zynthsecure-text)] hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Settings
      </Link>

      <div className="mb-8 rounded-[2rem] border border-white/8 bg-white/[0.03] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <div className="section-kicker">
          <span>White-Label</span>
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white">Agency Branding</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--zynthsecure-text)]">
          Replace Zynth branding on all Technical Brief PDFs with your own agency logo and name. Perfect for reselling security reports to your clients.
        </p>
      </div>

      {!isAgency && (
        <div className="marketing-panel p-8 mb-6 border-l-4 border-l-orange-500 bg-orange-500/5 relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-10">
            <Lock size={64} />
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <Lock size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Agency Plan Required</h3>
              <p className="text-sm text-[var(--zynthsecure-text)] leading-relaxed mb-4">
                White-label branding is an Agency-tier feature. Upgrade to start reselling professional security audits under your own brand.
              </p>
              <Link href="/dashboard/settings/billing" className="btn-primary px-6 py-2.5 text-sm">
                Upgrade to Agency →
              </Link>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className={`space-y-6 ${!isAgency ? 'opacity-50 pointer-events-none select-none' : ''}`}>

        {/* Brand Name */}
        <div className="marketing-panel p-8 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--zynthsecure-green)]/10 flex items-center justify-center text-[var(--zynthsecure-green)]">
              <Palette size={18} />
            </div>
            <h3 className="font-bold text-white">Brand Identity</h3>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--zynthsecure-text)]">Agency / Company Name</label>
            <input
              type="text"
              value={profile.brand_name || ''}
              onChange={(e) => setProfile(p => ({ ...p, brand_name: e.target.value }))}
              placeholder="e.g. Acme Security Solutions"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-[#060b14] border border-white/10 text-white focus:border-[var(--zynthsecure-green)]/50 placeholder:text-white/20"
            />
            <p className="text-[11px] text-[var(--zynthsecure-text)] mt-2 opacity-70">This replaces "Zynth Technical Brief" in the report header.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--zynthsecure-text)]">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={profile.brand_color || '#00ff88'}
                onChange={(e) => setProfile(p => ({ ...p, brand_color: e.target.value }))}
                className="h-12 w-16 rounded-lg cursor-pointer bg-transparent border border-white/10 p-1"
              />
              <input
                type="text"
                value={profile.brand_color || '#00ff88'}
                onChange={(e) => setProfile(p => ({ ...p, brand_color: e.target.value }))}
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all bg-[#060b14] border border-white/10 text-white focus:border-[var(--zynthsecure-green)]/50 font-mono"
              />
            </div>
            <p className="text-[11px] text-[var(--zynthsecure-text)] mt-2 opacity-70">Used for severity highlights and section borders in the exported brief.</p>
          </div>
        </div>

        {/* Logo URL */}
        <div className="marketing-panel p-8 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--zynthsecure-green)]/10 flex items-center justify-center text-[var(--zynthsecure-green)]">
              <Upload size={18} />
            </div>
            <h3 className="font-bold text-white">Logo</h3>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--zynthsecure-text)]">Logo Image URL</label>
            <input
              type="url"
              value={profile.brand_logo_url || ''}
              onChange={(e) => setProfile(p => ({ ...p, brand_logo_url: e.target.value }))}
              placeholder="https://your-cdn.com/logo.png"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-[#060b14] border border-white/10 text-white focus:border-[var(--zynthsecure-green)]/50 placeholder:text-white/20"
            />
            <p className="text-[11px] text-[var(--zynthsecure-text)] mt-2 opacity-70">
              Upload your logo to any CDN (Cloudflare R2, Imgur, etc.) and paste the direct image URL here. Recommended: PNG with transparent background, min 200px wide.
            </p>
          </div>

          {/* Live Preview */}
          {profile.brand_logo_url && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white p-4 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.brand_logo_url} alt="Logo preview" className="h-10 max-w-[160px] object-contain" />
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Eye size={12} /> Preview on Report
              </span>
            </div>
          )}
        </div>

        {/* Status message */}
        {message && (
          <div className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-300' : 'bg-red-500/10 border border-red-500/20 text-red-300'}`}>
            {message.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary px-8 py-3 flex items-center gap-2 text-sm font-bold">
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Branding'}
          </button>
        </div>
      </form>
    </div>
  )
}
