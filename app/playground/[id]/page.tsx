import { playgroundItems } from "../data";
import { notFound } from "next/navigation";
import Client from "./client";

export function generateStaticParams() {
  return playgroundItems.map((item) => ({
    id: item.id,
  }));
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
