'use client'

import { useEffect } from 'react'
import Link from "next/link";
import { PlaygroundItem } from "./types";

const playgroundItems: PlaygroundItem[] = [
  {
    title: "Tic Tac Toe",
    description: "A simple Tic Tac Toe game",
    href: "/playground/features/tictactoe",
  },
];

export default function PlaygroundPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mt-12 mx-auto px-4 py-16 bg-white dark:bg-black">
       <div className="mb-12 mt-6">
        <h1 className="text-3xl mb-2 font-bold text-black dark:text-white">
          My Playground
        </h1>
        <p className="text-muted-foreground text-sm">
          A collection of small coding experiments, playful UI ideas, and fun
          components I create to sharpen my skills and explore new tech.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-4">
        {playgroundItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
