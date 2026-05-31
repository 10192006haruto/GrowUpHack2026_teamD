import { HIT_RANGE, type Position, type GameAppState } from './types';

// コンテキスト変数（GameApp.tsxから設定される）
let SHIN_POS: Position;
let ADVANCE_ITEM_POS: Position;
let prev: GameAppState;
let nextState: GameAppState;

// GameApp.tsxから呼び出される：コンテキストを設定
export const setTargetContext = (
  shinPos: Position,
  advanceItemPos: Position,
  prevState: GameAppState,
  nextStateParam: GameAppState
) => {
  SHIN_POS = shinPos;
  ADVANCE_ITEM_POS = advanceItemPos;
  prev = prevState;
  nextState = nextStateParam;
};

export const Target = (nextPos: Position, setHasChanged: (value: boolean) => void) => {
  // 1. シンとの当たり判定
  const distanceToShin = Math.hypot(nextPos.x - SHIN_POS.x, nextPos.y - SHIN_POS.y);
  if (distanceToShin < HIT_RANGE && !prev.isShinEventTriggered) {
    nextState.hp = nextState.hp.substring(0, nextState.hp.length - 1);
    nextState.isShinEventTriggered = true;
    setTimeout(() => alert("ジンに遭遇した！何か言葉を感じる..."), 10000);
    setHasChanged(true);
  }

  // 2. 「進」アイテムとの当たり判定
  const distanceToAdvance = Math.hypot(nextPos.x - ADVANCE_ITEM_POS.x, nextPos.y - ADVANCE_ITEM_POS.y);
  if (distanceToAdvance < HIT_RANGE && !prev.canAdvance && !prev.inventory.includes('進')) {
    nextState.inventory = [...prev.inventory, '進'];
    nextState.canAdvance = true;
    setHasChanged(true);
  }
}