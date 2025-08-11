import dynamic from "next/dynamic";
import { PlaygroundItem } from "./types";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "HelloWorld",
    title: "Hello World",
    description: "A simple Hello World component",
  },
];

export const componentMap: Record<string, any> = {
  HelloWorld: dynamic(() => import("./components/HelloWorld/page")),
};
