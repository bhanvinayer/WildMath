import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { CharacterClass, GameState } from '../types';
import CharacterCard from '../components/CharacterCard';

const CharacterSelectPage: React.FC = () => {
  const { setCharacterClass, characterClass, setGameState } = useGame();
  const navigate = useNavigate();

  const handleSelect = (selectedClass: CharacterClass) => {
    setCharacterClass(selectedClass);
  };

  const handleContinue = () => {
    if (characterClass) {
      setGameState(GameState.EXPLORATION);
      navigate('/game');
    }
  };

  const characters = [
    {
      class: CharacterClass.WIZARD,
      name: 'Wizard',
      description: 'Master of algebraic spells and equations. Uses the power of variables to cast powerful magic!',
      mathSkill: 'Algebra Mastery',
    },
    {
      class: CharacterClass.ARCHER,
      name: 'Archer',
      description: 'Expert in fractions and proportions. Calculates ratios to hit targets with pinpoint accuracy!',
      mathSkill: 'Fraction Precision',
    },
    {
      class: CharacterClass.KNIGHT,
      name: 'Knight',
      description: 'Specialist in geometry and shapes. Uses angles and measurements to create the perfect defense!',
      mathSkill: 'Geometric Strength',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-gray-900 to-primary-800 flex flex-col items-center justify-center p-6 md:p-10 lg:p-16">
      {/* Home button at the very top */}
      <div className="w-full flex justify-end p-4">
        <button
          className="btn-pixel bg-primary-700 hover:bg-primary-500 text-lg px-6 py-3 shadow-lg transition"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-center mt-2">
          <h1 className="text-4xl md:text-6xl font-display text-white tracking-widest drop-shadow-xl font-[Minecraft]">
            <span className="text-primary-400">Wild</span>
            <span className="text-white">Math</span>
          </h1>
        </div>
        <p className="text-gray-200 text-base md:text-lg tracking-wide mb-2 font-['Press Start 2P'],font-mono">
          the numbers strike back
        </p>
      </div>
      <h1 className="text-4xl md:text-6xl font-display text-white mb-10 tracking-widest drop-shadow-xl">
        Choose Your Character
      </h1>
      <div className="w-full max-w-4xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((char) => (
            <CharacterCard
              key={char.class}
              characterClass={char.class}
              name={char.name}
              description={char.description}
              mathSkill={char.mathSkill}
              selected={characterClass === char.class}
              onSelect={() => handleSelect(char.class)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleContinue}
        disabled={!characterClass}
        className={`btn-pixel text-lg px-10 py-4 tracking-wider shadow-lg transition-all duration-200 font-bold ${
          characterClass ? 'bg-primary-600 hover:bg-primary-500' : 'bg-gray-700 cursor-not-allowed'
        }`}
      >
        Begin Adventure
      </button>
      {!characterClass && (
        <p className="mt-5 text-primary-300 text-base animate-pulse-slow">Select a character to continue</p>
      )}
    </div>
  );
};

export default CharacterSelectPage;