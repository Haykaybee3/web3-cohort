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
      difficulty: 'medium',
      hintsLeft: 2,
      soundEnabled: true,
      lastGuess: null
    });

    // Verify number is within range
    expect(result.current.gameState.secretNumber).toBeGreaterThanOrEqual(1);
    expect(result.current.gameState.secretNumber).toBeLessThanOrEqual(100);
  });

  it('should reset game state when resetGame is called', () => {
    const { result } = renderHook(() => useGameState());
    const initialNumber = result.current.gameState.secretNumber;

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameState.attemptsLeft).toBe(10);
    expect(result.current.gameState.status).toBe('playing');
    expect(result.current.gameState.hintsLeft).toBe(2);
    expect(result.current.gameState.lastGuess).toBe(null);
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
      expect(result.current.gameState.lastGuess).toBe(secretNumber);
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
      expect(result.current.gameState.lastGuess).toBe(incorrectGuess);
    });

    it('should handle invalid guesses', () => {
      const { result } = renderHook(() => useGameState());

      act(() => {
        result.current.makeGuess(101);
      });

      expect(result.current.gameState.message).toBe('Please enter a valid number between 1 and 100');
      expect(result.current.gameState.attemptsLeft).toBe(10);
      expect(result.current.gameState.status).toBe('playing');
      expect(result.current.gameState.lastGuess).toBe(null);
    });
  });

  describe('getHint', () => {
    it('should provide a hint and decrease hintsLeft', () => {
      const { result } = renderHook(() => useGameState());
      const initialHints = result.current.gameState.hintsLeft;

      act(() => {
        result.current.getHint();
      });

      expect(result.current.gameState.hintsLeft).toBe(initialHints - 1);
      expect(result.current.gameState.message).toMatch(/(even|odd|upper half|lower half|sum of its digits)/);
    });

    it('should not provide hint when no hints left', () => {
      const { result } = renderHook(() => useGameState());
      const initialMessage = result.current.gameState.message;

      // Use up all hints
      act(() => {
        while (result.current.gameState.hintsLeft > 0) {
          result.current.getHint();
        }
        // Try one more time
        result.current.getHint();
      });

      expect(result.current.gameState.hintsLeft).toBe(0);
      expect(result.current.gameState.message).not.toBe(initialMessage);
    });
  });

  describe('toggleSound', () => {
    it('should toggle sound state', () => {
      const { result } = renderHook(() => useGameState());
      const initialSoundState = result.current.gameState.soundEnabled;

      act(() => {
        result.current.toggleSound();
      });

      expect(result.current.gameState.soundEnabled).toBe(!initialSoundState);
    });
  });
});