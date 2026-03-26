import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertTriangle, Info, Clock, ExternalLink } from 'lucide-react'

// This creates the detailed report view for a specific scan ID
export default async function ScanReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch the scan and its issues
  const { data: scan } = await supabase
    .from('scans')
    .select('*, scan_issues(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!scan) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center animate-fade-up">
        <h2 className="text-2xl font-bold mb-2">Scan Not Found</h2>
        <p className="text-[var(--shield-text)] mb-6">This scan doesn't exist or you don't have permission to view it.</p>
        <Link href="/dashboard" className="btn-primary px-6 py-2">Return to Dashboard</Link>
      </div>
    )
  }

  const scoreColor = scan.score >= 80 ? '#00ff88' : scan.score >= 50 ? '#ffd700' : '#ff4444'

  return (
    <div className="animate-fade-up max-w-5xl mx-auto pb-12">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--shield-text)] hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Overview
      </Link>

      {/* Header Card */}
      <div className="card p-8 mb-8 border-t-4" style={{ borderTopColor: scoreColor }}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black">{scan.url}</h1>
              <a href={scan.url} target="_blank" rel="noopener noreferrer" className="text-[var(--shield-text)] hover:text-[#00ff88]">
                <ExternalLink size={18} />
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-[var(--shield-text)] whitespace-nowrap">
              <span className="flex items-center gap-1"><Clock size={14} /> {new Date(scan.started_at).toLocaleString()}</span>
              <span>•</span>
              <span className="uppercase text-white text-xs px-2 py-0.5 rounded bg-white/10">{scan.scan_type} Audit</span>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0 bg-[#060b14] p-4 rounded-xl border border-white/5">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--shield-text)] font-bold mb-1">Security Score</div>
              <div className="text-4xl font-black" style={{ color: scoreColor }}>{scan.score}<span className="text-xl">/100</span></div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--shield-text)] font-bold mb-1">Total Issues</div>
              <div className="text-3xl font-bold text-white">{scan.scan_issues.length}</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-8 p-5 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/5">
          <h3 className="font-bold flex items-center gap-2 mb-2"><Info size={16} className="text-[#00ff88]" /> Executive Summary</h3>
          <p className="text-sm leading-relaxed text-[var(--shield-text)]">
            {scan.executive_summary || "Automated scan completed. Review the security findings below."}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Detailed Findings</h2>

      <div className="space-y-6">
        {scan.scan_issues.length === 0 ? (
          <div className="card p-12 text-center border-dashed border-white/10 text-[var(--shield-text)] flex flex-col items-center">
             <CheckCircle className="text-[#00ff88] mb-4" size={48} />
             <h3 className="text-lg font-bold text-white mb-2">Perfect Score!</h3>
             <p>We couldn't find any common vulnerabilities on this domain.</p>
          </div>
        ) : (
          scan.scan_issues.map((issue: any) => (
            <div key={issue.id} className="card overflow-hidden group">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className={`badge-${issue.severity.toLowerCase()} text-xs font-black uppercase px-2.5 py-1 rounded tracking-wide`}>
                         {issue.severity}
                       </span>
                       <h3 className="text-lg font-bold text-white">{issue.test_name}</h3>
                    </div>
                    <p className="text-sm font-medium text-[var(--shield-text)]">{issue.description}</p>
                  </div>
                  {issue.severity === 'CRITICAL' && <AlertTriangle className="text-[#ff4444] shrink-0" size={24} />}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {/* AI Explanation */}
                  <div className="bg-[#060b14] rounded-lg p-4 border border-white/5">
                     <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-[var(--shield-text)]">What does this mean?</h4>
                     <p className="text-sm leading-relaxed text-blue-50/80">
                       {issue.ai_explanation || "No advanced explanation available for this issue."}
                     </p>
                  </div>

                  {/* AI Fix Steps */}
                  <div className="bg-[#060b14] rounded-lg p-4 border border-white/5 border-l-2 border-l-[#00ff88]">
                     <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-[var(--shield-green)]">How to fix it</h4>
                     {Array.isArray(issue.ai_fix_steps) && issue.ai_fix_steps.length > 0 ? (
                       <ol className="text-sm space-y-3">
                         {issue.ai_fix_steps.map((step: string, i: number) => (
                           <li key={i} className="flex items-start gap-2">
                             <span className="shrink-0 w-5 h-5 rounded-full bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center text-xs font-bold mt-0.5">
                               {i + 1}
                             </span>
                             <span className="text-blue-50/90 leading-relaxed">{step}</span>
                           </li>
                         ))}
                       </ol>
                     ) : (
                       <p className="text-sm text-[var(--shield-text)]">Consult your hosting provider or developer to resolve this configuration.</p>
                     )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
