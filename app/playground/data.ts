import dynamic from "next/dynamic";
import { PlaygroundItem } from "./types";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "CodeChallenge",
    title: "Code Challenge",
    description: "Solving coding challenges to improve skills and explore new ideas.",
  },
];

export const componentMap: Record<string, any> = {
  CodeChallenge: dynamic(() => import("./components/CodeChallenge/page")),
};
