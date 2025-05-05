import { DIFFICULTY_SETTINGS } from '../constants/gameConstants';
import type { Difficulty } from '../types/game';

export const generateRandomNumber = (difficulty: Difficulty): number => {
  const range = DIFFICULTY_SETTINGS[difficulty].range;
  return Math.floor(Math.random() * range) + 1;
};

export const validateGuess = (guess: number, maxRange: number): boolean => {
  return Number.isInteger(guess) && guess >= 1 && guess <= maxRange;
};

export const getGameMessage = (guess: number, secretNumber: number, attemptsLeft: number): string => {
  if (guess === secretNumber) return 'Congratulations! You won!';
  if (attemptsLeft === 0) return `Game Over! The number was ${secretNumber}`;
  
  const direction = guess < secretNumber ? 'low' : 'high';
  return `Too ${direction}! ${attemptsLeft} ${attemptsLeft === 1 ? 'guess' : 'guesses'} remaining`;
};