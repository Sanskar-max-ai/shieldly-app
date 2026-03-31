'use client'

import { useState, useEffect, useRef } from 'react'
import { Terminal, Loader2, Activity, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HackerTerminalProps {
  title: string
  steps: string[]
  onComplete?: () => void
  isRemediation?: boolean
  target?: string
}

export default function HackerTerminal({ 
  title, 
  steps, 
  onComplete, 
  isRemediation = false,
  target
}: HackerTerminalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${steps[currentStep]}`])
        setCurrentStep(prev => prev + 1)
      }, 300 + Math.random() * 500) // Slightly faster than before for 'snappy' feel
      return () => clearTimeout(timer)
    } else if (onComplete) {
      const timer = setTimeout(onComplete, 1200)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps, onComplete])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLines])

  const colorHex = isRemediation ? '#00d2ff' : '#00ff88'
  return (
    <div className="card overflow-hidden bg-[#060b14]/80 premium-glass shadow-[0_0_50px_rgba(0,0,0,0.6)] relative group">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Header Bar */}
      <div className="bg-white/[0.03] px-6 py-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
             <Terminal size={16} style={{ color: colorHex }} />
          </div>
          <div>
            <span className="text-[10px] font-black font-mono text-white/50 uppercase tracking-[0.2em] block leading-none mb-1">
              {isRemediation ? 'REMEDIATION_PROTOCOL_SEQ' : 'FORENSIC_AUDIT_SEQ'}
            </span>
            <span className="text-xs font-black font-mono text-white tracking-widest leading-none">
              {title}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/5" />)}
        </div>
      </div>
      
      {/* Terminal View */}
      <div className="p-6 h-[450px] overflow-y-auto font-mono text-[13px] bg-black/20 scrollbar-hide">
        <AnimatePresence initial={false}>
          {terminalLines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4 mb-2 group/line"
            >
              <span className="shrink-0 opacity-40 font-bold" style={{ color: colorHex }}>❯</span>
              <span className="text-white/80 group-hover/line:text-white transition-colors" style={{ textShadow: `0 0 10px ${colorHex}40` }}>
                {line}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {currentStep < steps.length && (
          <div className="flex gap-4 items-center mt-6">
            <Loader2 className="animate-spin" size={14} style={{ color: colorHex }} />
            <span className="animate-pulse font-black text-[11px] uppercase tracking-widest" style={{ color: colorHex, textShadow: `0 0 15px ${colorHex}80` }}>
              {isRemediation ? 'Deploying Patch' : 'Analyzing Vector'}: {steps[currentStep]}
            </span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Footer Bar */}
      <div className="bg-white/[0.03] p-6 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 gap-6">
        {target && (
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-black/40 border border-white/5">
              <Shield size={16} className="text-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] leading-none mb-1">Target_Scope</span>
              <span className="text-xs font-bold text-white/80 truncate max-w-[200px]">{target}</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
             <Activity size={14} className="opacity-30" />
             <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
               <motion.div 
                 className="h-full shadow-[0_0_10px_rgba(0,255,136,0.3)]"
                 style={{ background: colorHex }}
                 animate={{ width: `${(currentStep / steps.length) * 100}%` }}
               />
             </div>
          </div>
          <span className="text-[11px] font-black font-mono w-10 text-right" style={{ color: colorHex }}>
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
      </div>
      
      {/* Scanner Scan-line effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  )
}
