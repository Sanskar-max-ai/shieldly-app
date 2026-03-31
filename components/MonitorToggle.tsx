'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Activity, Shield, ShieldOff, Loader2 } from 'lucide-react'

interface MonitorToggleProps {
  domainId: string
  initialStatus: boolean
}

export default function MonitorToggle({ domainId, initialStatus }: MonitorToggleProps) {
  const [isEnabled, setIsEnabled] = useState(initialStatus)
  const [isLoading, setIsLoading] = useState(false)

  async function toggleMonitoring() {
    setIsLoading(true)
    const supabase = createClient()
    
    const { error } = await supabase
      .from('domains')
      .update({ monitoring_enabled: !isEnabled })
      .eq('id', domainId)

    if (!error) {
      setIsEnabled(!isEnabled)
    } else {
      console.error('Zynth: Failed to update monitoring:', error)
      alert('FAILED TO UPDATE SENTINEL STATUS')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#00ff88]/20 transition-all">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isEnabled ? 'bg-[#00ff88]/10' : 'bg-red-500/10'}`}>
          {isEnabled ? (
            <Shield size={16} className="text-[#00ff88]" />
          ) : (
            <ShieldOff size={16} className="text-red-500" />
          )}
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">24/7 Sentinel</div>
          <div className={`text-xs font-bold ${isEnabled ? 'text-[#00ff88]' : 'text-gray-400'}`}>
            {isEnabled ? 'Patrolling' : 'Disabled'}
          </div>
        </div>
      </div>

      <button
        onClick={toggleMonitoring}
        disabled={isLoading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isEnabled ? 'bg-[#00ff88]' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          } ${isLoading ? 'animate-pulse' : ''}`}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={12} className="animate-spin text-[#060b14]" />
          </div>
        )}
      </button>
    </div>
  )
}
