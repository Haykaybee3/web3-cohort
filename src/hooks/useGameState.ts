import { useState, useCallback, useEffect } from 'react';

type GameStatus = 'playing' | 'won' | 'lost';
type Difficulty = 'easy' | 'medium' | 'hard';

interface GameState {
  secretNumber: number;
  attemptsLeft: number;
  status: GameStatus;
  message: string;
  difficulty: Difficulty;
  hintsLeft: number;
  soundEnabled: boolean;
  lastGuess: number | null;
}

const DIFFICULTY_SETTINGS = {
  easy: { attempts: 15, range: 50, hints: 3 },
  medium: { attempts: 10, range: 100, hints: 2 },
  hard: { attempts: 5, range: 200, hints: 1 }
};

export const useGameState = (initialDifficulty: Difficulty = 'medium') => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    secretNumber: Math.floor(Math.random() * DIFFICULTY_SETTINGS[initialDifficulty].range) + 1,
    attemptsLeft: DIFFICULTY_SETTINGS[initialDifficulty].attempts,
    status: 'playing',
    message: 'Make your guess!',
    difficulty: initialDifficulty,
    hintsLeft: DIFFICULTY_SETTINGS[initialDifficulty].hints,
    soundEnabled: true,
    lastGuess: null
  }));

  const getHint = useCallback(() => {
    if (gameState.hintsLeft <= 0) return;

    const range = DIFFICULTY_SETTINGS[gameState.difficulty].range;
    const secretNum = gameState.secretNumber;
    let hint = '';

    // Generate different types of hints
    const hintTypes = [
      () => `The number is ${secretNum % 2 === 0 ? 'even' : 'odd'}`,
      () => `The number is ${secretNum > range/2 ? 'in the upper half' : 'in the lower half'}`,
      () => `The sum of its digits is ${String(secretNum).split('').reduce((a, b) => a + parseInt(b), 0)}`
    ];

    hint = hintTypes[Math.floor(Math.random() * hintTypes.length)]();

    setGameState(prev => ({
      ...prev,
      hintsLeft: prev.hintsLeft - 1,
      message: hint
    }));
  }, [gameState.hintsLeft, gameState.difficulty, gameState.secretNumber]);

  const toggleSound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  }, []);

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
    setDifficulty,
    getHint,
    toggleSound
  };
};