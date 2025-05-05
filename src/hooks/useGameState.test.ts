import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';

describe('useGameState', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useGameState());
    
    expect(result.current.gameState).toEqual({
      secretNumber: expect.any(Number),
      attemptsLeft: 10,
      status: 'playing',
      message: 'Make your guess!'
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
    // Note: There's a small chance this could fail if we randomly get the same number
    expect(result.current.gameState.secretNumber).not.toBe(initialNumber);
  });
});