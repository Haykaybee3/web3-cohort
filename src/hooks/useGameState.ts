import { useState, useCallback, useEffect } from 'react';
import { GameState, Difficulty } from '../types/game';
import { DIFFICULTY_SETTINGS } from '../constants/gameConstants';
import { generateRandomNumber, validateGuess, getGameMessage } from '../utils/gameUtils';

export const useGameState = (initialDifficulty: Difficulty = 'medium') => {
  const [error, setError] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>(() => ({
    secretNumber: generateRandomNumber(initialDifficulty),
    attemptsLeft: DIFFICULTY_SETTINGS[initialDifficulty].attempts,
    status: 'playing',
    message: 'Make your guess!',
    difficulty: initialDifficulty
  }));

  useEffect(() => {
    // Cleanup function to handle any necessary cleanup
    return () => {
      setGameState(prev => ({ ...prev, status: 'playing' }));
      setError(null);
    };
  }, []);

  const makeGuess = useCallback((guess: number) => {
    try {
      if (gameState.status !== 'playing') return;

      const maxRange = DIFFICULTY_SETTINGS[gameState.difficulty].range;
      if (!validateGuess(guess, maxRange)) {
        setError(`Please enter a valid number between 1 and ${maxRange}`);
        return;
      }

      setError(null);
      const newAttemptsLeft = gameState.attemptsLeft - 1;
      const message = getGameMessage(guess, gameState.secretNumber, newAttemptsLeft);
      
      setGameState(prev => ({
        ...prev,
        attemptsLeft: newAttemptsLeft,
        status: guess === prev.secretNumber ? 'won' : newAttemptsLeft === 0 ? 'lost' : 'playing',
        message
      }));
    } catch (err) {
      setError('An error occurred while processing your guess');
      console.error('Guess error:', err);
    }
  }, [gameState]);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    try {
      setGameState({
        secretNumber: generateRandomNumber(difficulty),
        attemptsLeft: DIFFICULTY_SETTINGS[difficulty].attempts,
        status: 'playing',
        message: 'Make your guess!',
        difficulty
      });
      setError(null);
    } catch (err) {
      setError('An error occurred while changing difficulty');
      console.error('Difficulty error:', err);
    }
  }, []);

  const resetGame = useCallback(() => {
    try {
      setGameState(prev => ({
        secretNumber: generateRandomNumber(prev.difficulty),
        attemptsLeft: DIFFICULTY_SETTINGS[prev.difficulty].attempts,
        status: 'playing',
        message: 'Make your guess!',
        difficulty: prev.difficulty
      }));
      setError(null);
    } catch (err) {
      setError('An error occurred while resetting the game');
      console.error('Reset error:', err);
    }
  }, []);

  return {
    gameState,
    error,
    makeGuess,
    resetGame,
    setDifficulty
  };
};