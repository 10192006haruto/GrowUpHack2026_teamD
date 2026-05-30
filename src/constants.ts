import { MAP_WIDTH, MAP_HEIGHT, type TileData } from './types';

// ここ埋めるだけでシンの意味やマップを変えれる
export const SHIN_DICTIONARY: Record<string, string> = {
  '真': '「シン」：世界の真実を知る手がかり。',
  '人': '「人」：失われた人間性の欠片。',
  '進': '「進」：次の階層へ進むための門。',
  '信':	'信じること、疑わないこと、誠実、約束を守る',
  '神':	'かみ、人知を超えた絶対的な存在、不思議な力',
  '芯': '物の中心、奥底にある中心となる部分、気持ちの張り',
  '慎':	'つつしむ、気を付ける、軽々しく行動しないこと',
  '新':	'あたらしい、今までになかったもの、初めて',
  '深':	'ふかい、奥のほうにある、程度がはなはだしい',
  '親':	'おや、親しい、距離が近い、自ら直接行うこと',
  '辛':	'からい、つらい、厳しい、思いやりがない。',
  '清':	'きよい、けがれがない',
  '伸':	'のびる、まっすぐになる、長さや勢いが増す',
  '振':	'ふる、ゆれうごく、勢いづく、割り当てる',
  '診':	'みる、医者が病状を調べる、状態を判断する',
  '侵':	'おかす、他人の領分に無断で入り込む、襲う',
  '浸':	'ひたす、水につかる、液体がしみこむ',
  '寝':	'ねる、横になる、眠る、活動をやめる',
  '申':	'もうす、言う、述べる、まっすぐ伸びる',
  '審':	'つまびらか、詳しく調べる、よしあしを裁く',
  '身':	'み、からだ、自分自身、社会的な立場',
  '森':	'もり、木が多く茂っている場所、静かでひっそりした様',
  '震':	'ふるえる、激しく揺れ動く、地震',
  '針':	'はり、先のとがった細い道具、方向を示すもの',
  '唇':	'くちびる',
  '薪':	'たきぎ、燃料にする木',
  '晨':	'よあけ、あさ、夜が明けること',
  '辰':	'たつ、十二支の5番目、星、時刻',
  '蜃':	'おおはまぐり、想像上の巨大な貝（蜃気楼の由来）'
};

// ここ埋めるだけでジンの意味やマップを変えれる
export const GIN_DICTIONARY: Record<string, string> = {
  '刃': '「ジン」：世界の危険を象徴する存在。',
  '迅': '「ジン」：素早い、速い、急いでいる様子。',
  '仁': 'じん、思いやりの心、人を愛すること',
  '尽':	'つきる、使い果たす、最後までやりとげる',
  '陣':	'じん、戦いの布陣、集まること',
  '尋':	'たずねる、尋ねる、距離の単位',
  '腎':	'じん、人体の臓器の一つ、生命維持に重要な役割を果たす',
  '刎':	'はねる、首をはねること',
  '訊':	'きく、質問する、情報を得るために尋ねる',
  '浸':	'ひたす、水につかる、液体がしみこむ',
  '寑':	'しん、寝ること、横になること',
  '寐':	'び、眠ること、寝ること',
};

// マップの生成関数（簡易版：実際はもっと複雑に配置可能）
const createEmptyMap = (): TileData[][] => 
  Array(MAP_HEIGHT).fill(null).map(() => 
    Array(MAP_WIDTH).fill(null).map(() => ({ char: '', isWall: false }))
  );

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const EXTRA_KANJI = Array.from(
  new Set([
    ...Object.keys(SHIN_DICTIONARY),
    ...Object.keys(GIN_DICTIONARY)
  ])
).filter((char) => !['真', '進', '薬', '芯'].includes(char));

// 0, 1, 2, 3, 4のマップ生成(現状は1つだけ)
export const MAPS: TileData[][][] = [0, 1, 2, 3, 4].map(() => {
  const map = createEmptyMap();
  // 外壁の作成
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        map[y][x] = { char: '田', isWall: true };
      }
    }
  }
  
  /**
   * 座標の直接埋め込みの部分(進、真、芯などの重要なイベントを起こすもの)  
   */ 
  map[5][10] = { char: '真', isWall: false, event: 'shin', label: '真実の断片' };
  // 要件：進（進むかの選択）- 真を発見後に現れる
  map[2][16] = { char: '進', isWall: false, event: 'advance', requiresFlag: 'hasDiscoveredShin' };
  // アイテム
  map[10][5] = { char: '薬', isWall: false, event: 'item', label: '心の欠片' };
  map[12][8] = { char: '芯', isWall: false, event: 'item', label: '心の拠り所'};

  const spacedPositions: { x: number; y: number }[] = [];
  for (let y = 2; y < MAP_HEIGHT - 2; y += 2) {
    for (let x = 2; x < MAP_WIDTH - 2; x += 2) {
      if (map[y][x].char === '' && !map[y][x].isWall) {
        spacedPositions.push({ x, y });
      }
    }
  }

  const allEmptyPositions: { x: number; y: number }[] = [];
  for (let y = 1; y < MAP_HEIGHT - 1; y++) {
    for (let x = 1; x < MAP_WIDTH - 1; x++) {
      if (map[y][x].char === '' && !map[y][x].isWall) {
        allEmptyPositions.push({ x, y });
      }
    }
  }

  const placementPositions = shuffle(spacedPositions);
  if (placementPositions.length < EXTRA_KANJI.length) {
    const fallbackPositions = allEmptyPositions.filter(
      (pos) => !placementPositions.some((used) => used.x === pos.x && used.y === pos.y)
    );
    placementPositions.push(...shuffle(fallbackPositions));
  }

  EXTRA_KANJI.forEach((char, index) => {
    const pos = placementPositions[index];
    if (!pos) return;
    const event: 'shin' | 'gin' | undefined =
      SHIN_DICTIONARY[char] ? 'shin' : GIN_DICTIONARY[char] ? 'gin' : undefined;
    map[pos.y][pos.x] = event ? { char, isWall: false, event } : { char, isWall: false };
  });
  
  return map;
});