'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLoadingStore } from '@/stores/loadingStore'
import { LOADING_DELAY } from '@/lib/constants'

export default function LoadingStateManager() {
  const pathname = usePathname()
  const setLoading = useLoadingStore((state) => state.setLoading)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, LOADING_DELAY)

    return () => clearTimeout(timer)
  }, [pathname, setLoading])

  return null
}
