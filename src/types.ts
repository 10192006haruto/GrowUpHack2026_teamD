export type Position = { x: number; y: number };

export interface TileData {
  char: string;
  isWall: boolean;
  event?: 'shin' | 'gin' | 'advance' | 'item';
  label?: string;
  requiresFlag?: string; // このタイルを表示するのに必要なフラグ
}

export interface GameState {
  hp: string;
  inventory: string[];
  currentMapIndex: number;
  playerPos: Position;
  flags: { [key: string]: boolean };
  discoveredChars: string[];
}

export interface GameAppState {
  hp: string; 
  inventory: string[];
  canAdvance: boolean;
  isShinEventTriggered: boolean;
  discoveredChars: string[];
}

export const MAP_WIDTH = 32; // 16:9の比率を考慮
export const MAP_HEIGHT = 18;
export const MOVE_SPEED = 50;
export const HIT_RANGE = 40;