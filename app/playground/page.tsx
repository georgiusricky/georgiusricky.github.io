"use client";

import PlaygroundCard from "../components/PlaygroundCard";
import { playgroundItems } from "./data";

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            My Playground
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A collection of small coding experiments, playful UI ideas, and fun
            components I create to sharpen my skills and explore new tech.
          </p>
        </div>

        {/* Playground Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {playgroundItems.map((item) => (
            <PlaygroundCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
