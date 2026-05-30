import { MAP_WIDTH, MAP_HEIGHT, type TileData } from './types';

export const DICTIONARY: Record<string, string> = {
  'シン': '「真」：世界の真実を知る手がかり。',
  'ジン': '「人」：失われた人間性の欠片。',
  '進': '「進」：次の階層へ進むための門。',
};

// マップの生成関数（簡易版：実際はもっと複雑に配置可能）
const createEmptyMap = (): TileData[][] => 
  Array(MAP_HEIGHT).fill(null).map(() => 
    Array(MAP_WIDTH).fill(null).map(() => ({ char: '', isWall: false }))
  );

export const MAPS: TileData[][][] = [0, 1, 2, 3, 4].map(() => {
  const map = createEmptyMap();
  // 外壁の作成
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        map[y][x] = { char: '石', isWall: true };
      }
    }
  }
  // 要件：シンとの当たり判定イベント
  map[5][10] = { char: 'シン', isWall: false, event: 'shin', label: '真実の断片' };
  // 要件：進（進むかの選択）
  map[2][16] = { char: '進', isWall: false, event: 'advance' };
  // アイテム
  map[10][5] = { char: '薬', isWall: false, event: 'item', label: '心の欠片' };
  
  return map;
});