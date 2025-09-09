export const TILE_SIZE = 40;

import { GroundType, Obstacle, ObstacleType } from "./types";

export const groundSprites: Record<GroundType, string> = {
  G: "/playground/simple-game/texture_grass.webp",
  L: "/playground/simple-game/texture_land.webp",
  S: "/playground/simple-game/texture_soil.webp",
  W: "/playground/simple-game/texture_water.gif",
};

export const obstacleSprites: Record<Exclude<ObstacleType, "X">, { image: string; feetHeight?: number }> = {
  S: { image: "" },   
  T: { image: "" },    
  B: { image: "" },    
  F: { image: "/playground/simple-game/fence.webp", feetHeight: 10 }, // only bottom 10px blocks
};


export const groundMap: GroundType[][] = [
  ["G","G","G","G","G","G","G","G","L","L","G","G","G","W","W","W","W","W","W","W","W","W","W","W","G"],
  ["G","G","G","G","G","G","G","G","L","L","G","G","G","W","W","W","W","W","W","W","W","W","W","W","G"],
  ["G","G","G","G","G","G","G","G","L","L","G","G","G","W","W","W","W","W","W","W","W","W","W","W","G"],
  ["G","G","G","G","G","G","G","G","L","L","G","G","G","W","W","W","W","W","W","W","W","W","W","W","G"],
  ["G","G","L","L","G","G","G","G","L","L","G","G","G","W","W","W","W","W","W","W","W","W","W","W","G"],
  ["G","G","L","L","G","G","G","G","L","L","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L"],
  ["L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L"],
  ["G","G","G","G","G","G","G","G","G","G","L","L","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
];

export const obstacleMap: ObstacleType[][] = [
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["F","F","X","X","F","F","F","F","X","X","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["F","F","F","F","F","F","F","F","F","F","X","X","F","F","F","F","F","F","F","F","F","F","F","F","F"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
];

export const obstacles: Obstacle[] = [
  { x: 1, y: 0, w: 5, h: 5, image: "/playground/simple-game/house.webp" },
  { x: -1.5, y: 1.4, w: 4, h: 4, image: "/playground/simple-game/orange_tree.webp" },
  { x: 10.5, y: -0.8, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 10.5, y:0.5, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 9.8, y: 1.5, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 11.3, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 13, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 14.5, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 16, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 17.5, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 19, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 20.7, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 22.3, y: 2, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
  { x: 23, y: -0.3, w: 3.5, h: 3.5, image: "/playground/simple-game/orange_tree.webp" },
];

