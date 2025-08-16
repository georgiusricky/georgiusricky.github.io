"use client"

import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ProfileCircle from './ProfileCircle'
import { useGlobalStore } from '@/stores/globalStore'

export default function Hero() {
  const socials = useGlobalStore((state) => state.socials)

  return (
    <section className="container mx-auto px-4 pt-32 pb-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-8/12 mb-8 md:mb-0">
          <h1 className="text-4xl font-mono font-bold mb-4">
            {`Hello I'm`} <span className="block text-6xl">Ricky</span>
          </h1>
          <h2 className="text-3xl font-bold mb-4 font-mono">
            Software Engineer
          </h2>
          <div className="text-gray-600 dark:text-gray-400 mb-8 flex items-center">
            <span>Based in Earth</span>
             <Image
                src="/img/gif/earth.gif"
                alt="Earth"
                width={50}
                height={50}
                sizes="50px"
                className="w-[50px] h-[50px] object-contain"
                priority={false}
              />
          </div>
          <div className="flex space-x-4">
            <Link
              href={socials.github}
              aria-label="Visit my GitHub profile"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              href={socials.linkedin}
              aria-label="Visit my LinkedIn profile"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="w-8/12 md:w-4/12">
         <ProfileCircle/>
        </div>
      </div>
    </section>
  )
}

