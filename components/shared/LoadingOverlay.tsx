'use client'

import { useLoadingStore } from '@/stores/loadingStore'
import { Z_INDEX } from '@/lib/constants'

export default function LoadingOverlay() {
  const isLoading = useLoadingStore((state) => state.isLoading)

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: Z_INDEX.loadingOverlay }}
    >
      <div className="bg-white/20 p-6 rounded-full shadow-lg">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
