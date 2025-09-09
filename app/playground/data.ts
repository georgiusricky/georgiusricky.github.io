import dynamic from "next/dynamic";
import { PlaygroundItem } from "./types";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "code-challenge",
    title: "Code Challenge",
    description: "Solving coding challenges to improve skills and explore new ideas.",
  },
  {
    id: "simple-game",
    title: "Simple Game",
    thumbnail: "/playground/simple-game/simple-game.webp",
    description: "A Simple game where you can move character in textured tiles",
  },
];

export const componentMap: Record<string, any> = {
  "code-challenge": dynamic(() => import("./components/code-challenge/page")),
  "simple-game": dynamic(() => import("./components/simple-game/page")),
};
