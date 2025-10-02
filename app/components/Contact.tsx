"use client"

import { useState } from 'react'
import { Linkedin, Mail, MessageSquare, Copy, Check } from 'lucide-react'
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
      icon: <MessageSquare className="h-7 w-7 text-primary" />,
      title: 'Text or WhatsApp Me',
      desc: `+${socials.wa}`,
      link: `https://wa.me/${socials.wa}`,
    },
    {
      icon: <Mail className="h-7 w-7 text-primary" />,
      title: 'Send Me An Email',
      desc: socials.email,
      link: `mailto:${socials.email}`,
    },
    {
      icon: <Linkedin className="h-7 w-7 text-primary" />,
      title: 'Visit My LinkedIn',
      desc: socials.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      link: socials.linkedin,
    },
  ]

  return (
    <section className="w-full py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
           {`Let’s Connect`}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            Whether you have a project in mind or just want to say hi, feel free to reach out.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card hover:bg-card-hover backdrop-blur-sm border border-border rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-muted-foreground text-md">
                <span className="select-text">{item.desc}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault() 
                    handleCopy(item.desc, idx)
                  }}
                  className="p-1 rounded hover:bg-primary/10"
                  aria-label="Copy to clipboard"
                >
                  {copiedIndex === idx ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}