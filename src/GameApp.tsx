import { useState } from 'react';
import { usePlayerMovement } from './userPlayerMovements';
import { Target, setTargetContext } from './Target';
import { type Position, type GameAppState } from './types';

// 【修正点1】固定の座標データはコンポーネントの「外」に出す
// これにより、再レンダリング時にオブジェクトが再生成されず、無限ループを防ぎます。
const SHIN_POS: Position = { x: 300, y: 200 };
const ADVANCE_ITEM_POS: Position = { x: 500, y: 400 };

export function GameApp() {
  const [gameState, setGameState] = useState<GameAppState>({
    hp: "心心心心心", // プレイヤーのHP
    inventory: [],
    canAdvance: false,
    isShinEventTriggered: false,
    discoveredChars: []
  });

  const handleMove = (nextPos: Position) => {
    setGameState(prev => {
      const nextState = { ...prev };
      let hasChanged = false;

      // Targetで使用するコンテキストを設定
      setTargetContext(SHIN_POS, ADVANCE_ITEM_POS, prev, nextState);

      // 1. シンとの当たり判定
      Target(nextPos, (value) => { hasChanged = value; });

      // 変更があった場合のみ新しい状態を返し、なければそのまま（再レンダリングしない）
      return hasChanged ? nextState : prev;
    });
  };

  const { position: playerPos } = usePlayerMovement({ x: 100, y: 100 }, handleMove);

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
        真
      </div>

      <div style={{
        position: 'absolute', top: SHIN_POS.y, left: SHIN_POS.x,
        width: '50px', height: '50px', backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        芯
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
    </div>
  );
}