'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, Lock, Zap, Brain, Globe, Cpu, Smartphone, Cloud, ArrowRight } from 'lucide-react'
import CyberBackground from '@/components/ui/CyberBackground'

// ── Components ─────────────────────────────────────────────────────────────

function Navbar() {
  const router = useRouter()
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 premium-glass"
      style={{ borderBottom: '1px solid var(--zynthsecure-border)' }}>
      <div 
        className="flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
        onClick={() => router.push('/')}
      >
        <ShieldLogo size={32} />
        <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--zynthsecure-white)' }}>
          Zynt<span style={{ color: 'var(--zynthsecure-green)' }}>hSecure</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['Features', 'Pricing', 'FAQ'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`}
            className="text-sm font-medium transition-colors hover:text-[var(--zynthsecure-green)]"
            style={{ color: 'var(--zynthsecure-text)' }}>
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link href="/auth/login" className="btn-secondary text-sm px-4 py-2 font-medium">Log in</Link>
        <Link href="/auth/signup" className="btn-primary text-sm px-4 py-2">Get Free Audit</Link>
      </div>
    </motion.nav>
  )
}

function ShieldLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 3L5 9v10c0 9.5 6.5 18.4 15 21 8.5-2.6 15-11.5 15-21V9L20 3z"
        fill="url(#logo-grad)" stroke="rgba(0,255,136,0.4)" strokeWidth="1" />
      <path d="M14 20l4 4 8-8" stroke="#060b14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="logo-grad" x1="5" y1="3" x2="35" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00ff88" />
          <stop offset="1" stopColor="#00d2ff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ShieldCore() {
  return (
    <div className="relative w-64 h-64 md:w-[450px] md:h-[450px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-[var(--zynthsecure-green)]/20 border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-[var(--zynthsecure-accent)]/20 border-dashed"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 20px rgba(0, 255, 136, 0.2)",
              "0 0 40px rgba(0, 255, 136, 0.4)",
              "0 0 20px rgba(0, 255, 136, 0.2)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 md:w-56 md:h-56 rounded-full flex items-center justify-center bg-gradient-to-br from-[#00ff88]/10 to-[#00d2ff]/10 backdrop-blur-3xl border border-white/20 relative"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[var(--zynthsecure-green)]/5 blur-3xl"
          />
          <Shield size={80} className="text-[#00ff88] relative z-10 drop-shadow-[0_0_20px_rgba(0,255,136,0.6)]" />
        </motion.div>
      </div>
    </div>
  )
}

function Hero() {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    let scanUrl = url.trim()
    if (!scanUrl.startsWith('http')) scanUrl = 'https://' + scanUrl
    router.push(`/auth/signup?url=${encodeURIComponent(scanUrl)}`)
  }

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
      <CyberBackground />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-8 premium-glass text-[var(--zynthsecure-green)] border border-[var(--zynthsecure-green)]/20 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
            <span className="w-2 h-2 rounded-full bg-[var(--zynthsecure-green)] animate-pulse" />
            ZYNTHSECURE SENTINEL v4.1 IS LIVE
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] mb-8"
          >
            The Autonomous
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d2ff] to-[#00ff88] bg-[length:200%_auto] animate-shimmer">
              Remediation Engine.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl max-w-xl mb-12 text-[var(--zynthsecure-text)] leading-relaxed"
          >
            ZynthSecure is the world&apos;s first AI-powered security engine that identifies critical holes and delivers <span className="text-white font-bold underline decoration-[var(--zynthsecure-green)] decoration-2 underline-offset-4">One-Click patches</span> to secure your infrastructure instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-lg"
          >
            <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://yourbusiness.com"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-[var(--zynthsecure-green)] transition-all text-white font-medium backdrop-blur-md group-hover:bg-white/[0.08]"
                />
                <div className="absolute inset-0 rounded-2xl border border-[var(--zynthsecure-green)]/0 pointer-events-none group-focus-within:border-[var(--zynthsecure-green)]/30 transition-all scale-[1.02] opacity-0 group-focus-within:opacity-100" />
              </div>
              <button type="submit" className="btn-primary px-8 py-4 flex items-center justify-center gap-2 group whitespace-nowrap">
                Initialize Audit
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="flex flex-wrap gap-6 mt-10 opacity-50">
              {[
                { icon: Zap, text: '60-Sec Result' },
                { icon: Brain, text: 'AI-Generated Fixes' },
                { icon: Lock, text: 'No CC Required' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-white">
                  <item.icon size={14} className="text-[#00ff88]" /> {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "circOut" }}
          className="flex items-center justify-center relative select-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.1)_0%,transparent_70%)] blur-3xl animate-pulse" />
          <ShieldCore />
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 hidden md:block"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--zynthsecure-green)] to-transparent" />
      </motion.div>
    </header>
  )
}

function FeatureGrid() {
  const features = [
    { n: '01', icon: Globe, title: 'Website Audit', desc: 'Deep forensic scan of any URL — privacy, hacking shields, and brand security.' },
    { n: '02', icon: Cpu, title: 'API Security', desc: 'Automated testing for REST/GraphQL APIs and prompt injection detection.' },
    { n: '03', icon: Smartphone, title: 'Mobile Audit', desc: 'Analyzes APK/IPA binaries for insecure storage and exposed API keys.' },
    { n: '04', icon: Cloud, title: 'Cloud Sentinel', desc: 'Audits AWS/GCP config for exposed buckets and permissive IAM roles.' },
  ]

  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4">Autonomous Capability Hub</h2>
          <p className="text-[var(--zynthsecure-text)] max-w-xl mx-auto">ZynthSecure covers every vector of your digital infrastructure path.</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-10 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[var(--zynthsecure-green)]/10 group-hover:scale-110 transition-all duration-500">
                <f.icon className="text-[var(--zynthsecure-green)]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-sm text-[var(--zynthsecure-text)] leading-relaxed group-hover:text-white transition-colors">{f.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-[var(--zynthsecure-green)] font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform">
                EXPLORE STACK <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Comparison() {
  const rows = [
    { factor: 'Forensic Speed', them: '1-3 Weeks', us: '60 Seconds' },
    { factor: 'Actionability', them: 'Raw Tech Report', us: 'Step-by-step Fixes' },
    { factor: 'Remediation', them: 'Hire Developers', us: 'One-Click Patches' },
    { factor: 'Audit Integrity', them: 'Subjective Review', us: 'Signed Forensic Logic' },
    { factor: 'Cost Basis', them: '$5,000+ Setup', us: '$0 Initialization' },
  ]

  return (
    <section className="py-32 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-black tracking-[0.3em] text-[var(--zynthsecure-green)] uppercase mb-4 block">Benchmark Audit</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Why ZynthSecure Wins</h2>
          <p className="text-[var(--zynthsecure-text)] max-w-2xl mx-auto">Traditional forensic firms can&apos;t compete with autonomous code-speed.</p>
        </motion.div>
        
        <div className="card overflow-visible p-1 pointer-events-none sm:pointer-events-auto">
          <div className="grid grid-cols-3 p-8 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--zynthsecure-text)] border-b border-white/5 opacity-50">
            <div>Vector</div><div>Traditional Firms</div><div className="text-[#00ff88]">ZynthSecure AI</div>
          </div>
          {rows.map((r, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 10 }}
              className="grid grid-cols-3 p-8 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-all cursor-default"
            >
              <div className="font-bold text-sm md:text-base">{r.factor}</div>
              <div className="text-sm text-[var(--zynthsecure-text)]">{r.them}</div>
              <div className="text-sm md:text-base font-black text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.3)]">{r.us}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-32 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden relative p-16 md:p-32 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/30 via-[#00d2ff]/20 to-[#00ff88]/30 animate-plasma animate-[spin_20s_linear_infinite] opacity-40 blur-3xl scale-150" />
        <div className="absolute inset-0 premium-glass border border-white/10" />
        
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter"
          >
            NO MORE
            <br />
            GUESSWORK.
          </motion.h2>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/70 mb-14 leading-relaxed">
            Deploy the world&apos;s most advanced autonomous security engine. Get your first comprehensive audit in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/auth/signup" className="btn-primary px-12 py-5 text-xl">Initialize Sentinel Audit</Link>
            <Link href="#pricing" className="btn-secondary px-12 py-5 text-xl font-bold">Platform Pricing</Link>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-12 opacity-30 grayscale contrast-200">
            {['SOC2', 'GDPR', 'HIPAA', 'PCI'].map(t => (
              <span key={t} className="text-2xl font-black">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5 bg-[#060b14]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <ShieldLogo size={28} />
            <span className="text-2xl font-black">ZynthSecure</span>
          </div>
          <p className="text-[var(--zynthsecure-text)] max-w-sm mb-8 leading-relaxed">
            The global baseline for autonomous security remediation. We don&apos;t just find holes. We fix them while you sleep.
          </p>
          <div className="flex gap-4">
             {/* Social placeholders */}
             {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />)}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Platform</h4>
          <ul className="space-y-4 text-sm text-[var(--zynthsecure-text)]">
            <li><Link href="/" className="hover:text-white transition-colors">Audit Engine</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Remediation Hub</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Expert Network</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Legal</h4>
          <ul className="space-y-4 text-sm text-[var(--zynthsecure-text)]">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            <li><Link href="/security" className="hover:text-white transition-colors">Security Schema</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 opacity-50">
        <div className="text-xs">© 2026 ZynthSecure AI. All rights reserved.</div>
        <div className="text-xs flex gap-6 mt-4 md:mt-0">
          <span>LATENCY: 14ms</span>
          <span>UPTIME: 100.00%</span>
        </div>
      </div>
    </footer>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-[#060b14] text-white selection:bg-[#00ff88] selection:text-black min-h-screen">
      <Navbar />
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        <FeatureGrid />
        <Comparison />
        <CTA />
      </div>
      <Footer />
    </main>
  )
}
