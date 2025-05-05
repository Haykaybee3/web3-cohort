import { useState, useCallback } from 'react';

type GameStatus = 'playing' | 'won' | 'lost';

interface GameState {
  secretNumber: number;
  attemptsLeft: number;
  status: GameStatus;
  message: string;
}

export const useGameState = (maxAttempts: number = 10) => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    secretNumber: Math.floor(Math.random() * 100) + 1,
    attemptsLeft: maxAttempts,
    status: 'playing',
    message: 'Make your guess!'
  }));

  const resetGame = useCallback(() => {
    setGameState({
      secretNumber: Math.floor(Math.random() * 100) + 1,
      attemptsLeft: maxAttempts,
      status: 'playing',
      message: 'Make your guess!'
    });
  }, [maxAttempts]);

  return {
    gameState,
    resetGame
  };
};