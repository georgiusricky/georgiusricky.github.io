'use client'

import Image from 'next/image'

export interface PolaroidProps {
    src: string
    alt: string
    caption?: string
}

export default function Polaroid({
    src,
    alt,
    caption = '',
  }: PolaroidProps) {

  return (
    <div className="flex items-center justify-center p-4">
        <div className="group relative w-full transform cursor-pointer transition-transform rotate-[-3deg] hover:rotate-0 hover:scale-105" >
            {/* Polaroid frame */}
            <div className="overflow-hidden rounded-sm bg-white p-4 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden">
                <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 350px) 100vw, 350px"
                priority
                />
            </div>
            {/* Caption area */}
            <p className="min-h-[40px] text-right font-kalam text-lg text-gray-700">
                {caption}
            </p>
            </div>
      </div>
    </div>
  )
}

