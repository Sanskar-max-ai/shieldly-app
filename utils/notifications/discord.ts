/**
 * ZYNTH SENTINEL - DISCORD NOTIFICATION ENGINE
 * ---------------------------------------------
 * This utility sends high-impact security alerts to Discord webhooks.
 * We use Discord because it's the #1 platform for security community alerts.
 */

export interface DiscordAlert {
  title: string
  description: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  url: string
  id: string
}

const SEVERITY_COLORS = {
  CRITICAL: 0xff0000, // Bright Red
  HIGH: 0xff8800,     // Orange
  MEDIUM: 0xffff00,   // Yellow
  LOW: 0x00ff88,      // Zynth Green
}

/**
 * Sends a professional security alert to a Discord webhook
 */
export async function sendDiscordAlert(webhookUrl: string, alert: DiscordAlert) {
  if (!webhookUrl) return

  const payload = {
    embeds: [
      {
        title: `🛡️ ZYNTH ALERT: ${alert.title}`,
        description: alert.description,
        url: alert.url,
        color: SEVERITY_COLORS[alert.severity] || 0x00ff88,
        fields: [
          {
            name: "Severity",
            value: `**${alert.severity}**`,
            inline: true
          },
          {
            name: "Audit ID",
            value: `\`${alert.id}\``,
            inline: true
          }
        ],
        author: {
          name: "Zynth Sentinel",
          icon_url: "https://zynth.io/icon.png" // Placeholder
        },
        footer: {
          text: "Autonomous Remediation Engine | shieldly-app",
          icon_url: "https://zynth.io/icon.png"
        },
        timestamp: new Date().toISOString()
      }
    ]
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error('Zynt h: Discord Alert failed:', await response.text())
    }
  } catch (error) {
    console.error('Zynt h: Discord Alert Error:', error)
  }
}
