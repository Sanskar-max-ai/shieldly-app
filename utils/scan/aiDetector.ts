/**
 * ZYNTH AI-GUARD DETECTION ENGINE
 * -----------------------------------------
 * This utility identifies if a target URL contains LLM-driven components, 
 * chatbots, or AI integrations by analyzing HTML, scripts, and common API routes.
 */

export interface AIDetectionResult {
  isAI: boolean
  confidence: number
  platform?: string
  detectedSignatures: string[]
}

const AI_SIGNATURES = [
  { name: 'OpenAI', regex: /openai|gpt-[345]|chatgpt/i },
  { name: 'Anthropic', regex: /anthropic|claude/i },
  { name: 'Intercom (AI Enabled)', regex: /intercom\.io|intercomcdn\.com/i },
  { name: 'Drift', regex: /drift\.com|driftt\.com/i },
  { name: 'Chatbase', regex: /chatbase\.co/i },
  { name: 'Crisp', regex: /crisp\.chat/i },
  { name: 'Tidio', regex: /tidio\.co/i },
  { name: 'Zendesk Answer Bot', regex: /zendesk\.com\/embeddable/i },
  { name: 'Dante AI', regex: /dante-ai\.com/i },
  { name: 'Custom LLM Chatbox', regex: /chatbot|assistant|ai-chat|smart-reply/i }
]

export async function detectAISignatures(url: string, html: string): Promise<AIDetectionResult> {
  const detectedSignatures: string[] = []
  let confidence = 0
  
  const bodyLower = html.toLowerCase()

  // 1. Scan for specific script/platform signatures
  for (const sig of AI_SIGNATURES) {
    if (sig.regex.test(bodyLower)) {
      detectedSignatures.push(sig.name)
      confidence += 40
    }
  }

  // 2. Scan for common AI UI markers
  const uiMarkers = [
    'chat-widget', 'chat-button', 'ask-ai', 'ai-assistant', 
    'message-bubble', 'floating-chat', 'bot-response'
  ]
  
  for (const marker of uiMarkers) {
    if (bodyLower.includes(marker)) {
      confidence += 15
    }
  }

  // 3. Scan for common AI API routes (heuristic)
  const apiMarkers = ['/api/chat', '/v1/completions', '/query-ai']
  for (const api of apiMarkers) {
    if (bodyLower.includes(api)) {
      confidence += 25
    }
  }

  // Cap confidence at 100
  confidence = Math.min(100, confidence)

  return {
    isAI: confidence >= 40, // 40% threshold for "Probably has AI"
    confidence,
    platform: detectedSignatures.length > 0 ? detectedSignatures[0] : undefined,
    detectedSignatures
  }
}

/**
 * Higher-level function to fetch and detect AI
 */
export async function runAIDetection(url: string): Promise<AIDetectionResult> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Zynth-AIGuard/1.0)' },
      signal: AbortSignal.timeout(10000)
    })
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    
    const html = await res.text()
    return await detectAISignatures(url, html)
  } catch (err) {
    console.warn(`AI Detection Failed for ${url}:`, err)
    return { isAI: false, confidence: 0, detectedSignatures: [] }
  }
}
