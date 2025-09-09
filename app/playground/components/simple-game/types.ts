export type GroundType = "G" | "L" | "S";        
// G = Grass, L = Land, S = Soil
export type ObstacleType = "S" | "T" | "B" | "F" | "X"; 
// S = Stone, T = Tree, B = Barrel, F = Fence, X = Empty
export interface Obstacle {
  x: number; // col
  y: number; // row
  w: number; // width
  h: number; // height 
  image: string;
}
