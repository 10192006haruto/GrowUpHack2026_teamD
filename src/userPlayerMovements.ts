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
        switch (e.key.toLowerCase()) {
          case 'w': newPos.y -= MOVE_SPEED; break;
          case 'a': newPos.x -= MOVE_SPEED; break;
          case 's': newPos.y += MOVE_SPEED; break;
          case 'd': newPos.x += MOVE_SPEED; break;
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