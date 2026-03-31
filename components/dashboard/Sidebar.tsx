'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { User } from '@supabase/supabase-js'
import { Shield, Home, History, LogOut, Menu, X, Target, Zap } from 'lucide-react'

interface SidebarProfile {
  full_name: string | null
}

interface SidebarProps {
  profile: SidebarProfile | null
  user: User
}

export default function Sidebar({ profile, user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: 'Overview', icon: Home, href: '/dashboard' },
    { label: 'New Audit', icon: Target, href: '/dashboard/scan' },
    { label: 'Forensic History', icon: History, href: '/dashboard/history' },
    { label: 'Security Hub', icon: Zap, href: '/dashboard/settings', badge: 'PRO' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="lg:hidden fixed top-4 left-4 z-[100] p-3 rounded-2xl premium-glass border border-white/10 text-white shadow-xl"
          >
            <Menu size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Aside */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 border-r border-white/5 flex flex-col z-[90] transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1) lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'rgba(6,11,20,0.8)', backdropFilter: 'blur(30px)' }}
      >
        {/* Scanner Light Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <motion.div
            animate={{ y: ['-100%', '300%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/4 bg-gradient-to-b from-transparent via-[var(--zynthsecure-green)] to-transparent opacity-20 blur-3xl"
          />
        </div>

        <div className="p-8 flex-1">
          <div className="flex items-center justify-between mb-12">
            <Link href="/dashboard" className="flex items-center gap-3 px-2 group" onClick={() => setIsOpen(false)}>
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.8 }}
                className="w-10 h-10 rounded-xl bg-[var(--zynthsecure-green)]/10 flex items-center justify-center border border-[var(--zynthsecure-green)]/30 group-hover:bg-[var(--zynthsecure-green)]/20 transition-colors"
              >
                <Shield className="text-[var(--zynthsecure-green)]" size={24} />
              </motion.div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                Zynt<span className="text-[var(--zynthsecure-green)]">hSecure</span>
              </span>
            </Link>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-4">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all relative overflow-hidden ${
                      isActive ? 'bg-white/5 text-white' : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-gradient-to-r from-[var(--zynthsecure-green)]/10 to-transparent border-l-2 border-[var(--zynthsecure-green)]"
                      />
                    )}
                    <item.icon size={20} className={isActive ? 'text-[var(--zynthsecure-green)]' : 'group-hover:text-white transition-colors'} />
                    <span className="relative z-10">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full bg-[var(--zynthsecure-green)] text-black shadow-[0_0_10px_rgba(0,255,136,0.4)] relative z-10">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Status Indicators */}
          <div className="mt-12 space-y-4 px-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--zynthsecure-green)] animate-pulse shadow-[0_0_8px_rgba(0,255,136,1)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Sentinel Node Active</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--zynthsecure-accent)] animate-pulse delay-500 shadow-[0_0_8px_rgba(0,210,255,1)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Latency: 14ms</span>
            </div>
          </div>
        </div>

        {/* User Profile Hook */}
        <div className="p-8 border-t border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5 max-w-[170px]">
              <div className="text-sm font-black text-white truncate">{profile?.full_name || 'Forensic Agent'}</div>
              <div className="text-[10px] font-medium text-white/40 truncate">{user?.email}</div>
            </div>
            <form action="/auth/signout" method="post">
              <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all hover:scale-110">
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  )
}
