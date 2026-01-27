'use client'

import { useState, useEffect } from 'react'
import { throttle } from '@/lib/throttle'
import { SCROLL_THRESHOLD } from '@/lib/constants'

export function useScrollDetection(threshold: number = SCROLL_THRESHOLD, delay: number = 100) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > threshold)
    }, delay)

    // Check initial scroll position
    setIsScrolled(window.scrollY > threshold)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, delay])

  return isScrolled
}
