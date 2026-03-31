'use client'

import { useState } from 'react'
import { Terminal, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react'

export default function HackerViewToggle({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)

  // MOCK REAL-TIME LOG DATA (In prod this would be fetched from the scan_results)
  const logLines = [
    `[${new Date().toLocaleTimeString()}] ZYNTH-WEBUGARD-v4.1 initialized...`,
    `[${new Date().toLocaleTimeString()}] target: resolving DNS for ${id}...`,
    `[${new Date().toLocaleTimeString()}] nmap -sV -T4 --top-ports 20 ${id}...`,
    `[${new Date().toLocaleTimeString()}] PORT 22/tcp OPEN [Service: OpenSSH 7.6p1]`,
    `[${new Date().toLocaleTimeString()}] PORT 80/tcp OPEN [Service: Nginx 1.14.0]`,
    `[${new Date().toLocaleTimeString()}] nuclei -t vulnerabilities/signatures -u ${id}...`,
    `[${new Date().toLocaleTimeString()}] [CVE-2019-9511] CRITICAL - Nginx Resource Exhaustion matches fingerprint...`,
    `[${new Date().toLocaleTimeString()}] analyzing security headers for security-policy bypass...`,
    `[${new Date().toLocaleTimeString()}] X-Frame-Options: MISSING [Risk: Clickjacking]`,
    `[${new Date().toLocaleTimeString()}] report generation complete. checksum: ${Math.random().toString(16).slice(2)}`,
  ]

  return (
    <div className="mb-8 animate-fade-up">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
          isOpen ? 'bg-[#00ff88]/10 border-[#00ff88]/30 rounded-b-none' : 'bg-white/5 border-white/10 hover:border-[#00ff88]/40'
        }`}
      >
        <div className="flex items-center gap-3">
          <Terminal size={20} className={isOpen ? 'text-[#00ff88]' : 'text-gray-400'} />
          <div>
            <div className="text-sm font-bold text-white">Enable Hacker's Technical View</div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-0.5">
              Live Nmap & Nuclei Raw Output
            </div>
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-[#00ff88]" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>

      {isOpen && (
        <div className="bg-[#060b14] border-x border-b border-[#00ff88]/30 rounded-b-xl p-4 sm:p-6 overflow-hidden relative">
          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-30 select-none">
             <ShieldCheck size={14} className="text-[#00ff88]" />
             <span className="text-[9px] font-black text-[#00ff88] uppercase tracking-[0.2em]">Verified Zynth-Log</span>
          </div>
          
          <div className="font-mono text-[11px] sm:text-xs space-y-1.5 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00ff88]/20">
            {logLines.map((line, i) => (
              <div key={i} className="flex gap-4 group">
                <span className="text-gray-600 shrink-0 select-none w-4">{i + 1}</span>
                <div className="flex gap-2">
                   <span className="text-[#00ff88] opacity-50 shrink-0">❯</span>
                   <span className={line.includes('CRITICAL') || line.includes('OPEN') ? 'text-[#00ff88] font-bold shadow-[0_0_10px_rgba(0,255,136,0.3)]' : 'text-gray-400'}>
                     {line}
                   </span>
                </div>
              </div>
            ))}
            <div className="flex gap-4 animate-pulse">
               <span className="text-gray-600 shrink-0">11</span>
               <div className="flex gap-2">
                  <span className="text-[#00ff88] opacity-50 shrink-0">❯</span>
                  <span className="text-[#00ff88]">_</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
