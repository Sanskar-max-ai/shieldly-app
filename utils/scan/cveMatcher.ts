/**
 * ZYNTH VULNERABILITY SIGNATURE ENGINE (Nuclei Style)
 * ---------------------------------------------------
 * This utility matches detected software signatures (from HTTP headers) 
 * against a database of known CVEs (Common Vulnerabilities and Exposures).
 */

export interface CVESignature {
  id: string
  name: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  description: string
  remediation: string
}

// A high-fidelity mock database of real-world CVEs
// In a full production app, this would be an external API or a large JSON file.
const COMMON_CVE_SIGNATURES: Record<string, CVESignature[]> = {
  'nginx/1.14.0': [
    {
      id: 'CVE-2019-9511',
      name: 'HTTP/2 "Data Dribble" Resource Exhaustion',
      severity: 'HIGH',
      description: 'An attacker could use a sequence of small window updates to consume excess CPU and memory on the Nginx server.',
      remediation: 'Upgrade to Nginx v1.16.1 or higher.'
    }
  ],
  'nginx/1.10.0': [
    {
      id: 'CVE-2017-7529',
      name: 'Nginx Integer Overflow in Range Filter',
      severity: 'HIGH',
      description: 'A vulnerability in the Nginx range filter module can lead to sensitive information disclosure.',
      remediation: 'Upgrade to Nginx v1.13.3 or higher.'
    }
  ],
  'apache/2.4.49': [
    {
      id: 'CVE-2021-41773',
      name: 'Apache Path Traversal & File Disclosure',
      severity: 'CRITICAL',
      description: 'A flaw was found in a change made to path normalization in Apache 2.4.49. An attacker could use a path traversal attack to map URLs to files outside the expected document root.',
      remediation: 'Upgrade to Apache v2.4.51 immediately.'
    }
  ],
  'wordpress/5.4': [
    {
      id: 'CVE-2020-28032',
      name: 'WordPress Authenticated User Privilege Escalation',
      severity: 'HIGH',
      description: 'A vulnerability in the WordPress core allows authenticated users to obtain higher privileges via a specially crafted request.',
      remediation: 'Update to WordPress v5.4.2 or higher.'
    }
  ]
}

/**
 * Matches a detected server header to known CVE signatures
 */
export function matchCVESignatures(serverHeader: string): CVESignature[] {
  if (!serverHeader) return []
  
  const normalizedHeader = serverHeader.toLowerCase()
  
  // Find a match in our signature database
  const matchedKey = Object.keys(COMMON_CVE_SIGNATURES).find(key => 
    normalizedHeader.includes(key.toLowerCase())
  )

  return matchedKey ? COMMON_CVE_SIGNATURES[matchedKey] : []
}

/**
 * Higher-level function to analyze tech stacks
 */
export function auditTechStack(technologies: string[]): CVESignature[] {
  let allFindings: CVESignature[] = []
  
  for (const tech of technologies) {
    const findings = matchCVESignatures(tech)
    allFindings = [...allFindings, ...findings]
  }

  return allFindings
}
