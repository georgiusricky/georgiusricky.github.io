import dynamic from "next/dynamic";
import { PlaygroundItem } from "./types";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "code-challenge",
    title: "Code Challenge",
    description: "Solving coding challenges to improve skills and explore new ideas.",
  },
  {
    id: "simple-farming-game",
    title: "Simple Farming Game",
    description: "A delightful farming simulation game where you can grow crops, raise animals, and build your dream farm.",
  },
];

export const componentMap: Record<string, any> = {
  "code-challenge": dynamic(() => import("./components/code-challenge/page")),
  "simple-farming-game": dynamic(() => import("./components/simple-farming-game/page")),
};
