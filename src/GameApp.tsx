import React, { useState } from 'react';
import { HIT_RANGE, type GameAppState, type Position } from './types';
import { usePlayerMovement } from './userPlayerMovements';
import { GameUI } from './GameUI';

// 【修正点1】固定の座標データはコンポーネントの「外」に出す
// これにより、再レンダリング時にオブジェクトが再生成されず、無限ループを防ぎます。
const SHIN_POS: Position = { x: 300, y: 200 };
const ADVANCE_ITEM_POS: Position = { x: 500, y: 400 };

export const GameApp: React.FC = () => {
  const [gameState, setGameState] = useState<GameAppState>({
    hp: 100,
    inventory: [],
    canAdvance: false,
    isShinEventTriggered: false,
  });

  const handleMove = (nextPos: Position) => {
    setGameState(prev => {
      const nextState = { ...prev };
      let hasChanged = false;

      // 1. シンとの当たり判定
      const distanceToShin = Math.hypot(nextPos.x - SHIN_POS.x, nextPos.y - SHIN_POS.y);
      if (distanceToShin < HIT_RANGE && !prev.isShinEventTriggered) {
        nextState.hp -= 10;
        nextState.isShinEventTriggered = true;
        hasChanged = true;
        
        // 【修正点3】Reactのレンダリング処理をブロックしないよう、alertを非同期（setTimeout）にする
        setTimeout(() => alert("シンに遭遇した！何か言葉を感じる..."), 10);
      }

      // 2. 「進」アイテムとの当たり判定
      const distanceToAdvance = Math.hypot(nextPos.x - ADVANCE_ITEM_POS.x, nextPos.y - ADVANCE_ITEM_POS.y);
      if (distanceToAdvance < HIT_RANGE && !prev.canAdvance && !prev.inventory.includes('進')) {
        nextState.inventory = [...prev.inventory, '進'];
        nextState.canAdvance = true;
        hasChanged = true;
      }

      // 変更があった場合のみ新しい状態を返し、なければそのまま（再レンダリングしない）
      return hasChanged ? nextState : prev;
    });
  };

  const { position: playerPos } = usePlayerMovement({ x: 100, y: 100 }, handleMove);

  const handleMapAdvance = (willAdvance: boolean) => {
    if (willAdvance) {
      setTimeout(() => alert("次のマップへ移動します..."), 10);
      setGameState(prev => ({ ...prev, canAdvance: false, inventory: [] }));
    } else {
      setGameState(prev => ({ ...prev, canAdvance: false }));
    }
  };

  return (
    <div style={{ position: 'relative', width: '800px', height: '600px', backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* プレイヤーの描画 */}
      <div style={{
        position: 'absolute', top: playerPos.y, left: playerPos.x,
        width: '40px', height: '40px', backgroundColor: 'blue', borderRadius: '50%'
      }}></div>

      {/* シンの描画 */}
      <div style={{
        position: 'absolute', top: SHIN_POS.y, left: SHIN_POS.x,
        width: '50px', height: '50px', backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        シン
      </div>

      {/* 「進」アイテムの描画（取得していない場合のみ表示） */}
      {!gameState.inventory.includes('進') && (
        <div style={{
          position: 'absolute', top: ADVANCE_ITEM_POS.y, left: ADVANCE_ITEM_POS.x,
          width: '30px', height: '30px', backgroundColor: 'gold', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px'
        }}>
          進
        </div>
      )}

      {/* UIレイヤーの重ね合わせ */}
      <GameUI gameState={gameState} onAdvanceMap={handleMapAdvance} />
    </div>
  );
};