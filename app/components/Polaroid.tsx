'use client'

import Image from 'next/image'

export interface PolaroidProps {
    src: string
    alt: string
}

export default function Polaroid({
    src,
    alt,
  }: PolaroidProps) {

  return (
    <div className="flex items-center justify-center p-4">
        <div className="group relative w-full transform cursor-pointer transition-transform rotate-[-3deg] hover:rotate-0 hover:scale-105" >
            <div className="overflow-hidden rounded-sm bg-white p-4 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 350px) 100vw, 350px"
                  priority
                  />
              </div>
            </div>
      </div>
    </div>
  )
}

