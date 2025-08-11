'use client';

import Link from "next/link";
import { playgroundItems } from "./data";

export default function PlaygroundPage() {
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
        {playgroundItems.map((item) => (
          <Link
            key={item.id}
            href={`/playground/${item.id}`} 
            className="p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
