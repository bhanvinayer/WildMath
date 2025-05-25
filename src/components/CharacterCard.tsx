import React from 'react';
import { CharacterClass } from '../types';
import { BookOpen, Target, Sword } from 'lucide-react';

interface CharacterCardProps {
  characterClass: CharacterClass;
  name: string;
  description: string;
  mathSkill: string;
  selected: boolean;
  onSelect: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterClass,
  name,
  description,
  mathSkill,
  selected,
  onSelect,
}) => {
  const getBgColor = () => {
    switch (characterClass) {
      case CharacterClass.WIZARD:
        return selected ? 'bg-wizard-dark' : 'bg-wizard-light';
      case CharacterClass.ARCHER:
        return selected ? 'bg-archer-dark' : 'bg-archer-light';
      case CharacterClass.KNIGHT:
        return selected ? 'bg-knight-dark' : 'bg-knight-light';
      default:
        return 'bg-gray-600';
    }
  };

  const getIcon = () => {
    switch (characterClass) {
      case CharacterClass.WIZARD:
        return <BookOpen className="h-12 w-12" />;
      case CharacterClass.ARCHER:
        return <Target className="h-12 w-12" />;
      case CharacterClass.KNIGHT:
        return <Sword className="h-12 w-12" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`${getBgColor()} p-4 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 ${
        selected ? 'scale-105 ring-4 ring-white' : 'hover:scale-102'
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center">
        <div className="p-3 bg-white bg-opacity-20 rounded-full mb-4">
          {getIcon()}
        </div>
        <h3 className="text-xl font-display text-white mb-2">{name}</h3>
        <p className="text-white text-center text-sm mb-4">{description}</p>
        <div className="bg-black bg-opacity-30 p-2 rounded-lg w-full">
          <h4 className="text-white text-center text-xs mb-1">SPECIAL SKILL</h4>
          <p className="text-white text-center text-sm font-bold">{mathSkill}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;