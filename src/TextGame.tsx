import React, { useState, useEffect, useCallback } from 'react';
import { MAP_WIDTH, MAP_HEIGHT, type GameState } from './types';
import { MAPS, SHIN_DICTIONARY, GIN_DICTIONARY } from './constants';

const SAVE_KEY = 'text_game_save';

export const TextGame: React.FC = () => {
  // 状態の初期化（localStorageから復元、なければ初期値）
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      hp: "心心心心心",
      inventory: [],
      currentMapIndex: 0,
      playerPos: { x: 16, y: 16 }, // 下から上へ進むため、初期位置は下の方
      flags: {},
      discoveredChars: []
    };
  });

  const [message, setMessage] = useState<string>('WASDで移動。上を目指せ。');
  const [showAdvanceDialog, setShowAdvanceDialog] = useState(false);

  const isGameOver = state.hp.length === 0;

  const restartGame = useCallback(() => {
    setState({
      hp: '心心心心心',
      inventory: [],
      currentMapIndex: 0,
      playerPos: { x: 16, y: 16 },
      flags: {},
      discoveredChars: []
    });
    setShowAdvanceDialog(false);
    setMessage('再スタート！WASDで移動。');
  }, []);

  // セーブ処理
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }, [state]);

  // 移動と当たり判定のロジック
  const movePlayer = useCallback((dx: number, dy: number) => {
    setState(prev => {
      const nextX = prev.playerPos.x + dx;
      const nextY = prev.playerPos.y + dy;
      const currentMap = MAPS[prev.currentMapIndex];

      // 境界チェックと壁チェック
      if (nextX < 0 || nextX >= MAP_WIDTH || nextY < 0 || nextY >= MAP_HEIGHT) return prev;
      const targetTile = currentMap[nextY][nextX];
      if (targetTile.isWall) return prev;

      // 必要なフラグが揃っていない場合は進めない
      if (targetTile.requiresFlag && !prev.flags[targetTile.requiresFlag]) {
        setMessage('まだ進めない。まずは他の手がかりを探そう。');
        return prev;
      }

      let nextHp = prev.hp; // HPの変化：要修正
      const nextInventory = [...prev.inventory];
      const nextFlags = { ...prev.flags };
      const nextDiscoveredChars = [...prev.discoveredChars];

      // 当たり判定時に文字を発見状態にする
      if (targetTile.char && !nextDiscoveredChars.includes(targetTile.char)) {
        nextDiscoveredChars.push(targetTile.char);
      }

      // イベント発火
      const shinMeaning = SHIN_DICTIONARY[targetTile.char];
      const ginMeaning = GIN_DICTIONARY[targetTile.char];
      if (targetTile.event === 'shin') {
        setMessage(`シンに触れた: ${shinMeaning || '???'}`);
        nextFlags.hasDiscoveredShin = true; // シンを発見したフラグをセット
      } else if (targetTile.event === 'gin') {
        setMessage(`ジンに触れた: ${ginMeaning || '???'}`);
        nextFlags.hasDiscoveredJin = true; // ジンを発見したフラグをセット
        nextHp = nextHp.substring(0, nextHp.length - 1);
      } else if (targetTile.event === 'item') {
        if (targetTile.label && !nextInventory.includes(targetTile.label)) {
          nextInventory.push(targetTile.label!);
          setMessage(`${targetTile.label} を手に入れた。`);
          nextHp += "心";
        }
      } else if (targetTile.event === 'advance') {
        setShowAdvanceDialog(true); // ダイアログ表示
        return { ...prev, playerPos: { x: nextX, y: nextY } };
      }
      if (!targetTile.event && (shinMeaning || ginMeaning)) {
        setMessage(`${targetTile.char} の意味: ${shinMeaning || ginMeaning}`);
      }

      return {
        ...prev,
        playerPos: { x: nextX, y: nextY },
        hp: nextHp,
        inventory: nextInventory,
        flags: nextFlags,
        discoveredChars: nextDiscoveredChars
      };
    });
  }, []);

  // 入力判定
  useEffect(() => {
    if (showAdvanceDialog || isGameOver) return; // ダイアログ中・ゲームオーバー中は動けない
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': movePlayer(0, -1); break;
        case 'a': movePlayer(-1, 0); break;
        case 's': movePlayer(0, 1); break;
        case 'd': movePlayer(1, 0); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movePlayer, showAdvanceDialog, isGameOver]);

  useEffect(() => {
    if (!isGameOver) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'y') {
        restartGame();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isGameOver, restartGame]);

  // 次のマップへ（ランダム選択）
  const advanceToNextMap = () => {
    const nextIndex = Math.floor(Math.random() * MAPS.length);
    setState(prev => ({
      ...prev,
      currentMapIndex: nextIndex,
      playerPos: { x: 16, y: 16 }, // リセット位置
      discoveredChars: [] // 新マップで文字をリセット
    }));
    setShowAdvanceDialog(false);
    setMessage(`第 ${nextIndex + 1} 領域に転送された。`);
  };

  return (
    <div style={{ 
      backgroundColor: '#000', color: '#fff', height: '100vh', 
      fontFamily: '"Courier New", Courier, monospace', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* UI：左上の心のHP */}
      <div style={{ position: 'absolute', top: 20, left: 20, borderLeft: '4px solid #f00', paddingLeft: 10 }}>
        <div style={{ fontSize: '12px', color: '#888' }}>心残心</div>
        <div style={{ fontSize: '24px' }}>{state.hp}</div>
      </div>

      {/* UI：右上のインベントリ */}
      <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right' }}>
        <div style={{ fontSize: '12px', color: '#888' }}>INVENTORY</div>
        {state.inventory.map((item, i) => <div key={i}>{item}</div>)}
      </div>

      {/* ゲーム画面 (16:9を維持するグリッド) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${MAP_WIDTH}, 20px)`,
        gridTemplateRows: `repeat(${MAP_HEIGHT}, 20px)`,
        border: '1px solid #333'
      }}>
        {MAPS[state.currentMapIndex].map((row, y) => 
          row.map((tile, x) => {
            // 文字が発見済みか判定
            const isDiscovered = state.discoveredChars.includes(tile.char);
            // 表示する文字を決定：発見済みなら本物、未発見で事象あり（シン、アイテム）なら「？」
            const isDictionaryTile = !!(SHIN_DICTIONARY[tile.char] || GIN_DICTIONARY[tile.char]);
            const displayChar = isDiscovered || !isDictionaryTile ? tile.char : '？';
            
            return (
              <div key={`${x}-${y}`} style={{ 
                width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px',
                color: x === state.playerPos.x && y === state.playerPos.y ? '#0f0' : '#fff',
                opacity: isDiscovered ? 1 : 0.7
              }}>
                {x === state.playerPos.x && y === state.playerPos.y ? '人' : displayChar} 
              </div>
            );
          })
        )}
      </div>

      {/* 下部のメッセージエリア */}
      <div style={{ marginTop: 20, width: 640, color: '#aaa', fontSize: '14px' }}>
        {message}
      </div>

      {/* ゲームオーバー画面 */}
      {isGameOver && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
        }}>
              <div style={{
            width: 680,
            padding: 24,
            backgroundColor: '#111',
            border: '2px solid #f00',
            borderRadius: 12,
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(255,0,0,0.4)'
          }}>
            <img
              src="image.png"
              alt="Game Over"
              style={{
                width: '100%',
                maxWidth: 640,
                marginBottom: 24,
                borderRadius: 10,
                display: 'block',
                objectFit: 'cover'
              }}
            />
            <div style={{ fontSize: 28, color: '#f33', fontWeight: 'bold', marginBottom: 12 }}>GAME OVER</div>
            <div style={{ fontSize: 16, color: '#ddd', marginBottom: 20 }}>YOU HAVE FALLEN IN BATTLE</div>
            <div style={{ fontSize: 14, color: '#aaa', marginBottom: 20 }}>Retry from last checkpoint? (Press Y)</div>
            <button
              onClick={restartGame}
              style={{
                background: '#f00',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                fontSize: 16,
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              RESTART (Y)
            </button>
          </div>
        </div>
      )}

      {/* 進むかの選択ダイアログ */}
      {showAdvanceDialog && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ border: '1px solid #040303', padding: 40, textAlign: 'center' }}>
            <p>「進」の意志を感じる。次の領域へ向かいますか？</p>
            <button onClick={advanceToNextMap} style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', marginRight: 10 }}>はい</button>
            <button onClick={() => setShowAdvanceDialog(false)} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>いいえ</button>
          </div>
        </div>
      )}
    </div>
  );
};