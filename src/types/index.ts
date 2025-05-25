export enum CharacterClass {
  WIZARD = 'wizard',
  ARCHER = 'archer',
  KNIGHT = 'knight',
}

export enum GameState {
  TITLE = 'title',
  CHARACTER_SELECT = 'character_select',
  EXPLORATION = 'exploration',
  BATTLE = 'battle',
  BATTLE_REWARD = 'battle_reward',
  GAME_OVER = 'game_over',
}

export enum MathProblemType {
  ALGEBRA = 'algebra',
  FRACTIONS = 'fractions',
  GEOMETRY = 'geometry',
  DECIMALS = 'decimals',
}

export interface Problem {
  question: string;
  answer: number | string;
  options?: string[];
  difficulty: number;
  type: string;
  hint?: string;
}

export interface Enemy {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  image: string;
  level: number;
  problemType: MathProblemType;
}

export interface CharacterStats {
  level: number;
  health: number;
  maxHealth: number;
  experience: number;
  nextLevelExp: number;
  class: CharacterClass;
}

export interface GameLocation {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  enemies: Enemy[];
  mathType: MathProblemType;
}