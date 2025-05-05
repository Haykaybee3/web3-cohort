import React, { useState, FormEvent } from 'react';
import { useGameState } from '../hooks/useGameState';

export const NumberGame: React.FC = () => {
  const { gameState, makeGuess, resetGame } = useGameState();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const guess = parseInt(inputValue, 10);
    if (!isNaN(guess)) {
      makeGuess(guess);
      setInputValue('');
    }
  };

  const getMessageColor = () => {
    switch (gameState.status) {
      case 'won':
        return 'text-green-600';
      case 'lost':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Number Guessing Game</h1>
          <p className="text-gray-500 text-sm">Guess a number between 1 and 100</p>
        </div>

        <div className={`text-center ${getMessageColor()} text-xl font-semibold p-4 bg-opacity-10 rounded-lg ${gameState.status === 'playing' ? 'animate-bounce' : ''}`}>
          {gameState.message}
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Attempts left: 
            <span className="ml-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
              {gameState.attemptsLeft}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="1"
              max="100"
              disabled={gameState.status !== 'playing'}
              placeholder="Enter your guess"
              className="w-full min-w-[200px] rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 text-lg disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
            />
            <button
              type="submit"
              disabled={gameState.status !== 'playing' || !inputValue}
              className="px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              Guess
            </button>
          </div>
        </form>

        {gameState.status !== 'playing' && (
          <button
            onClick={resetGame}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};