// usePlayerMovement.ts
import { useState, useEffect } from 'react';
import { MOVE_SPEED, type Position } from './types';

export const usePlayerMovement = (
  initialPosition: Position,
  onMove?: (position: Position) => void
) => {
  const [position, setPosition] = useState<Position>(initialPosition);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition((prev) => {
        const newPos = { ...prev };
        switch (e.key) {
          case 'w':
          case 'ArrowUp': // 効かない
            newPos.y -= MOVE_SPEED;
            break;
          case 's':
          case 'ArrowDown': // 効かない
            newPos.y += MOVE_SPEED;
            break;
          case 'a':
          case 'ArrowLeft': // 効かない
            newPos.x -= MOVE_SPEED;
            break;
          case 'd':
          case 'ArrowRight': // 効かない
            newPos.x += MOVE_SPEED;
            break;
          default: return prev;
        }
        onMove?.(newPos);
        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove]);

  return { position };
};