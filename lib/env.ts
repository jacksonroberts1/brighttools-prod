/**
 * Environment Configuration Validator
 * 
 * Checks that all required environment variables are set.
 * This runs at server startup to catch configuration issues early.
 */

interface EnvConfig {
  GOOGLE_SHEET_WEBHOOK_URL: string
}

function validateEnv(): EnvConfig {
  const missingVars: string[] = []
  const config: Partial<EnvConfig> = {}

  // Check GOOGLE_SHEET_WEBHOOK_URL (with fallback for development)
  if (!process.env.GOOGLE_SHEET_WEBHOOK_URL && process.env.NODE_ENV === 'production') {
    missingVars.push('GOOGLE_SHEET_WEBHOOK_URL')
  }
  config.GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || ''

  // If in production and missing required vars, throw error
  if (process.env.NODE_ENV === 'production' && missingVars.length > 0) {
    const errorMessage = `
╔═══════════════════════════════════════════════════════════════╗
║           CONTACT FORM: MISSING CONFIGURATION                 ║
╚═══════════════════════════════════════════════════════════════╝

The following environment variables are required but not set:
${missingVars.map((v) => `  • ${v}`).join('\n')}

📋 SETUP INSTRUCTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Create a Google Sheet:
   → Go to https://sheets.google.com
   → Create new sheet named "Contact Form Submissions"
   → Add headers: Name | Email | Message | Timestamp

2. Create Google Apps Script:
   → In the sheet, Extensions → Apps Script
   → Paste the provided Apps Script code
   → Deploy as Web App
   → Copy the deployment URL

3. In Vercel Dashboard:
   → Navigate to your project → Settings → Environment Variables
   → Add this variable:
   
   GOOGLE_SHEET_WEBHOOK_URL = [URL from step 2]

4. Redeploy your project

✅ After adding environment variables, redeploy and test!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

    throw new Error(errorMessage)
  }

  // In development, warn about missing vars
  if (
    process.env.NODE_ENV === 'development' &&
    !config.GOOGLE_SHEET_WEBHOOK_URL
  ) {
    console.warn(`
⚠️  GOOGLE_SHEET_WEBHOOK_URL not configured.
Contact form will not save submissions.

To enable:
1. Create Google Apps Script webhook (see lib/env.ts for instructions)
2. Add GOOGLE_SHEET_WEBHOOK_URL to .env.local
    `)
  }

  return config as EnvConfig
}

export const env = validateEnv()
