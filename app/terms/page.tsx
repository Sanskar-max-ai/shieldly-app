'use client'

import Link from 'next/link'
import { Shield, ChevronLeft } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#060b14] text-white font-sans p-6 sm:p-12 selection:bg-[#00ff88]/30">
      <div className="max-w-4xl mx-auto mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ff88] hover:translate-x-[-4px] transition-transform mb-12">
          <ChevronLeft size={16} /> Back to Zynth Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
              <Shield size={24} className="text-[#00ff88]" />
           </div>
           <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">Terms of Service</h1>
        </div>
        
        <p className="text-gray-500 font-mono text-xs mb-12 italic">Last Modified: March 31, 2026 | Revision 4.1.0-SENTINEL</p>

        <div className="space-y-12 text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">01. Acceptance of Terms</h2>
            <p>
              By accessing the Zynth Autonomous Remediation Engine ("Zynth", "Service", "We"), you agree to be bound by these legal terms. Zynth is a professional-grade cybersecurity platform. Unauthorized use, including bypass of security controls or illegal targeting of infrastructure, is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">02. Authorization & Legality</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
               <p className="text-red-400 font-bold uppercase text-xs mb-2 tracking-[0.2em]">Mandatory Directive</p>
               <p className="text-sm">You MUST own the rights to any URL or domain you submit for auditing. Scanning third-party infrastructure without explicit written consent is illegal and grounds for immediate account termination without refund.</p>
            </div>
            <p>
              Zynth performs non-destructive forensic probes. However, you acknowledge that security testing can occasionally cause downtime or artifacts on under-provisioned servers. Zynth is not liable for system instability during authorized audits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">03. Autonomous Sentinel & Probes</h2>
            <p>
              Our Sentinel engine runs background network discovery (Nmap-style) and signature fingerprinting (Nuclei-style). By enabling 24/7 Monitoring, you authorize Zynth to "knock" on your system's ports at random intervals to ensure security continuity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">04. Limitation of Liability</h2>
            <p>
              Zynth is a detection and remediation *assistant*. We provide tools and AI-generated code patches ("One-Click Fixes"). You are responsible for reviewing all patches before deployment. We explicitly disclaim liability for any exploit that occurs after a scan or any system failure resulting from an AI-generated patch.
            </p>
          </section>
          
          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
             <div className="text-[10px] font-black uppercase text-gray-500 tracking-[0.5em]">End of Transmission</div>
             <Link href="/auth/signup" className="btn-primary px-8 py-3 text-sm font-black uppercase tracking-widest text-black">Agree & Start Audit</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
