"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { playgroundItems } from "./data";
import { ImageIcon } from "lucide-react";

function PlaygroundCard({ item }: { item: (typeof playgroundItems)[0] }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/playground/${item.id}`}
      className="p-4 border rounded-lg bg-card hover:bg-card-hover"
    >
      <h2 className="text-lg font-semibold">{item.title}</h2>

      <div className="relative w-full h-40 my-2 flex items-center justify-center rounded-md overflow-hidden">
        {item.thumbnail ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
            )}
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
              onLoadingComplete={() => setLoaded(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-800">
            <ImageIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          </div>
        )}
      </div>

      <p className="text-sm py-2 text-muted-foreground">{item.description}</p>
    </Link>
  );
}

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
