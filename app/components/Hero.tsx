"use client"

import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import ProfileCircle from './ProfileCircle'
import data from '@/data/data.json'
import Lottie from 'react-lottie-player'
import globeAnimation from '../lotties/earth-lottie.json'

export default function Hero() {
  const socials = data.socials
 
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
          <p className="text-gray-600 dark:text-gray-400 mb-8 flex items-center">
            Based in Earth 
            <Lottie loop animationData={globeAnimation} play className='w-12' />
          </p>
          <div className="flex space-x-4">
            <Link href={socials.github} className="p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Github className="w-5 h-5" />
            </Link>
            <Link href={socials.linkedin} className="p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-4/12">
         <ProfileCircle></ProfileCircle>
        </div>
      </div>
    </section>
  )
}

