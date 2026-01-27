"use client"

import { useState } from 'react'
import { Linkedin, Mail, MessageSquare, Copy, Check, ArrowUpRight } from 'lucide-react'
import { useGlobalStore } from '@/stores/globalStore'

export default function Contact() {
  const socials = useGlobalStore((state) => state.socials)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  const items = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'WhatsApp',
      desc: `+${socials.wa}`,
      link: `https://wa.me/${socials.wa}`,
      color: 'emerald',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      desc: socials.email,
      link: `mailto:${socials.email}`,
      color: 'blue',
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: 'LinkedIn',
      desc: socials.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      link: socials.linkedin,
      color: 'sky',
    },
  ]

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      hover: 'group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30',
    },
    blue: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      hover: 'group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30',
    },
    sky: {
      bg: 'bg-sky-500/10 dark:bg-sky-500/20',
      text: 'text-sky-600 dark:text-sky-400',
      hover: 'group-hover:bg-sky-500/20 dark:group-hover:bg-sky-500/30',
    },
  }

  return (
    <section className="w-full py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            {`Let's Connect`}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Whether you have a project in mind or just want to say hi, feel free to reach out.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const colors = colorClasses[item.color as keyof typeof colorClasses]
            return (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div className={`p-4 rounded-xl ${colors.bg} ${colors.hover} transition-colors duration-300`}>
                      <span className={colors.text}>{item.icon}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex justify-center mb-2">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 pl-5">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                  </div>

                  {/* Description with Copy */}
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {item.desc}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleCopy(item.desc, idx)
                        }}
                        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Copy to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}