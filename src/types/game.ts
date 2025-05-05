export type GameStatus = 'playing' | 'won' | 'lost';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  secretNumber: number;
  attemptsLeft: number;
  status: GameStatus;
  message: string;
  difficulty: Difficulty;
}