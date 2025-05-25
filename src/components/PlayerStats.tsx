import React from 'react';
import { CharacterClass } from '../types';
import HealthBar from './HealthBar';
import { BookOpen, Target, Sword } from 'lucide-react';

interface PlayerStatsProps {
  playerName: string;
  characterClass: CharacterClass;
  level: number;
  health: number;
  maxHealth: number;
  experience: number;
  nextLevelExp: number;
  isDefending?: boolean;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({
  playerName,
  characterClass,
  level,
  health,
  maxHealth,
  experience,
  nextLevelExp,
  isDefending = false,
}) => {
  const getClassIcon = () => {
    switch (characterClass) {
      case CharacterClass.WIZARD:
        return <BookOpen className="h-6 w-6 text-wizard-light" />;
      case CharacterClass.ARCHER:
        return <Target className="h-6 w-6 text-archer-light" />;
      case CharacterClass.KNIGHT:
        return <Sword className="h-6 w-6 text-knight-light" />;
      default:
        return null;
    }
  };

  const getClassColor = () => {
    switch (characterClass) {
      case CharacterClass.WIZARD:
        return 'text-wizard-light';
      case CharacterClass.ARCHER:
        return 'text-archer-light';
      case CharacterClass.KNIGHT:
        return 'text-knight-light';
      default:
        return 'text-white';
    }
  };

  const expPercentage = (experience / nextLevelExp) * 100;

  return (
    <div className={`bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700 rounded-2xl p-6 shadow-2xl border-2 border-primary-700 transition-all duration-300 ${
      isDefending ? 'ring-4 ring-blue-400 animate-pulse' : ''
    }`}>
      <div className="flex items-center mb-4">
        <div className="p-3 bg-gray-700 rounded-full mr-4 shadow-lg">
          {getClassIcon()}
        </div>
        <div>
          <h3 className="font-display text-white text-2xl drop-shadow-lg">{playerName}</h3>
          <p className={`text-base font-semibold capitalize ${getClassColor()} drop-shadow`}>Level {level} {characterClass}</p>
        </div>
      </div>
      <HealthBar 
        current={health} 
        max={maxHealth} 
        label="HP" 
        isPlayer={true}
      />
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-bold text-primary-300">EXP</span>
          <span className="text-primary-300">{experience}/{nextLevelExp}</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse-slow"
            style={{ width: `${expPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;