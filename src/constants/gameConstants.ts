export const GAME_SETTINGS = {
  MAX_ATTEMPTS: Number(process.env.REACT_APP_MAX_ATTEMPTS) || 10,
  MIN_NUMBER: Number(process.env.REACT_APP_MIN_NUMBER) || 1,
  MAX_NUMBER: Number(process.env.REACT_APP_MAX_NUMBER) || 100
} as const;

export const DIFFICULTY_SETTINGS = {
  easy: { attempts: 15, range: 50 },
  medium: { attempts: 10, range: 100 },
  hard: { attempts: 5, range: 200 }
} as const;