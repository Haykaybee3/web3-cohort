import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';

describe('useGameState', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useGameState());
    
    expect(result.current.gameState).toEqual({
      secretNumber: expect.any(Number),
      attemptsLeft: 10,
      status: 'playing',
      message: 'Make your guess!',
      difficulty: 'medium'
    });

    // Verify number is within range
    expect(result.current.gameState.secretNumber).toBeGreaterThanOrEqual(1);
    expect(result.current.gameState.secretNumber).toBeLessThanOrEqual(100); // medium difficulty range
  });

  it('should reset game state when resetGame is called', () => {
    const { result } = renderHook(() => useGameState());
    const initialNumber = result.current.gameState.secretNumber;

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameState.attemptsLeft).toBe(10); // medium difficulty attempts
    expect(result.current.gameState.status).toBe('playing');
    // Note: There's a small chance this could fail if we randomly get the same number
    expect(result.current.gameState.secretNumber).not.toBe(initialNumber);
  });

  describe('makeGuess', () => {
    it('should handle correct guess', () => {
      const { result } = renderHook(() => useGameState());
      const secretNumber = result.current.gameState.secretNumber;

      act(() => {
        result.current.makeGuess(secretNumber);
      });

      expect(result.current.gameState.status).toBe('won');
      expect(result.current.gameState.message).toBe('Congratulations! You won!');
      expect(result.current.gameState.attemptsLeft).toBe(9);
    });

    it('should handle incorrect guess', () => {
      const { result } = renderHook(() => useGameState());
      const secretNumber = result.current.gameState.secretNumber;
      const incorrectGuess = secretNumber < 100 ? secretNumber + 1 : secretNumber - 1;

      act(() => {
        result.current.makeGuess(incorrectGuess);
      });

      expect(result.current.gameState.status).toBe('playing');
      expect(result.current.gameState.attemptsLeft).toBe(9);
      expect(result.current.gameState.message).toMatch(/Too (high|low)! 9 guesses remaining/);
    });

    it('should handle invalid guesses', () => {
      const { result } = renderHook(() => useGameState());

      act(() => {
        result.current.makeGuess(101);
      });

      const maxRange = 100; // medium difficulty range
      expect(result.current.gameState.message).toBe(`Please enter a valid number between 1 and ${maxRange}`);
      expect(result.current.gameState.attemptsLeft).toBe(10); // medium difficulty attempts
      expect(result.current.gameState.status).toBe('playing');
    });

    it('should handle game over', () => {
      const { result } = renderHook(() => useGameState('hard')); // Using hard difficulty for minimum attempts
      const secretNumber = result.current.gameState.secretNumber;
      const incorrectGuess = secretNumber < 100 ? secretNumber + 1 : secretNumber - 1;

      act(() => {
        result.current.makeGuess(incorrectGuess);
      });

      expect(result.current.gameState.status).toBe('lost');
      expect(result.current.gameState.attemptsLeft).toBe(0);
      expect(result.current.gameState.message).toBe(`Game Over! The number was ${secretNumber}`);
    });
  });
});