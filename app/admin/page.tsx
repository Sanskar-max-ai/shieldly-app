import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Shield, AlertCircle, Terminal, Lock } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { getAdminEmails, isAdminEmail } from '@/utils/auth/admin'

type AdminScan = {
  id: string
  url: string
  score: number | null
  status: string
  started_at: string
  profiles: {
    full_name: string | null
    email: string | null
  } | null
}

function LockedAdminState({ description }: { description: string }) {
  return (
    <div className="min-h-screen bg-[#060b14] flex items-center justify-center p-6">
      <div className="max-w-md w-full card p-8 border-[#00ff88]/20 shadow-[0_0_50px_rgba(0,255,136,0.05)]">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
            <Lock size={32} className="text-[#00ff88]" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-center text-white mb-2 uppercase tracking-tighter">Zynth Command Center</h1>
        <p className="text-center text-gray-500 text-sm mb-8">{description}</p>
        <div className="flex justify-center">
          <Link href="/dashboard" className="btn-secondary px-6 py-3 text-sm font-bold">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function AdminCommandCenter() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  if (getAdminEmails().length === 0) {
    return (
      <LockedAdminState description="Set ADMIN_EMAILS in your environment to enable the administrative command center." />
    )
  }

  if (!isAdminEmail(user.email)) {
    return (
      <LockedAdminState description="Your account is authenticated, but it has not been granted admin access." />
    )
  }

  const { data } = await supabase
    .from('scans')
    .select('id, url, score, status, started_at, profiles(full_name, email)')
    .order('started_at', { ascending: false })
    .limit(50)

  const scans = (data ?? []) as unknown as AdminScan[]

  return (
    <div className="min-h-screen bg-[#060b14] text-white font-sans p-6 sm:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/20">
              <Shield size={24} className="text-[#00ff88]" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Zynth Command Center</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-[10px] text-[#00ff88] font-bold uppercase tracking-widest">Global Administrative Uplink Active</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="card px-6 py-4 border-white/5 bg-white/[0.02]">
              <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Total Scans</div>
              <div className="text-2xl font-black">{scans.length}</div>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertCircle size={20} className="text-[#00ff88]" /> Recent Forensic Activity
            </h2>
          </div>

          <div className="card overflow-hidden border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-gray-500 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Target URL</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {scans.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">No scans have been recorded yet.</td>
                    </tr>
                  ) : scans.map((scan) => (
                    <tr key={scan.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{scan.profiles?.full_name}</div>
                        <div className="text-[10px] text-gray-500">{scan.profiles?.email}</div>
                      </td>
                      <td className="px-6 py-4 uppercase tracking-tighter text-[#00ff88] font-black">{scan.url}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${(scan.score ?? 0) >= 90 ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-red-500/10 text-red-500'}`}>
                          {scan.score ?? 0}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 uppercase text-[10px] font-black tracking-widest">{scan.status}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(scan.started_at).toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/dashboard/scan/${scan.id}`} className="text-[#00ff88] hover:underline">View Forensic Detail</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-6 border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 text-[#00ff88] mb-3">
              <Terminal size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Admin Access Model</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Admin access is now controlled by the server-side ADMIN_EMAILS environment variable instead of a client-side shared secret.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
