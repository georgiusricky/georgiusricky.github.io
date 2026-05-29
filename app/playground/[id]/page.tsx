import type { Metadata } from "next";
import { playgroundItems } from "../data";
import { notFound } from "next/navigation";
import Client from "./client";

export function generateStaticParams() {
  return playgroundItems.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = playgroundItems.find((i) => i.id === id);

  if (!item) return {};

  return {
    title: `${item.title} | Playground - Ricky`,
    description: item.description,
    openGraph: {
      title: `${item.title} | Playground - Ricky`,
      description: item.description,
      url: `https://rickygeorgius.com/playground/${item.id}/`,
    },
    alternates: {
      canonical: `https://rickygeorgius.com/playground/${item.id}/`,
    },
  };
}

export default async function PlaygroundItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ unwrap in Next.js 15
  const item = playgroundItems.find((i) => i.id === id);

  if (!item) {
    notFound();
  }

  return <Client item={item} />;
}
