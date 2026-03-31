'use client'

import Link from 'next/link'
import { Eye, ChevronLeft, ShieldCheck } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#060b14] text-white font-sans p-6 sm:p-12 selection:bg-[#00ff88]/30">
      <div className="max-w-4xl mx-auto mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ff88] hover:translate-x-[-4px] transition-transform mb-12">
          <ChevronLeft size={16} /> Back to Zynth Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
              <Eye size={24} className="text-[#00ff88]" />
           </div>
           <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none">Privacy Directive</h1>
        </div>
        
        <p className="text-gray-500 font-mono text-xs mb-12 italic">Last Modified: March 31, 2026 | Safe-Data Encryption: AES-256</p>

        <div className="space-y-12 text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">01. Data Sovereign</h2>
            <p>
              Your security data is your own. Zynth is a privacy-first platform. We do not sell your vulnerability reports, IP addresses, or scan history to any third-party marketing firms. We are an AI engine, not a data broker.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">02. Information Captured</h2>
            <div className="bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-xl p-6 mb-6">
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-[#00ff88]" />
                     Public Forensic Data: Server Headers, SSL Status, DNS
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-[#00ff88]" />
                     Authentication Data: Email, Subscription ID, Auth Logs
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-[#00ff88]" />
                     AI Context: Chat History with the Security Tutor
                  </li>
               </ul>
            </div>
            <p>
              We collect this information strictly to provide forensic insights and improve our AI remediation engine. All scan results are encrypted at rest using industry-standard protocols.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">03. AI Processing</h2>
            <p>
              Zynth uses Google Gemini's advanced LLMs to create remediation guides and explain security holes. By using Zynth, you acknowledge that your scan data is processed by our AI models to generate these professional insights. No personally identifiable information (PII) is used for training outside of your specific audit context.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">04. Right to Erasure</h2>
            <p>
              You have the "Right to be Forgotten." You can request the permanent destruction of all your scan history and user profiles at any time through your dashboard or by emailing our Zynth Command Center at <span className="text-white font-bold underline">privacy@zynthsecure.com</span>.
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
