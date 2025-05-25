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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-display text-white mb-6">Choose Your Character</h1>
      
      <div className="w-full max-w-4xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        className={`btn-pixel ${
          characterClass ? 'bg-primary-600 hover:bg-primary-500' : 'bg-gray-700 cursor-not-allowed'
        }`}
      >
        Begin Adventure
      </button>
      
      {!characterClass && (
        <p className="mt-3 text-gray-400 text-sm">Select a character to continue</p>
      )}
    </div>
  );
};

export default CharacterSelectPage;