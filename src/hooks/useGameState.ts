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

  const makeGuess = useCallback((guess: number) => {
    if (gameState.status !== 'playing') {
      return;
    }

    if (guess < 1 || guess > 100 || !Number.isInteger(guess)) {
      setGameState(prev => ({
        ...prev,
        message: 'Please enter a valid number between 1 and 100'
      }));
      return;
    }

    const newAttemptsLeft = gameState.attemptsLeft - 1;
    
    if (guess === gameState.secretNumber) {
      setGameState(prev => ({
        ...prev,
        status: 'won',
        attemptsLeft: newAttemptsLeft,
        message: 'Congratulations! You won!'
      }));
    } else {
      const direction = guess < gameState.secretNumber ? 'low' : 'high';
      if (newAttemptsLeft === 0) {
        setGameState(prev => ({
          ...prev,
          status: 'lost',
          attemptsLeft: 0,
          message: `Game Over! The number was ${prev.secretNumber}`
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          attemptsLeft: newAttemptsLeft,
          message: `Too ${direction}! ${newAttemptsLeft} ${newAttemptsLeft === 1 ? 'guess' : 'guesses'} remaining`
        }));
      }
    }
  }, [gameState]);

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
    makeGuess,
    resetGame
  };
};