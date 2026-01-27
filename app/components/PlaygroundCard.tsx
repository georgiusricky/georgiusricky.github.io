import LoadingLink from "./LoadingLink";
import Image from "next/image";
import { useState } from "react";
import { ImageIcon, ExternalLink } from "lucide-react";

type PlaygroundItem = {
  id: string | number;
  title: string;
  description: string;
  thumbnail?: string;
};

export default function PlaygroundCard({ item }: { item: PlaygroundItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <LoadingLink
      href={`/playground/${item.id}`}
      className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {item.thumbnail ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            )}
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onLoadingComplete={() => setLoaded(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-zinc-400 dark:text-zinc-600" />
          </div>
        )}
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white dark:bg-zinc-900 rounded-full p-3 shadow-lg">
              <ExternalLink className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {item.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {item.description}
        </p>
      </div>
    </LoadingLink>
  );
}
