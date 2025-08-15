import dynamic from "next/dynamic";
import { PlaygroundItem } from "./types";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "code-challenge",
    title: "Code Challenge",
    description: "Solving coding challenges to improve skills and explore new ideas.",
  },
];

export const componentMap: Record<string, any> = {
  "code-challenge": dynamic(() => import("./components/code-challenge/page")),
};
