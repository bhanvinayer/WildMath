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
      className={`${getBgColor()} p-6 rounded-2xl shadow-2xl cursor-pointer transform transition-all duration-300 border-2 ${
        selected ? 'scale-105 ring-4 ring-primary-200 border-white' : 'hover:scale-102 border-primary-700'
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center">
        <div className="p-4 bg-white bg-opacity-30 rounded-full mb-6 shadow-lg">
          {getIcon()}
        </div>
        <h3 className="text-2xl font-display text-white mb-3 drop-shadow-lg text-center break-words max-w-full">{name}</h3>
        <p className="text-white text-center text-base mb-6 font-mono animate-pulse-slow break-words max-w-full">{description}</p>
        <div className="bg-black bg-opacity-40 p-3 rounded-xl w-full shadow-inner">
          <h4 className="text-white text-center text-xs mb-2 tracking-wider font-bold">SPECIAL SKILL</h4>
          <p className="text-primary-200 text-center text-lg font-bold font-mono break-words max-w-full">{mathSkill}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;