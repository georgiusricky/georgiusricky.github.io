'use client'

import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Hello I'm, Ricky</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">Frontend Developer</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Based in Earth.</p>
        <div className="flex space-x-4">
          <Link href="https://github.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Github size={24} />
          </Link>
          <Link href="https://linkedin.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Linkedin size={24} />
          </Link>
          <Link href="https://twitter.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Twitter size={24} />
          </Link>
        </div>
      </div>
    </header>
  )
}

