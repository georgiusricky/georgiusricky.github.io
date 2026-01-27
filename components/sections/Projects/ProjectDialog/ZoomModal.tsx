'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Z_INDEX } from '@/lib/constants'

interface ZoomModalProps {
  src: string
  onClose: () => void
}

export function ZoomModal({ src, onClose }: ZoomModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 bg-black/95 flex items-center justify-center p-4"
      style={{ zIndex: Z_INDEX.modal }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <Image
        src={src}
        alt="Zoomed Image"
        width={0}
        height={0}
        sizes="95vw"
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '95vw',
          maxHeight: '95dvh',
        }}
        className="rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  )
}
