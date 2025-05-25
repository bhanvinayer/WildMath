import React from 'react';
import { Enemy } from '../types';
import HealthBar from './HealthBar';

interface EnemyCardProps {
  enemy: Enemy;
  isAttacking: boolean;
}

const EnemyCard: React.FC<EnemyCardProps> = ({ enemy, isAttacking }) => {
  return (
    <div 
      className={`bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-300 ${
        isAttacking ? 'animate-attack' : ''
      }`}
    >
      <h3 className="text-lg font-display text-white mb-2">{enemy.name}</h3>
      <div className="mb-3 relative rounded-lg overflow-hidden w-full h-36">
        <img 
          src={enemy.image} 
          alt={enemy.name} 
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-2 py-1">
          <p className="text-xs text-white">Level {enemy.level}</p>
        </div>
      </div>
      
      <HealthBar 
        current={enemy.health} 
        max={enemy.maxHealth} 
        label="HP" 
      />
      
      <div className="mt-3 flex justify-between text-sm">
        <div className="text-red-400">ATK: {enemy.attack}</div>
        <div className="text-blue-400">DEF: {enemy.defense}</div>
      </div>
    </div>
  );
};

export default EnemyCard;