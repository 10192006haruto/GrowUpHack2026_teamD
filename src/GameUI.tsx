// GameUI.tsx
import React from 'react';
import type { GameAppState } from './types';

type GameUIProps = {
  gameState: GameAppState;
  onAdvanceMap: (advance: boolean) => void;
};

export const GameUI: React.FC<GameUIProps> = ({ gameState, onAdvanceMap }) => {
  return (
    <>
      {/* 左上の心のHP */}
      <div style={{ position: 'absolute', top: 16, left: 16, fontSize: '24px', fontWeight: 'bold', color: 'red' }}>
        心のHP: {gameState.hp}
      </div>

      {/* インベントリ表示 */}
      <div style={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px', borderRadius: '8px' }}>
        <h3>インベントリ</h3>
        <ul>
          {gameState.inventory.length === 0 && <li>空</li>}
          {gameState.inventory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 「進」取得時の選択ダイアログ */}
      {gameState.canAdvance && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '2px solid black', textAlign: 'center'
        }}>
          <h2>次のマップに進みますか？</h2>
          <button onClick={() => onAdvanceMap(true)} style={{ margin: '10px', padding: '10px 20px' }}>はい</button>
          <button onClick={() => onAdvanceMap(false)} style={{ margin: '10px', padding: '10px 20px' }}>いいえ</button>
        </div>
      )}
    </>
  );
};