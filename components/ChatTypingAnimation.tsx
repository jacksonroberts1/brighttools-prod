'use client'

import { useEffect, useRef, useState } from 'react'

interface ChatTypingAnimationProps {
  text: string
  variant?: 'before' | 'after'
  delay?: number
}

export default function ChatTypingAnimation({ 
  text, 
  variant = 'after',
  delay = 800 
}: ChatTypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    // Reset state when text changes
    setDisplayText('')
    setShowCursor(true)
    setIsComplete(false)
    setShowMessage(false)
    indexRef.current = 0

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    // Start typing after delay
    const startDelay = setTimeout(() => {
      const typeChar = () => {
        if (indexRef.current < text.length) {
          setDisplayText(text.slice(0, indexRef.current + 1))
          indexRef.current++
          
          // Random typing speed with pauses after punctuation
          // 'after' variant types faster to show confidence
          const baseSpeed = isAfter ? 30 : 60
          const minSpeed = isAfter ? 10 : 20
          const punctuationPause = isAfter ? 75 : 150
          
          let typingDelay = Math.random() * baseSpeed + minSpeed
          const lastChar = text[indexRef.current - 1]
          if (lastChar === '.' || lastChar === ',' || lastChar === '!') {
            typingDelay += punctuationPause
          }
          
          setTimeout(typeChar, typingDelay)
        } else {
          setIsComplete(true)
          // Send animation
          setTimeout(() => {
            setShowMessage(true)
          }, 500)
        }
      }
      typeChar()
    }, delay)

    return () => {
      clearInterval(cursorInterval)
      clearTimeout(startDelay)
    }
  }, [text, delay])

  const isAfter = variant === 'after'

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative rounded-2xl bg-[#25242a] border border-white/10 overflow-hidden shadow-2xl">
        {/* Input Area */}
        <div className="p-4 bg-[#25242a]">
          <div className={`relative flex items-end gap-2 rounded-xl bg-[#40404a] border transition-all duration-300 ${
            displayText.length > 0 ? 'border-white/20 shadow-lg shadow-white/5' : 'border-white/10'
          }`}>
            {/* Plus Button */}
            <button className="flex-shrink-0 ml-3 mb-3 w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/60 hover:text-white/90 text-lg leading-none">
              +
            </button>

            {/* Text Input Area */}
            <div className="flex-1 py-3 min-h-[44px] max-h-[200px] overflow-y-auto relative">
              <div className="text-white text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                {displayText || <span className="text-white/30">Message ChatGPT</span>}
                {!showMessage && (
                  <span 
                    className={`inline-block w-0.5 h-5 bg-white ml-0.5 align-middle transition-opacity duration-100 ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 mr-2 mb-3">
              {/* Microphone Icon */}
              <button className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center text-white/60 hover:text-white/90">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                </svg>
              </button>

              {/* Send Button */}
              <button 
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isComplete && !showMessage
                    ? 'bg-white text-black hover:bg-white/90 scale-100'
                    : 'bg-white/10 text-white/40 scale-95'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
