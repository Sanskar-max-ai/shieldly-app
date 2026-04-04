export type FindingSource = 'direct' | 'heuristic' | 'pentest' | 'sentinel' | 'red-team'

type IssueDetails = {
  findingSource?: FindingSource
  evidence?: string[]
  serverHeader?: string
  path?: string
}

export function getFindingSourceLabel(source?: FindingSource | null): string {
  switch (source) {
    case 'sentinel':
      return 'Sentinel Cluster (Nmap/Nuclei)'
    case 'pentest':
      return 'Shieldly Pentest (Active Exploit)'
    case 'red-team':
      return 'AI Adversarial Red Team'
    case 'heuristic':
      return 'Heuristic Heuristic Engine'
    default:
      return 'Direct Observation'
  }
}

export function getEvidenceLines(details?: IssueDetails | null): string[] {
  if (!details) return []

  if (Array.isArray(details.evidence) && details.evidence.length > 0) {
    return details.evidence
  }

  if (details.path) {
    return [`Publicly accessible path: ${details.path}`]
  }

  if (details.serverHeader) {
    return [`Server header exposed: ${details.serverHeader}`]
  }

  return []
}
