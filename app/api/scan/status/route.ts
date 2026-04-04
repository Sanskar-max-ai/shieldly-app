import { NextResponse } from 'next/server'

export async function GET() {
  const SCAN_WORKER_URL = process.env.SCAN_WORKER_URL || 'http://localhost:4000'
  
  try {
    const res = await fetch(`${SCAN_WORKER_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    })
    
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json({ status: 'online', details: data })
    }
    
    return NextResponse.json({ status: 'offline', reason: 'Worker responded with error' })
  } catch (err) {
    return NextResponse.json({ status: 'offline', reason: 'Could not reach worker cluster' })
  }
}
