'use client'

import { useState, useCallback } from 'react'
import { COPY_FEEDBACK_DURATION } from '@/lib/constants'

interface UseCopyToClipboardReturn {
  copied: boolean
  copy: (text: string) => Promise<void>
}

export function useCopyToClipboard(duration: number = COPY_FEEDBACK_DURATION): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), duration)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }, [duration])

  return { copied, copy }
}
