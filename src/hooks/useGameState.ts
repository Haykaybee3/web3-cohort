import { useState, useCallback } from 'react';

type GameStatus = 'playing' | 'won' | 'lost';
type Difficulty = 'easy' | 'medium' | 'hard';

interface GameState {
  secretNumber: number;
  attemptsLeft: number;
  status: GameStatus;
  message: string;
  difficulty: Difficulty;
}

const DIFFICULTY_SETTINGS = {
  easy: { attempts: 15, range: 50 },
  medium: { attempts: 10, range: 100 },
  hard: { attempts: 5, range: 200 }
};

export const useGameState = (initialDifficulty: Difficulty = 'medium') => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    secretNumber: Math.floor(Math.random() * DIFFICULTY_SETTINGS[initialDifficulty].range) + 1,
    attemptsLeft: DIFFICULTY_SETTINGS[initialDifficulty].attempts,
    status: 'playing',
    message: 'Make your guess!',
    difficulty: initialDifficulty
  }));

  const makeGuess = useCallback((guess: number) => {
    if (gameState.status !== 'playing') return;

    const maxRange = DIFFICULTY_SETTINGS[gameState.difficulty].range;
    if (guess < 1 || guess > maxRange || !Number.isInteger(guess)) {
      setGameState(prev => ({
        ...prev,
        message: `Please enter a valid number between 1 and ${maxRange}`
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

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState({
      secretNumber: Math.floor(Math.random() * DIFFICULTY_SETTINGS[difficulty].range) + 1,
      attemptsLeft: DIFFICULTY_SETTINGS[difficulty].attempts,
      status: 'playing',
      message: 'Make your guess!',
      difficulty
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      secretNumber: Math.floor(Math.random() * DIFFICULTY_SETTINGS[prev.difficulty].range) + 1,
      attemptsLeft: DIFFICULTY_SETTINGS[prev.difficulty].attempts,
      status: 'playing',
      message: 'Make your guess!',
      difficulty: prev.difficulty
    }));
  }, []);

  return {
    gameState,
    makeGuess,
    resetGame,
    setDifficulty
  };
};