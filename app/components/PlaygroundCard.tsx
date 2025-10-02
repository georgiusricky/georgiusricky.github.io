import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

type PlaygroundItem = {
  id: string | number;
  title: string;
  description: string;
  thumbnail?: string;
};

export default function PlaygroundCard({ item }: { item: PlaygroundItem }) {
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
