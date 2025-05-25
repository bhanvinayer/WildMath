import React, { createContext, useContext, useState } from 'react';
import { generateProblem } from '../utils/mathProblemGenerator';
import { CharacterClass, GameState, Problem } from '../types';

interface GameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  characterClass: CharacterClass | null;
  setCharacterClass: (characterClass: CharacterClass) => void;
  playerStats: {
    level: number;
    health: number;
    maxHealth: number;
    experience: number;
    nextLevelExp: number;
  };
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
  currentProblem: Problem | null;
  generateNewProblem: (difficulty: number, type: string) => void;
  checkAnswer: (answer: number | string) => boolean;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  earnExperience: (amount: number) => void;
  takeDamage: (amount: number) => void;
  healPlayer: (amount: number) => void;
}

const defaultContext: GameContextType = {
  playerName: '',
  setPlayerName: () => {},
  characterClass: null,
  setCharacterClass: () => {},
  playerStats: {
    level: 1,
    health: 100,
    maxHealth: 100,
    experience: 0,
    nextLevelExp: 100,
  },
  currentLocation: 'Fraction Forest',
  setCurrentLocation: () => {},
  currentProblem: null,
  generateNewProblem: () => {},
  checkAnswer: () => false,
  gameState: GameState.TITLE,
  setGameState: () => {},
  earnExperience: () => {},
  takeDamage: () => {},
  healPlayer: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [characterClass, setCharacterClass] = useState<CharacterClass | null>(null);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    health: 100,
    maxHealth: 100,
    experience: 0,
    nextLevelExp: 100,
  });
  const [currentLocation, setCurrentLocation] = useState('Fraction Forest');
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.TITLE);

  const generateNewProblem = (difficulty: number, type: string) => {
    const problem = generateProblem(difficulty, type);
    setCurrentProblem(problem);
  };

  const checkAnswer = (answer: number | string): boolean => {
    if (!currentProblem) return false;
    
    // Convert answers to strings for comparison
    const userAnswer = String(answer).trim();
    const correctAnswer = String(currentProblem.answer).trim();
    
    return userAnswer === correctAnswer;
  };

  const earnExperience = (amount: number) => {
    setPlayerStats(prev => {
      const newExp = prev.experience + amount;
      
      // Check if player leveled up
      if (newExp >= prev.nextLevelExp) {
        const remainingExp = newExp - prev.nextLevelExp;
        const newLevel = prev.level + 1;
        const newMaxHealth = prev.maxHealth + 20;
        
        return {
          level: newLevel,
          health: newMaxHealth, // Heal on level up
          maxHealth: newMaxHealth,
          experience: remainingExp,
          nextLevelExp: Math.floor(prev.nextLevelExp * 1.5), // Increase exp needed for next level
        };
      }
      
      return {
        ...prev,
        experience: newExp,
      };
    });
  };

  const takeDamage = (amount: number) => {
    setPlayerStats(prev => ({
      ...prev,
      health: Math.max(0, prev.health - amount),
    }));
  };

  const healPlayer = (amount: number) => {
    setPlayerStats(prev => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + amount),
    }));
  };

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        characterClass,
        setCharacterClass,
        playerStats,
        currentLocation,
        setCurrentLocation,
        currentProblem,
        generateNewProblem,
        checkAnswer,
        gameState,
        setGameState,
        earnExperience,
        takeDamage,
        healPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};