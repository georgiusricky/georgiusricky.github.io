"use client";

import PlaygroundCard from "../components/PlaygroundCard";
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
          <PlaygroundCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
