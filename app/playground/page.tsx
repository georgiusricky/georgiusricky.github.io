'use client'

import PlaygroundCard from '@/components/shared/PlaygroundCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { playgroundItems } from './data'

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-24">
        <PageHeader
          title="My Playground"
          description="A collection of small coding experiments, playful UI ideas, and fun components I create to sharpen my skills and explore new tech."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {playgroundItems.map((item) => (
            <PlaygroundCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
