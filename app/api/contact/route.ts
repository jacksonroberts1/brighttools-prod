import { NextRequest, NextResponse } from 'next/server'

// Google Apps Script webhook URL (from deployment)
const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK_URL

// Rate limiting: in-memory store (simple approach)
const rateLimitStore: Record<string, number[]> = {}
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3 // 3 requests per minute per IP

// Helper: get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}

// Helper: check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = []
  }

  // Remove old timestamps
  rateLimitStore[ip] = rateLimitStore[ip].filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  )

  // Check limit
  if (rateLimitStore[ip].length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  // Add current timestamp
  rateLimitStore[ip].push(now)
  return true
}

// Helper: strip HTML tags
function stripHTML(text: string): string {
  return text.replace(/<[^>]*>/g, '')
}

// Helper: validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper: validate form data
interface ContactFormData {
  name: string
  email: string
  message: string
  company?: string
}

function validateFormData(data: unknown): {
  valid: boolean
  error?: string
  data?: ContactFormData
} {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' }
  }

  const typedData = data as Record<string, unknown>

  // Name validation
  const name = typedData.name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' }
  }
  if (name.length > 100) {
    return { valid: false, error: 'Name is too long' }
  }

  // Email validation
  const email = typedData.email
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' }
  }
  if (!isValidEmail(email)) {
    return { valid: false, error: 'Invalid email format' }
  }

  // Message validation
  const message = typedData.message
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: 'Message is required' }
  }
  if (message.length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' }
  }
  if (message.length > 5000) {
    return { valid: false, error: 'Message is too long' }
  }

  // Honeypot field (company) - should be empty
  const company = typedData.company
  if (company && typeof company === 'string' && company.trim().length > 0) {
    // Silently return success to fool spammers
    return { valid: false, error: 'honeypot' }
  }

  return {
    valid: true,
    data: {
      name: stripHTML(name.trim()),
      email: stripHTML(email.trim()),
      message: stripHTML(message.trim()),
    },
  }
}

// Main POST handler
export async function POST(request: NextRequest) {
  // Check Google Sheet webhook is configured
  if (!GOOGLE_SHEET_WEBHOOK) {
    return NextResponse.json(
      {
        error: 'Form submission service not configured',
      },
      { status: 500 }
    )
  }

  // Get client IP for rate limiting
  const clientIP = getClientIP(request)

  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
      },
      { status: 429 }
    )
  }

  try {
    // Parse request body
    const body = await request.json()

    // Validate form data
    const validation = validateFormData(body)

    // If honeypot filled, silently return success
    if (validation.error === 'honeypot') {
      if (process.env.NODE_ENV === 'development') {
        console.log('🍯 Honeypot caught spam submission')
      }
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for reaching out!',
        },
        { status: 200 }
      )
    }

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: validation.error || 'Invalid form data',
        },
        { status: 400 }
      )
    }

    const { name, email, message } = validation.data!

    // Send data to Google Sheet via Apps Script webhook
    try {
      const response = await fetch(GOOGLE_SHEET_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error sending to Google Sheet:', response.statusText)
        }
        return NextResponse.json(
          {
            error: 'Failed to save submission. Please try again later.',
          },
          { status: 500 }
        )
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Google Sheet submission error:', error)
      }
      return NextResponse.json(
        {
          error: 'Failed to save submission. Please try again later.',
        },
        { status: 500 }
      )
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message received! We will review it shortly.',
      },
      { status: 200 }
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form error:', error)
    }

    return NextResponse.json(
      {
        error: 'An error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}

// Handle other methods
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { status: 200 })
}
