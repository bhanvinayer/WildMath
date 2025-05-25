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
      className={`bg-gradient-to-br from-red-900 via-gray-900 to-primary-700 rounded-2xl p-6 shadow-2xl border-2 border-primary-700 transition-all duration-300 ${
        isAttacking ? 'animate-attack ring-4 ring-red-400' : ''
      } animate-float`}
    >
      <h3 className="text-2xl font-display text-white mb-4 drop-shadow-lg">{enemy.name}</h3>
      <div className="mb-4 relative rounded-xl overflow-hidden w-full h-40 shadow-lg border-2 border-primary-800">
        <img 
          src={enemy.image} 
          alt={enemy.name} 
          className="w-full h-full object-cover rounded-xl animate-float"
          style={{ objectFit: 'cover', width: '100%', height: '100%', minHeight: 80, minWidth: 80 }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-3 py-2">
          <p className="text-base text-white font-bold">Level {enemy.level}</p>
        </div>
      </div>
      <HealthBar 
        current={enemy.health} 
        max={enemy.maxHealth} 
        label="HP" 
      />
      <div className="mt-4 flex justify-between text-lg font-mono">
        <div className="text-red-400 font-bold">ATK: {enemy.attack}</div>
        <div className="text-blue-400 font-bold">DEF: {enemy.defense}</div>
      </div>
    </div>
  );
};

export default EnemyCard;