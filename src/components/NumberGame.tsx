import React, { useState, FormEvent, useCallback, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameButton } from './GameButton';
import type { Difficulty } from '../types/game';

export const NumberGame: React.FC = () => {
  const { gameState, error, makeGuess, resetGame, setDifficulty } = useGameState();
  const [inputValue, setInputValue] = useState('');

  // Validate component initialization
  useEffect(() => {
    console.log('[NumberGame] Initialized with:', {
      difficulty: gameState.difficulty,
      status: gameState.status,
      attemptsLeft: gameState.attemptsLeft
    });
  }, []);

  // Validate state updates
  useEffect(() => {
    console.log('[NumberGame] State updated:', {
      status: gameState.status,
      attemptsLeft: gameState.attemptsLeft,
      message: gameState.message
    });
  }, [gameState.status, gameState.attemptsLeft, gameState.message]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log('[NumberGame] Submitting guess:', inputValue);
    const guess = parseInt(inputValue, 10);
    if (!isNaN(guess)) {
      console.log('[NumberGame] Valid guess:', guess);
      makeGuess(guess);
      setInputValue('');
    } else {
      console.log('[NumberGame] Invalid guess:', inputValue);
    }
  }, [inputValue, makeGuess]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Number Guessing Game</h1>
        
        <div className="flex justify-center gap-2 mb-4">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <GameButton
              key={diff}
              onClick={() => setDifficulty(diff)}
              disabled={gameState.status === 'playing'}
              variant={gameState.difficulty === diff ? 'primary' : 'secondary'}
            >
              {diff}
            </GameButton>
          ))}
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <div className="text-center mb-4">{gameState.message}</div>

        <div className="text-center mb-4">
          Attempts left: {gameState.attemptsLeft}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={gameState.status !== 'playing'}
              className="flex-1 p-2 border rounded"
              placeholder="Enter your guess"
            />
            <GameButton
              onClick={() => {}}
              disabled={gameState.status !== 'playing' || !inputValue}
              type="submit"
            >
              Guess
            </GameButton>
          </div>
        </form>

        {gameState.status !== 'playing' && (
          <GameButton
            onClick={resetGame}
            variant="primary"
            className="w-full mt-4"
          >
            Play Again
          </GameButton>
        )}
      </div>
    </div>
  );
};