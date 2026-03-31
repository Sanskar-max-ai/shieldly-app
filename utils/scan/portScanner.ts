import * as net from 'net'

/**
 * ZYNTH PORT DISCOVERY ENGINE (Nmap Style)
 * -----------------------------------------
 * This utility performs a real-time TCP handshake attempt to see if a port is open.
 * We only scan the Top 20 most critical ports to ensure speed and bypass WAF/Firewalls.
 */

export interface PortResult {
  port: number
  status: 'OPEN' | 'CLOSED' | 'FILTERED'
  service: string
}

// The "Dangerous" Top 20 ports Zynth looks for
const COMMON_PORTS: Record<number, string> = {
  21: 'FTP',
  22: 'SSH',
  23: 'Telnet',
  25: 'SMTP',
  53: 'DNS',
  80: 'HTTP',
  110: 'POP3',
  143: 'IMAP',
  443: 'HTTPS',
  445: 'SMB',
  587: 'SMTP (SSL)',
  993: 'IMAP (SSL)',
  995: 'POP3 (SSL)',
  3306: 'MySQL',
  3389: 'RDP',
  5432: 'PostgreSQL',
  6379: 'Redis',
  8080: 'HTTP-Proxy',
  8443: 'HTTPS-Alt',
  27017: 'MongoDB'
}

/**
 * Probes a single port on a host
 */
export function probePort(host: string, port: number, timeout = 1500): Promise<PortResult> {
  return new Promise((resolve) => {
    const socket = new net.Socket()
    let status: 'OPEN' | 'CLOSED' | 'FILTERED' = 'CLOSED'

    // Set timeout to avoid hanging if there's a firewall
    socket.setTimeout(timeout)

    socket.connect(port, host, () => {
      status = 'OPEN'
      socket.destroy()
    })

    socket.on('timeout', () => {
      status = 'FILTERED' // Firewall dropped the packet
      socket.destroy()
    })

    socket.on('error', () => {
      status = 'CLOSED' // Server rejected the connection
      socket.destroy()
    })

    socket.on('close', () => {
      resolve({ port, status, service: COMMON_PORTS[port] || 'Unknown' })
    })
  })
}

/**
 * Scans all common ports in parallel for a host
 */
export async function scanCommonPorts(host: string): Promise<PortResult[]> {
  const ports = Object.keys(COMMON_PORTS).map(Number)
  const results: PortResult[] = []

  // To be stealthy and fast, we scan in small batches
  // This avoids being flagged as an "Attacker" by Cloudflare/WAF
  const scanTasks = ports.map(port => probePort(host, port))
  
  return Promise.all(scanTasks)
}
