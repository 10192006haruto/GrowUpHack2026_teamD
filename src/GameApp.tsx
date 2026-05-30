import React, { useState } from 'react';
import { usePlayerMovement } from './userPlayerMovements';
import { GameUI } from './GameUI';
import { Target } from './Target';

// 【修正点1】固定の座標データはコンポーネントの「外」に出す
// これにより、再レンダリング時にオブジェクトが再生成されず、無限ループを防ぎます。
const SHIN_POS: Position = { x: 300, y: 200 };
const ADVANCE_ITEM_POS: Position = { x: 500, y: 400 };

export const GameApp: React.FC = () => {
  const [gameState, setGameState] = useState<GameAppState>({
    hp: "心心心心心", // プレイヤーのHP：変更必須
    inventory: [],
    canAdvance: false,
    isShinEventTriggered: false,
  });
  const [hasChanged, setHasChanged] = useState(false); // 状態の変更を追跡するフラグ

  const handleMove = (nextPos: Position) => {
    setGameState(prev => {
      const nextState = { ...prev };
      setHasChanged(false); // 毎回リセット

      // 当たり判定をまとめて委譲する
      

      // 1. シンとの当たり判定
      Target(nextPos,setHasChanged);


      
      // 変更があった場合のみ新しい状態を返し、なければそのまま（再レンダリングしない）
      return hasChanged ? nextState : prev;
    });
  };

  const { position: playerPos } = usePlayerMovement({ x: 100, y: 100 }, handleMove);

  const handleMapAdvance = (willAdvance: boolean) => {
    if (willAdvance) {
      setTimeout(() => alert("次のマップへ移動します..."), 1000);
      setGameState(prev => ({ ...prev, canAdvance: false, inventory: [] }));
    } else {
      setTimeout(() => alert("次のマップへ移動します..."), 1000);
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

      {/* 真の描画 */}
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

      {/* UIレイヤーの重ね合わせ */}
      <GameUI gameState={gameState} onAdvanceMap={handleMapAdvance} />
    </div>
  );
};