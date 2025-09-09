'use client';

import Link from "next/link";
import Image from "next/image"
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

     
      <div className="grid gap-6 md:grid-cols-4 ">
        {playgroundItems.map((item) => (
         <Link
            key={item.id}
            href={`/playground/${item.id}`} 
            className="p-4 border rounded-lg bg-card hover:bg-card-hover"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>

            {item.thumbnail && (
              <div className="relative w-full h-40 my-2">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>
            )}

            <p className="text-sm py-2 text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
