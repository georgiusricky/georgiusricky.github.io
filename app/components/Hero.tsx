import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-32 pb-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-4">
            {`Hello I'm`} <span className="block">Ricky</span>
          </h1>
          <h2 className="text-3xl font-bold mb-4">
            Frontend <span className="block">Developer</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Based in Indonesia.
          </p>
          <div className="flex space-x-4">
            <Link href="https://github.com" className="p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com" className="p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" className="p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/placeholder.svg"
            alt="Developer illustration"
            width={400}
            height={400}
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}

