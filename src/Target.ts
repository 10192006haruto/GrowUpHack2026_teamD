import { HIT_RANGE } from './types';

export const Target = (nextPos: Position, setHasChanged: (value: boolean) => void ) => {
      // 1. シンとの当たり判定
      const distanceToShin = Math.hypot(nextPos.x - SHIN_POS.x, nextPos.y - SHIN_POS.y);
      if (distanceToShin < HIT_RANGE && !prev.isShinEventTriggered) {
        nextState.hp.substring(0, nextState.hp.length - 1);
        nextState.isShinEventTriggered = true;
        setHasChanged(true);
        
        // 【修正点3】Reactのレンダリング処理をブロックしないよう、alertを非同期（setTimeout）にする
        setTimeout(() => alert("シンに遭遇した！何か言葉を感じる..."), 10000);
      }

      // 2. 「進」アイテムとの当たり判定
      const distanceToAdvance = Math.hypot(nextPos.x - ADVANCE_ITEM_POS.x, nextPos.y - ADVANCE_ITEM_POS.y);
      if (distanceToAdvance < HIT_RANGE && !prev.canAdvance && !prev.inventory.includes('進')) {
        nextState.inventory = [...prev.inventory, '進'];
        nextState.canAdvance = true;
        setHasChanged(true);
      }
}