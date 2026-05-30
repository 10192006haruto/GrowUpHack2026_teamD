export type Position = { x: number; y: number };

export interface TileData {
  char: string;
  isWall: boolean;
  event?: 'shin' | 'advance' | 'item';
  label?: string;
}

export interface GameState {
  hp: number;
  inventory: string[];
  currentMapIndex: number;
  playerPos: Position;
  flags: { [key: string]: boolean };
}

export interface GameAppState {
  hp: number;
  inventory: string[];
  canAdvance: boolean;
  isShinEventTriggered: boolean;
}

export const MAP_WIDTH = 32; // 16:9の比率を考慮
export const MAP_HEIGHT = 18;
export const MOVE_SPEED = 50;
export const HIT_RANGE = 40;