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
  '蜃':	'おおはまぐり、想像上の巨大な貝（蜃気楼の由来）',
  '沁': 'しみる、液体がしみこむ、心に深くしみいる',
  '臣': 'しん、君主に仕える人、家臣、家来',
  '秦': 'しん、中国の古代王朝、かつて世界を統一した帝国の名',
  '晋': 'しん、進む、のぼる、中国の古い王朝名',
  '岑': 'みね、山頂、高くて突き出た山頂の鋭い部分',
  '梣': 'とねりこ、モクセイ科の木、非常に硬く強靭な材木',
  '駸': 'はしる、馬が軽快に疾走するさま、物事の勢いが激しい様',
  '瞋': 'いかる、目をみはる、怒って目を大きく見開くこと',
  '縉': 'しん、赤紅色の薄絹、高位の者が身につける高級な織物',
  '臻': 'いたる、集まる、最高の状態や目的地に到達する',
  '鱏': 'えい、またはチョウザメ、海底に潜む平たい魚の総称',
  '莘': 'しん、多く集まるさま、草木が盛んに生い茂る様子',
  '侁': 'しん、大勢の人が行き交うさま、群れをなして歩く姿',
  '哂': 'わらう、あざ笑う、口元を緩めて冷ややかに微笑む',
  '搢': 'さしはさむ、儀式の際に笏（しゃく）を帯に差し入れる',
  '藎': 'しん、忠義を尽くすこと、または黄色い染料になる草',
  '瀋': 'しる、汁液、水が滴るさま、あるいは中国の都市（瀋陽）',
  '矧': 'しん、ましてや、なおさら、あるいは矢の羽を固定する紐',
  '齔': 'みそっぱ、乳歯が生え変わる時期の幼い子供',
  '辴': 'わらう、口を大きく開けて豪快に笑うさま'
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
  '塵': 'ちり、細かなゴミ、世俗の穢れ、小さく儚い存在',
  '甚': 'はなはだしい、程度が激しい、普通を大きく超えて非常に重いさま',
  '壬': 'みずのえ、十干の9番目、北の方角、大いなる水の流れ',
  '碪': 'きぬた、布を叩いて柔らかさや艶を出すために用いる石の台',
  '忱': 'まこと、誠実、心からの誠意、嘘偽りのない信じる心',
  '仞': 'ひろ、長さを測る単位（約1.8m）、非常に高い山や切り立った崖',
  '軔': '歯止め、車の車輪を止める木、転じて物事を始めるきっかけ',
  '仭': 'ひろ、深く測定できないこと、深くて底が知れない様子',
  '靭': 'しなやか、粘り強くて簡単には切れない、または矢を入れる道具',
  '椹': 'さわら、ヒノキ科の針葉樹、または木を切り出した作業用のまな板',
  '燼': '燃え残り、消えかかった火、戦争や大きな災厄の悲惨な爪痕',
  '荏': 'えごま、油を採るシソ科の植物、または柔らかくて弱々しいさま',
  '侭': 'まま、自分の思い通りに動くこと、または状態がずっと変わらない様',
  '汛': 'みちしお、水が急激に増えること、または大雨で川の水が溢れる様',
  '潯': 'みずぎわ、川や海の淵、水が深く静かに淀んでいる場所',
  '鐔': 'つば、刀剣の柄と刃の間にある手を保護する金具、またはその平たい形',
  '蕈': 'きのこ、湿った場所に静かに自生する菌類、またはその傘の形',
  '鴆': 'ちん、またはじん。食べた者を即座に絶命させる猛毒を持つ伝説の怪鳥',
  '唫': 'くちをつぐむ、口を閉じて言葉を発しない、または静かに口ずさむ',
  '搢': '（※シンにあるため、代わりに『絚』じん：張りつめた綱、強く引き締まるさま'
};

type Position = { x: number; y: number };

// マップの生成関数（簡易版：実際はもっと複雑に配置可能）
const createEmptyMap = (): TileData[][] =>
  Array(MAP_HEIGHT)
    .fill(null)
    .map(() => Array(MAP_WIDTH).fill(null).map(() => ({ char: '', isWall: false })));

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const getEmptyPositions = (map: TileData[][]): Position[] => {
  const positions: Position[] = [];
  for (let y = 1; y < MAP_HEIGHT - 1; y++) {
    for (let x = 1; x < MAP_WIDTH - 1; x++) {
      if (map[y][x].char === '' && !map[y][x].isWall) {
        positions.push({ x, y });
      }
    }
  }
  return positions;
};

const getSpacedPositions = (map: TileData[][]): Position[] => {
  const positions: Position[] = [];
  for (let y = 1; y < MAP_HEIGHT - 1; y += 1) {
    for (let x = 1; x < MAP_WIDTH - 1; x += 1) {
      if (map[y][x].char === '' && !map[y][x].isWall) {
        positions.push({ x, y });
      }
    }
  }
  return positions;
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
  const availablePositions = shuffle(getEmptyPositions(map));
  const takeRandomPosition = (): Position | null => {
    while (availablePositions.length > 0) {
      const pos = availablePositions.pop()!;
      if (map[pos.y][pos.x].char === '' && !map[pos.y][pos.x].isWall) {
        return pos;
      }
    }
    return null;
  };

  const placeSpecialTile = (tile: TileData) => {
    const pos = takeRandomPosition();
    if (!pos) return;
    map[pos.y][pos.x] = tile;
  };

  // 要件：シンとの当たり判定イベント
  placeSpecialTile({ char: '真', isWall: false, event: 'shin', label: '真実の断片' });
  // 要件：進（進むかの選択）- 真を発見後に現れる
  placeSpecialTile({ char: '進', isWall: false, event: 'advance', requiresFlag: 'hasDiscoveredShin' });
  // アイテム
  placeSpecialTile({ char: '薬', isWall: false, event: 'item', label: '心の欠片' });
  placeSpecialTile({ char: '芯', isWall: false, event: 'item', label: '心の拠り所' });

  const spacedPositions = getSpacedPositions(map);
  const allEmptyPositions = getEmptyPositions(map);
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