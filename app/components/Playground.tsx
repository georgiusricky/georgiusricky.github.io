'use client'

import { playgroundItems } from "../playground/data";
import PlaygroundCard from "./PlaygroundCard";
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Playground() {
  return (
    <section className="bg-black dark:bg-white py-32" id="playground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-16 text-center text-white dark:text-black">
            <span className="font-light">My  </span>
            <span className="font-extrabold">{`Playgrounds`}</span>
          </h1>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                {playgroundItems.slice(0, 3).map((item) => (
                  <PlaygroundCard key={item.id} item={item} />
                ))}
            </div>
          </div>
          <div className="text-center mt-16">
            <Link href="/playground">
              <Button variant="outline" className="dark:text-black text-white dark:border-black border-white dark:bg-white bg-black dark:hover:bg-black dark:hover:text-white hover:bg-white hover:text-black">
                View All Playgrounds
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

