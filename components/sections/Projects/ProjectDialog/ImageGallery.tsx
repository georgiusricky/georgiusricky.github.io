'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  assets: string[]
  title: string
  onImageClick: (src: string) => void
}

export function ImageGallery({ assets, title, onImageClick }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % assets.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + assets.length) % assets.length)
  }

  const isVideo = (src: string) => src.endsWith('.webm') || src.endsWith('.mp4')

  return (
    <div className="relative bg-zinc-100 dark:bg-zinc-800">
      {/* Main Image Display */}
      <div className="relative aspect-video w-full overflow-hidden">
        {assets.map((src, index) => {
          const isVideoAsset = isVideo(src)
          const isActive = index === currentIndex

          return isVideoAsset ? (
            <video
              key={index}
              src={src}
              autoPlay
              controls
              loop
              muted
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              key={index}
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className={`object-contain cursor-pointer transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => onImageClick(src)}
            />
          )
        })}

        {/* Navigation Arrows */}
        {assets.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {assets.length > 1 && (
        <div className="flex justify-center gap-1.5 py-2 px-4 bg-zinc-200/50 dark:bg-zinc-700/50">
          {assets.map((src, index) => {
            const isVideoAsset = isVideo(src)
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-14 h-9 rounded overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-emerald-500 ring-offset-1 ring-offset-zinc-200 dark:ring-offset-zinc-700'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {isVideoAsset ? (
                  <div className="w-full h-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Video</span>
                  </div>
                ) : (
                  <Image
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
