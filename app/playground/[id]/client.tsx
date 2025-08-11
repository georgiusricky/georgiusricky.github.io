'use client';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { PlaygroundItem } from "../types";
import { componentMap } from "../data";

export default function Client({ item }: { item: PlaygroundItem }) {
  const DynamicComponent =
    componentMap[item.id] || (() => <div>Component not found</div>);

  return (
    <div className="container mt-12 mx-auto px-4 py-16 bg-white dark:bg-black">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/playground">Playground</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{item.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
        <DynamicComponent />
      </div>
    </div>
  );
}
